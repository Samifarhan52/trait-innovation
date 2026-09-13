import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Cpu, Activity, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function LeadershipStaggeredFlow() {
  const sectionRef = useRef(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  const [revealedCards, setRevealedCards] = useState([false, false, false]);

  const leaders = [
    {
      id: '01',
      role: 'Founder',
      name: 'TRISHA RAY N',
      bio: 'Building the vision, innovation, and technology behind the company, with a focus on AI-driven solutions that solve real-world challenges.',
      initials: 'TR',
      badge: 'Vision, Innovation & Technology',
      telemetry: 'FOUNDER // TECH ARCHITECTURE',
      alignClass: 'lg:col-span-8 lg:col-start-1 text-left', // Top Left
      slideAnimation: 'translate-x-[-50px]',
      glowColor: 'hover:border-brand-accent/60 shadow-brand-500/10'
    },
    {
      id: '02',
      role: 'Co-founder',
      name: 'NANJUNDA RAYA GV',
      bio: 'Supporting the company’s strategic direction, growth, and long-term vision while helping build a strong foundation for sustainable innovation.',
      initials: 'NR',
      badge: 'Strategic Direction & Scale',
      telemetry: 'CO-FOUNDER // LONG-TERM VISION',
      alignClass: 'lg:col-span-8 lg:col-start-5 text-left my-12 lg:my-16', // Middle Right (Offset!)
      slideAnimation: 'translate-x-[50px]',
      glowColor: 'hover:border-brand-purple/60 shadow-brand-purple/10'
    },
    {
      id: '03',
      role: 'Chief Executive Officer',
      name: 'SUMANTH RANJAN',
      bio: 'Driving the company’s strategic execution, growth, and development while working closely with the leadership team to turn ideas into meaningful technology solutions.',
      initials: 'SR',
      badge: 'Strategic Execution & Growth',
      telemetry: 'CEO // BUSINESS EXECUTION',
      alignClass: 'lg:col-span-8 lg:col-start-2 text-left', // Bottom Left (Offset!)
      slideAnimation: 'translate-x-[-50px]',
      glowColor: 'hover:border-brand-500/60 shadow-brand-500/10'
    }
  ];

  // RE-TRIGGERING IntersectionObserver logic: reveals EVERY time you scroll into view!
  useEffect(() => {
    const observers = cardRefs.map((ref, idx) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setRevealedCards((prev) => {
            const next = [...prev];
            next[idx] = entry.isIntersecting; // True when scrolled into view, False when scrolled away!
            return next;
          });
        },
        { threshold: 0.2 }
      );

      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section id="leadership" ref={sectionRef} className="py-28 lg:py-36 bg-[#060B17] text-white relative overflow-hidden">
      
      {/* ATMOSPHERIC BACKGROUND GRADIENTS */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[500px] bg-brand-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[500px] bg-brand-purple/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-accent text-xs font-mono font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            ONE TEAM. ONE VISION.
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Leadership Team
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Driven by a team combining vision, innovation, strategic direction, and business execution.
          </p>
        </div>

        {/* STAGGERED LAYOUT FLOW MATCHING HAND-DRAWN SKETCH (Founder Top-Left, Co-Founder Center-Right, CEO Bottom-Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-center">
          
          {/* CONNECTING VECTOR PATH LINE */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1200 900" fill="none">
              <path
                d="M 350 160 C 750 220, 950 380, 850 500 C 750 620, 320 720, 450 840"
                stroke="url(#flow-line-gradient)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="flow-line-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0066FF" />
                  <stop offset="50%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="#6E00FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {leaders.map((leader, index) => {
            const isRevealed = revealedCards[index];

            return (
              <div
                key={leader.id}
                ref={cardRefs[index]}
                className={`${leader.alignClass} relative z-10 glass-panel-dark rounded-3xl p-8 md:p-10 border border-white/12 flex flex-col md:flex-row gap-8 items-center justify-between group shadow-2xl transition-all duration-1000 ease-out ${leader.glowColor} ${
                  isRevealed
                    ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
                    : `opacity-0 translate-y-20 ${leader.slideAnimation} scale-95`
                }`}
              >
                {/* TOP ACCENT LINE SCAN */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* PORTRAIT EMBLEM */}
                <div className="w-full md:w-56 h-56 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-white/10 flex items-center justify-center relative overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-6xl font-black font-mono text-white/20 group-hover:text-brand-accent/40 transition-colors duration-500 tracking-tighter">
                    {leader.initials}
                  </span>

                  {/* HIGH TECH OVERLAY BADGE */}
                  <div className="absolute top-3 left-3 text-[9px] font-mono text-brand-accent bg-black/80 px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-brand-accent animate-pulse" />
                    {leader.telemetry}
                  </div>

                  {/* LASER SCANLINE */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent animate-scanline pointer-events-none" />
                </div>

                {/* DETAILS & CONTENT */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-brand-accent bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 rounded-full uppercase tracking-widest font-bold">
                      {leader.role}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>

                  <h3 className="text-3xl font-extrabold text-white tracking-tight font-display group-hover:text-brand-accent transition-colors">
                    {leader.name}
                  </h3>

                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-brand-500" />
                    {leader.badge}
                  </div>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed border-l-2 border-brand-500 pl-4 py-0.5">
                    "{leader.bio}"
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
