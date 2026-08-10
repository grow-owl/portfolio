import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Pricing from "../../components/Pricing";
import Contact from "../../components/Contact";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Transparent Website & SEO Pricing Plans | GrowOwl Studio",
  description:
    "Explore transparent website development pricing and flexible monthly SEO packages. No hidden fees, no long-term lock-in. Get a custom quote.",
  keywords: [
    "website development cost India",
    "web design package pricing",
    "monthly SEO retainer price",
    "affordable website builder plans",
    "Nextjs web development cost",
  ],
  alternates: {
    canonical: "https://www.growowl.online/pricing",
  },
  openGraph: {
    title: "Transparent Website & SEO Pricing Plans | GrowOwl Studio",
    description:
      "One-time pricing for website builds, flexible monthly plans for ongoing SEO — no hidden fees.",
    url: "https://www.growowl.online/pricing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OfferCatalog",
      name: "GrowOwl Web & SEO Service Packages",
      url: "https://www.growowl.online/pricing",
      provider: {
        "@type": "LocalBusiness",
        name: "GrowOwl Studio",
        url: "https://www.growowl.online",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.growowl.online",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pricing",
          item: "https://www.growowl.online/pricing",
        },
      ],
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Pricing sectionNumber="/001/" />
        <FAQ sectionNumber="/002/" />
        <Contact sectionNumber="/003/" />
      </main>
      <Footer />
    </>
  );
}
