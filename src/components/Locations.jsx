"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LOCATIONS, SHOP_COUNT } from "@/lib/data";

export default function Locations() {
  const ref = useRef(null);
  const [open, setOpen] = useState("Tehran");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".city-row", {
          y: 50,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".city-row", start: "top 85%" },
        });
        gsap.from(".locations-head > *", {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".locations-head", start: "top 82%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section className="locations" id="stockists" ref={ref}>
      <div className="locations-head">
        <div>
          <p className="eyebrow">Stockists — {SHOP_COUNT} doors</p>
          <h2 className="display">Find the garden</h2>
        </div>
        <p className="fa" lang="fa" dir="rtl">
          شعب فروش
        </p>
      </div>

      <div>
        {LOCATIONS.map((loc) => {
          const isOpen = open === loc.city;
          return (
            <div key={loc.city} className={`city-row${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="city-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : loc.city)}
              >
                <span className="city-name">{loc.city}</span>
                <span className="city-country">
                  {loc.country} · <span lang="fa">{loc.cityFa}</span>
                </span>
                <span className="city-count">
                  {loc.shops.length} {loc.shops.length === 1 ? "door" : "doors"}
                  <span className="chev" aria-hidden="true">
                    +
                  </span>
                </span>
              </button>

              <div className="city-shops">
                <div>
                  <div className="shops-grid">
                    {loc.shops.map((shop) => (
                      <div className="shop-card" key={shop.name} lang="fa">
                        <p className="shop-name">{shop.name}</p>
                        <p className="shop-address">{shop.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
