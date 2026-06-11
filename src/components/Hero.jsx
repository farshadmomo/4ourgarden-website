"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import MazeRing from "./MazeRing";
import Bottle3D from "./Bottle3D";

export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Maze: draw in, then rotate forever.
        gsap.fromTo(
          ".hero-maze path",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            stagger: 0.035,
            ease: "power2.inOut",
            delay: 1.5,
          }
        );
        gsap.to(".hero-maze", {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
        });

        document.fonts.ready.then(() => {
          if (!ref.current) return;
          const split = new SplitText(".hero-headline .row", {
            type: "chars",
            charsClass: "char",
          });
          gsap.set(".hero-headline", { autoAlpha: 1 });
          gsap.from(split.chars, {
            yPercent: 110,
            autoAlpha: 0,
            rotation: 6,
            duration: 1.1,
            stagger: 0.028,
            ease: "expo.out",
            delay: 1.75,
          });
          gsap.from(".hero-meta > *", {
            y: 24,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            delay: 2.5,
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-headline", { autoAlpha: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <header className="hero" ref={ref} id="top">
      <MazeRing className="hero-maze text-cobalt" strokeWidth={4} data-speed="0.92" />

      <Bottle3D className="hero-canvas" />

      <h1 className="hero-headline display" style={{ visibility: "hidden" }}>
        <span className="row">A Symphony</span>
        <span className="row row--right">
          <span className="accent">of </span>Scents
        </span>
      </h1>

      <div className="hero-meta">
        <p>
          Perfume objects — a sphere for a head,
          <br />a cube for a heart.
        </p>
        <p className="scroll-cue">
          <span className="dot" aria-hidden="true" />
          Scroll to wander the maze
        </p>
        <p>
          Composed in Tehran
          <br />
          Collected everywhere
        </p>
      </div>

      <div className="hero-ground-word display" aria-hidden="true" data-speed="0.85">
        4OURGARDEN
      </div>
    </header>
  );
}
