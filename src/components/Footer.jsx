"use client";

import Image from "next/image";

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "auto" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="pt-20 pb-10 bg-dark text-white border-t border-white/6"
    >
      <div className="max-w-300 mx-auto px-5 md:px-10">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-15 pb-15 border-b border-white/8">
          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="GrowOwl Home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
              className="block mb-4"
            >
              <Image
                src="/images/growowl-logo-white.webp"
                alt="GrowOwl logo"
                width={495}
                height={172}
                loading="lazy"
                className="h-8 w-auto"
              />
            </a>
            <p className="text-sm text-white/60 leading-[1.6] max-w-70">
              We build digital experiences that drive real results.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-5">
                Navigation
              </h3>
              {["home", "about", "work", "services", "pricing"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-5">
                Socials
              </h3>
              {["Instagram"].map((s) => (
                <a
                  key={s}
                  href="https://www.instagram.com/growowl_"
                  className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
            <div itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="GrowOwl Studio" />
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-5">
                Contact
              </h3>
              <a
                href="tel:+918609504186"
                itemProp="telephone"
                className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
              >
                +91 86095 04186
              </a>
              <a
                href="tel:+918944800564"
                itemProp="telephone"
                className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
              >
                +91 89448 00564
              </a>
              <span
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                className="block text-sm text-white/60 mb-3"
              >
                <span itemProp="addressCountry">India</span> (Remote)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[13px] text-white/60">
            © 2026 GrowOwl Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
