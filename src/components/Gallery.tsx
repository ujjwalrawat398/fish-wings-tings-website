"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEOS = {
  grill: "https://videos.pexels.com/video-files/11553209/11553209-uhd_3840_2160_25fps.mp4",
  cocktail:
    "https://videos.pexels.com/video-files/32054975/13663347_3840_2160_60fps.mp4",
};

const PHOTOS = [
  { src: "/images/reggae-wings.jpg", alt: "Reggae wings with tamarind glaze and pineapple", tall: true },
  { src: "/images/interior.jpg", alt: "The yellow-fronted dining room in Granville Arcade", tall: false },
  { src: "/images/plantain.jpg", alt: "Caramelised fried sweet plantain", tall: false },
  { src: "/images/curry-crab.jpg", alt: "Trini curry crab and dumplings", tall: true },
  { src: "/images/rum-punch.jpg", alt: "The famous rum punch", tall: true },
  { src: "/images/roti.jpg", alt: "Dalpuri roti with kuchela", tall: false },
  { src: "/images/rum-cake.jpg", alt: "Dark rum cake with glaze", tall: false },
  { src: "/images/hero-plate.jpg", alt: "Jerk chicken platter with rice and peas", tall: true },
];

function HoverVideo({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <button
      onMouseEnter={() => {
        void videoRef.current?.play();
        setPlaying(true);
      }}
      onMouseLeave={() => {
        videoRef.current?.pause();
        setPlaying(false);
      }}
      className="group relative block overflow-hidden rounded-2xl"
      aria-label={label}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={`grid h-14 w-14 place-items-center rounded-full border border-cream/40 bg-ink/40 backdrop-blur-md transition-all duration-500 ${
            playing ? "scale-75 opacity-0" : "opacity-100"
          }`}
        >
          <Play className="ml-0.5 h-5 w-5 fill-cream text-cream" />
        </span>
      </div>
      <span className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
        {label}
      </span>
    </button>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-coal py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-spice"
            >
              <span className="h-px w-10 bg-spice" />
              Gallery
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
            >
              Hot off <span className="font-accent font-medium italic text-sun">the grill</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="max-w-xs text-sm leading-relaxed text-sand"
          >
            Hover the reels — jerk smoke, tamarind glaze and rum punch poured slow.
            Shot in Unit 3, Granville Arcade.
          </motion.p>
        </div>

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease }}
            className="break-inside-avoid"
          >
            <HoverVideo src={VIDEOS.grill} label="Jerk smoke" />
          </motion.div>

          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease, delay: (i % 4) * 0.08 }}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={photo.tall ? 900 : 480}
                className="w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="absolute bottom-4 left-4 right-4 translate-y-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.alt}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease }}
            className="break-inside-avoid"
          >
            <HoverVideo src={VIDEOS.cocktail} label="Rum punch" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
