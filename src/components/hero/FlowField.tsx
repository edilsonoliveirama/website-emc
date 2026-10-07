"use client";

import { useEffect, useRef } from "react";

// Static dot matrix lit by soft light waves that radiate from a focal point
// (the automation panel) plus a glow that follows the cursor. No trails.

const SPACING = 26;
const WAVE_EVERY = 3.2; // seconds between waves
const WAVE_SPEED = 260; // px per second
const WAVE_WIDTH = 110;

export default function FlowField({ targetX = 0.72, targetY = 0.5 }: { targetX?: number; targetY?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let dots: { x: number; y: number; d: number }[] = [];
    let raf = 0;
    let running = true;
    const start = performance.now();
    const mouse = { x: -9999, y: -9999, k: 0, target: 0 };

    function resize() {
      const r = canvas!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const fx = w * targetX;
      const fy = h * targetY;
      dots = [];
      for (let y = SPACING / 2; y < h; y += SPACING) {
        for (let x = SPACING / 2; x < w; x += SPACING) {
          dots.push({ x, y, d: Math.hypot(x - fx, y - fy) });
        }
      }
    }

    function draw(now: number) {
      const t = (now - start) / 1000;
      ctx!.clearRect(0, 0, w, h);
      mouse.k += (mouse.target - mouse.k) * 0.08;

      const maxD = Math.hypot(w, h);
      const waves: number[] = [];
      if (!reduce) {
        for (let i = 0; i < 4; i++) {
          const age = ((t / WAVE_EVERY - i) % 4 + 4) % 4;
          waves.push(age * WAVE_EVERY * WAVE_SPEED);
        }
      }

      for (const p of dots) {
        // Base: dim dots, slightly brighter close to the focal point.
        const focus = Math.max(0, 1 - p.d / (maxD * 0.55));
        let a = 0.06 + focus * 0.12;
        let lift = 0;

        for (const r of waves) {
          const delta = Math.abs(p.d - r);
          if (delta < WAVE_WIDTH) {
            const fade = Math.max(0, 1 - r / (maxD * 0.9));
            lift = Math.max(lift, (1 - delta / WAVE_WIDTH) * fade);
          }
        }

        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const hover = md < 160 ? (1 - md / 160) * mouse.k : 0;

        a += lift * 0.45 + hover * 0.6;
        const size = 1 + lift * 0.9 + hover * 1.3;

        // Blend accent blue -> violet with distance, mint under the cursor.
        const mix = Math.min(1, p.d / (maxD * 0.6));
        let r = 91 + (124 - 91) * mix;
        let g = 140 + (92 - 140) * mix;
        let b = 255;
        if (hover > 0) {
          r += (61 - r) * hover;
          g += (220 - g) * hover;
          b += (151 - b) * hover;
        }

        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${Math.min(a, 0.9)})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop(now: number) {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      if (reduce) return;
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const parent = canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.target = 1;
    };
    const onLeave = () => {
      mouse.target = 0;
    };
    if (!reduce) {
      parent?.addEventListener("pointermove", onMove);
      parent?.addEventListener("pointerleave", onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
    };
  }, [targetX, targetY]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_90%_80%_at_60%_45%,#000_40%,transparent_100%)]"
    />
  );
}
