import { useEffect, useRef } from 'react';
import { useOS } from './store';
import type { WallpaperId } from './types';

/* Animated canvas wallpapers. All procedural — no images, no network. */
export default function Wallpaper() {
  const { settings } = useOS();
  const ref = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<WallpaperId>(settings.wallpaper);
  modeRef.current = settings.wallpaper;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface Star { x: number; y: number; z: number; r: number }
    interface Drop { x: number; y: number; s: number; chars: string[] }
    let stars: Star[] = [];
    let drops: Drop[] = [];

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.floor((w * h) / 9000) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8, r: Math.random() * 1.6 + 0.4,
      }));
      const cols = Math.floor(w / 22);
      drops = Array.from({ length: cols }, (_, i) => ({
        x: i * 22, y: Math.random() * h, s: 2 + Math.random() * 5,
        chars: Array.from({ length: 24 }, () => String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))),
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { hx: 0.22, hy: 0.28, r: 0.42, c: '45,212,191', sp: 0.00011, ph: 0 },
      { hx: 0.78, hy: 0.62, r: 0.5, c: '124,58,237', sp: 0.00009, ph: 2 },
      { hx: 0.6, hy: 0.15, r: 0.34, c: '34,211,238', sp: 0.00013, ph: 4 },
    ];

    let t0 = performance.now();
    const draw = (now: number) => {
      const t = now - t0;
      const mode = modeRef.current;
      ctx.fillStyle = '#05080f';
      ctx.fillRect(0, 0, w, h);

      if (mode === 'nebula') {
        for (const b of blobs) {
          const x = (b.hx + 0.08 * Math.sin(t * b.sp + b.ph)) * w;
          const y = (b.hy + 0.08 * Math.cos(t * b.sp * 1.3 + b.ph)) * h;
          const r = b.r * Math.max(w, h);
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, `rgba(${b.c},0.20)`);
          g.addColorStop(1, `rgba(${b.c},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        }
        // faint stars on top
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        for (const s of stars) {
          const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.001 + s.x));
          ctx.globalAlpha = 0.35 * tw * s.z;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.7, 0, 7); ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else if (mode === 'starfield') {
        for (const s of stars) {
          s.x -= s.z * 0.6;
          if (s.x < 0) { s.x = w; s.y = Math.random() * h; }
          ctx.fillStyle = `rgba(200,240,235,${0.25 + s.z * 0.6})`;
          ctx.fillRect(s.x, s.y, s.r, s.r);
          if (s.z > 0.7) {
            ctx.fillStyle = `rgba(45,212,191,${0.25 * s.z})`;
            ctx.fillRect(s.x - s.z * 14, s.y, s.z * 14, 1);
          }
        }
      } else if (mode === 'matrix') {
        ctx.fillStyle = 'rgba(5,8,15,0.16)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = '15px monospace';
        for (const d of drops) {
          d.y += d.s * 2.2;
          if (d.y > h + 40) { d.y = -40; d.chars = d.chars.map(() => String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))); }
          d.chars.forEach((ch, i) => {
            const y = d.y - i * 20;
            if (y < -20 || y > h + 20) return;
            const head = i === 0;
            ctx.fillStyle = head ? 'rgba(180,255,240,0.9)' : `rgba(45,212,191,${Math.max(0.05, 0.5 - i * 0.03)})`;
            ctx.fillText(ch, d.x, y);
          });
        }
      }
      // 'dark' → solid fill only
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="jos-wallpaper">
      <canvas ref={ref} />
    </div>
  );
}
