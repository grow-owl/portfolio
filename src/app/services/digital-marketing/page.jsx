import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Services from "../../../components/Services";
import Contact from "../../../components/Contact";
import Testimonials from "../../../components/Testimonials";

export const metadata = {
  title: "Digital Marketing & Performance Ads Agency | PPC & Lead Gen | GrowOwl",
  description:
    "Data-driven digital marketing agency specializing in lead generation, PPC Google Ads management, conversion rate optimization (CRO), and growth funnels.",
  keywords: [
    "digital marketing agency India",
    "pay per click ppc management",
    "lead generation campaigns",
    "conversion rate optimization cro",
    "performance marketing agency",
  ],
  alternates: {
    canonical: "https://www.growowl.online/services/digital-marketing",
  },
  openGraph: {
    title: "Digital Marketing & Performance Ads Agency | PPC & Lead Gen | GrowOwl",
    description:
      "Data-driven digital marketing agency specializing in lead generation, PPC Google Ads management, conversion rate optimization (CRO), and growth funnels.",
    url: "https://www.growowl.online/services/digital-marketing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Digital Marketing & Performance Ads",
      serviceType: "Digital Marketing",
      provider: {
        "@type": "LocalBusiness",
        name: "GrowOwl Studio",
        url: "https://www.growowl.online",
      },
      areaServed: ["India", "Worldwide"],
      description:
        "Data-driven lead generation campaigns, PPC paid ads, and brand growth strategies.",
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
          name: "Digital Marketing",
          item: "https://www.growowl.online/services/digital-marketing",
        },
      ],
    },
  ],
};

export default function DigitalMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
