import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="contact" className="py-24 lg:py-36 bg-slate-900 text-white relative overflow-hidden">
      
      {/* ATMOSPHERIC BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-brand-900 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-brand-500/20 via-brand-purple/20 to-brand-accent/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-accent text-xs font-mono font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
          START A CONVERSATION
        </div>

        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight font-display">
          LET'S BUILD <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-accent to-white">
            WHAT'S NEXT.
          </span>
        </h2>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Have an idea, challenge or opportunity? Let's start the conversation.
        </p>

        {/* CTA ACTION ROW */}
        <div className="pt-4 flex items-center justify-center">
          <a
            href="mailto:contact@traitinnovation.com"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-slate-900 bg-white rounded-2xl shadow-2xl hover:bg-brand-50 transition-all duration-300 group hover:scale-105"
          >
            LET'S TALK
            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-2 text-brand-500" />
          </a>
        </div>

      </div>
    </section>
  );
}
