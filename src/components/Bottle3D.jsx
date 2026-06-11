"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const COBALT = 0x2742c8;
const COBALT_DEEP = 0x18266f;

// Label texture: cobalt maze rings + wordmark on the porcelain body.
function makeLabelTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 660;
  const ctx = canvas.getContext("2d");
  const cx = 256;
  const cy = 268;

  ctx.strokeStyle = "#2742c8";
  ctx.lineCap = "round";
  const rings = [54, 92, 130, 168];
  rings.forEach((r, i) => {
    ctx.lineWidth = 17;
    const gap = 0.9;
    const start = (i * Math.PI) / 1.7;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start + gap, start + Math.PI * 2 - gap * 0.4);
    ctx.stroke();
  });
  ctx.fillStyle = "#2742c8";
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = "center";
  ctx.font = "600 34px sans-serif";
  ctx.fillText("4 O U R G A R D E N", cx, 540);
  ctx.font = "400 19px sans-serif";
  ctx.fillText("A  SYMPHONY  OF  SCENTS", cx, 588);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export default function Bottle3D({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.45, 6.6);
    camera.lookAt(0, 0.1, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.5;

    const bottle = new THREE.Group();

    const porcelain = new THREE.MeshPhysicalMaterial({
      color: 0xf5f3ec,
      roughness: 0.3,
      clearcoat: 0.5,
      clearcoatRoughness: 0.35,
    });
    const body = new THREE.Mesh(
      new RoundedBoxGeometry(1.5, 1.95, 1.0, 4, 0.07),
      porcelain
    );
    body.position.y = -0.45;
    body.castShadow = true;
    body.receiveShadow = true;

    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(1.18, 1.52),
      new THREE.MeshBasicMaterial({ map: makeLabelTexture(), transparent: true })
    );
    label.position.set(0, -0.43, 0.512);

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.2, 0.18, 32),
      new THREE.MeshStandardMaterial({ color: COBALT_DEEP, roughness: 0.55 })
    );
    neck.position.y = 0.6;

    // The flocked sphere: sheen fakes the fuzzy nap of the cap.
    const fuzz = new THREE.MeshPhysicalMaterial({
      color: COBALT,
      roughness: 1,
      sheen: 1,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0x8d9ffb),
    });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.58, 48, 48), fuzz);
    head.position.y = 1.26;
    head.castShadow = true;

    bottle.add(body, label, neck, head);
    bottle.position.y = 0.05;
    scene.add(bottle);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.ShadowMaterial({ opacity: 0.13 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.6;
    ground.receiveShadow = true;
    scene.add(ground);

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 5, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -3;
    scene.add(key);
    scene.add(new THREE.AmbientLight(0xdfe4ff, 0.55));

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Nudge the bottle off-center on wide screens so it sits with the type.
      bottle.position.x = camera.aspect > 1.15 ? 1.35 : 0;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer parallax.
    let tiltX = 0;
    let tiltY = 0;
    const onPointer = (e) => {
      tiltX = (e.clientX / window.innerWidth - 0.5) * 2;
      tiltY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    const scroll = { rotY: 0, dropY: 0 };
    const triggers = [];

    if (!reduced) {
      gsap.from(bottle.scale, {
        x: 0.001,
        y: 0.001,
        z: 0.001,
        duration: 1.5,
        ease: "back.out(1.3)",
        delay: 1.9,
      });
      const hero = el.closest(".hero");
      if (hero) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        tl.to(scroll, { rotY: Math.PI * 1.6, ease: "none" }, 0).to(
          scroll,
          { dropY: -3.2, ease: "none" },
          0.25
        );
        triggers.push(tl.scrollTrigger);
      }
    }

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      const idle = reduced ? 0 : 1;
      bottle.rotation.y +=
        (scroll.rotY + tiltX * 0.45 + Math.sin(t * 0.4) * 0.1 * idle -
          bottle.rotation.y) *
        0.06;
      bottle.rotation.x +=
        (tiltY * 0.12 + Math.sin(t * 0.7) * 0.02 * idle - bottle.rotation.x) *
        0.06;
      bottle.position.y +=
        (0.05 + scroll.dropY + Math.sin(t * 0.9) * 0.06 * idle -
          bottle.position.y) *
        0.08;
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      triggers.forEach((tr) => tr && tr.kill());
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el)
        el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
