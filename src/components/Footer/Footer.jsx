import React from 'react';
import { Cpu, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050914] text-slate-400 pt-20 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      
      {/* AMBIENT LIGHTING */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-brand-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-6">
            <a href="#hero" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white border border-white/10 shadow-lg">
                <Cpu className="w-5 h-5 text-brand-accent" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                  TRAIT<span className="text-brand-500 font-light">INOVATION</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase mt-0.5">
                  Aero AI Systems
                </span>
              </div>
            </a>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Engineering intelligence for the next era of aviation. Transform complex real-world operations into autonomous, scalable, and measurable AI systems.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="[LINKEDIN URL]"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-500 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 text-slate-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="[INSTAGRAM URL]"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-500 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 text-slate-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono text-white uppercase tracking-widest font-semibold">NAVIGATION</h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About', 'Solutions', 'Leadership', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-brand-accent transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO PLACEHOLDERS */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono text-white uppercase tracking-widest font-semibold">HEADQUARTERS</h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span className="text-slate-300">[COMPANY EMAIL]</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span className="text-slate-300">[COMPANY PHONE]</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span className="text-slate-300">[COMPANY LOCATION]</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM LEGAL & BACK TO TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            © 2026 TRAITINOVATION. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors ml-4"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
