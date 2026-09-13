import React from 'react';
import { Scale, Headphones, BarChart3, Users, ShoppingBag, Plane, Calendar, ArrowRight } from 'lucide-react';

export default function SolutionsGrid() {
  const solutions = [
    {
      title: 'ADVOCATEPRO AI',
      category: 'Legal Technology',
      description: 'AI-powered legal intelligence and workflow assistance supporting research, document analysis, and case workflows.',
      icon: Scale,
    },
    {
      title: 'AI CUSTOMER SUPPORT AGENT',
      category: 'Customer Support & Automation',
      description: 'Automated AI support agent handling customer questions, FAQs, support tickets, and seamless human escalation.',
      icon: Headphones,
    },
    {
      title: 'AI DATA ANALYSIS AGENT',
      category: 'Data & Business Intelligence',
      description: 'Analysing complex datasets to generate actionable insights, visualizations, reports, and operational recommendations.',
      icon: BarChart3,
    },
    {
      title: 'TRAIT HIREAI & INTERVIEW COACH',
      category: 'HR & Talent Technology',
      description: 'End-to-end talent lifecycle solution spanning sourcing, assessments, matching, and realistic practice AI interviews.',
      icon: Users,
    },
    {
      title: 'TRAIT COMMERCEAI',
      category: 'E-Commerce Intelligence',
      description: 'AI-enabled commerce assistance, analytics, personalized product recommendations, and operational automation.',
      icon: ShoppingBag,
    },
    {
      title: 'TRAIT AIRPORTAI & AVIATION ANALYTICS',
      category: 'Aero & Airport AI',
      description: 'AI passenger information, airport service navigation, and comprehensive operational analytics (flight, baggage, delay data).',
      icon: Plane,
    },
    {
      title: 'TRAIT EVENT MANAGEMENT',
      category: 'Event Services',
      description: 'End-to-end event planning, vendor coordination, guest logistics, and on-site production for corporate & family occasions.',
      icon: Calendar,
    }
  ];

  return (
    <section id="solutions" className="py-24 lg:py-36 bg-gradient-to-b from-[#EBF2FC] via-[#E2ECF9] to-[#DCE7F8] relative overflow-hidden text-[#0A0F1D]">
      
      {/* ATMOSPHERIC PASTEL GLOW */}
      <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-[#C9D6F3]/40 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* HEADER */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-brand-600 text-xs font-mono font-bold tracking-wider uppercase border border-brand-500/20 shadow-xs">
            FLAGSHIP SOLUTIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Technology Solutions for Real-World Impact
          </h2>
          <p className="text-lg text-slate-700 font-normal leading-relaxed">
            TRAIT Innovation develops specialized AI and digital products across multiple domains and industries.
          </p>
        </div>

        {/* SOLUTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => {
            const Icon = sol.icon;

            return (
              <div
                key={sol.title}
                className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-slate-900 text-brand-accent group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase bg-slate-100 px-3 py-1 rounded-full">
                      {sol.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-display group-hover:text-brand-600 transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {sol.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500 group-hover:text-brand-600">
                  <span>DISCOVER PLATFORM</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
