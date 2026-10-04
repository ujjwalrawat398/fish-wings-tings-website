import Link from "next/link";
import { Flame, Phone, Mail } from "lucide-react";
import { RESTAURANT } from "@/lib/data";
import Marquee from "./Marquee";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink">
      <Marquee
        variant="ghost"
        items={[
          "See you in the Village",
          "Jerk Chicken Fridays",
          "Rum Punch O'Clock",
          "Every. Single. Day.",
        ]}
        fast
      />

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sun text-ink">
                <Flame className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-bold leading-none tracking-tight">
                FISH, WINGS
                <span className="block text-[11px] font-medium tracking-[0.35em] text-sand">
                  &amp; TINGS
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand">
              The highest standard seasonal Caribbean food, locally sourced —
              taking regional and street food and turning it into a trendy and
              delightful selection of nouvelle Caribbean fare, in the heart of
              Brixton.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={RESTAURANT.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-sand transition-all hover:border-spice hover:bg-spice hover:text-cream"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/fishwingsandtings"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-sand transition-all hover:border-spice hover:bg-spice hover:text-cream"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-clay">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/#story" className="text-sand transition-colors hover:text-sun">Our Story</Link></li>
              <li><Link href="/menu" className="text-sand transition-colors hover:text-sun">Menu</Link></li>
              <li><Link href="/#signatures" className="text-sand transition-colors hover:text-sun">Signature Dishes</Link></li>
              <li><Link href="/#gallery" className="text-sand transition-colors hover:text-sun">Gallery</Link></li>
              <li><Link href="/reservations" className="text-sand transition-colors hover:text-sun">Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-clay">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-sand">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-spice" />
                <a href={RESTAURANT.phoneHref} className="transition-colors hover:text-sun">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-spice" />
                <a href={`mailto:${RESTAURANT.email}`} className="transition-colors hover:text-sun">
                  {RESTAURANT.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {RESTAURANT.address.line1},<br />
                {RESTAURANT.address.line2},<br />
                {RESTAURANT.address.city} {RESTAURANT.address.postcode}
              </li>
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-16 overflow-hidden border-t border-line pt-10">
          <p className="text-stroke-faint select-none whitespace-nowrap text-center font-display text-[11.5vw] font-extrabold leading-none tracking-tight">
            BRIXTON VILLAGE
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[11px] uppercase tracking-[0.25em] text-clay md:flex-row">
          <p>© {new Date().getFullYear()} Fish, Wings &amp; Tings. All rights reserved.</p>
          <p>Made with rum &amp; love in Brixton.</p>
        </div>
      </div>
    </footer>
  );
}
