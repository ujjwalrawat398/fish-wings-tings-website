"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SIGNATURES } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Signatures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="signatures" ref={ref} className="relative bg-coal">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-spice"
            >
              <span className="h-px w-10 bg-spice" />
              The Greatest Tings
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl"
            >
              Signature
              <span className="block font-accent font-medium italic text-sun">plates &amp; pours</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="max-w-sm text-sm leading-relaxed text-sand"
          >
            Four reasons the yellow front on Granville Arcade never sits quiet.
            Regional and street food, turned into delightful nouvelle Caribbean fare.
          </motion.p>
        </div>

        <div className="space-y-24 md:space-y-36">
          {SIGNATURES.map((dish, i) => (
            <DishRow key={dish.name} dish={dish} index={i} progress={scrollYProgress} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-24 flex justify-center"
        >
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 rounded-full border border-cream/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream transition-all duration-300 hover:border-sun hover:text-sun"
          >
            See the full menu
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

type Dish = (typeof SIGNATURES)[number];

function DishRow({
  dish,
  index,
  progress,
}: {
  dish: Dish;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rowProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(rowProgress, [0, 1], [index % 2 === 0 ? 70 : -70, index % 2 === 0 ? -70 : 70]);
  const target = useTransform(progress, [0.1 * index, 0.1 * index + 0.08], [0, 1]);
  const scaleX = useTransform(target, (v) => `${Math.max(v, 0.001)}`);

  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-12 ${reversed ? "" : ""}`}
    >
      {/* Image */}
      <motion.div
        style={{ y }}
        className={`relative lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease }}
          className={`group relative aspect-[16/11] overflow-hidden rounded-3xl ${
            reversed ? "lg:rounded-l-[10rem]" : "lg:rounded-r-[10rem]"
          }`}
        >
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <span className="text-stroke-sun absolute -bottom-4 left-6 select-none font-display text-[6.5rem] font-extrabold leading-none md:text-[9rem]">
            {dish.index}
          </span>
          <span className="absolute right-5 top-5 rounded-full bg-ink/70 px-4 py-2 font-display text-lg font-bold text-sun backdrop-blur-md">
            £{dish.price}
          </span>
        </motion.div>
      </motion.div>

      {/* Copy */}
      <div className={`lg:col-span-5 ${reversed ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
        <motion.h3
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          {dish.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
          className="mt-5 text-base leading-relaxed text-sand md:text-lg"
        >
          {dish.description}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.22 }}
          className="mt-5 font-accent text-base italic text-sun"
        >
          {dish.pairing}
        </motion.p>
        <motion.div
          style={{ scaleX }}
          className="mt-8 h-px origin-left bg-gradient-to-r from-sun to-transparent"
        />
      </div>
    </div>
  );
}
