"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X, Phone } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

const LINKS = [
  { href: "/#story", label: "Story" },
  { href: "/menu", label: "Menu" },
  { href: "/#signatures", label: "Signatures" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#visit", label: "Visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-b border-line/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 group-hover:rotate-[20deg]">
              <Flame className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold leading-none tracking-tight">
              FISH, WINGS
              <span className="block text-[11px] font-medium tracking-[0.35em] text-sand">
                &amp; TINGS
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="link-sweep text-[13px] font-medium uppercase tracking-[0.2em] text-sand transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={RESTAURANT.phoneHref}
              className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-cream transition-colors hover:text-sun"
            >
              <Phone className="h-3.5 w-3.5" />
              {RESTAURANT.phone}
            </a>
            <Link
              href="/reservations"
              className="rounded-full bg-spice px-6 py-2.5 text-[13px] font-bold uppercase tracking-[0.15em] text-cream transition-all duration-300 hover:bg-sun hover:text-ink hover:shadow-[0_0_35px_rgba(245,179,1,0.4)]"
            >
              Book a Table
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-coal/60 text-cream lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-lg font-bold">
                FISH, WINGS <span className="text-sun">&amp;</span> TINGS
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl font-extrabold tracking-tight text-cream transition-colors hover:text-sun"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/reservations"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full bg-spice px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream"
                >
                  Book a Table
                </Link>
              </motion.div>
            </nav>
            <p className="px-8 pb-8 text-xs uppercase tracking-[0.3em] text-clay">
              {RESTAURANT.address.line1} · {RESTAURANT.address.postcode}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
