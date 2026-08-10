import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Services from "../../../components/Services";
import Contact from "../../../components/Contact";
import FAQ from "../../../components/FAQ";

export const metadata = {
  title: "Custom Full Stack Web Development Agency | Next.js & React | GrowOwl",
  description:
    "High-speed custom full-stack web development agency specializing in Next.js, React, Node.js, and MongoDB. Sub-second load times & built-in SEO.",
  keywords: [
    "full stack web development agency",
    "custom React web development",
    "Nextjs developer agency India",
    "custom ecommerce website builder",
    "high speed web application agency",
    "Nodejs MongoDB developer",
  ],
  alternates: {
    canonical: "https://www.growowl.online/services/web-development",
  },
  openGraph: {
    title: "Custom Full Stack Web Development Agency | Next.js & React | GrowOwl",
    description:
      "Engineered full-stack React & Next.js web applications, e-commerce stores, custom databases, and sub-second performance.",
    url: "https://www.growowl.online/services/web-development",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Custom Full Stack Web Development",
      serviceType: "Web Development",
      provider: {
        "@type": "LocalBusiness",
        name: "GrowOwl Studio",
        url: "https://www.growowl.online",
      },
      areaServed: ["India", "Worldwide"],
      description:
        "Custom React, Next.js, and Node.js full-stack web development and database engineering.",
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
          name: "Web Development",
          item: "https://www.growowl.online/services/web-development",
        },
      ],
    },
  ],
};

export default function WebDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Services sectionNumber="/001/" />
        <FAQ sectionNumber="/002/" />
        <Contact sectionNumber="/003/" />
      </main>
      <Footer />
    </>
  );
}
