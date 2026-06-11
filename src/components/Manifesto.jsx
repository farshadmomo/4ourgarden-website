"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { SHOP_COUNT, CITY_COUNT } from "@/lib/data";

const STATS = [
  { value: 102, suffix: "", label: "Drops & editions" },
  { value: 26.7, suffix: "k", label: "Collectors" },
  { value: SHOP_COUNT, suffix: "", label: "Stockists" },
  { value: CITY_COUNT, suffix: "", label: "Cities, two countries" },
];

export default function Manifesto() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.fonts.ready.then(() => {
          if (!ref.current) return;
          const split = new SplitText(".manifesto-text", {
            type: "lines",
            mask: "lines",
          });
          gsap.set(".manifesto-text", { autoAlpha: 1 });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".manifesto-text",
              start: "top 78%",
            },
          });
        });

        gsap.utils.toArray(".stat").forEach((stat) => {
          const b = stat.querySelector("b");
          const target = parseFloat(b.dataset.value);
          const isFloat = !Number.isInteger(target);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: stat, start: "top 88%" },
            onUpdate: () => {
              b.firstChild.textContent = isFloat
                ? counter.v.toFixed(1)
                : Math.round(counter.v);
            },
          });
        });

        gsap.from(".manifesto-stats", {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto-stats", start: "top 88%" },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".manifesto-text", { autoAlpha: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <section className="manifesto" id="manifesto" ref={ref}>
      <p className="eyebrow" style={{ textAlign: "center", marginBottom: "2.2rem" }}>
        The Story
      </p>
      <p className="manifesto-text" style={{ visibility: "hidden" }}>
        4ourgarden makes perfume you recognize <em>with your eyes closed</em> —
        and from across the room. A flocked sphere resting on a sculpted cube:
        one silhouette, repeated across every collection, every collaboration,
        every shelf <em>from Tehran to Muscat</em>.
      </p>

      <div className="manifesto-stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <b data-value={s.value}>
              {s.value}
              {s.suffix}
            </b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
