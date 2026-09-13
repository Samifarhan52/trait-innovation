import React, { useState, useEffect, useRef } from 'react';
import { User, Shield, Compass, Sparkles, Cpu, ChevronRight, Activity } from 'lucide-react';

export default function LeadershipScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const leaders = [
    {
      id: '01',
      role: 'FOUNDER',
      name: 'TRISHA RAY N',
      bio: 'Building the vision, innovation, and technology behind the company, with a focus on AI-driven solutions that solve real-world challenges.',
      badge: 'Core Vision & Tech Architecture',
      telemetry: 'SYSTEM DESIGN // NEURAL FRAMEWORK',
      initials: 'TR',
      accentColor: 'from-brand-500 to-brand-accent'
    },
    {
      id: '02',
      role: 'CO-FOUNDER',
      name: 'NANJUNDA RAYA GV',
      bio: 'Supporting the company’s strategic direction, growth, and long-term vision while helping build a strong foundation for sustainable innovation.',
      badge: 'Strategic Direction & Scale',
      telemetry: 'FOUNDATION // SUSTAINABLE GROWTH',
      initials: 'NR',
      accentColor: 'from-brand-purple to-brand-500'
    },
    {
      id: '03',
      role: 'CHIEF EXECUTIVE OFFICER',
      name: 'SUMANTH RANJAN',
      bio: 'Driving the company’s strategic execution, growth, and development while working closely with the leadership team to turn ideas into meaningful technology solutions.',
      badge: 'Execution & Enterprise Operations',
      telemetry: 'GLOBAL EXECUTION // AI OPERATIONS',
      initials: 'SR',
      accentColor: 'from-brand-accent to-brand-purple'
    }
  ];

  // Scroll listener for pinned sticky viewport effect on Desktop
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollableHeight, 0), 1);
      if (progress < 0.33) {
        setActiveIndex(0);
      } else if (progress < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLeader = leaders[activeIndex];

  return (
    <section 
      id="leadership" 
      ref={sectionRef}
      className="relative bg-[#070B14] text-white py-24 md:py-0 md:h-[300vh] w-full"
    >
      {/* PINNED STICKY VIEWPORT CONTAINER FOR DESKTOP */}
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        
        {/* BACKGROUND ATMOSPHERIC DATA GRID */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* TOP BAR & SECTION HEADER */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pt-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-brand-accent uppercase mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
              THE PEOPLE BEHIND THE VISION
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Built by people who believe technology should move forward.
            </h2>
          </div>

          {/* INDEX TABS / PROGRESS INDICATORS */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {leaders.map((leader, index) => (
              <button
                key={leader.id}
                onClick={() => setActiveIndex(index)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-500 flex items-center gap-2 ${
                  activeIndex === index
                    ? 'bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{leader.id}</span>
                <span className="hidden sm:inline">{leader.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CINEMATIC REVEAL VIEWPORT */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
          
          {/* DESKTOP COMPOSITION */}
          <div className="hidden md:grid grid-cols-12 gap-12 items-center min-h-[440px]">
            
            {/* LEFT: EDITORIAL TYPOGRAPHY & DETAILS */}
            <div className="col-span-7 space-y-6">
              
              <div className="flex items-center gap-4">
                <span className="text-6xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-500">
                  {currentLeader.id}
                </span>
                <div className="h-10 w-[1px] bg-white/20" />
                <div>
                  <span className="text-xs font-mono tracking-widest text-brand-accent uppercase font-bold block">
                    {currentLeader.role}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    {currentLeader.telemetry}
                  </span>
                </div>
              </div>

              {/* NAME */}
              <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                {currentLeader.name}
              </h3>

              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/30 text-brand-accent text-xs font-mono">
                <Cpu className="w-3.5 h-3.5" />
                {currentLeader.badge}
              </div>

              {/* DESCRIPTION */}
              <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl border-l-2 border-brand-500 pl-4 py-1">
                "{currentLeader.bio}"
              </p>

            </div>

            {/* RIGHT: EDITORIAL HIGH-TECH PORTRAIT HOLDER */}
            <div className="col-span-5 relative flex items-center justify-center">
              
              {/* SCANNING LASER EFFECT */}
              <div className="relative w-80 h-96 rounded-3xl overflow-hidden glass-panel-dark border border-white/15 p-2 shadow-2xl group">
                
                {/* PORTRAIT BACKGROUND CANVAS */}
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${currentLeader.accentColor} opacity-20 flex items-center justify-center relative overflow-hidden`}>
                  
                  {/* EDITORIAL INITIALS EMBLEM */}
                  <div className="text-7xl font-extrabold font-mono text-white/40 tracking-tighter select-none">
                    {currentLeader.initials}
                  </div>

                  {/* HIGH TECH OVERLAY LINES & NODES */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-mono text-brand-accent bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                    <Activity className="w-3 h-3 text-brand-accent animate-pulse" />
                    LIVE PROFILE SCAN
                  </div>

                  {/* LASER SWEEP LINE */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent animate-scanline" />

                  {/* TELEMETRY CORNER MARKS */}
                  <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-400 bg-black/70 px-2 py-0.5 rounded border border-white/10">
                    [SECURE VERIFIED]
                  </div>
                </div>

                {/* AMBIENT GLOW BEHIND PORTRAIT */}
                <div className="absolute -inset-2 bg-brand-500/20 blur-2xl rounded-3xl -z-10" />

              </div>

            </div>

          </div>

          {/* MOBILE STREAM (VERTICAL STACK) */}
          <div className="md:hidden space-y-12">
            {leaders.map((leader) => (
              <div key={leader.id} className="glass-panel-dark p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold font-mono text-brand-accent">{leader.id}</span>
                  <span className="text-xs font-mono text-brand-accent bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
                    {leader.role}
                  </span>
                </div>
                
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl font-extrabold font-mono text-white/30">{leader.initials}</span>
                  <div className="absolute top-3 left-3 text-[9px] font-mono text-brand-accent bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    {leader.telemetry}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white">{leader.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-brand-500 pl-3">
                  "{leader.bio}"
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM METRIC NAVIGATION HINT */}
        <div className="relative z-10 max-w-7xl mx-auto w-full hidden md:flex items-center justify-between text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            SCROLL TO EXPLORE LEADERSHIP TEAM
          </div>
          <div className="tracking-widest uppercase">
            LEADER {activeIndex + 1} OF 3
          </div>
        </div>

      </div>
    </section>
  );
}
