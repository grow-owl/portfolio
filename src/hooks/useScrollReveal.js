"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px", ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useMultiReveal(count, options = {}) {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px", ...options },
    );

    refs.current.forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [count]);

  return (index) => (el) => {
    refs.current[index] = el;
  };
}
