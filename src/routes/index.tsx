import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BurgerScrollAnimation } from "@/components/BurgerScrollAnimation";

import heroChef from "@/assets/hero-chef.jpg";
import burgerHamza from "@/assets/burger-hamza.jpg";
import burgerAtelier from "@/assets/burger-atelier.jpg";
import burgerClassic from "@/assets/burger-classic.jpg";
import stepSear from "@/assets/step-sear.jpg";
import stepLayer from "@/assets/step-layer.jpg";
import stepLevitate from "@/assets/step-levitate.jpg";
import stepAssemble from "@/assets/step-assemble.jpg";
import storyChef from "@/assets/story-chef.jpg";
import ingredients from "@/assets/ingredients.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hamza's Cafe — Crafted to Be Craved" },
      {
        name: "description",
        content:
          "Handcrafted burgers, bold flavors, and a little magic in every layer. A midnight atelier for smashed beef, house sauce and freshly baked buns.",
      },
      { property: "og:title", content: "Hamza's Cafe — Crafted to Be Craved" },
      {
        property: "og:description",
        content:
          "Handcrafted burgers, bold flavors, and a little magic in every layer. Discover the house favorites.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  {
    n: "01",
    title: "SEAR",
    copy: "Beef hits the hot grill. Crust forms in seconds, edges lacing into caramel.",
    image: stepSear,
  },
  {
    n: "02",
    title: "LAYER",
    copy: "Fresh produce is prepped by hand — sliced, seasoned, set in order.",
    image: stepLayer,
  },
  {
    n: "03",
    title: "LEVITATE",
    copy: "Ingredients rise into the air, suspended for a single held breath.",
    image: stepLevitate,
  },
  {
    n: "04",
    title: "ASSEMBLE",
    copy: "Everything falls into place. The finished burger, exactly as imagined.",
    image: stepAssemble,
  },
];

const menu = [
  {
    name: "THE HAMZA",
    category: "Signature",
    copy: "Double smashed beef, aged cheddar, caramelized onions, house sauce.",
    price: "18",
    image: burgerHamza,
  },
  {
    name: "THE ATELIER",
    category: "Chef's Table",
    copy: "Smashed beef, smoked cheese, roasted mushrooms, truffle-style house sauce.",
    price: "21",
    image: burgerAtelier,
  },
  {
    name: "THE CLASSIC",
    category: "House Staple",
    copy: "Beef, cheddar, lettuce, tomato, pickles and signature sauce.",
    price: "15",
    image: burgerClassic,
  },
];

