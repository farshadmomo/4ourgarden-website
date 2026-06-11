"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MazeRing from "./MazeRing";

export default function Anatomy() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 0.6,
          },
        });

        tl.from(".anatomy-copy h2", { y: 60, autoAlpha: 0, duration: 0.5 }, 0)
          .from(".figure-cube", { y: 80, autoAlpha: 0, duration: 0.5 }, 0.1)
          .from(
            ".figure-sphere",
            { y: -420, duration: 1.1, ease: "bounce.out" },
            0.35
          )
          .from(".figure-neck", { scaleY: 0, duration: 0.2 }, 1.1)
          .from(
            ".part-sphere",
            { x: 70, autoAlpha: 0, duration: 0.5 },
            0.7
          )
          .from(".part-cube", { x: 70, autoAlpha: 0, duration: 0.5 }, 1.2)
          .from(
            ".figure-cube svg",
            {
              scale: 0.4,
              autoAlpha: 0,
              rotation: -120,
              transformOrigin: "center",
              duration: 0.6,
            },
            1.3
          )
          .from(".anatomy-caption", { y: 24, autoAlpha: 0, duration: 0.5 }, 1.8);
      });
    },
    { scope: ref }
  );

  return (
    <section className="anatomy" id="icon" ref={ref}>
      <div className="anatomy-stage">
        <div className="figure-zone">
          <div className="bottle-figure">
            <div className="figure-sphere" />
            <div className="figure-neck" />
            <div className="figure-cube">
              <MazeRing className="text-cobalt" strokeWidth={6} />
            </div>
          </div>
        </div>

        <div className="anatomy-copy">
          <p className="eyebrow">Anatomy of the Icon</p>
          <h2 className="display">
            Sphere,
            <br />
            meet cube.
          </h2>

          <div className="anatomy-part part-sphere">
            <span className="num">01 — The Sphere</span>
            <h3>The Head</h3>
            <p>
              Flocked and tactile, dyed the color of the scent&apos;s loudest
              note. You will want to touch it. That&apos;s the point.
            </p>
          </div>

          <div className="anatomy-part part-cube">
            <span className="num">02 — The Cube</span>
            <h3>The Heart</h3>
            <p>
              A gallery plinth in miniature. Artwork wraps every face, a new
              world for every collection and collaboration.
            </p>
          </div>

          <p className="anatomy-caption">
            You recognize it before you read the label.
          </p>
        </div>
      </div>
    </section>
  );
}
