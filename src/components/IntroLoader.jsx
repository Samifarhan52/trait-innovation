import React, { useState, useEffect } from 'react';
import { Cpu, Activity, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const statusMessages = [
    'INITIALIZING NEURAL AVIONICS CORE...',
    'CALIBRATING 3D SUPERSONIC FLIGHT VECTOR...',
    'ESTABLISHING FAULT-TOLERANT MESH GRID...',
    'ENCRYPTING TELEMETRY STREAMS [AES-256]...',
    'AERO AI SYSTEM 100% OPERATIONAL'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsRevealing(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 20) setStatusIndex(0);
    else if (progress < 45) setStatusIndex(1);
    else if (progress < 70) setStatusIndex(2);
    else if (progress < 90) setStatusIndex(3);
    else setStatusIndex(4);
  }, [progress]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050914] text-white flex flex-col items-center justify-center p-6 transition-all duration-1000 ${
        isRevealing ? 'opacity-0 pointer-events-none scale-105 filter blur-md' : 'opacity-100 scale-100'
      }`}
    >
      {/* BACKGROUND HUD ROTATING RINGS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[500px] h-[500px] rounded-full border border-brand-accent animate-spin" style={{ animationDuration: '15s' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-brand-500 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
      </div>

      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        
        {/* LOGO ICON PULSE */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 border border-brand-500/50 shadow-2xl shadow-brand-500/30">
          <Cpu className="w-10 h-10 text-brand-accent animate-pulse" />
          <div className="absolute inset-0 rounded-2xl bg-brand-500/20 animate-ping opacity-75" />
        </div>

        {/* BRAND & INTRO TEXT */}
        <div>
          <h1 className="text-2xl font-black tracking-widest text-white font-mono uppercase">
            TRAIT<span className="text-brand-accent font-light">INOVATION</span>
          </h1>
          <p className="text-xs font-mono text-brand-500 tracking-widest uppercase mt-1">
            ADVANCED AERO AI SYSTEMS
          </p>
        </div>

        {/* PROGRESS COUNTER */}
        <div className="space-y-3">
          <div className="text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-500 to-white tracking-tighter">
            {progress}%
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-brand-accent rounded-full transition-all duration-150 shadow-lg shadow-brand-accent"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* STATUS LOG MESSAGE */}
          <div className="h-6 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-brand-accent animate-spin" />
            <span className="truncate">{statusMessages[statusIndex]}</span>
          </div>
        </div>

        {/* TELEMETRY METRIC CAPSULES */}
        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-500 pt-4 border-t border-white/10">
          <div className="bg-white/5 p-2 rounded border border-white/5">
            <span className="block text-slate-400">GPU CORE</span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/5">
            <span className="block text-slate-400">FPS STREAM</span>
            <span className="text-brand-accent font-bold">60.0 FPS</span>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/5">
            <span className="block text-slate-400">3D VECTOR</span>
            <span className="text-brand-500 font-bold">LOADED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
