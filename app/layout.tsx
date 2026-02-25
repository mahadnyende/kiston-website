import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kiston Highway Restaurant | Best Roadside Food Stop & Authentic African Cuisine, Magamaga",
  description: "Experience the rich, authentic flavors of Africa at Kiston Highway Restaurant. The best stopover on Jinja–Busia Highway in Magamaga. Fresh beef pilau, tilapia, clean washrooms, and secure parking.",
  keywords: [
    "restaurant along Jinja–Busia Highway",
    "highway restaurant in Magamaga",
    "best restaurant on Jinja–Busia Road",
    "roadside restaurant Jinja–Busia Highway",
    "stopover restaurant Jinja–Busia Highway",
    "travelers restaurant Jinja–Busia Road",
    "food stop Jinja–Busia Highway",
    "restaurant in Magamaga",
    "bus stop restaurant Jinja–Busia",
    "local dishes Jinja–Busia Highway",
    "beef pilau Magamaga",
    "tilapia restaurant Jinja–Busia Highway"
  ].join(", "),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Kiston Highway Restaurant",
    "image": "https://kiston.site/images/authentic-cuisine.webp",
    "@id": "https://kiston.site",
    "url": "https://kiston.site",
    "telephone": "+256700102281",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Magamaga, Along Jinja-Busia Highway",
      "addressLocality": "Magamaga",
      "addressRegion": "Jinja outskirts",
      "addressCountry": "UG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 0.523296,
      "longitude": 33.365280
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "menu": "https://kiston.site/menu",
    "servesCuisine": ["African", "Ugandan", "Continental"],
    "priceRange": "$$"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
