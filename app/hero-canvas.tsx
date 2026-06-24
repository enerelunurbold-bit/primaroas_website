"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const pulses: { a: typeof nodes[0]; b: typeof nodes[0]; t: number }[] = [];
    const DIST = 150;
    const MOUSE_RADIUS = 200;
    let mouseX = -9999,
      mouseY = -9999;

    function hexA(hex: string, a: number) {
      hex = hex.replace("#", "");
      if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
      const n = parseInt(hex, 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    }

    const build = () => {
      const count = Math.round(Math.min(72, Math.max(26, w / 22)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: Math.random() * 1.5 + 0.8,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const heroSection = canvas.closest('.zone-hero') || canvas.closest('.service-hero') || canvas.parentElement;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const accent = "#3b82f6";
    const accent2 = "#22d3ee";

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.08;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 1.2) {
            n.vx = (n.vx / speed) * 1.2;
            n.vy = (n.vy / speed) * 1.2;
          }
        } else {
          n.vx *= 0.998;
          n.vy *= 0.998;
        }
      }

      // Mouse glow
      if (mouseX > 0 && mouseY > 0) {
        const g = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, MOUSE_RADIUS);
        g.addColorStop(0, hexA(accent2, 0.12));
        g.addColorStop(1, hexA(accent2, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, MOUSE_RADIUS, 0, 7);
        ctx.fill();
      }

      const links: [typeof nodes[0], typeof nodes[0]][] = [];
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const p = nodes[i],
            q = nodes[j];
          const dx = p.x - q.x,
            dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            const midX = (p.x + q.x) / 2;
            const midY = (p.y + q.y) / 2;
            const mDist = Math.sqrt((mouseX - midX) ** 2 + (mouseY - midY) ** 2);
            const boost = mDist < MOUSE_RADIUS ? (1 - mDist / MOUSE_RADIUS) * 0.5 : 0;
            const al = (1 - d / DIST) * (0.32 + boost);
            ctx.strokeStyle = hexA(accent2, al);
            ctx.lineWidth = 1 + boost * 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            if (d < DIST * 0.82) links.push([p, q]);
          }
        }
      }

      ctx.lineWidth = 1;
      for (const n of nodes) {
        const mDist = Math.sqrt((mouseX - n.x) ** 2 + (mouseY - n.y) ** 2);
        const boost = mDist < MOUSE_RADIUS ? (1 - mDist / MOUSE_RADIUS) : 0;
        const nodeR = n.r + boost * 2.5;
        ctx.fillStyle = hexA(accent2, 0.85 + boost * 0.15);
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeR, 0, 7);
        ctx.fill();
        if (boost > 0.3) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, nodeR * 3);
          glow.addColorStop(0, hexA(accent2, boost * 0.4));
          glow.addColorStop(1, hexA(accent2, 0));
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, nodeR * 3, 0, 7);
          ctx.fill();
        }
      }

      if (links.length && pulses.length < 16 && Math.random() < 0.14) {
        const e = links[Math.floor(Math.random() * links.length)];
        pulses.push({ a: e[0], b: e[1], t: 0 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pl = pulses[i];
        pl.t += 0.022;
        if (pl.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const x = pl.a.x + (pl.b.x - pl.a.x) * pl.t;
        const y = pl.a.y + (pl.b.y - pl.a.y) * pl.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, hexA(accent2, 0.95));
        g.addColorStop(1, hexA(accent2, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 7);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const listenEl = heroSection || canvas;
    listenEl.addEventListener("mousemove", onMouseMove as EventListener);
    listenEl.addEventListener("mouseleave", onMouseLeave as EventListener);
    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      listenEl.removeEventListener("mousemove", onMouseMove as EventListener);
      listenEl.removeEventListener("mouseleave", onMouseLeave as EventListener);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        opacity: 0.45,
        pointerEvents: "none",
      }}
    />
  );
}
