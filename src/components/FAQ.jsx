"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    q: "How long does a typical web development or design project take?",
    a: "Most projects are completed within 2 to 6 weeks depending on scope and complexity. High-converting landing pages take 1–2 weeks, custom business websites take 2–4 weeks, and complex full-stack web applications or e-commerce stores take 4–8 weeks. We provide a clear milestone timeline before kickoff.",
  },
  {
    q: "What makes GrowOwl different from other web design and digital marketing agencies?",
    a: "We build 100% custom-engineered websites using React and Next.js instead of sluggish WordPress templates or bloated page builders. Every website is engineered for sub-second load times, mobile-first responsiveness, technical SEO excellence, and direct access to senior developers.",
  },
  {
    q: "Do your web development services include SEO and Digital Marketing?",
    a: "Yes! Every website we develop includes foundational on-page SEO: structured HTML5 markup, schema JSON-LD, automated sitemaps, open-graph social previews, image compression, and Core Web Vitals optimization to rank on Google and AI search engines.",
  },
  {
    q: "Can you build custom full-stack web applications and e-commerce stores?",
    a: "Absolutely. We engineer full-stack React and Next.js applications paired with Node.js, Express, MongoDB, or PostgreSQL. Whether you need custom e-commerce checkouts, SaaS dashboards, booking portals, or internal business tools, we build scalable architectures.",
  },
  {
    q: "What is your payment structure and project milestone process?",
    a: "We operate with clear, transparent milestone pricing: typically a 50% upfront deposit to initiate discovery and design, and the remaining 50% upon final client sign-off, testing, and live deployment. Monthly SEO & marketing retainers are billed at the beginning of each cycle with no hidden lock-in contracts.",
  },
  {
    q: "How do we collaborate and communicate throughout the project?",
    a: "You get direct communication with your lead developer and designer via WhatsApp, Slack, email, and scheduled Google Meet calls. We provide live staging links at each sprint so you can test features and provide feedback in real time.",
  },
  {
    q: "Will I be able to update and manage the website content myself?",
    a: "Yes! We can integrate intuitive headless CMS platforms (like Sanity, Strapi, or tailored admin dashboards) so you or your team can effortlessly publish blogs, update copy, swap images, or manage products without writing a single line of code.",
  },
  {
    q: "Do you offer SEO marketing and PPC ad campaign management?",
    a: "Yes! Beyond web development, GrowOwl is a full-service digital growth partner. We run data-driven Google Ads (PPC), conversion rate optimization (CRO), search engine optimization (SEO), and social media lead funnels designed to deliver tangible ROI.",
  },
  {
    q: "What ongoing maintenance and support do you provide post-launch?",
    a: "Every project includes post-launch warranty and technical support to ensure smooth operation. We also offer ongoing monthly care plans for continuous security updates, speed optimization, regular backups, and content updates.",
  },
  {
    q: "How do I get started or request a customized proposal?",
    a: "Getting started is easy! Click 'Let's Talk' to submit your project requirements, email us, or send us a direct message on Instagram (@grow_owl_). We will review your goals and provide a transparent, detailed scope and quote within 24 hours.",
  },
];

export default function FAQ({ sectionNumber = "/008/" }) {
  const isFirst = sectionNumber === "/001/";
  const [activeIndex, setActiveIndex] = useState(null);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? -1 : i));

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={`${
        isFirst ? "pt-28 sm:pt-32 lg:pt-36 pb-14 lg:py-20" : "py-14 lg:py-20"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/80">
            FAQ
          </span>
        </div>

        <h2
          id="faq-heading"
          ref={titleRef}
          className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink max-w-[800px]"
        >
          Answers to the stuff people{" "}
          <em className="font-serif italic font-medium">usually</em> ask
        </h2>

        <div className="mt-14 flex flex-col">
          {faqs.map((f, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                className="border-t border-ink/10 last:border-b overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full py-6 cursor-pointer text-left gap-5 hover:pl-2 transition-all"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-[17px] font-medium leading-[1.4] tracking-[-0.01em]">
                    {f.q}
                  </h3>
                  <svg
                    className="shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4 10H16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 4V16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className={`transition-all duration-300 origin-center ${isOpen ? "scale-y-0 opacity-0" : ""}`}
                    />
                  </svg>
                </button>
                <div className={`accordion-body ${isOpen ? "open" : ""}`}>
                  <p className="pb-7 text-[15px] text-ink/80 leading-[1.75] max-w-[700px]">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
