import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import About from "../../components/About";
import Process from "../../components/Process";
import Testimonials from "../../components/Testimonials";
import Contact from "../../components/Contact";

export const metadata = {
  title: "About GrowOwl Studio | Freelance Web Developers & Designers",
  description:
    "Learn about GrowOwl Studio — a dedicated freelance website builder and custom full-stack developer collective crafting high-converting sites.",
  keywords: [
    "about GrowOwl studio",
    "freelance web development collective",
    "custom website builder India",
    "full stack developer team",
  ],
  alternates: {
    canonical: "https://www.growowl.online/about",
  },
  openGraph: {
    title: "About GrowOwl Studio | Freelance Web Developers & Designers",
    description:
      "A collective of strategic freelance designers and full stack developers who believe great digital work should be felt, not just seen.",
    url: "https://www.growowl.online/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
          name: "About Us",
          item: "https://www.growowl.online/about",
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <About />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