const pillars = [
  { label: "100% Beef", copy: "Ground in-house each morning, never frozen, seasoned only with salt." },
  { label: "Fresh Produce", copy: "Sourced weekly from growers we know by name and visit by hand." },
  { label: "House Sauce", copy: "A slow-built recipe of smoke, tang and warmth. Made in small batches." },
  { label: "Freshly Baked Buns", copy: "Enriched dough, proved overnight, baked before the doors open." },
];

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="relative min-h-[100svh] overflow-hidden">
          <img
            src={heroChef}
            alt="A handcrafted cotton puppet chef assembling a burger in a dark copper-lit kitchen"
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />
          <div className="veil-left absolute inset-0" />
          <div className="veil-floor absolute inset-0" />

          <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] items-end px-6 pb-24 pt-36 md:items-center md:px-12 md:pb-0">
            <div className="max-w-xl">
              <Reveal>
                <p className="eyebrow">Handcrafted Burgers · Est. 2026</p>
              </Reveal>

              <Reveal delay={120}>
                <h1 className="font-display mt-8 text-[clamp(2.9rem,8vw,6.2rem)] leading-[0.94] tracking-[-0.01em]">
                  Crafted
                  <span className="block italic text-copper-soft">to be</span>
                  craved.
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <div className="rule-copper mt-10 w-28" />
                <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                  Handcrafted burgers, bold flavors, and a little magic in every layer.
                </p>
              </Reveal>

              <Reveal delay={360}>
                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                  <a href="#menu" className="btn-atelier">
                    Order Now
                  </a>
                  <a href="#menu" className="btn-ghost-atelier">
                    Explore the Menu
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-8 right-6 hidden items-center gap-4 md:flex md:right-12">
            <span className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <span className="block h-px w-16 bg-copper" />
          </div>
        </section>

        {/* BURGER STORY */}
        <section id="experience" className="relative border-t border-border py-28 md:py-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <Reveal>
                <p className="eyebrow">The Process</p>
                <h2 className="font-display mt-6 max-w-2xl text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[1.02]">
                  Watch it come <span className="italic text-copper-soft">together.</span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Four movements, one burger. Filmed frame by frame in the atelier kitchen.
                </p>
              </Reveal>
            </div>

            <ol className="mt-20 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <Reveal as="li" key={step.n} delay={i * 120} className="group bg-background">
                  <div className="relative overflow-hidden">
                    <img
                      src={step.image}
                      alt={`${step.title} — ${step.copy}`}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="veil-floor absolute inset-0 opacity-80" />
                  </div>
                  <div className="p-7">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm text-copper">{step.n}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-[0.7rem] uppercase tracking-[0.28em]">
                        {step.title}
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {step.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* CINEMATIC SCROLL ANIMATION */}
        <BurgerScrollAnimation
          eyebrow="The Atelier, Frame by Frame"
          heading={
            <>
              The scene, <span className="italic text-copper-soft">coming alive.</span>
            </>
          }
          copy="277 frames, shot in the atelier kitchen. Scroll to direct the sequence — sear to final plate."
          ctaLabel="View the Menu"
          ctaHref="#menu"
        />

        {/* MENU */}
        <section id="menu" className="border-t border-border py-28 md:py-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12">
            <Reveal>
              <p className="eyebrow">Selected Plates</p>
              <h2 className="font-display mt-6 text-[clamp(2.2rem,5.5vw,4.4rem)] leading-[1.02]">
                The house <span className="italic text-copper-soft">favorites.</span>
              </h2>
            </Reveal>

            <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
              {menu.map((item, i) => (
                <Reveal
                  key={item.name}
                  delay={i * 140}
                  className={i === 1 ? "md:-mt-16" : i === 2 ? "md:mt-10" : ""}
                >
                  <article className="group">
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={`${item.name} — ${item.copy}`}
                        width={1024}
                        height={1280}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                    </div>
                    <p className="eyebrow mt-7 block">{item.category}</p>
                    <div className="mt-3 flex items-baseline justify-between gap-6">
                      <h3 className="font-display text-2xl tracking-[0.04em]">{item.name}</h3>
                      <span className="font-display text-xl text-copper">${item.price}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.copy}
                    </p>
                    <button
                      type="button"
                      className="mt-7 inline-flex items-center gap-3 border-b border-border pb-2 text-[0.68rem] uppercase tracking-[0.28em] transition-colors duration-500 hover:border-copper hover:text-copper-soft"
                    >
                      Order
                      <span aria-hidden>&rarr;</span>
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INGREDIENTS */}
        <section className="border-t border-border py-28 md:py-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12">
            <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <Reveal>
                <div className="overflow-hidden">
                  <img
                    src={ingredients}
                    alt="Freshly baked buns, raw beef, red onion and herbs on dark walnut"
                    width={1600}
                    height={912}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <p className="eyebrow">Sourcing</p>
                  <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.06]">
                    Nothing ordinary goes{" "}
                    <span className="italic text-copper-soft">between the buns.</span>
                  </h2>
                </Reveal>

                <dl className="mt-14 divide-y divide-border border-y border-border">
                  {pillars.map((p, i) => (
                    <Reveal key={p.label} delay={i * 100}>
                      <div className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                        <dt className="text-[0.7rem] uppercase tracking-[0.24em] text-copper-soft">
                          {p.label}
                        </dt>
                        <dd className="text-sm leading-relaxed text-muted-foreground">{p.copy}</dd>
                      </div>
                    </Reveal>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section id="story" className="border-t border-border py-28 md:py-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12">
            <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <Reveal>
                  <p className="eyebrow">Our Story</p>
                  <h2 className="font-display mt-6 max-w-xl text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05]">
                    Made by hand. <span className="italic text-copper-soft">Served with heart.</span>
                  </h2>
                </Reveal>

                <Reveal delay={140}>
                  <div className="mt-10 max-w-lg space-y-6 text-base leading-relaxed text-muted-foreground">
                    <p>
                      Hamza&rsquo;s Cafe began as a single grill, a stack of notebooks and a stubborn
                      belief that a burger deserves the same care as a tasting menu.
                    </p>
                    <p>
                      Everything here is built by hand — the sauces, the buns, the little cotton chef
                      who has watched over the pass since the first night we opened. He is stitched,
                      not rendered. So is the food.
                    </p>
                    <p>
                      Come late. Sit close to the copper. Let it take the time it takes.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={260}>
                  <p className="font-display mt-12 text-xl italic text-copper-soft">
                    &ldquo;Slow hands, hot grill.&rdquo;
                  </p>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <div className="float-slow overflow-hidden">
                  <img
                    src={storyChef}
                    alt="The handcrafted cotton chef of Hamza's Cafe in the copper-lit kitchen"
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-28 md:py-36">
          <Reveal className="mx-auto max-w-[1400px] px-6 text-center md:px-12">
            <p className="eyebrow">Reservations &amp; Orders</p>
            <h2 className="font-display mx-auto mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] leading-[1.04]">
              A table is waiting <span className="italic text-copper-soft">for you.</span>
            </h2>
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#menu" className="btn-atelier">
                Order Now
              </a>
              <a href="#contact" className="btn-ghost-atelier">
                Find Us
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
