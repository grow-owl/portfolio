"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

const stats = [
  { number: "15+", label: "Completed Projects" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function About({ sectionNumber = "/002/" }) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const textRef = useScrollReveal();
  const statsRef = useScrollReveal();

  return (
    <section id="about" aria-labelledby="about-heading" className="py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/80">
            About Us
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-start">
          <h2
            id="about-heading"
            ref={titleRef}
            className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink max-w-[800px]"
          >
            As a dedicated{" "}
            <em className="font-serif italic font-medium">freelance website builder</em>{" "}
            and custom full stack developer collective, we cover everything from visual brand identity to backends and databases.
          </h2>

          <div>
            <div ref={textRef}>
              <p className="text-base text-ink/80 leading-[1.75] mb-5">
                We're not just another agency. We're a collective of strategic freelance designers and full stack developers who believe great digital work should be felt, not just seen. Every line of backend and frontend code is optimized to help your brand rank at the top.
              </p>
              <p className="text-base text-ink/80 leading-[1.75] mb-5">
                In just over 2 years, we've grown from a small team of passionate freelancers into a trusted website builder collective, delivering fast, conversion-focused sites for clients across India.
              </p>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-5 lg:gap-8 mt-10 pt-10 border-t border-ink/10"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="block text-[28px] lg:text-4xl font-bold tracking-[-0.04em] text-ink leading-none mb-2">
                    {s.number}
                  </span>
                  <span className="text-[13px] text-ink/80 font-medium">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
