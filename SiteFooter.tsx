export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-espresso-deep">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.12em]">HAMZA&rsquo;S CAFE</p>
            <p className="mt-4 font-display text-lg italic text-copper-soft">
              Crafted to be craved.
            </p>
            <div className="rule-copper mt-8 w-24" />
          </div>

          <div>
            <p className="eyebrow">Opening Hours</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li>Mon &ndash; Thu · 12:00 &ndash; 23:00</li>
              <li>Fri &ndash; Sat · 12:00 &ndash; 01:00</li>
              <li>Sunday · 13:00 &ndash; 22:00</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Location</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li>14 Walnut Lane</li>
              <li>Old Quarter</li>
              <li>Open for reservations</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hello@hamzascafe.com"
                  className="transition-colors duration-500 hover:text-copper-soft"
                >
                  hello@hamzascafe.com
                </a>
              </li>
              <li>+1 (555) 014&ndash;2026</li>
              <li>
                <a href="#" className="transition-colors duration-500 hover:text-copper-soft">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Hamza&rsquo;s Cafe · Handcrafted burgers</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors duration-500 hover:text-copper-soft">
              Privacy
            </a>
            <a href="#" className="transition-colors duration-500 hover:text-copper-soft">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
