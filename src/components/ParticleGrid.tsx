import { useEffect, useRef } from "react";

const ParticleGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 };
    let clickPos: { x: number; y: number } | null = null;
    let clickTime = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 40);
    const rows = Math.floor(canvas.height / 40);
    const dots: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; ejected: boolean; ejectTime: number }[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * 40 + 20;
        const y = j * 40 + 20;
        dots.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0, ejected: false, ejectTime: 0 });
      }
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      clickPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      clickTime = Date.now();
      const radius = 180;
      dots.forEach((dot) => {
        const dx = dot.baseX - clickPos!.x;
        const dy = dot.baseY - clickPos!.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius && dist > 0) {
          const force = (1 - dist / radius) * 12;
          dot.vx = (dx / dist) * force;
          dot.vy = (dy / dist) * force;
          dot.ejected = true;
          dot.ejectTime = Date.now();
        }
      });
    };
    canvas.addEventListener("click", handleClick);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        const now = Date.now();

        if (dot.ejected) {
          // Free-floating phase: apply velocity + light friction, no spring
          dot.x += dot.vx;
          dot.y += dot.vy;
          dot.vx *= 0.97;
          dot.vy *= 0.97;

          // After 2.5 seconds, start reconstituting
          if (now - dot.ejectTime > 2500) {
            dot.ejected = false;
          }
        } else {
          // Gentle spring back to base position
          const sx = dot.baseX - dot.x;
          const sy = dot.baseY - dot.y;
          dot.vx += sx * 0.012;
          dot.vy += sy * 0.012;
          dot.vx *= 0.95;
          dot.vy *= 0.95;
          dot.x += dot.vx;
          dot.y += dot.vy;

          // Mouse hover: visual offset only (no velocity change)
          const dx = mouse.x - dot.baseX;
          const dy = mouse.y - dot.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 5;
            dot.x -= (dx / dist) * force;
            dot.y -= (dy / dist) * force;
          }
        }

        const dispDist = Math.sqrt((dot.x - dot.baseX) ** 2 + (dot.y - dot.baseY) ** 2);
        const dx2 = mouse.x - dot.baseX;
        const dy2 = mouse.y - dot.baseY;
        const mouseDist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const opacity = dot.ejected ? 0.5 : dispDist > 5 ? 0.15 + Math.min(dispDist / 80, 0.4) : mouseDist < 120 ? 0.15 + (1 - mouseDist / 120) * 0.4 : 0.08;
        const size = dot.ejected ? 2.5 : mouseDist < 120 ? 1.5 + (1 - mouseDist / 120) * 2 : 1.5;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(180, 65%, 50%, ${opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 50) {
            const mouseDx = mouse.x - (dots[i].x + dots[j].x) / 2;
            const mouseDy = mouse.y - (dots[i].y + dots[j].y) / 2;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            const opacity = mouseDist < 120 ? 0.15 : 0.03;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `hsla(180, 65%, 50%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleGrid;
