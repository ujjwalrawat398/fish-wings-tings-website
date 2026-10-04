import type { Metadata } from "next";
import { CalendarHeart, Clock, Phone, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";
import Marquee from "@/components/Marquee";
import { HOURS, RESTAURANT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Book a table at Fish, Wings & Tings, Unit 3 Granville Arcade, Brixton Village. Communal tables, reggae, jerk chicken and rum punch.",
};

const PERKS = [
  {
    icon: Users,
    title: "Communal tables",
    text: "Long shared tables under the string lights — the way Brixton Village was meant to be enjoyed.",
  },
  {
    icon: CalendarHeart,
    title: "15-minute hold",
    text: "We hold reservations for 15 minutes. Running late? Call us and we'll keep the rum punch cold.",
  },
  {
    icon: Clock,
    title: "Walk-ins welcome",
    text: "The yellow front never says no — walk in and grab a stool at the counter whenever.",
  },
];

export default function ReservationsPage() {
  return (
    <main className="relative">
      <Navbar />

      <header className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-52">
        <span
          aria-hidden
          className="text-stroke-faint pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[19vw] font-extrabold leading-none"
        >
          BOOK A TING
        </span>
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-spice">
            <span className="h-px w-10 bg-spice" />
            Reservations
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
            Save your <span className="font-accent font-medium italic text-sun">seat</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sand md:text-lg">
            Tell us when and who — we&rsquo;ll confirm by phone or email. For
            parties of 8 or more, give us a bell directly on{" "}
            <a href={RESTAURANT.phoneHref} className="font-bold text-cream underline decoration-sun underline-offset-4 hover:text-sun">
              {RESTAURANT.phone}
            </a>.
          </p>
        </div>
      </header>

      <Marquee variant="ghost" items={["Book a Table", "Rum Punch Awaits", "Jerk Chicken O'Clock", "See You Friday"]} fast />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-5 lg:py-28">
        {/* Form */}
        <div className="lg:col-span-3">
          <ReservationForm />
        </div>

        {/* Side info */}
        <aside className="space-y-5 lg:col-span-2">
          {PERKS.map((p) => (
            <div
              key={p.title}
              className="flex gap-5 rounded-3xl border border-line bg-coal p-7 transition-colors duration-300 hover:border-sun/40"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sun/12 text-sun">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sand">{p.text}</p>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border border-line bg-ink p-7">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-bold">
              <Clock className="h-5 w-5 text-spice" />
              Kitchen hours
            </h3>
            <ul className="mt-4 space-y-2">
              {HOURS.map((h) => (
                <li key={h.day} className="flex items-baseline justify-between text-sm">
                  <span className="text-sand">{h.day}</span>
                  <span className={h.time ? "text-cream" : "font-bold text-spice"}>
                    {h.time ?? "Closed"}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={RESTAURANT.phoneHref}
              className="mt-6 flex items-center justify-center gap-2.5 rounded-full border border-cream/25 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-cream transition-colors hover:border-sun hover:text-sun"
            >
              <Phone className="h-4 w-4" />
              {RESTAURANT.phone}
            </a>
          </div>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
