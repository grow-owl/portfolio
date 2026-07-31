"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    let ticking = false;

    const updateNavState = () => {
      const scrollMarker =
        window.scrollY + Math.min(window.innerHeight * 0.38, 280);
      const pageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      const sections = navLinks
        .map(({ href }) => {
          const section = document.querySelector(href);
          if (!section) return null;

          const top = section.getBoundingClientRect().top + window.scrollY;
          return { href, top };
        })
        .filter(Boolean);

      const currentLink = pageBottom
        ? sections.at(-1)
        : sections.reduce(
            (active, section) =>
              section.top <= scrollMarker ? section : active,
            null,
          );

      setScrolled(window.scrollY > 20);
      setActiveLink(currentLink?.href || "");
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavState);
        ticking = true;
      }
    };

    updateNavState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateNavState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavState);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.nav
        id="main-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 sm:top-4 lg:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[900px] transition-all duration-500 ${
            scrolled || mobileOpen
              ? "bg-white/95 backdrop-blur-md shadow-xl border-border-strong rounded-full px-4 sm:px-6 py-3 border"
              : "bg-transparent border-transparent px-4 sm:px-6 py-4"
          }`}
        >
          <a href="#home" className="flex items-center group shrink-0" aria-label="GrowOwl Home">
            <Image
              src="/images/growowl-logo.webp"
              alt="GrowOwl logo"
              width={495}
              height={172}
              className="h-7 sm:h-8 w-auto hover:opacity-70 transition-opacity"
            />
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`relative pb-1 font-heading text-[13px] lg:text-[14px] font-medium transition-colors duration-300 tracking-[-0.01em] ${
                  activeLink === link.href
                    ? "text-ink"
                    : "text-ink-light hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-red transition-all duration-300 ${
                    activeLink === link.href
                      ? "w-full opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contact"
              onClick={() => setActiveLink("#contact")}
              className="btn-primary text-[13px] !py-2.5 !px-5"
            >
              Let's Talk
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-1 text-ink rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[64px] z-40 bg-white border-b border-border-strong shadow-xl px-5 pb-6 pt-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setMobileOpen(false);
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`font-heading text-lg font-semibold tracking-tight py-3 border-b border-border last:border-0 ${
                    activeLink === link.href ? "text-red" : "text-ink"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4">
                <a
                  href="#contact"
                  onClick={() => {
                    setActiveLink("#contact");
                    setMobileOpen(false);
                  }}
                  className="btn-primary w-full justify-center text-[15px] !py-3.5"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
