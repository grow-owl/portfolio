"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services/web-development" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      <nav
        id="main-nav"
        className="fixed top-3 sm:top-4 lg:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[920px] transition-all duration-500 ${
            scrolled || mobileOpen || pathname !== "/"
              ? "bg-white/95 backdrop-blur-md shadow-xl border-border-strong rounded-full px-4 sm:px-6 py-3 border"
              : "bg-transparent border-transparent px-4 sm:px-6 py-4"
          }`}
        >
          <a href="/" className="flex items-center group shrink-0" aria-label="GrowOwl Home">
            <Image
              src="/images/growowl-logo.webp"
              alt="GrowOwl logo"
              width={495}
              height={172}
              className="h-7 sm:h-8 w-auto hover:opacity-70 transition-opacity"
            />
          </a>

          <div className="hidden md:flex items-center gap-5 lg:gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 font-heading text-[13px] lg:text-[14px] font-medium transition-colors duration-300 tracking-[-0.01em] ${
                    isActive
                      ? "text-ink"
                      : "text-ink-light hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-red transition-all duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <a
              href="/contact"
              className="btn-primary text-[13px] !py-2.5 !px-5"
            >
              Let's Talk
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-1 text-ink rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-[68px] z-40 bg-white border-b border-border-strong shadow-xl px-5 pb-6 pt-4 md:hidden transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-heading text-lg font-semibold tracking-tight py-3 border-b border-border last:border-0 transition-colors ${
                  isActive ? "text-red" : "text-ink"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-4">
            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center text-[15px] !py-3.5"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
