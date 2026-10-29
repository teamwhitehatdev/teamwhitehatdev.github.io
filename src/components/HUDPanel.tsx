import React from 'react';

interface HUDPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glowColor?: 'cyan' | 'lime' | 'purple' | 'pink';
  badge?: string;
}

export const HUDPanel: React.FC<HUDPanelProps> = ({
  children,
  title,
  className = '',
  badge
}) => {
  return (
    <div
      className={`relative white-glass-card rounded-3xl overflow-hidden ${className}`}
    >
      {/* Subtle Top Animated Architectural Shimmer Line */}
      <div className="relative h-0.5 w-full bg-slate-100 overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-slate-400/70 to-transparent animate-shimmer-slide" />
      </div>

      {/* Clean Minimalist Header Bar */}
      {(title || badge) && (
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/80 border-b border-slate-200/80">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
            {title && (
              <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase text-slate-900">
                {title}
              </h3>
            )}
          </div>
          {badge && (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 relative z-10">{children}</div>
    </div>
  );
};

export default HUDPanel;
