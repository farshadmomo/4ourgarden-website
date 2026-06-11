"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MazeRing from "./MazeRing";

export default function Footer() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".footer-maze", {
          rotation: -360,
          duration: 140,
          repeat: -1,
          ease: "none",
        });
        gsap.from(".footer-wordmark", {
          yPercent: 40,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".footer-wordmark", start: "top 95%" },
        });
        gsap.from([".footer-slogan", ".footer-cta-row"], {
          y: 50,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <footer className="footer" ref={ref}>
      <MazeRing className="footer-maze" strokeWidth={4} />

      <p className="eyebrow" style={{ color: "color-mix(in oklch, var(--paper) 80%, transparent)" }}>
        Step inside
      </p>
      <h2 className="footer-slogan display">
        Lose yourself in a symphony of scents.
      </h2>

      <div className="footer-cta-row">
        <a
          className="pill"
          href="https://t.me/fourgardenss"
          target="_blank"
          rel="noopener noreferrer"
        >
          Order via Telegram ↗
        </a>
        <a
          className="pill pill--ghost"
          href="https://www.instagram.com/4ourgarden"
          target="_blank"
          rel="noopener noreferrer"
        >
          @4ourgarden ↗
        </a>
      </div>

      <div className="footer-wordmark display" aria-hidden="true">
        4OURGARDEN
      </div>

      <div className="footer-base">
        <span>© {new Date().getFullYear()} Four Gardens — Perfumery</span>
        <span lang="fa" dir="rtl">
          سمفونی‌ای از عطرها
        </span>
        <span>Tehran ✺ Muscat</span>
      </div>
    </footer>
  );
}
