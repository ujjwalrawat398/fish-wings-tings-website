"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Phone, Train } from "lucide-react";
import { HOURS, RESTAURANT } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function useLondonNow() {
  const [now, setNow] = useState<{ day: number; minutes: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const london = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/London" })
      );
      setNow({ day: london.getDay(), minutes: london.getHours() * 60 + london.getMinutes() });
    };
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function getOpenState(day: number, minutes: number) {
  // day: 0=Sun ... 6=Sat; map to our HOURS array (0=Mon ... 6=Sun)
  const idx = (day + 6) % 7;
  const hours = HOURS[idx];
  if (!hours.time) return { open: false, label: "Closed today", idx };
  const [openStr, closeStr] = hours.time.split("—").map((s) => s.trim());
  const toMin = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + (m || 0);
  };
  const open = minutes >= toMin(openStr) && minutes <= toMin(closeStr);
  return { open, label: open ? "Open now" : "Closed now", idx };
}

export default function Visit() {
  const now = useLondonNow();
  const state = now ? getOpenState(now.day, now.minutes) : null;

  return (
    <section id="visit" className="relative bg-coal py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-sea"
          >
            <span className="h-px w-10 bg-sea" />
            Find Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            Pull up in <span className="font-accent font-medium italic text-sun">Brixton</span>
          </motion.h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="flex flex-col gap-8 rounded-3xl border border-line bg-ink p-8 md:p-10 lg:col-span-2"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="flex items-center gap-2.5 font-display text-xl font-bold">
                  <MapPin className="h-5 w-5 text-spice" />
                  Address
                </h3>
                <a
                  href={RESTAURANT.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-sand transition-all hover:border-sun hover:text-sun"
                  aria-label="Open in Google Maps"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 leading-relaxed text-sand">
                {RESTAURANT.address.line1}
                <br />
                {RESTAURANT.address.line2}
                <br />
                {RESTAURANT.address.city} {RESTAURANT.address.postcode}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-clay">
                <Train className="h-4 w-4" />
                Tube: Brixton (Victoria line) — 4 min walk
              </p>
            </div>

            <div className="border-t border-line pt-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-bold">
                <Phone className="h-5 w-5 text-spice" />
                Reservations
              </h3>
              <a
                href={RESTAURANT.phoneHref}
                className="mt-4 block font-display text-3xl font-extrabold tracking-tight text-cream transition-colors hover:text-sun"
              >
                {RESTAURANT.phone}
              </a>
              <p className="mt-2 text-sm text-clay">
                Walk-ins always welcome at the communal tables.
              </p>
            </div>

            <div className="border-t border-line pt-8">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2.5 font-display text-xl font-bold">
                  <Clock className="h-5 w-5 text-spice" />
                  Opening hours
                </h3>
                {state && (
                  <span
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                      state.open
                        ? "bg-sea/15 text-sea"
                        : "bg-spice/15 text-spice"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        state.open ? "animate-pulse bg-sea" : "bg-spice"
                      }`}
                    />
                    {state.label}
                  </span>
                )}
              </div>
              <ul className="mt-5 space-y-2.5">
                {HOURS.map((h, i) => {
                  const isToday = state?.idx === i;
                  return (
                    <li
                      key={h.day}
                      className={`flex items-baseline justify-between rounded-lg px-3 py-2 text-sm ${
                        isToday ? "bg-ember font-bold text-cream" : "text-sand"
                      }`}
                    >
                      <span>{h.day}</span>
                      <span className={h.time ? "" : "text-spice"}>
                        {h.time ?? "Closed"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="relative min-h-[420px] overflow-hidden rounded-3xl border border-line lg:col-span-3"
          >
            <iframe
              title="Fish, Wings & Tings — Granville Arcade, Brixton Village"
              src={RESTAURANT.mapEmbed}
              className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05] invert-[88%] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-line bg-ink/90 px-5 py-4 backdrop-blur-md">
              <p className="font-display text-lg font-bold">Unit 3 · Granville Arcade</p>
              <p className="text-xs uppercase tracking-[0.2em] text-sand">
                Brixton Village · SW9 8PR
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-14 flex flex-col items-center gap-5 text-center"
        >
          <p className="font-accent text-xl italic text-sand">
            Communal tables, school kids after class, rum punch till late —
          </p>
          <Link
            href="/reservations"
            className="rounded-full bg-sun px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:bg-spice hover:text-cream hover:shadow-[0_0_45px_rgba(225,75,42,0.4)]"
          >
            Reserve your spot
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
