import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Process from "../../components/Process";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import Contact from "../../components/Contact";

export const metadata = {
  title: "Our Web Design & Development Process | GrowOwl Studio",
  description:
    "Discover GrowOwl Studio's proven 3-step web development and design process: from discovery & strategy to custom build and post-launch growth.",
  keywords: [
    "web development process",
    "web design workflow",
    "custom software development steps",
    "GrowOwl studio process",
  ],
  alternates: {
    canonical: "https://www.growowl.online/process",
  },
  openGraph: {
    title: "Our Web Design & Development Process | GrowOwl Studio",
    description:
      "How we guide every project to the finish line: strategic discovery, bespoke design & build, and continuous post-launch optimization.",
    url: "https://www.growowl.online/process",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "GrowOwl Web Development & Design Process",
      description: "Our 3-step framework for delivering high-impact websites and software.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Discovery & Strategy",
          text: "We uncover your business goals, audience, and market through deep research, mapping out a data-backed digital roadmap before writing code.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Design & Build",
          text: "We bring your brand to life with pixel-perfect UI/UX design, custom full-stack React and Node.js development, and a polished deployment.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Growth",
          text: "We continuously optimize performance post-launch by tracking search metrics, refining conversion pathways, and scaling your digital presence.",
        },
      ],
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
          name: "Process",
          item: "https://www.growowl.online/process",
        },
      ],
    },
  ],
};

export default function ProcessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <Process sectionNumber="/001/" />
        <Testimonials sectionNumber="/002/" />
        <FAQ sectionNumber="/003/" />
        <Contact sectionNumber="/004/" />
      </main>
      <Footer />
    </>
  );
}
