import React from 'react';

interface HUDPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  badge?: string;
}

export const HUDPanel: React.FC<HUDPanelProps> = ({ children, className = '', title, badge }) => {
  return (
    <div className={`relative bg-black/75 backdrop-blur-md border border-[var(--border-color)] rounded-lg p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${className}`}>
      {/* Corner HUD Accent Vectors */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Optional Panel Header */}
      {(title || badge) && (
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4 font-mono">
          {title && (
            <h3 className="text-white font-orbitron font-bold text-sm tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[var(--primary-color)] inline-block"></span>
              <span>{title}</span>
            </h3>
          )}
          {badge && (
            <span className="text-[10px] text-[var(--secondary-color)] border border-[var(--secondary-color)] px-2 py-0.5 rounded font-bold uppercase tracking-widest bg-yellow-500/10">
              {badge}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
