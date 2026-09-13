import React, { useState, useEffect } from 'react';
import { Database, Cpu, Brain, CheckCircle, ArrowRight, Play, RefreshCw, Activity, Terminal } from 'lucide-react';

export default function DataToIntelligence() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      id: '01',
      title: 'RAW DATA',
      subtitle: 'Multi-Sensor Ingestion',
      description: 'Ingesting high-frequency telemetry, radar streams, satellite positioning, and avionics sensor logs in real time.',
      icon: Database,
      metrics: { rate: '1.4 million msgs/sec', status: 'Continuous Ingest', accuracy: '99.99%' },
      codeSnippet: `INGEST STREAM -> TelemetryPacket [48,000Hz]\nSATELLITE LINK -> Verified\nRADAR VECTOR -> Filtered (Kalman)`
    },
    {
      id: '02',
      title: 'ANALYSIS',
      subtitle: 'Neural Pattern Extraction',
      description: 'Deep neural networks process complex spatial trajectories, noise reduction, and predictive anomaly filtering.',
      icon: Cpu,
      metrics: { rate: '450 GFLOPS', status: 'Neural Inference', accuracy: '99.94%' },
      codeSnippet: `DEEP_FILTER -> MatrixMul (Tensors)\nANOMALY_SCAN -> 0 Defects Found\nCLASSIFIER -> Optimum Flight Curve`
    },
    {
      id: '03',
      title: 'INTELLIGENCE',
      subtitle: 'Predictive Synthesis',
      description: 'Transforming isolated data points into actionable domain intelligence, risk forecasting, and automated flight paths.',
      icon: Brain,
      metrics: { rate: '0.8ms Synthesis', status: 'Model Optimal', accuracy: '100.0%' },
      codeSnippet: `INTELLIGENCE_MESH -> Synthesize()\nPREDICTIVE_THREAT -> 0.000%\nPATH_OPTIMIZER -> +14.2% Efficiency`
    },
    {
      id: '04',
      title: 'DECISION',
      subtitle: 'Autonomous Execution',
      description: 'Executing closed-loop autonomous system commands with deterministic safety bounds and full operational transparency.',
      icon: CheckCircle,
      metrics: { rate: 'Instantaneous', status: 'Command Dispatched', accuracy: 'Deterministic' },
      codeSnippet: `EXECUTE_COMMAND -> VectorApproved\nFLIGHT_ACTUATOR -> Synced\nDECISION_LOG -> Tamper-Proof Audit`
    }
  ];

  // Auto-play step progression loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStep = steps[activeStep];

  return (
    <section className="py-24 lg:py-36 bg-[#060D1F] text-white relative overflow-hidden">
      
      {/* ATMOSPHERIC BACKGROUND RADIAL GLOW & NET */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-brand-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-[600px] h-[600px] bg-brand-purple/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-accent text-xs font-mono font-semibold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            THE INTELLIGENCE PIPELINE
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            From Data to Intelligence.
          </h2>
          <p className="text-lg text-slate-400 font-normal leading-relaxed">
            How complex real-time aviation telemetry transforms into autonomous high-precision operational decisions.
          </p>
        </div>

        {/* PIPELINE PROGRESSION STEPS (HORIZONTAL TICKER / SELECTOR) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? 'bg-slate-900 border-brand-accent shadow-2xl shadow-brand-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {/* ACTIVE PROGRESS BAR */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-accent animate-pulse" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-brand-accent' : 'text-slate-500'}`}>
                    {step.id}
                  </span>
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-brand-500/20 text-brand-accent' : 'bg-white/5 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* DISPLAYED STEP DETAILED VISUALIZER */}
        <div className="glass-panel-dark p-8 md:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: TEXT & METRICS */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-500/10 text-brand-accent border border-brand-500/30 text-xs font-mono">
              STAGE {currentStep.id} OF 04
            </div>

            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              {currentStep.title}: <span className="text-brand-accent">{currentStep.subtitle}</span>
            </h3>

            <p className="text-slate-300 leading-relaxed font-normal">
              {currentStep.description}
            </p>

            {/* METRIC GRID */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">PROCESSING RATE</div>
                <div className="text-sm font-bold font-mono text-white mt-1">{currentStep.metrics.rate}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">PIPELINE STATE</div>
                <div className="text-sm font-bold font-mono text-brand-accent mt-1">{currentStep.metrics.status}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">PRECISION</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-1">{currentStep.metrics.accuracy}</div>
              </div>
            </div>

          </div>

          {/* RIGHT: LIVE CODE & TERMINAL STREAM VISUALIZER */}
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-white/10 font-mono text-xs text-slate-300 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-accent" />
                <span className="text-white font-bold">AVIONICS ENGINE LOG</span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded"
              >
                {isPlaying ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                {isPlaying ? 'AUTO' : 'PAUSED'}
              </button>
            </div>

            <pre className="text-brand-accent leading-relaxed whitespace-pre-wrap font-mono text-[11px] bg-slate-900/60 p-4 rounded-xl border border-white/5">
              {currentStep.codeSnippet}
            </pre>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
              <span>SECURITY: ENCRYPTED (AES-256-GCM)</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE FEED
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
