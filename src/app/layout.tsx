import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Archivo,
  Fraunces,
} from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const accent = Fraunces({
  subsets: ["latin"],
  variable: "--font-accent",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Fish, Wings & Tings — Caribbean Soul Food, Brixton Village",
    template: "%s — Fish, Wings & Tings",
  },
  description:
    "Nouvelle Caribbean fare in the heart of Brixton Village. Reggae wings, jerk chicken, cod fritters and that famous rum punch — Unit 3, Granville Arcade, Coldharbour Lane, London SW9 8PR.",
  keywords: [
    "Caribbean restaurant London",
    "Brixton Village",
    "jerk chicken Brixton",
    "Fish Wings and Tings",
    "Granville Arcade",
    "rum punch",
    "Trinidadian food",
  ],
  openGraph: {
    title: "Fish, Wings & Tings — Caribbean Soul Food, Brixton Village",
    description:
      "Reggae wings, jerk chicken, cod fritters and that famous rum punch. Unit 3, Granville Arcade, Brixton Village.",
    type: "website",
    locale: "en_GB",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Fish, Wings & Tings",
  servesCuisine: "Caribbean",
  priceRange: "££",
  telephone: "+44 20 7737 4888",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 3, Granville Arcade, Brixton Village, Coldharbour Lane",
    addressLocality: "London",
    postalCode: "SW9 8PR",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 51.4624931, longitude: -0.1118135 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "12:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "22:30",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${accent.variable}`}>
      <body className="bg-ink text-cream antialiased grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
