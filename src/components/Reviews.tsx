"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { GUEST_REVIEWS, PRESS } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const reviews = GUEST_REVIEWS;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5200);
    return () => clearInterval(t);
  }, [reviews.length]);

  const review = reviews[index];

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* Giant quote word */}
      <span
        aria-hidden
        className="text-stroke-faint pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[20vw] font-extrabold leading-none opacity-50"
      >
        LEGENDARY
      </span>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Press bar */}
        <div className="mb-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {PRESS.map((p, i) => (
            <motion.div
              key={p.source}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              className="group bg-coal p-8 transition-colors duration-500 hover:bg-ember"
            >
              <Quote className="mb-5 h-7 w-7 text-spice" />
              <p className="text-sm leading-relaxed text-cream md:text-[15px]">&ldquo;{p.quote}&rdquo;</p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="font-display text-lg font-bold text-sun">{p.source}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-clay">
                  {p.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guest review carousel */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-8 flex gap-1.5"
          >
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-sun text-sun" />
            ))}
          </motion.div>

          <div className="relative flex min-h-[190px] w-full max-w-3xl items-center justify-center md:min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease }}
              >
                <blockquote className="font-accent text-2xl font-medium italic leading-snug text-cream md:text-3xl">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-[12px] font-bold uppercase tracking-[0.3em] text-sand">
                  {review.author} — Google Review
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex gap-2.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-sun" : "w-4 bg-line hover:bg-clay"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
