"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "2012", label: "Serving Brixton since" },
  { value: "3rd", label: "Unit in Granville Arcade" },
  { value: "1", label: "Rum punch, many refills" },
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [30, -50]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      {/* Giant background word */}
      <span
        aria-hidden
        className="text-stroke-faint pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-extrabold leading-none opacity-60"
      >
        TRINI SOUL
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            style={{ y: yImg }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <Image
              src="/images/chef.jpg"
              alt="Brian Danclair, chef-owner of Fish, Wings & Tings"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="font-display text-2xl font-bold">Brian Danclair</p>
                <p className="text-xs uppercase tracking-[0.3em] text-sand">
                  Chef-Owner · Trinidad &amp; Tobago
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: yBadge }}
            className="absolute -right-4 -top-8 hidden rotate-6 md:block"
          >
            <div className="animate-float rounded-2xl bg-spice px-6 py-5 shadow-[0_20px_60px_rgba(225,75,42,0.35)]">
              <p className="font-display text-3xl font-extrabold leading-none">Est.</p>
              <p className="font-display text-5xl font-extrabold leading-none">2012</p>
            </div>
          </motion.div>
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-sun"
          >
            <span className="h-px w-10 bg-sun" />
            Our Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl"
          >
            From Port of Spain to{" "}
            <span className="font-accent font-medium italic text-sun">Coldharbour Lane</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="mt-7 space-y-5 text-base leading-relaxed text-sand md:text-lg"
          >
            <p>
              The yellow-fronted Caribbean joint in Brixton Village actually has roots
              in &apos;80s America — Trinidad-born owner{" "}
              <span className="text-cream">Brian Danclair</span> cooked at a Washington,
              D.C. restaurant of the same name back in the day. The original is long
              gone, but his move to the UK in 2012 brought a London version to life,
              with a similar shop front, in one of the city&apos;s greatest food hubs.
            </p>
            <p>
              Think communal tables spilling onto Coldharbour Lane, no-nonsense
              Caribbean fare — jerk chicken, fried plantain, patented{" "}
              <span className="text-cream">reggae wings</span> doused in fiery tamarind —
              and a reggae-heavy soundtrack that is second to none. If the kitchen is
              the heart of the home, this is no exception: grandmother Tina&apos;s
              empanadas, the staple codfish fritters, and{" "}
              <span className="font-accent italic text-sun">that</span> rum punch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-extrabold text-sun md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-clay">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
            href="https://www.timeout.com/london/restaurants/fish-wings-tings"
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:text-sun"
          >
            Read the Time Out review
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
