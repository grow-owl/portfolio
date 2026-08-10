import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Pricing from "../../../components/Pricing";
import Contact from "../../../components/Contact";
import FAQ from "../../../components/FAQ";

export const metadata = {
  title: "Technical SEO & Search Marketing Agency Services | GrowOwl",
  description:
    "Data-driven technical SEO, on-page optimization, Schema JSON-LD data, and Local SEO services to rank #1 on Google and AI search engines.",
  keywords: [
    "seo services agency India",
    "technical seo optimization",
    "on page seo specialist",
    "local seo google business profile",
    "search engine optimization agency",
  ],
  alternates: {
    canonical: "https://www.growowl.online/services/seo-services",
  },
  openGraph: {
    title: "Technical SEO & Search Marketing Agency Services | GrowOwl",
    description:
      "Data-driven technical SEO, on-page optimization, Schema JSON-LD data, and Local SEO services to rank #1 on Google.",
    url: "https://www.growowl.online/services/seo-services",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Search Engine Optimization (SEO) & Search Marketing",
      serviceType: "SEO Services",
      provider: {
        "@type": "LocalBusiness",
        name: "GrowOwl Studio",
        url: "https://www.growowl.online",
      },
      areaServed: ["India", "Worldwide"],
      description:
        "Technical, on-page, and local SEO services to dominate Google rankings and AI search engines.",
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
          name: "Services",
          item: "https://www.growowl.online/#services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "SEO Services",
          item: "https://www.growowl.online/services/seo-services",
        },
      ],
    },
  ],
};

export default function SeoServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
