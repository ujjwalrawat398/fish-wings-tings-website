import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Signatures from "@/components/Signatures";
import MenuPreview from "@/components/MenuPreview";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import { RESTAURANT } from "@/lib/data";

function VideoBand() {
  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://videos.pexels.com/video-files/14456616/14456616-uhd_3840_2160_24fps.mp4"
        poster="/images/interior.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-ink/65" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="font-accent text-2xl italic leading-snug text-cream md:text-4xl">
          &ldquo;A reggae-heavy soundtrack that is second to none —
          <span className="text-sun"> you can&rsquo;t beat it for atmosphere.&rdquo;</span>
        </p>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.35em] text-sand">
          Time Out London
        </p>
        <a
          href={RESTAURANT.phoneHref}
          className="mt-10 rounded-full border border-cream/30 px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-cream backdrop-blur-sm transition-all duration-300 hover:border-sun hover:text-sun"
        >
          Or call {RESTAURANT.phone}
        </a>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Story />
      <Signatures />
      <VideoBand />
      <MenuPreview />
      <Gallery />
      <Reviews />
      <Visit />
      <Footer />
    </main>
  );
}
