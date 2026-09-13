import React, { useState, useEffect, useRef } from 'react';

export default function Hero3DCenterT() {
  const [angle, setAngle] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = Clockwise, -1 = Counter-Clockwise

  // Reverse orbit direction periodically (every 10 seconds)
  useEffect(() => {
    const dirInterval = setInterval(() => {
      setDirection((prev) => -prev);
    }, 10000);
    return () => clearInterval(dirInterval);
  }, []);

  // Smooth continuous orbit animation loop
  useEffect(() => {
    let animId;
    const animate = () => {
      setAngle((prev) => prev + 0.008 * direction);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [direction]);

  // Card definitions with initial orbital angles
  const initialCards = [
    { id: 'ai', title: 'AI & Automation', subtitle: 'Intelligent Systems', image: '/assets/ai_automation.jpg', tag: 'AI & Automation', baseAngle: 0 },
    { id: 'aviation', title: 'Smarter Skies', subtitle: 'Flight Data Analytics', image: '/assets/aviation.jpg', tag: 'Aviation', baseAngle: (Math.PI * 2) / 5 },
    { id: 'software', title: 'Web & Software', subtitle: 'Digital Platform Growth', image: '/assets/software_solutions.jpg', tag: 'Software', baseAngle: (Math.PI * 4) / 5 },
    { id: 'consulting', title: 'Strategic Guidance', subtitle: 'Enterprise Advisory', image: '/assets/consulting.jpg', tag: 'Consulting', baseAngle: (Math.PI * 6) / 5 },
    { id: 'events', title: 'Event Management', subtitle: 'End-to-End Production', image: '/assets/event_management.jpg', tag: 'Events', baseAngle: (Math.PI * 8) / 5 },
  ];

  // Calculate dynamic X, Y orbit coordinates around center (350, 320)
  const radiusX = 220; // horizontal orbital radius
  const radiusY = 170; // vertical orbital radius
  const centerX = 350;
  const centerY = 320;

  const cardPositions = initialCards.map((card) => {
    const currentAngle = angle + card.baseAngle;
    const x = centerX + Math.cos(currentAngle) * radiusX;
    const y = centerY + Math.sin(currentAngle) * radiusY;
    return { ...card, x, y };
  });

  return (
    <div className="relative w-full h-[560px] sm:h-[640px] lg:h-[680px] flex items-center justify-center select-none overflow-hidden">
      
      {/* 1. ANIMATED NETWORK CONNECTIONS & WIRES (EXACT MATCH TO SCREENSHOT!) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 700 640" fill="none">
        
        {/* Dynamic network dashed cables connecting Central 'T' to each Orbiting Card */}
        {cardPositions.map((card) => (
          <g key={card.id}>
            {/* Outer Glow Line */}
            <line
              x1={centerX}
              y1={centerY}
              x2={card.x}
              y2={card.y}
              stroke="#00F0FF"
              strokeWidth="3"
              strokeOpacity="0.4"
            />
            {/* Animated Dashed Network Wire */}
            <line
              x1={centerX}
              y1={centerY}
              x2={card.x}
              y2={card.y}
              stroke="#0066FF"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
            {/* Glowing Endpoint Node Circle at Central T */}
            <circle cx={centerX} cy={centerY} r="5" fill="#00F0FF" className="animate-ping" />
            {/* Glowing Endpoint Node Circle at Card */}
            <circle cx={card.x} cy={card.y} r="4" fill="#00F0FF" />
          </g>
        ))}

        {/* Orbit Path Guide Ring */}
        <ellipse cx={centerX} cy={centerY} rx={radiusX} ry={radiusY} stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.3" />
      </svg>

      {/* 2. CENTRAL PROMINENT TRAIT 'T' EMBLEM IMAGE (PROMINENT DEAD-CENTER!) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center group cursor-pointer">
        
        {/* HOLOGRAPHIC ROTATING RINGS */}
        <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-brand-accent/50 animate-spin pointer-events-none" style={{ animationDuration: '14s' }} />
        <div className="absolute w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full border border-dashed border-brand-500/40 animate-spin pointer-events-none" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

        {/* CENTRAL RADIAL AURA */}
        <div className="absolute w-60 h-60 sm:w-72 sm:h-72 bg-gradient-to-tr from-brand-500/30 via-brand-accent/25 to-brand-purple/25 blur-[45px] rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

        {/* CENTRAL EMBLEM BADGE */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-2 bg-slate-950/90 border-2 border-brand-accent shadow-2xl shadow-brand-500/60 backdrop-blur-md overflow-hidden group-hover:scale-105 transition-all duration-500">
          <img
            src="/assets/central_t.jpg"
            alt="TRAIT Innovation Central Emblem"
            className="w-full h-full object-contain rounded-2xl drop-shadow-[0_0_30px_rgba(0,240,255,0.9)]"
          />
          {/* LASER SCANLINE */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent animate-scanline pointer-events-none" />
        </div>

        {/* DIRECTION BADGE */}
        <div className="absolute -bottom-6 px-3 py-1 rounded-full bg-slate-900/90 border border-brand-accent/40 text-[9px] font-mono text-brand-accent font-bold uppercase shadow-lg">
          ORBIT: {direction === 1 ? 'CLOCKWISE ↻' : 'COUNTER-CLOCKWISE ↺'}
        </div>

      </div>

      {/* 3. REVOLVING SERVICE CARDS DYNAMICALLY ORBITING AROUND CENTRAL 'T' */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {cardPositions.map((card) => (
          <div
            key={card.id}
            className="absolute p-2.5 rounded-2xl glass-panel border border-white/90 shadow-2xl shadow-brand-500/20 max-w-[180px] sm:max-w-[200px] pointer-events-auto hover:scale-110 transition-transform duration-300 cursor-pointer group -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${card.x}px`,
              top: `${card.y}px`,
            }}
          >
            <div className="w-full h-20 sm:h-22 rounded-xl overflow-hidden mb-2 relative">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-brand-accent font-bold uppercase">{card.tag}</span>
            </div>
            <div className="text-xs font-extrabold text-slate-900 font-display leading-tight">{card.title}</div>
            <div className="text-[9px] text-slate-500 font-mono mt-0.5">{card.subtitle}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
