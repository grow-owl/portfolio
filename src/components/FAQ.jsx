"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    q: "How long does a typical project take from start to finish?",
    a: "Most projects are completed within 2-8 weeks, depending on scope and complexity. Simple landing pages take about 1-2 weeks, standard multi-page websites take 2-3 weeks, and complex custom web apps take 4-8 weeks. We'll provide a detailed timeline during our discovery call.",
  },
  {
    q: "What makes you different from other freelance website builders?",
    a: "We combine agency-grade design excellence and technical expertise with the personalized attention, speed, and flexibility of a dedicated freelance website builder collective. You work directly with our senior builders, not junior account managers. Plus, every project we build is search-engine-optimized from scratch.",
  },
  {
    q: "Do you offer ongoing support after the project launches?",
    a: "Absolutely! All website packages include post-launch support. We also offer monthly retainer options for ongoing maintenance, updates, and conversion optimization. We're committed to your long-term ranking and business growth.",
  },
  {
    q: "What if I only need one specific service, not the full package?",
    a: "Of course! While our packages offer the best value, we're happy to customize scope based on your specific needs. Whether you need a design refresh, an SEO audit, or custom React coding - let's talk and we'll craft a tailored solution.",
  },
  {
    q: "How does a freelance website builder optimize my site for search engines?",
    a: "We integrate comprehensive on-page and technical SEO in every website we build. This includes clean HTML5 markup, fast page speeds, custom Schema JSON-LD structured data, XML sitemaps, and optimized copywriting targeting your core terms (like freelance website builder or custom web developer) to ensure you rank high on Google and Bing.",
  },
  {
    q: "Can a freelance full stack developer build custom React and Node.js applications?",
    a: "Yes! As freelance full stack website builders, we write custom React frontends coupled with robust Node.js, Express, and MongoDB backends. We build bespoke databases, interactive SaaS dashboards, and high-performance business applications from the ground up, guaranteeing optimal performance and scaling.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? -1 : i));

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            /008/
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
