import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * BurgerScrollAnimation
 * ----------------------
 * A cinematic, scroll-scrubbed frame-sequence animation rendered to <canvas>.
 * The component pins itself for the height of a tall wrapper section; scroll
 * position within that section is mapped to a frame index (1..FRAME_COUNT).
 *
 * Frames are loaded on demand and cached in a ref (never trigger React state
 * updates per-frame), and progression/opacity work happens by writing
 * directly to DOM/canvas via refs inside a rAF-throttled scroll handler —
 * so scrolling never causes a React re-render.
 */

const FRAME_COUNT = 277;
const FRAME_BASE_PATH = "/burger-animation/frame-";
const framePath = (i: number) => `${FRAME_BASE_PATH}${String(i).padStart(3, "0")}.jpg`;

// Fraction of the section's scroll distance reserved at the end to hold on
// the final frame before the sticky viewport releases into the next section.
const HOLD_FRACTION = 0.08;
// How much of the animation progress the intro text takes to fade out.
const TEXT_FADE_END = 0.22;
// Animation progress at which the CTA starts revealing.
const CTA_REVEAL_START = 0.86;

interface BurgerScrollAnimationProps {
  eyebrow?: string;
  heading?: ReactNode;
  copy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Tailwind height class for the tall scroll wrapper, e.g. "h-[500vh]" */
  heightClassName?: string;
  className?: string;
}

export function BurgerScrollAnimation({
  eyebrow = "Frame by Frame",
  heading,
  copy,
  ctaLabel = "View the Menu",
  ctaHref = "#menu",
  heightClassName = "h-[500vh]",
  className = "",
}: BurgerScrollAnimationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<Array<HTMLImageElement | null>>(new Array(FRAME_COUNT + 1).fill(null));
  const pendingRef = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());
  const currentDrawnRef = useRef(0);
  const tickingRef = useRef(false);

  const [ready, setReady] = useState(false);

  // ---- frame loading -------------------------------------------------
  const loadFrame = (i: number): Promise<HTMLImageElement> => {
    if (i < 1 || i > FRAME_COUNT) return Promise.reject(new Error("frame out of range"));
    const cached = imagesRef.current[i];
    if (cached) return Promise.resolve(cached);
    const pending = pendingRef.current.get(i);
    if (pending) return pending;

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        imagesRef.current[i] = img;
        pendingRef.current.delete(i);
        resolve(img);
      };
      img.onerror = (err) => {
        pendingRef.current.delete(i);
        reject(err);
      };
      img.src = framePath(i);
    });

    pendingRef.current.set(i, promise);
    return promise;
  };

  const drawFrame = (i: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[i];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // "cover" fit — preserve aspect ratio, fill the viewport, keep subject centered.
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = cssW / cssH;
    let drawW: number, drawH: number, dx: number, dy: number;
    if (imgRatio > boxRatio) {
      drawH = cssH;
      drawW = cssH * imgRatio;
      dx = (cssW - drawW) / 2;
      dy = 0;
    } else {
      drawW = cssW;
      drawH = cssW / imgRatio;
      dx = 0;
      dy = (cssH - drawH) / 2;
    }

    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img, dx, dy, drawW, drawH);
    currentDrawnRef.current = i;
  };

  // ---- preloading ------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    const isMobile = window.innerWidth < 768;
    const eagerCount = isMobile ? 14 : 24;
    const chunkSize = isMobile ? 5 : 8;

    const schedule = (fn: () => void) => {
      const ric = (
        window as unknown as {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
        }
      ).requestIdleCallback;
      if (ric) ric(fn, { timeout: 500 });
      else setTimeout(fn, 80);
    };

    const idleLoad = (start: number) => {
      let i = start;
      const chunk = () => {
        if (cancelled || i > FRAME_COUNT) return;
        const batchEnd = Math.min(i + chunkSize, FRAME_COUNT);
        const jobs: Promise<unknown>[] = [];
        for (; i <= batchEnd; i++) jobs.push(loadFrame(i).catch(() => {}));
        Promise.all(jobs).then(() => {
          if (!cancelled && i <= FRAME_COUNT) schedule(chunk);
        });
      };
      schedule(chunk);
    };

    // 1. First frame, drawn as soon as it's ready.
    loadFrame(1)
      .then(() => {
        if (cancelled) return;
        drawFrame(1);
        setReady(true);
      })
      .catch(() => {});

    // 2. Eager batch covering the start of the scroll range.
    (async () => {
      for (let i = 2; i <= Math.min(eagerCount, FRAME_COUNT); i++) {
        if (cancelled) return;
        await loadFrame(i).catch(() => {});
      }
      if (!cancelled) idleLoad(eagerCount + 1);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- scroll-driven progress -----------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      tickingRef.current = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;

      const raw = Math.min(Math.max(-rect.top / total, 0), 1);
      const animProgress = Math.min(raw / (1 - HOLD_FRACTION), 1);
      const target = 1 + Math.round(animProgress * (FRAME_COUNT - 1));

      if (imagesRef.current[target]) {
        if (target !== currentDrawnRef.current) drawFrame(target);
      } else {
        // Draw the nearest already-loaded earlier frame so motion stays
        // smooth while the exact target frame streams in, then prioritize it.
        let fallback = target;
        while (fallback > 1 && !imagesRef.current[fallback]) fallback--;
        if (imagesRef.current[fallback] && fallback !== currentDrawnRef.current) {
          drawFrame(fallback);
        }
        loadFrame(target)
          .then(() => drawFrame(target))
          .catch(() => {});
      }

      if (textRef.current) {
        const op = animProgress <= TEXT_FADE_END ? 1 - animProgress / TEXT_FADE_END : 0;
        textRef.current.style.opacity = String(op);
        textRef.current.style.transform = `translateY(${(1 - op) * -18}px)`;
      }

      if (ctaRef.current) {
        const op =
          animProgress >= CTA_REVEAL_START
            ? Math.min((animProgress - CTA_REVEAL_START) / (1 - CTA_REVEAL_START), 1)
            : 0;
        ctaRef.current.style.opacity = String(op);
        ctaRef.current.style.transform = `translateY(${(1 - op) * 18}px)`;
        ctaRef.current.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative ${heightClassName} ${className}`}
      aria-label="Cinematic burger assembly animation, scroll to progress"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-espresso-deep">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="veil-floor pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-deep/70 via-transparent to-espresso-deep/30" />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-espresso-deep">
            <div className="flex flex-col items-center gap-4">
              <span className="h-8 w-8 animate-spin rounded-full border border-copper/30 border-t-copper" />
              <span className="text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground">
                Loading the scene
              </span>
            </div>
          </div>
        )}

        <div
          ref={textRef}
          className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-start justify-center px-6 md:px-12"
        >
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="font-display mt-6 max-w-2xl text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[1.02]">
              {heading}
            </h2>
          )}
          {copy && (
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {copy}
            </p>
          )}
        </div>

        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-14 z-10 flex justify-center opacity-0 md:bottom-20"
          style={{ pointerEvents: "none" }}
        >
          <a href={ctaHref} className="btn-atelier">
            {ctaLabel}
          </a>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-6 hidden items-center gap-4 md:flex md:left-12">
          <span className="block h-px w-16 bg-copper" />
          <span className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
