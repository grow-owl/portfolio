"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const services = [
  {
    number: "/001/",
    name: "Full Stack Web Development",
    desc: "We engineer robust, custom web applications as a full-stack web development agency. From high-speed static sites to complex React and Node.js applications, custom backend databases, and e-commerce platforms, every line of code is built for peak performance and top search engine rankings.",
    items: [
      "Full Stack React & Next.js Apps",
      "Node.js & MongoDB Backend Engineering",
      "Custom E-Commerce Website Development",
      "Database Design & REST APIs",
      "Technical Core Web Vitals Optimization",
    ],
  },
  {
    number: "/002/",
    name: "Bespoke Web Design & UI/UX Studio",
    desc: "As a dedicated web design agency, we craft intuitive user interfaces, visual brand identities, and interactive prototypes that captivate visitors. From site wireframing to responsive design systems, we build digital experiences engineered for maximum user conversion.",
    items: [
      "Web & Mobile UI/UX Design",
      "Brand Identity & Visual Systems",
      "Figma Wireframing & Prototyping",
      "Responsive Interactive Design",
      "Design Systems & Component Libraries",
    ],
  },
  {
    number: "/003/",
    name: "SEO Services & Search Marketing",
    desc: "Our SEO marketing agency services ensure your brand dominates search results across Google, Bing, and AI search engines (ChatGPT, Perplexity, Gemini). We implement Schema JSON-LD data, keyword planning, and technical audits to rank you at the top.",
    items: [
      "Technical & On-Page SEO",
      "Schema JSON-LD Structured Data",
      "Keyword Strategy & Intent Planning",
      "Local SEO & Google Business Profile",
      "Competitor Rank Tracking & Audits",
    ],
  },
  {
    number: "/004/",
    name: "Digital Marketing & Performance Ads",
    desc: "We amplify your business growth through targeted digital marketing campaigns, pay-per-click (PPC) ad management, conversion rate optimization (CRO), and lead generation funnels designed to turn clicks into profitable customers.",
    items: [
      "Digital Lead Generation Campaigns",
      "Pay-Per-Click (PPC) & Google Ads",
      "Conversion Rate Optimization (CRO)",
      "Social Media Performance Marketing",
      "Funnel & Analytics Tracking",
    ],
  },
];

export default function Services({ sectionNumber = "/004/" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? -1 : i));

  return (
    <section id="services" aria-labelledby="services-heading" className="py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/80">
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
                    <p className="text-base text-ink/80 leading-[1.75] mb-6 max-w-[600px]">
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
                      aria-label={`Get started with ${s.name} service`}
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 bg-transparent text-ink border-[1.5px] border-ink/20 rounded-full hover:border-accent hover:text-accent transition-all min-h-[44px]"
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
