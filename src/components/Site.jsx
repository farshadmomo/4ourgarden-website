"use client";

import { useRef, useState } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";
import MazeRing, { MazeGlyph } from "./MazeRing";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Manifesto from "./Manifesto";
import Anatomy from "./Anatomy";
import Collections from "./Collections";
import Locations from "./Locations";
import Footer from "./Footer";

const NAV_LINKS = [
  { label: "Story", href: "#manifesto" },
  { label: "The Icon", href: "#icon" },
  { label: "Collections", href: "#collections" },
  { label: "Stockists", href: "#stockists" },
];

function Preloader() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(ref.current, { display: "none" });
        return;
      }
      document.documentElement.style.overflow = "hidden";
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
        },
      });
      tl.fromTo(
        ".preloader path",
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.018,
          ease: "power2.inOut",
        }
      )
        .from(
          ".preloader-word span",
          { yPercent: 120, stagger: 0.045, duration: 0.55, ease: "expo.out" },
          0.35
        )
        .to(ref.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "expo.inOut",
          delay: 0.1,
        })
        .set(ref.current, { display: "none" });
    },
    { scope: ref }
  );

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div style={{ textAlign: "center" }}>
        <MazeRing
          className="text-cobalt"
          strokeWidth={5}
          style={{ width: "min(36vmin, 220px)", marginInline: "auto" }}
        />
        <div className="preloader-word">
          {"4OURGARDEN".split("").map((ch, i) => (
            <span key={i} style={{ display: "inline-block" }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cursor() {
  const ref = useRef(null);

  useGSAP(() => {
    const dot = ref.current;
    if (!dot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const interactive = e.target.closest("a, button");
      gsap.to(dot, {
        scale: interactive ? 3 : 1,
        opacity: interactive ? 0.45 : 1,
        duration: 0.3,
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  });

  return <div className="cursor-dot" ref={ref} aria-hidden="true" />;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 60,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  });

  const go = (e, href) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(href, true, "top 90px");
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav${scrolled ? " is-scrolled" : ""}`} aria-label="Main">
      <a
        href="#top"
        onClick={(e) => go(e, "#top")}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem" }}
        aria-label="4ourgarden — back to top"
      >
        <MazeGlyph className="text-cobalt" style={{ width: 30, height: 30 }} />
        <span
          className="display"
          style={{ fontSize: "0.85rem", letterSpacing: "0.12em" }}
        >
          4ourgarden
        </span>
      </a>

      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            className="nav-link"
            href={l.href}
            onClick={(e) => go(e, l.href)}
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        className="pill"
        href="https://t.me/fourgardenss"
        target="_blank"
        rel="noopener noreferrer"
      >
        Order
      </a>
    </nav>
  );
}

export default function Site() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
        });
        return () => smoother.kill();
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      <Preloader />
      <Cursor />
      <Nav />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <Marquee />
            <Manifesto />
            <Anatomy />
            <Collections />
            <Locations />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
