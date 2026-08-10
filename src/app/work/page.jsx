import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Work from "../../components/Work";
import Testimonials from "../../components/Testimonials";
import Contact from "../../components/Contact";

export const metadata = {
  title: "Featured Client Projects & Web Portfolio | GrowOwl Studio",
  description:
    "Explore our portfolio of high-converting web design, custom full-stack React & Next.js applications, and digital marketing case studies.",
  keywords: [
    "web design portfolio India",
    "custom React web app case studies",
    "GrowOwl studio projects",
    "best web design portfolio",
  ],
  alternates: {
    canonical: "https://www.growowl.online/work",
  },
  openGraph: {
    title: "Featured Client Projects & Web Portfolio | GrowOwl Studio",
    description:
      "A selection of our most impactful work across web design, branding, and digital strategy.",
    url: "https://www.growowl.online/work",
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
          name: "Featured Work",
          item: "https://www.growowl.online/work",
        },
      ],
    },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Work sectionNumber="/001/" />
        <Testimonials sectionNumber="/002/" />
        <Contact sectionNumber="/003/" />
      </main>
      <Footer />
    </>
  );
}
