import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Get in Touch | Contact GrowOwl Studio Web Agency",
  description:
    "Have a web development, web design, or SEO project in mind? Contact GrowOwl Studio for a free project consultation and quote.",
  keywords: [
    "contact GrowOwl studio",
    "web development consultation",
    "hire React Nextjs developer",
    "web design project quote",
  ],
  alternates: {
    canonical: "https://www.growowl.online/contact",
  },
  openGraph: {
    title: "Get in Touch | Contact GrowOwl Studio Web Agency",
    description:
      "Have a project in mind? We'd love to hear about it. Drop us a line and we'll get back to you within half an hour.",
    url: "https://www.growowl.online/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      url: "https://www.growowl.online/contact",
      mainEntity: {
        "@type": "LocalBusiness",
        name: "GrowOwl Studio",
        telephone: "+918609504186",
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
          name: "Contact",
          item: "https://www.growowl.online/contact",
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
