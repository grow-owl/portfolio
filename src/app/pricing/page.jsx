import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Pricing from "../../components/Pricing";
import Contact from "../../components/Contact";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Website, Listing & SEO Pricing Plans | GrowOwl Studio",
  description:
    "Transparent pricing for website builds (₹6k to ₹60k), Google, Apple, Bing, Swiggy, Zomato & Social listings (@ ₹2,000), and monthly SEO plans.",
  keywords: [
    "website development cost India",
    "web design package pricing",
    "google business profile optimization cost",
    "zomato swiggy listing service price",
    "monthly SEO retainer price",
    "affordable website builder plans",
  ],
  alternates: {
    canonical: "https://www.growowl.online/pricing",
  },
  openGraph: {
    title: "Website, Listing & SEO Pricing Plans | GrowOwl Studio",
    description:
      "Transparent pricing for website development, business profile listings (@ ₹2,000), and flexible monthly SEO plans.",
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
      <main>
        <Pricing sectionNumber="/001/" />
        <FAQ sectionNumber="/002/" />
        <Contact sectionNumber="/003/" />
      </main>
      <Footer />
    </>
  );
}
