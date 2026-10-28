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
      className={`relative group p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-xs text-slate-800 ${className}`}
    >
      {/* Header Bar if Title or Badge present */}
      {(title || badge) && (
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
          {title && (
            <span className="font-bold text-sm tracking-tight text-slate-900 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block"></span>
              <span>{title}</span>
            </span>
          )}
          {badge && (
            <span className="text-[11px] uppercase font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
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
export default HUDPanel;
