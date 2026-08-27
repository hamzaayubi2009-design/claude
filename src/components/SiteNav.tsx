import { useEffect, useState } from "react";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-nav py-3" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <a
          href="#top"
          className="font-display text-base tracking-[0.18em] text-foreground md:text-lg"
        >
          HAMZA&rsquo;S CAFE
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-500 hover:text-copper-soft"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#menu" className="btn-atelier hidden !px-6 !py-3 md:inline-flex">
            Order Now
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-border md:hidden"
          >
            <span className="block h-px w-4 bg-foreground" />
            <span className="block h-px w-4 bg-foreground" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-nav mt-3 md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a href="#menu" onClick={() => setOpen(false)} className="btn-atelier w-full">
                Order Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
