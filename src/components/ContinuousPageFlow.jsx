import React from 'react';

export default function ContinuousPageFlow() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* CONTINUOUS BIG ANIMATED SVG TRAJECTORY STREAM WEAVING DOWN THE ENTIRE PAGE */}
      <svg
        className="w-full h-full opacity-30"
        viewBox="0 0 1440 3600"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 900 200 C 1400 600, 100 1000, 400 1500 C 700 1900, 1300 2200, 300 2700 C -100 3100, 1200 3300, 720 3600"
          stroke="url(#page-flow-gradient)"
          strokeWidth="6"
          strokeDasharray="12 12"
          className="animate-pulse"
        />

        <path
          d="M 900 200 C 1400 600, 100 1000, 400 1500 C 700 1900, 1300 2200, 300 2700 C -100 3100, 1200 3300, 720 3600"
          stroke="url(#page-flow-glow)"
          strokeWidth="16"
          strokeOpacity="0.15"
        />

        <defs>
          <linearGradient id="page-flow-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="25%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#6E00FF" />
            <stop offset="75%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>

          <linearGradient id="page-flow-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#6E00FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
