import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { MENU, RESTAURANT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Reggae wings, jerk chicken, Trini curry crab, doubles, rum punch and sweet tings — the full Caribbean menu at Fish, Wings & Tings, Brixton Village.",
};

const SECTION_IMAGES: Record<string, { src: string; alt: string }> = {
  tings: { src: "/images/reggae-wings.jpg", alt: "Reggae wings, tamarind glaze, cooling pineapple" },
  mains: { src: "/images/hero-plate.jpg", alt: "Jerk chicken with rice and peas" },
  sides: { src: "/images/plantain.jpg", alt: "Caramelised fried plantain" },
  drinks: { src: "/images/rum-punch.jpg", alt: "The famous rum punch" },
  sweets: { src: "/images/rum-cake.jpg", alt: "Dark rum cake" },
};

export default function MenuPage() {
  const keys = Object.keys(MENU);

  return (
    <main className="relative">
      <Navbar />

      {/* Page header */}
      <header className="relative overflow-hidden pb-14 pt-40 md:pb-20 md:pt-52">
        <span
          aria-hidden
          className="text-stroke-faint pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] font-extrabold leading-none"
        >
          THE MENU
        </span>
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-spice">
            <span className="h-px w-10 bg-spice" />
            Seasonal · Locally Sourced
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
            Eat <span className="font-accent font-medium italic text-sun">good</span>,
            feel good
          </h1>
          <p className="mt-6 max-w-xl font-accent text-lg italic leading-relaxed text-sand">
            Taking regional and street food and turning it into a trendy and
            delightful selection of nouvelle Caribbean fare. Vegan and
            gluten-free options marked — just ask, we&rsquo;ll look after you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/reservations"
              className="rounded-full bg-sun px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:bg-spice hover:text-cream"
            >
              Book a table
            </Link>
            <a
              href={RESTAURANT.phoneHref}
              className="rounded-full border border-cream/25 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-cream transition-colors hover:border-sun hover:text-sun"
            >
              Call {RESTAURANT.phone}
            </a>
          </div>
        </div>
      </header>

      <Marquee variant="ghost" />

      {/* Sticky category rail */}
      <nav className="sticky top-[64px] z-40 border-y border-line bg-ink/90 backdrop-blur-xl">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 md:justify-center md:px-8">
          {keys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="shrink-0 rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.15em] text-sand transition-colors hover:bg-ember hover:text-sun"
            >
              {MENU[key].label}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {keys.map((key, idx) => {
          const section = MENU[key];
          const img = SECTION_IMAGES[key];
          const reversed = idx % 2 === 1;
          return (
            <section
              key={key}
              id={key}
              className="grid scroll-mt-36 gap-10 border-b border-line py-16 md:py-24 lg:grid-cols-2 lg:gap-16"
            >
              <div className={reversed ? "lg:order-2" : ""}>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                    {section.label}
                  </h2>
                  <span className="text-stroke-sun select-none font-display text-5xl font-extrabold md:text-7xl">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 font-accent text-lg italic text-sand">{section.blurb}</p>
                <ul className="mt-8 space-y-5">
                  {section.items.map((item) => (
                    <li key={item.name} className="group">
                      <div className="flex items-baseline">
                        <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-sun md:text-2xl">
                          {item.name}
                          {item.tag && (
                            <span className="ml-3 inline-block translate-y-[-2px] rounded-full border border-spice/40 bg-spice/10 px-2.5 py-0.5 align-middle text-[9px] font-bold uppercase tracking-[0.15em] text-spice">
                              {item.tag}
                            </span>
                          )}
                        </h3>
                        <span className="leader" />
                        <span className="font-display text-xl font-bold text-sun md:text-2xl">
                          £{item.price}
                        </span>
                      </div>
                      <p className="mt-1 max-w-lg text-sm leading-relaxed text-sand">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${reversed ? "lg:order-1" : ""} flex flex-col gap-4`}>
                {img && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[320px] lg:flex-1">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-[1400ms] hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
                {key === "mains" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-3xl">
                      <Image
                        src="/images/curry-crab.jpg"
                        alt="Trini curry crab and dumplings"
                        fill
                        className="object-cover transition-transform duration-[1400ms] hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-3xl">
                      <Image
                        src="/images/roti.jpg"
                        alt="Dalpuri roti with kuchela"
                        fill
                        className="object-cover transition-transform duration-[1400ms] hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="font-accent text-2xl italic leading-snug text-cream md:text-3xl">
            &ldquo;Naturally, the reggae-heavy restaurant soundtrack is second to none.&rdquo;
          </p>
          <Link
            href="/reservations"
            className="mt-10 inline-block rounded-full bg-sun px-10 py-4.5 text-sm font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:bg-spice hover:text-cream hover:shadow-[0_0_45px_rgba(225,75,42,0.4)]"
          >
            Reserve your table
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
