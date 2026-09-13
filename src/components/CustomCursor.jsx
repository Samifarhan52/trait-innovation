import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering over interactive element
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* CENTRAL CROSSHAIR DOT */}
      <div
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-brand-accent rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-lg shadow-brand-accent ${
          isClicked ? 'scale-150 bg-white' : ''
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      {/* OUTER TELEMETRY RING */}
      <div
        className={`fixed top-0 left-0 border border-brand-500/60 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered
            ? 'w-14 h-14 bg-brand-500/10 border-brand-accent scale-110'
            : 'w-8 h-8 opacity-60'
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      {/* TELEMETRY COORDINATES BADGE */}
      <div
        className="fixed top-0 left-0 ml-5 mt-5 text-[9px] font-mono text-brand-accent bg-black/80 px-2 py-0.5 rounded border border-white/10 opacity-75 backdrop-blur-xs pointer-events-none"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        X:{Math.round(position.x)} Y:{Math.round(position.y)}
      </div>
    </div>
  );
}
