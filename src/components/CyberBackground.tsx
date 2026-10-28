import React from 'react';

/**
 * Minimalist Architectural Light Background
 * Zero canvas CPU overhead — ultra-fast, smooth, responsive, and clean.
 */
export const CyberBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50"
      aria-hidden="true"
    >
      {/* Subtle top ambient radial wash */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.07) 0%, rgba(16, 185, 129, 0.04) 45%, transparent 75%)'
        }}
      />
      {/* Subtle architectural dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />
    </div>
  );
};

export default CyberBackground;
