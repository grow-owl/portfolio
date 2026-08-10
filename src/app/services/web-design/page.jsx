import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Services from "../../../components/Services";
import Contact from "../../../components/Contact";
import Testimonials from "../../../components/Testimonials";

export const metadata = {
  title: "Bespoke Web Design & UI/UX Studio | Figma & Modern Minimal | GrowOwl",
  description:
    "Bespoke web design & UI/UX studio crafting intuitive interfaces, visual brand identities, and high-converting responsive web designs.",
  keywords: [
    "web design agency India",
    "ui ux design studio",
    "custom web designer freelance",
    "figma wireframing prototyping",
    "modern responsive web design",
  ],
  alternates: {
    canonical: "https://www.growowl.online/services/web-design",
  },
  openGraph: {
    title: "Bespoke Web Design & UI/UX Studio | Figma & Modern Minimal | GrowOwl",
    description:
      "Bespoke web design & UI/UX studio crafting intuitive interfaces, visual brand identities, and high-converting responsive web designs.",
    url: "https://www.growowl.online/services/web-design",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Bespoke Web Design & UI/UX Studio",
      serviceType: "Web Design",
      provider: {
        "@type": "LocalBusiness",
        name: "GrowOwl Studio",
        url: "https://www.growowl.online",
      },
      areaServed: ["India", "Worldwide"],
      description:
        "Editorial and modern user interface and user experience design for web and mobile.",
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
          name: "Web Design",
          item: "https://www.growowl.online/services/web-design",
        },
      ],
    },
  ],
};

export default function WebDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Services sectionNumber="/001/" />
        <Testimonials sectionNumber="/002/" />
        <Contact sectionNumber="/003/" />
      </main>
      <Footer />
    </>
  );
}
