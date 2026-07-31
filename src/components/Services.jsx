"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const services = [
  {
    number: "/001/",
    name: "Freelance Full Stack Development",
    desc: "We engineer robust, custom web solutions as a trusted freelance full stack website builder. From blazing-fast static sites to complex full-stack React and Node.js applications, every line of code is written for speed, search engines, and maintainability.",
    items: [
      "Full Stack Website Building",
      "React & Node.js Applications",
      "Database & Custom APIs",
      "E-commerce Website Development",
      "Technical SEO Optimization",
    ],
  },
  {
    number: "/002/",
    name: "Design & Branding",
    desc: "We create polished website designs, user interfaces, and visual identities that leave a lasting impression. From site wireframes to pixel-perfect UI, we build custom stories.",
    items: [
      "Web & UI/UX Design",
      "Brand Identity Systems",
      "Interactive Prototyping",
      "Motion & Interaction Design",
      "Design Systems",
    ],
  },
  {
    number: "/003/",
    name: "Digital Strategy",
    desc: "We don't just build - we strategize. We analyze search intent, plan content, optimize user pathways, and build a cohesive digital blueprint aligned with your target growth.",
    items: [
      "SEO Content Strategy",
      "User Journey Mapping",
      "Conversion Optimization (CRO)",
      "Keyword & Competitor Audits",
      "Growth Roadmap Planning",
    ],
  },
  {
    number: "/004/",
    name: "SEO & Growth Marketing",
    desc: "We amplify your visibility with data-driven search engine optimization (SEO) and marketing. We help you rank at the top of search results for high-value terms like freelance website builder.",
    items: [
      "Search Engine Optimization (SEO)",
      "Keyword Planning & Targeting",
      "Paid Search (PPC) Campaigns",
      "Analytics & Crawl Reports",
      "Competitor Rank Tracking",
    ],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? -1 : i));

  return (
    <section id="services" aria-labelledby="services-heading" className="py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            /004/
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/60">
            Services
          </span>
        </div>

        <h2
          id="services-heading"
          ref={titleRef}
          className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink max-w-[800px]"
        >
          A quick look at what we{" "}
          <em className="font-serif italic font-medium">do best</em>
        </h2>

        <div className="mt-14 flex flex-col">
          {services.map((s, i) => {
            const isOpen = activeIndex === i;
            return (
              <div key={i} className="border-t border-ink/10 last:border-b">
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full py-7 cursor-pointer hover:pl-2 transition-all"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5">
                    <span className="font-serif italic text-xl text-accent min-w-10">
                      {s.number}
                    </span>
                    <h3 className="text-[clamp(22px,2.5vw,32px)] font-semibold tracking-[-0.03em] text-left">
                      {s.name}
                    </h3>
                  </div>
                  <div className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/20 shrink-0 hover:border-ink transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                  </div>
                </button>

                <div className={`accordion-body ${isOpen ? "open" : ""}`}>
                  <div className="pb-8 pl-0 md:pl-[60px]">
                    <p className="text-base text-ink/60 leading-[1.75] mb-6 max-w-[600px]">
                      {s.desc}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 gap-x-10 mb-7">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-ink font-medium pl-4 relative before:absolute before:left-0 before:top-2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-accent"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 bg-transparent text-ink border-[1.5px] border-ink/20 rounded-full hover:border-accent hover:text-accent transition-all"
                    >
                      Get Started →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
