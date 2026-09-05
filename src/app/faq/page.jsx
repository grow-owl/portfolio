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
            text: "Most projects are completed within 2 to 6 weeks depending on scope and complexity. High-converting landing pages take 1–2 weeks, custom business websites take 2–4 weeks, and complex full-stack web applications or e-commerce stores take 4–8 weeks. We provide a clear milestone timeline before kickoff.",
          },
        },
        {
          "@type": "Question",
          name: "What makes GrowOwl different from other web design and digital marketing agencies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build 100% custom-engineered websites using React and Next.js instead of sluggish WordPress templates or bloated page builders. Every website is engineered for sub-second load times, mobile-first responsiveness, technical SEO excellence, and direct access to senior developers.",
          },
        },
        {
          "@type": "Question",
          name: "Do your web development services include SEO and Digital Marketing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Every website we develop includes foundational on-page SEO: structured HTML5 markup, schema JSON-LD, automated sitemaps, open-graph social previews, image compression, and Core Web Vitals optimization to rank on Google and AI search engines.",
          },
        },
        {
          "@type": "Question",
          name: "Can you build custom full-stack web applications and e-commerce stores?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We engineer full-stack React and Next.js applications paired with Node.js, Express, MongoDB, or PostgreSQL. Whether you need custom e-commerce checkouts, SaaS dashboards, booking portals, or internal business tools, we build scalable architectures.",
          },
        },
        {
          "@type": "Question",
          name: "What is your payment structure and project milestone process?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We operate with clear, transparent milestone pricing: typically a 50% upfront deposit to initiate discovery and design, and the remaining 50% upon final client sign-off, testing, and live deployment. Monthly SEO & marketing retainers are billed at the beginning of each cycle with no hidden lock-in contracts.",
          },
        },
        {
          "@type": "Question",
          name: "How do we collaborate and communicate throughout the project?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You get direct communication with your lead developer and designer via WhatsApp, Slack, email, and scheduled Google Meet calls. We provide live staging links at each sprint so you can test features and provide feedback in real time.",
          },
        },
        {
          "@type": "Question",
          name: "Will I be able to update and manage the website content myself?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We can integrate intuitive headless CMS platforms (like Sanity, Strapi, or tailored admin dashboards) so you or your team can effortlessly publish blogs, update copy, swap images, or manage products without writing a single line of code.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer SEO marketing and PPC ad campaign management?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Beyond web development, GrowOwl is a full-service digital growth partner. We run data-driven Google Ads (PPC), conversion rate optimization (CRO), search engine optimization (SEO), and social media lead funnels designed to deliver tangible ROI.",
          },
        },
        {
          "@type": "Question",
          name: "What ongoing maintenance and support do you provide post-launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every project includes post-launch warranty and technical support to ensure smooth operation. We also offer ongoing monthly care plans for continuous security updates, speed optimization, regular backups, and content updates.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get started or request a customized proposal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Getting started is easy! Click 'Let's Talk' to submit your project requirements, email us, or send us a direct message on Instagram (@grow_owl_). We will review your goals and provide a transparent, detailed scope and quote within 24 hours.",
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
      <main>
        <FAQ sectionNumber="/001/" />
        <Contact sectionNumber="/002/" />
      </main>
      <Footer />
    </>
  );
}
