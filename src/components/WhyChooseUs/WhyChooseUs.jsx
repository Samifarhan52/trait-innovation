import React from 'react';
import { Cpu, Layers, Layers3, UserCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const items = [
    {
      num: '01',
      title: 'INNOVATION-FIRST THINKING',
      description: 'TRAIT focuses on identifying meaningful problems and applying modern technology and AI to develop practical solutions.',
      icon: Cpu,
      telemetryMetric: 'Problem-First Approach'
    },
    {
      num: '02',
      title: 'PRACTICAL TECHNOLOGY',
      description: 'Technology is developed with real-world use cases and practical outcomes in mind. The goal is not technology for its own sake, but technology that can address genuine needs.',
      icon: Layers,
      telemetryMetric: 'Measurable Outcomes'
    },
    {
      num: '03',
      title: 'MULTI-INDUSTRY CAPABILITY',
      description: 'TRAIT works across different domains and use cases, including AI, legal technology, HR, e-commerce, aviation, events, customer support and data analytics.',
      icon: Layers3,
      telemetryMetric: 'Cross-Domain Expertise'
    },
    {
      num: '04',
      title: 'HUMAN-CENTERED SOLUTIONS',
      description: 'Technology should support people and decision-making rather than unnecessarily removing human involvement. Where appropriate, solutions keep people involved in review and decisions.',
      icon: UserCheck,
      telemetryMetric: 'Human-in-the-Loop AI'
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 lg:py-36 bg-gradient-to-b from-[#F3EFFF] via-[#ECE5FC] to-[#E6DCFA] relative overflow-hidden text-[#0A0F1D]">
      
      {/* ATMOSPHERIC LAVENDER GLOW */}
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[500px] bg-[#E0D5F7]/50 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-brand-700 text-xs font-mono font-bold tracking-wider uppercase border border-brand-500/20 shadow-xs">
            CORE PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Choose TRAIT Innovation
          </h2>
          <p className="text-lg text-slate-700 font-normal leading-relaxed">
            Applying modern technology to practical real-world problems.
          </p>
        </div>

        {/* 4 CORE IDEAS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.num}
                className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-brand-500/50 hover:bg-white transition-all duration-300 space-y-6 group hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-500/20">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase bg-slate-100 px-2.5 py-0.5 rounded">
                    {item.telemetryMetric}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-brand-accent group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
