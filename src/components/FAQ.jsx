"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    q: "How long does a typical web development or design project take?",
    a: "Most web development and web design projects are completed within 2 to 8 weeks depending on scope and complexity. Landing pages take 1-2 weeks, custom business websites take 2-3 weeks, and complex full-stack web applications take 4-8 weeks. We provide a clear timeline before starting.",
  },
  {
    q: "What makes GrowOwl different from other web design and digital marketing agencies?",
    a: "We build 100% custom-engineered websites using React and Next.js rather than slow templates or bloated page builders. Every site comes with built-in technical SEO, sub-second load times, and direct access to senior developers and designers.",
  },
  {
    q: "Do your web development services include SEO and Digital Marketing?",
    a: "Yes! All our web development and web design projects include foundational technical SEO, clean HTML5 structure, schema JSON-LD data, fast page speeds, and sitemap indexing to ensure your business ranks high on Google, Bing, and AI search engines.",
  },
  {
    q: "Can you build custom full-stack web applications and e-commerce stores?",
    a: "Absolutely. We engineer custom React and Next.js frontends paired with Node.js, Express, and MongoDB backends, as well as bespoke e-commerce solutions, booking portals, and interactive web tools.",
  },
  {
    q: "Do you offer SEO marketing and PPC ad campaign management?",
    a: "Yes! As a full-service digital marketing agency, we handle search engine optimization (SEO), Google Ads (PPC), conversion rate optimization (CRO), and local SEO to generate high-quality leads for your business.",
  },
  {
    q: "What ongoing maintenance and support do you provide post-launch?",
    a: "All web projects come with post-launch technical support. We also provide monthly retainers for continuous performance optimization, security updates, content revisions, and SEO rank tracking.",
  },
];

export default function FAQ({ sectionNumber = "/008/" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? -1 : i));

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/60">
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
                  <p className="pb-7 text-[15px] text-ink/60 leading-[1.75] max-w-[700px]">
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
