import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ArrowDown, Plane, Calendar, Monitor, Cpu, BarChart2, MoreHorizontal } from 'lucide-react';
import Hero3DCenterT from './Hero3DCenterT';

export default function HeroSection({ isDark }) {
  // Dynamic Changing Headline Phrases
  const dynamicWords = [
    'Real Impact.',
    'AI Innovation.',
    'Aero Intelligence.',
    'Legal Automation.',
    'Digital Growth.',
    'Smart Solutions.'
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % dynamicWords.length);
        setFadeState(true);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className={`relative min-h-screen pt-28 pb-12 lg:pt-36 lg:pb-20 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#040814] text-white' : 'bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/80 to-[#E2ECF9]/50 text-[#0A0F1D]'
    }`}>
      
      {/* ATMOSPHERIC BACKGROUND RADIAL GLOWS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-gradient-to-tr from-brand-500/15 via-brand-purple/10 to-brand-accent/20 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center relative z-10 my-auto">
        
        {/* LEFT COLUMN: TYPOGRAPHY & DYNAMICALLY CHANGING HEADLINE */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-8">
          
          {/* SMALL PILL EYEBROW */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider w-fit backdrop-blur-md shadow-sm border ${
            isDark ? 'bg-white/5 border-white/10 text-brand-accent' : 'bg-white/90 border-slate-200 text-slate-800'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
            <span className="uppercase text-[11px] font-semibold tracking-widest">
              TECHNOLOGY FOR A BRIGHTER TOMORROW
            </span>
          </div>

          {/* DYNAMICALLY CHANGING HEADLINE: TURNING BOLD IDEAS INTO [CHANGING WORD] */}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Turning <br />
            Bold Ideas <br />
            Into{' '}
            <span
              className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-accent to-brand-purple transition-all duration-400 transform ${
                fadeState ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95'
              }`}
            >
              {dynamicWords[wordIndex]}
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Trait Innovation builds intelligent technology solutions across industries — from AI and automation to aviation, events and beyond.
          </p>

          {/* CTAS (EXPLORE OUR SOLUTIONS & WATCH VIDEO) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#solutions"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900 hover:bg-brand-600 rounded-full shadow-xl shadow-slate-900/10 transition-all duration-300 group hover:scale-105"
            >
              Explore Our Solutions
              <ArrowRight className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            <button
              onClick={() => alert('Launching Trait Innovation Showcase Video')}
              className={`inline-flex items-center justify-center px-7 py-4 text-base font-semibold rounded-full border transition-all duration-300 group ${
                isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white/90 border-slate-200 hover:bg-slate-100 text-slate-800 shadow-sm'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center mr-2.5 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              Watch Video
            </button>
          </div>

          {/* METRICS ROW */}
          <div className={`pt-6 border-t grid grid-cols-3 gap-6 max-w-md text-left ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}>
            <div>
              <div className={`text-2xl font-black font-display tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>10+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Solution Areas</div>
            </div>
            <div>
              <div className="text-2xl font-black font-display tracking-tight text-brand-500">AI-Driven</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Innovation</div>
            </div>
            <div>
              <div className={`text-2xl font-black font-display tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Future-Ready</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Technology</div>
            </div>
          </div>

          {/* SCROLL INDICATOR */}
          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center animate-bounce">
              <ArrowDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </div>
            <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
          </div>

        </div>

        {/* RIGHT COLUMN: PROMINENT CENTRAL 'T' EMBLEM IMAGE & REVOLVING SERVICE CARDS WITH WIRES */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <Hero3DCenterT />
        </div>

      </div>

      {/* HERO BOTTOM TICKER BAR */}
      <div className={`w-full py-4 border-t border-b transition-colors ${
        isDark ? 'bg-slate-900/60 border-white/10 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-700'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <span className="font-bold text-slate-900 dark:text-white tracking-wider uppercase text-[11px]">
            SOLUTIONS FOR TOMORROW. TODAY.
          </span>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-brand-500" />
              <span>Aviation</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-purple" />
              <span>Event Management</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-brand-500" />
              <span>Web & Software</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-accent" />
              <span>AI & Automation</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-500" />
              <span>Consulting</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <MoreHorizontal className="w-4 h-4" />
              <span>And More</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
