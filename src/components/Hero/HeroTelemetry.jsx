import React from 'react';
import { ShieldCheck, Zap, Activity } from 'lucide-react';

export default function HeroTelemetry() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {/* FLOATING TOP-RIGHT WIDGET */}
      <div className="absolute top-28 right-12 glass-panel p-4 rounded-2xl border border-slate-200/80 shadow-xl shadow-brand-500/5 max-w-xs animate-float">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Flight Telemetry</div>
            <div className="text-xs font-bold text-slate-900">Neural Avionics Array</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-100">
          <div>
            <span className="text-slate-400 block text-[9px]">LATENCY</span>
            <span className="font-semibold text-emerald-600">0.8ms</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px]">REDUNDANCY</span>
            <span className="font-semibold text-brand-500">TRIPLE NODE</span>
          </div>
        </div>
      </div>

      {/* FLOATING BOTTOM-LEFT WIDGET */}
      <div className="absolute bottom-20 left-12 glass-panel p-4 rounded-2xl border border-slate-200/80 shadow-xl shadow-brand-500/5 max-w-xs animate-float" style={{ animationDelay: '2s' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Operational Status</div>
            <div className="text-xs font-bold text-slate-900">FAA Compliant Mesh</div>
          </div>
        </div>
      </div>
    </div>
  );
}
