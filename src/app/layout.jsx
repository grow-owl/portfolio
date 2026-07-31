import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.growowl.online"),
  title: "GrowOwl | Web Design, Development & SEO Services Agency",
  description:
    "GrowOwl is a trusted freelance website builder, full stack developer, and SEO services agency. We design and build high-performance React websites, custom database backends, MERN stack apps, and search-optimized digital experiences that drive growth and rank high on search engines.",
  keywords: [
    "freelance website builder",
    "freelance full stack developer",
    "SEO services",
    "Search Engine Optimization",
    "SEO agency",
    "freelance SEO specialist",
    "full stack web developer",
    "hire freelance full stack developer",
    "freelance web developer",
    "freelance portfolio builder",
    "MERN stack developer",
    "Node.js developer",
    "custom website developer",
    "freelance web designer",
    "react website developer",
    "bespoke website builder India",
    "hire website developer",
    "database developer",
  ],
  authors: [{ name: "GrowOwl Studio", url: "https://www.growowl.online" }],
  creator: "GrowOwl",
  publisher: "GrowOwl",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.growowl.online/",
  },
  openGraph: {
    type: "website",
    url: "https://www.growowl.online/",
    title: "GrowOwl | Web Design, Development & SEO Services Agency",
    description:
      "Bespoke freelance website builder, full stack developer, and SEO services agency crafting top-tier digital experiences that rank high and deliver measurable business growth.",
    siteName: "GrowOwl",
    images: [
      {
        url: "https://www.growowl.online/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "GrowOwl | Web Design, Development & SEO Services Agency",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    url: "https://www.growowl.online/",
    title: "GrowOwl | Web Design, Development & SEO Services Agency",
    description:
      "Bespoke freelance website builder, full stack developer, and SEO services agency crafting top-tier digital experiences that rank high and deliver measurable business growth.",
    images: ["https://www.growowl.online/images/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
};

export const viewport = {
  themeColor: "#ebe8e4",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GrowOwl",
  image: "https://www.growowl.online/images/hero.webp",
  "@id": "https://www.growowl.online/#service",
  url: "https://www.growowl.online",
  telephone: "+918609504186",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.5726,
    longitude: 88.3639,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: ["https://www.instagram.com/growowl_"],
  description:
    "Custom freelance website builder, full stack developer, and SEO services agency designing bold web apps, backend databases, search-optimized campaigns, and digital strategies.",
  knowsAbout: [
    "SEO Services",
    "Search Engine Optimization",
    "Freelance Website Builder",
    "Full Stack Development",
    "MERN Stack Developer",
    "Node.js & MongoDB",
    "Web Development",
    "UI/UX Design",
    "React Development",
    "SEO Optimization",
    "E-commerce Website Building",
    "Custom Portfolios",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "GrowOwl Core Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Design & UI/UX Design",
          description:
            "Bespoke user interface and user experience design for modern web applications.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Stack Web Development",
          description:
            "Custom React, Next.js, and Node.js full stack web application development.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Services & Search Engine Optimization",
          description:
            "On-page, technical, and structural SEO services to boost search engine rankings.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Strategy & Branding",
          description:
            "Comprehensive digital growth strategies and brand identity development.",
        },
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
