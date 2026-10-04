"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin, Star } from "lucide-react";
import { useRef } from "react";
import Marquee from "./Marquee";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/5616130/5616130-uhd_3840_2160_25fps.mp4";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yVideo = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Video backdrop */}
      <motion.div style={{ y: yVideo }} className="absolute inset-0 scale-[1.12]">
        <video
          className="h-full w-full object-cover"
          src={HERO_VIDEO}
          poster="/images/hero-plate.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/35 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 md:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="flex items-center gap-2 rounded-full border border-cream/20 bg-ink/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-sun" />
            Brixton Village · Est. 2012
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-sun/30 bg-sun/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-sun backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-sun" />
            Time Out Recommended
          </span>
        </motion.div>

        <h1 className="font-display font-extrabold leading-[0.88] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 1, ease }}
              className="block text-[15vw] text-cream md:text-[9.5rem]"
            >
              FISH,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.47, duration: 1, ease }}
              className="text-stroke block text-[15vw] md:text-[9.5rem]"
            >
              WINGS
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.59, duration: 1, ease }}
              className="block text-[15vw] text-sun md:text-[9.5rem]"
            >
              &amp; TINGS
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease }}
          className="mt-7 max-w-md font-accent text-xl italic leading-relaxed text-sand md:text-2xl"
        >
          Nouvelle Caribbean fare from the heart of Brixton — Trinidadian soul,
          street-food energy, and a rum punch people cross London for.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/reservations"
            className="group relative overflow-hidden rounded-full bg-sun px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-ink transition-shadow duration-500 hover:shadow-[0_0_45px_rgba(245,179,1,0.45)]"
          >
            <span className="relative z-10">Book a Table</span>
            <span className="absolute inset-0 -translate-x-full bg-spice transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-cream/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream backdrop-blur-sm transition-all duration-300 hover:border-sun hover:text-sun"
          >
            Explore the Menu
          </Link>
        </motion.div>
      </motion.div>

      {/* Rotating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.9, ease }}
        className="absolute bottom-32 right-8 z-10 hidden lg:block"
      >
        <div className="relative grid h-36 w-36 place-items-center">
          <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full">
            <defs>
              <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="fill-cream text-[8.2px] font-semibold uppercase tracking-[0.28em]">
              <textPath href="#circlePath">
                Caribbean soul food · Brixton Village ·
              </textPath>
            </text>
          </svg>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-spice">
            <ArrowDown className="h-5 w-5 text-cream" />
          </span>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-32 left-5 z-10 hidden items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand md:left-8 md:flex"
      >
        <span className="relative flex h-10 w-5 items-start justify-center rounded-full border border-sand/50 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-sun"
          />
        </span>
        Scroll
      </motion.div>

      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 mt-auto"
      >
        <Marquee variant="filled" />
      </motion.div>
    </section>
  );
}
