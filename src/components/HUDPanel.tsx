import React from 'react';

interface HUDPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glowColor?: 'cyan' | 'lime' | 'purple' | 'pink';
  badge?: string;
  customTheme?: 'transparent-purple-blue' | 'default';
}

export const HUDPanel: React.FC<HUDPanelProps> = ({
  children,
  title,
  className = '',
  badge,
  customTheme = 'default'
}) => {
  const isPurpleBlue = customTheme === 'transparent-purple-blue';

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all ${
        isPurpleBlue
          ? 'bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-blue-50/75 backdrop-blur-md border-2 border-indigo-200/90 shadow-lg'
          : 'white-glass-card'
      } ${className}`}
    >
      {/* Subtle Top Animated Architectural Shimmer Line */}
      <div className="relative h-1 w-full bg-slate-100 overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full w-1/3 animate-shimmer-slide ${
            isPurpleBlue
              ? 'bg-gradient-to-r from-transparent via-indigo-500 to-transparent'
              : 'bg-gradient-to-r from-transparent via-slate-400/70 to-transparent'
          }`}
        />
      </div>

      {/* Clean Minimalist Header Bar */}
      {(title || badge) && (
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isPurpleBlue
              ? 'bg-gradient-to-r from-indigo-100/90 via-purple-100/70 to-blue-100/90 border-indigo-200/90'
              : 'bg-slate-50/80 border-slate-200/80'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                isPurpleBlue ? 'bg-indigo-600' : 'bg-slate-900'
              }`}
            />
            {title && (
              <h3
                className={`font-extrabold text-xs sm:text-sm tracking-wide uppercase ${
                  isPurpleBlue ? 'text-indigo-950' : 'text-slate-900'
                }`}
              >
                {title}
              </h3>
            )}
          </div>
          {badge && (
            <span
              className={`px-3 py-1 text-[11px] font-bold uppercase rounded-full shadow-2xs ${
                isPurpleBlue
                  ? 'bg-indigo-600 text-white border border-indigo-700 shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
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
