import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FAQ from "../../components/FAQ";
import Contact from "../../components/Contact";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | Web Development & SEO | GrowOwl",
  description:
    "Got questions about web development, UI/UX design, project timelines, pricing, or SEO marketing? Find answers to frequently asked questions.",
  keywords: [
    "web development faq",
    "website design questions",
    "seo retainer faq",
    "GrowOwl studio questions",
  ],
  alternates: {
    canonical: "https://www.growowl.online/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | Web Development & SEO | GrowOwl",
    description:
      "Answers to the questions people usually ask about our web development, web design, and SEO services.",
    url: "https://www.growowl.online/faq",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      url: "https://www.growowl.online/faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does a typical web development or design project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most web development and web design projects are completed within 2 to 8 weeks depending on complexity.",
          },
        },
        {
          "@type": "Question",
          name: "What makes GrowOwl different from other web design and digital marketing agencies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build 100% custom-engineered websites using React and Next.js rather than slow templates.",
          },
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
          name: "FAQ",
          item: "https://www.growowl.online/faq",
        },
      ],
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24">
        <FAQ sectionNumber="/001/" />
        <Contact sectionNumber="/002/" />
      </main>
      <Footer />
    </>
  );
}
