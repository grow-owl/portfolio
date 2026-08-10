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
  title: "GrowOwl | Web Development, Web Design & SEO Agency",
  description:
    "GrowOwl is a premier web development, web design & SEO agency. We engineer custom Next.js websites & digital marketing campaigns that drive revenue.",
  keywords: [
    "web development agency",
    "web design company",
    "web design agency",
    "digital marketing agency",
    "seo marketing services",
    "seo agency",
    "search engine optimization agency",
    "local seo services",
    "full stack web development",
    "react nextjs developer agency",
    "ecommerce website builder",
    "custom web application agency",
    "lead generation agency",
    "ui ux design studio",
    "pay per click ppc management",
    "conversion rate optimization cro",
    "best web design studio India",
    "freelance website builder",
    "freelance full stack developer",
    "freelance seo specialist",
    "MERN stack web developer",
    "custom website builder India",
    "high speed website developer",
    "growth marketing agency",
  ],
  authors: [{ name: "GrowOwl Studio", url: "https://www.growowl.online" }],
  creator: "GrowOwl Studio",
  publisher: "GrowOwl Studio",
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
    title: "GrowOwl | Web Development, Web Design & SEO Agency",
    description:
      "GrowOwl is a premier web development, web design & SEO agency. We engineer custom Next.js websites & digital marketing campaigns that drive revenue.",
    siteName: "GrowOwl Studio",
    images: [
      {
        url: "https://www.growowl.online/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "GrowOwl | Web Development, Web Design & SEO Agency",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    url: "https://www.growowl.online/",
    title: "GrowOwl | Web Development, Web Design & SEO Agency",
    description:
      "GrowOwl is a premier web development, web design & SEO agency. We engineer custom Next.js websites & digital marketing campaigns that drive revenue.",
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
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon-48x48.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#ebe8e4",
  width: "device-width",
  initialScale: 1,
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Organization", "ProfessionalService"],
      "@id": "https://www.growowl.online/#organization",
      name: "GrowOwl Studio",
      alternateName: ["GrowOwl Digital Agency", "GrowOwl"],
      url: "https://www.growowl.online",
      logo: "https://www.growowl.online/favicon-48x48.png",
      image: "https://www.growowl.online/images/hero.webp",
      telephone: "+918609504186",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Remote / Online",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.5726,
        longitude: 88.3639,
      },
      areaServed: [
        "Worldwide",
        "India",
        "Kolkata",
        "Siliguri",
        "Lucknow",
        "Delhi NCR",
        "Mumbai",
        "Bengaluru",
      ],
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
        "GrowOwl is a premier web development, web design, and SEO digital marketing agency. We build custom full-stack React & Next.js web applications, e-commerce stores, custom databases, and search-optimized lead generation funnels.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "15",
        bestRating: "5",
        worstRating: "1",
      },
      knowsAbout: [
        "Web Development Agency",
        "Web Design & UI/UX Studio",
        "SEO Services & Search Engine Optimization",
        "Digital Marketing Agency",
        "Local SEO & Lead Generation",
        "Full Stack Development (React, Next.js, Node.js)",
        "E-Commerce Website Development",
        "Conversion Rate Optimization (CRO)",
        "Pay Per Click (PPC) Management",
        "Brand Identity & Strategy",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "GrowOwl Core Digital & Web Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Web Development & Web Apps",
              description:
                "Custom React, Next.js, and Node.js full-stack web development and database engineering.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bespoke Web Design & UI/UX Studio",
              description:
                "Editorial and modern user interface and user experience design for web and mobile.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Search Engine Optimization (SEO) & GEO",
              description:
                "Technical, on-page, and local SEO services to dominate Google rankings and AI search engines.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Marketing & Performance Ads",
              description:
                "Data-driven lead generation campaigns, PPC paid ads, and brand growth strategies.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.growowl.online/#website",
      url: "https://www.growowl.online",
      name: "GrowOwl",
      publisher: {
        "@id": "https://www.growowl.online/#organization",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.growowl.online/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does a typical web development or design project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most web development and web design projects are completed within 2 to 8 weeks depending on complexity. Landing pages take 1-2 weeks, custom business websites take 2-3 weeks, and complex full-stack web applications take 4-8 weeks.",
          },
        },
        {
          "@type": "Question",
          name: "What makes GrowOwl different from other web design and digital marketing agencies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build 100% custom-engineered websites using React and Next.js rather than slow templates or bloated page builders. Every site comes with built-in technical SEO, sub-second load times, and direct access to senior developers and designers.",
          },
        },
        {
          "@type": "Question",
          name: "Do your web development services include SEO and Digital Marketing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! All our web development and web design projects include foundational technical SEO, clean HTML5 structure, schema JSON-LD data, fast page speeds, and sitemap indexing to ensure your business ranks high on Google, Bing, and AI search engines.",
          },
        },
        {
          "@type": "Question",
          name: "Can you build custom full-stack web applications and e-commerce stores?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We engineer custom React and Next.js frontends paired with Node.js, Express, and MongoDB backends, as well as bespoke e-commerce solutions, booking portals, and interactive web tools.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body
        className="font-sans antialiased bg-cream text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
