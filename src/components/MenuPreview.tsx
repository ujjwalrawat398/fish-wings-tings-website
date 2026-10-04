"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { MENU } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
const KEYS = Object.keys(MENU);

export default function MenuPreview() {
  const [active, setActive] = useState(KEYS[0]);
  const section = MENU[active];

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-spice/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-sea"
          >
            <span className="h-px w-10 bg-sea" />
            The Menu
            <span className="h-px w-10 bg-sea" />
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            Eat <span className="font-accent font-medium italic text-sun">good</span>,
            <br />
            feel good
          </motion.h2>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="no-scrollbar mb-10 flex gap-2 overflow-x-auto md:justify-center"
        >
          {KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 md:px-6 ${
                active === key ? "text-ink" : "text-sand hover:text-cream"
              }`}
            >
              {active === key && (
                <motion.span
                  layoutId="menuTab"
                  className="absolute inset-0 rounded-full bg-sun"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{MENU[key].label}</span>
            </button>
          ))}
        </motion.div>

        {/* Blurb */}
        <p className="mb-10 text-center font-accent text-lg italic text-sand">
          {section.blurb}
        </p>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -14, transition: { duration: 0.25 } }}
            variants={{
              show: { transition: { staggerChildren: 0.06 } },
            }}
            className="space-y-1"
          >
            {section.items.map((item) => (
              <motion.li
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                }}
                className="group rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-ember/60 md:px-6"
              >
                <div className="flex items-baseline">
                  <h3 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-sun md:text-2xl">
                    {item.name}
                  </h3>
                  <span className="leader" />
                  <span className="font-display text-xl font-bold text-sun md:text-2xl">
                    £{item.price}
                  </span>
                </div>
                <div className="mt-1.5 flex items-start justify-between gap-4">
                  <p className="max-w-xl text-sm leading-relaxed text-sand">
                    {item.description}
                  </p>
                  {item.tag && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full border border-spice/40 bg-spice/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-spice">
                      <Flame className="h-3 w-3" />
                      {item.tag}
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:bg-sun"
          >
            Full menu &amp; prices
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
