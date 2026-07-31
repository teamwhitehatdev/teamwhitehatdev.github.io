import React from 'react';

interface HUDPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  badge?: string;
}

export const HUDPanel: React.FC<HUDPanelProps> = ({
  children,
  className = '',
  title,
  badge
}) => {
  return (
    <div className={`relative group p-6 rounded-lg backdrop-blur-md bg-[var(--panel-bg)] border border-[var(--primary-color)]/30 hover:border-[var(--primary-color)] transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_15px_var(--glow-color)] ${className}`}>
      {/* Sci-Fi HUD Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary-color)] transition-all group-hover:w-5 group-hover:h-5"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary-color)] transition-all group-hover:w-5 group-hover:h-5"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary-color)] transition-all group-hover:w-5 group-hover:h-5"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary-color)] transition-all group-hover:w-5 group-hover:h-5"></div>

      {/* Decorative HUD Scan Line Accent */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent opacity-40 group-hover:opacity-100 transition-opacity"></div>

      {/* Header Bar if Title or Badge present */}
      {(title || badge) && (
        <div className="flex items-center justify-between border-b border-[var(--primary-color)]/20 pb-3 mb-4 font-mono">
          {title && (
            <span className="font-orbitron font-bold text-sm tracking-wider text-white flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-ping inline-block"></span>
              <span>{title}</span>
            </span>
          )}
          {badge && (
            <span className="text-[10px] uppercase font-bold text-[var(--secondary-color)] border border-[var(--secondary-color)]/40 px-2 py-0.5 rounded backdrop-blur-sm bg-black/40">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
