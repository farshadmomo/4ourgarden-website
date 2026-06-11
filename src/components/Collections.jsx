"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { COLLECTIONS } from "@/lib/data";

function BottleGlyph({ sphere }) {
  return (
    <div className="panel-bottle" aria-hidden="true">
      <div className="ball" style={{ background: sphere }} />
      <div className="box" />
    </div>
  );
}

export default function Collections() {
  const ref = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section className="collections" id="collections" ref={ref}>
      <div className="collections-track" ref={trackRef}>
        <div className="panel panel--intro">
          <div>
            <p className="eyebrow">The Collections</p>
            <h2 className="display">
              Six gardens,
              <br />
              one maze.
            </h2>
            <p style={{ marginTop: "1.6rem", maxWidth: "34ch", color: "var(--ink-soft)" }}>
              Every drop is a small world: a new color for the sphere, a new
              artwork for the cube, a new corner of the garden.
            </p>
          </div>
          <p className="eyebrow" aria-hidden="true">
            Keep scrolling ⟶
          </p>
        </div>

        {COLLECTIONS.map((c) => (
          <article
            key={c.id}
            className="panel"
            style={{ background: c.bg, color: c.text }}
          >
            <div>
              <div className="panel-index">{c.index}</div>
              <h3 className="panel-name display">{c.name}</h3>
              <ul className="panel-moods">
                {c.moods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <BottleGlyph sphere={c.sphere} />
          </article>
        ))}
      </div>
    </section>
  );
}
