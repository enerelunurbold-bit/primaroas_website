"use client";

import { useEffect, useRef } from "react";
import { worldPolygons } from "./world-geo";

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let RADIUS = 180;
    let autoRotation = 0;
    let dragRotY = 0, dragRotX = 0;
    let velocityY = 0, velocityX = 0;
    let currentRotY = 0, currentRotX = 0;
    let isDragging = false;
    let lastDragX = 0, lastDragY = 0;

    const LINE_COUNT = 28;

    // Ocean dots (sparse, dim)
    const oceanDots: { lat: number; lng: number; size: number }[] = [];
    for (let i = 0; i < 400; i++) {
      oceanDots.push({
        lat: Math.asin(2 * Math.random() - 1),
        lng: Math.random() * Math.PI * 2,
        size: Math.random() * 0.8 + 0.3,
      });
    }


    const lines: { points: { lat: number; lng: number }[] }[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const lng = (i / LINE_COUNT) * Math.PI * 2;
      const pts: { lat: number; lng: number }[] = [];
      for (let j = 0; j <= 50; j++) pts.push({ lat: (j / 50) * Math.PI - Math.PI / 2, lng });
      lines.push({ points: pts });
    }
    for (let i = 1; i < 10; i++) {
      const lat = (i / 10) * Math.PI - Math.PI / 2;
      const pts: { lat: number; lng: number }[] = [];
      for (let j = 0; j <= 80; j++) pts.push({ lat, lng: (j / 80) * Math.PI * 2 });
      lines.push({ points: pts });
    }

    const arcs: { from: { lat: number; lng: number }; to: { lat: number; lng: number }; progress: number; speed: number }[] = [];
    for (let i = 0; i < 8; i++) {
      arcs.push({
        from: { lat: (Math.random() - 0.5) * Math.PI * 0.8, lng: Math.random() * Math.PI * 2 },
        to: { lat: (Math.random() - 0.5) * Math.PI * 0.8, lng: Math.random() * Math.PI * 2 },
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      });
    }

    function hexA(hex: string, a: number) {
      hex = hex.replace("#", "");
      if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
      const n = parseInt(hex, 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    }

    function project(lat: number, lng: number, rotY: number, rotX: number) {
      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      const cosLng = Math.cos(lng + rotY);
      const sinLng = Math.sin(lng + rotY);
      let x = cosLat * sinLng;
      let y = sinLat;
      let z = cosLat * cosLng;
      const y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
      const scale = 1 / (1 + z2 * 0.25);
      return { x: x * RADIUS * scale, y: y2 * RADIUS * scale, z: z2, scale };
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      RADIUS = Math.min(w, h) * 0.4;
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastDragX = e.clientX;
      lastDragY = e.clientY;
      velocityY = 0;
      velocityX = 0;
      canvas.style.cursor = "grabbing";
    };
    const onMouseUp = () => {
      isDragging = false;
      canvas.style.cursor = "grab";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastDragX;
      const dy = e.clientY - lastDragY;
      velocityY = dx * 0.005;
      velocityX = -dy * 0.005;
      dragRotY += velocityY;
      dragRotX += velocityX;
      dragRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, dragRotX));
      lastDragX = e.clientX;
      lastDragY = e.clientY;
    };
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      lastDragX = e.touches[0].clientX;
      lastDragY = e.touches[0].clientY;
      velocityY = 0; velocityX = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - lastDragX;
      const dy = e.touches[0].clientY - lastDragY;
      velocityY = dx * 0.005;
      velocityX = -dy * 0.005;
      dragRotY += velocityY;
      dragRotX += velocityX;
      dragRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, dragRotX));
      lastDragX = e.touches[0].clientX;
      lastDragY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    const accent2 = "#22d3ee";

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;

      if (!isDragging) {
        autoRotation += 0.002;
        velocityY *= 0.96;
        velocityX *= 0.96;
        dragRotY += velocityY;
        dragRotX += velocityX;
        dragRotX *= 0.995;
      }

      currentRotY += ((dragRotY + autoRotation) - currentRotY) * 0.08;
      currentRotX += (dragRotX - currentRotX) * 0.08;

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, RADIUS * 0.5, cx, cy, RADIUS * 1.8);
      glow.addColorStop(0, "rgba(34, 211, 238, 0.07)");
      glow.addColorStop(0.4, "rgba(59, 130, 246, 0.04)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Wireframe (subtle)
      for (const line of lines) {
        ctx.beginPath();
        let started = false;
        for (const pt of line.points) {
          const p = project(pt.lat, pt.lng, currentRotY, currentRotX);
          if (p.z < -0.15) { started = false; continue; }
          const alpha = Math.max(0, (p.z + 0.15) * 0.12);
          ctx.strokeStyle = hexA(accent2, alpha);
          ctx.lineWidth = 0.4;
          if (!started) { ctx.moveTo(cx + p.x, cy - p.y); started = true; }
          else ctx.lineTo(cx + p.x, cy - p.y);
        }
        ctx.stroke();
      }

      // Continent outlines — back side (dim)
      for (const poly of worldPolygons) {
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < poly.length; i += 2) {
          const lat = (poly[i] * Math.PI) / 180;
          const lng = (poly[i + 1] * Math.PI) / 180;
          const p = project(lat, lng, currentRotY, currentRotX);
          if (p.z >= -0.08) { if (started) { ctx.stroke(); ctx.beginPath(); started = false; } continue; }
          const alpha = 0.08 + (p.z + 1) * 0.06;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 0.5;
          if (!started) { ctx.moveTo(cx + p.x, cy - p.y); started = true; }
          else ctx.lineTo(cx + p.x, cy - p.y);
        }
        ctx.stroke();
      }

      // Continent outlines — front side (bright + glow)
      ctx.save();
      ctx.shadowColor = "rgba(34, 211, 238, 0.6)";
      ctx.shadowBlur = 6;
      for (const poly of worldPolygons) {
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < poly.length; i += 2) {
          const lat = (poly[i] * Math.PI) / 180;
          const lng = (poly[i + 1] * Math.PI) / 180;
          const p = project(lat, lng, currentRotY, currentRotX);
          if (p.z < -0.08) { if (started) { ctx.stroke(); ctx.beginPath(); started = false; } continue; }
          const alpha = Math.min(1, (p.z + 0.08) * 1.2) * 0.55;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 1.0;
          if (!started) { ctx.moveTo(cx + p.x, cy - p.y); started = true; }
          else ctx.lineTo(cx + p.x, cy - p.y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Ocean dots (dim)
      for (const dot of oceanDots) {
        const p = project(dot.lat, dot.lng, currentRotY, currentRotX);
        if (p.z < -0.05) continue;
        const alpha = Math.max(0, (p.z + 0.05) * 0.2);
        ctx.fillStyle = hexA(accent2, alpha);
        ctx.beginPath();
        ctx.arc(cx + p.x, cy - p.y, dot.size * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }


      // Arcs
      for (const arc of arcs) {
        arc.progress += arc.speed;
        if (arc.progress > 1) {
          arc.progress = 0;
          arc.from = { lat: (Math.random() - 0.5) * Math.PI * 0.8, lng: Math.random() * Math.PI * 2 };
          arc.to = { lat: (Math.random() - 0.5) * Math.PI * 0.8, lng: Math.random() * Math.PI * 2 };
          arc.speed = 0.002 + Math.random() * 0.004;
        }
        const steps = 40;
        ctx.beginPath();
        let vis = false;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const lat = arc.from.lat + (arc.to.lat - arc.from.lat) * t;
          const lng = arc.from.lng + (arc.to.lng - arc.from.lng) * t;
          const h2 = 1 + Math.sin(t * Math.PI) * 0.3;
          const p = project(lat, lng, currentRotY, currentRotX);
          if (p.z < -0.1) { vis = false; continue; }
          if (!vis) { ctx.moveTo(cx + p.x * h2, cy - p.y * h2); vis = true; }
          else ctx.lineTo(cx + p.x * h2, cy - p.y * h2);
        }
        ctx.strokeStyle = `rgba(59, 130, 246, ${Math.sin(arc.progress * Math.PI) * 0.5})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Traveling dot
        const dt = arc.progress;
        const dlat = arc.from.lat + (arc.to.lat - arc.from.lat) * dt;
        const dlng = arc.from.lng + (arc.to.lng - arc.from.lng) * dt;
        const dh = 1 + Math.sin(dt * Math.PI) * 0.3;
        const dp = project(dlat, dlng, currentRotY, currentRotX);
        if (dp.z > -0.1) {
          const dg = ctx.createRadialGradient(cx + dp.x * dh, cy - dp.y * dh, 0, cx + dp.x * dh, cy - dp.y * dh, 10);
          dg.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          dg.addColorStop(0.3, "rgba(34, 211, 238, 0.6)");
          dg.addColorStop(1, "transparent");
          ctx.fillStyle = dg;
          ctx.beginPath();
          ctx.arc(cx + dp.x * dh, cy - dp.y * dh, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Atmosphere (edge glow)
      const atmos = ctx.createRadialGradient(cx, cy, RADIUS * 0.85, cx, cy, RADIUS * 1.15);
      atmos.addColorStop(0, "transparent");
      atmos.addColorStop(0.5, "rgba(34, 211, 238, 0.04)");
      atmos.addColorStop(0.8, "rgba(34, 211, 238, 0.08)");
      atmos.addColorStop(1, "rgba(59, 130, 246, 0.12)");
      ctx.fillStyle = atmos;
      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Bottom highlight
      const bottomGlow = ctx.createRadialGradient(cx, cy + RADIUS * 0.8, 0, cx, cy + RADIUS * 0.8, RADIUS * 0.6);
      bottomGlow.addColorStop(0, "rgba(34, 211, 238, 0.06)");
      bottomGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bottomGlow;
      ctx.beginPath();
      ctx.arc(cx, cy + RADIUS * 0.8, RADIUS * 0.6, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
