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
    <div
      className={`relative group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md text-slate-800 ${className}`}
    >
      {/* Subtle Top Accent Bar */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header Bar if Title or Badge present */}
      {(title || badge) && (
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
          {title && (
            <span className="font-bold text-sm tracking-tight text-slate-900 flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              <span>{title}</span>
            </span>
          )}
          {badge && (
            <span className="text-[11px] uppercase font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
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
