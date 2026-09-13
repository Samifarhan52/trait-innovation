import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Cpu, Activity, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function LeadershipCards() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const leaders = [
    {
      id: '01',
      role: 'Founder',
      name: 'TRISHA RAY N',
      bio: 'Building the vision, innovation, and technology behind the company, with a focus on AI-driven solutions that solve real-world challenges.',
      initials: 'TR',
      badge: 'Vision & Architecture',
      telemetry: 'CORE SYSTEM // TECH LEAD',
      gradient: 'from-brand-500/20 via-brand-600/10 to-transparent'
    },
    {
      id: '02',
      role: 'Co-Founder',
      name: 'NANJUNDA RAYA GV',
      bio: 'Supporting the company’s strategic direction, growth, and long-term vision while helping build a strong foundation for sustainable innovation.',
      initials: 'NR',
      badge: 'Strategy & Scale',
      telemetry: 'FOUNDATION // SUSTAINABILITY',
      gradient: 'from-brand-purple/20 via-brand-500/10 to-transparent'
    },
    {
      id: '03',
      role: 'Chief Executive Officer',
      name: 'SUMANTH RANJAN',
      bio: 'Driving the company’s strategic execution, growth, and development while working closely with the leadership team to turn ideas into meaningful technology solutions.',
      initials: 'SR',
      badge: 'Execution & Operations',
      telemetry: 'GLOBAL EXECUTION // AI OPS',
      gradient: 'from-brand-accent/20 via-brand-purple/10 to-transparent'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="leadership" ref={sectionRef} className="py-28 lg:py-36 bg-[#070B14] text-white relative overflow-hidden">
      
      {/* ATMOSPHERIC BACKGROUND RADIAL GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-brand-500/10 via-brand-purple/10 to-brand-accent/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-accent text-xs font-mono font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            THE PEOPLE BEHIND THE VISION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Built by People Who Build What's Next.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            A leadership team focused on turning ambitious ideas into intelligent, scalable technology.
          </p>
        </div>

        {/* 3 HORIZONTAL LEADERSHIP CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className={`glass-panel-dark rounded-3xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-brand-accent/50 hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 180}ms` }}
            >
              {/* TOP ACCENT LINE SCAN */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* CARD BACKGROUND GLOW */}
              <div className={`absolute inset-0 bg-gradient-to-b ${leader.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10 space-y-6">
                
                {/* CARD HEADER: INDEX & ROLE BADGE */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-mono text-brand-accent">{leader.id}</span>
                  <span className="text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {leader.role}
                  </span>
                </div>

                {/* EDITORIAL PORTRAIT PLACEHOLDER */}
                <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  
                  {/* INITIALS EMBLEM */}
                  <span className="text-6xl font-black font-mono text-white/25 group-hover:text-brand-accent/40 transition-colors duration-500 tracking-tighter">
                    {leader.initials}
                  </span>

                  {/* HIGH TECH OVERLAY METRICS */}
                  <div className="absolute top-3 left-3 text-[9px] font-mono text-brand-accent bg-black/70 px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-brand-accent animate-pulse" />
                    {leader.telemetry}
                  </div>

                  {/* SCANLINE LASER ANIMATION */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent animate-scanline pointer-events-none" />

                  {/* CORNER VERIFIED CAPSULE */}
                  <div className="absolute bottom-3 right-3 text-[9px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                    VERIFIED
                  </div>
                </div>

                {/* NAME & BADGE */}
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight font-display group-hover:text-brand-accent transition-colors">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-mono text-brand-500 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    {leader.badge}
                  </div>
                </div>

                {/* BIO DESCRIPTION */}
                <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-brand-500 pl-3">
                  "{leader.bio}"
                </p>

              </div>

              {/* CARD FOOTER */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                <span>LEADERSHIP MESH</span>
                <ArrowUpRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
