import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Get in Touch | Contact GrowOwl Studio Web Agency",
  description:
    "Have a website project in mind or need business profile listings on Google, Apple Maps, Bing, Swiggy or Zomato? Contact GrowOwl Studio for packages starting at ₹2,000.",
  keywords: [
    "contact GrowOwl studio",
    "website design packages India",
    "Google Business Profile setup ₹2000",
    "Swiggy Zomato listing setup",
    "hire React Nextjs developer",
    "affordable web agency India",
  ],
  alternates: {
    canonical: "https://www.growowl.online/contact",
  },
  openGraph: {
    title: "Get in Touch | Contact GrowOwl Studio Web Agency",
    description:
      "Looking for high-converting websites (₹6,000 - ₹60,000) or business listings across Google, Apple, Swiggy & Zomato (@ ₹2,000 each)? Contact us today.",
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
      <main>
        <Contact sectionNumber="/001/" />
        <FAQ sectionNumber="/002/" />
      </main>
      <Footer />
    </>
  );
}
