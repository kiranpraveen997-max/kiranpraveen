
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const interactive = !isTouch && !reduceMotion;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;

    const pointer = { x: -9999, y: -9999, active: false };
    const glowPos = { x: -9999, y: -9999 };

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = reduceMotion ? 26000 : 15000;
      const count = Math.max(18, Math.min(80, Math.round((width * height) / density)));
      const speed = reduceMotion ? 0.06 : 0.14;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 0.8 + Math.random() * 1.2,
      }));
    };

    const linkDist = 120;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (interactive && pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 1) {
            const d = Math.sqrt(d2);
            const force = (1 - d / 140) * 0.16;
            p.x -= (dx / d) * force;
            p.y -= (dy / d) * force;
          }
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 185, 235, 0.45)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(160, 130, 220, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      if (interactive && glowRef.current) {
        glowPos.x += (pointer.x - glowPos.x) * 0.08;
        glowPos.y += (pointer.y - glowPos.y) * 0.08;
        glowRef.current.style.transform = `translate3d(${glowPos.x - 220}px, ${glowPos.y - 220}px, 0)`;
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      if (!pointer.active) {
        glowPos.x = e.clientX;
        glowPos.y = e.clientY;
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 150);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };

    setup();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (interactive) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[440px] w-[440px] rounded-full opacity-0 transition-opacity duration-500 hidden md:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent) 0%, color-mix(in oklab, var(--accent-cyan) 8%, transparent) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}
