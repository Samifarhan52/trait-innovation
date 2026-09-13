import React, { useState, useEffect, useRef } from 'react';

export default function NetflixIntro({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: 'T' ribbon zoom, 1: Expand 'TRAIT INOVATION', 2: Dissolve out
  const canvasRef = useRef(null);

  // Canvas light ribbon effect for Netflix intro
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ribbons = Array.from({ length: 40 }).map(() => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2 + (Math.random() - 0.5) * 200,
      length: 100 + Math.random() * 200,
      speed: 2 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '#0066FF' : '#00F0FF',
      width: 1 + Math.random() * 3,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    let startTime = Date.now();

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ribbons.forEach((r) => {
        r.x += Math.cos(r.angle) * r.speed * (elapsed > 1.2 ? 3 : 1);
        r.y += Math.sin(r.angle) * r.speed * (elapsed > 1.2 ? 3 : 1);

        ctx.beginPath();
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = r.width;
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x - Math.cos(r.angle) * r.length, r.y - Math.sin(r.angle) * r.length);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    // Stage 0 -> 1: Reveal 'TRAIT INOVATION' from 'T'
    const t1 = setTimeout(() => setPhase(1), 1400);
    // Stage 1 -> 2: Begin smooth transition reveal into main app
    const t2 = setTimeout(() => setPhase(2), 3000);
    // Complete intro
    const t3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#030712] text-white flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${
        phase === 2 ? 'opacity-0 pointer-events-none scale-110 blur-xl' : 'opacity-100 scale-100'
      }`}
    >
      {/* BACKGROUND CANVAS LIGHT RIBBONS */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* ATMOSPHERIC CONE SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.4)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* PHASE 0: NETFLIX ICONIC GLOWING 'T' RIBBON ANIMATION */}
        <div className="relative mb-8">
          <div
            className={`transition-all duration-1000 ease-out transform ${
              phase === 0
                ? 'scale-125 opacity-100 shadow-[0_0_80px_rgba(0,240,255,0.8)]'
                : 'scale-90 opacity-100 shadow-[0_0_40px_rgba(0,102,255,0.6)]'
            }`}
          >
            {/* NETFLIX-STYLE RIBBON 'T' */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-slate-950 border-2 border-brand-accent/80 flex items-center justify-center shadow-2xl relative overflow-hidden">
              
              {/* GLOWING RECURSIVE LIGHT BARS FOR THE 'T' */}
              <div className="relative flex flex-col items-center justify-center">
                {/* Horizontal Top Bar */}
                <div className="w-16 sm:w-20 h-4 bg-gradient-to-r from-brand-500 via-brand-accent to-brand-purple rounded-full shadow-lg shadow-brand-accent animate-pulse" />
                {/* Vertical Stem */}
                <div className="w-4 h-16 sm:h-20 bg-gradient-to-b from-brand-accent via-brand-500 to-brand-purple rounded-b-full shadow-lg shadow-brand-500 -mt-1" />
              </div>

              {/* SCANNING LASER EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-scanline pointer-events-none" />
            </div>
          </div>
        </div>

        {/* PHASE 1: EXPAND "TRAIT INOVATION" FROM 'T' */}
        <div className="overflow-hidden py-2">
          <h1
            className={`font-black font-display uppercase tracking-widest text-3xl sm:text-5xl lg:text-6xl transition-all duration-1000 transform ${
              phase >= 1
                ? 'translate-y-0 opacity-100 tracking-[0.25em]'
                : 'translate-y-16 opacity-0 tracking-tighter'
            }`}
          >
            TRAIT<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-accent to-white font-light">INOVATION</span>
          </h1>
        </div>

        {/* TAGLINE SUBTITLE */}
        <div
          className={`transition-all duration-700 delay-300 mt-4 flex items-center gap-3 ${
            phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-brand-accent" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-slate-300 uppercase font-semibold">
            INTELLIGENCE FOR THE NEXT ERA OF AVIATION
          </span>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-brand-accent" />
        </div>

      </div>
    </div>
  );
}
