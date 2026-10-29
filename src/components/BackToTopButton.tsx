import React, { useState } from 'react';
import { ArrowUp, RefreshCw } from 'lucide-react';

/**
 * Compact Minimalist "Back On The Top" + Auto-Refresh Floating Button
 * Positioned at the bottom-right of the screen across all desktop and mobile devices.
 * Scrolls back to the top and refreshes the website when clicked.
 */
export const BackToTopButton: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleBackToTopAndRefresh = () => {
    setIsRefreshing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.reload();
    }, 260);
  };

  return (
    <button
      onClick={handleBackToTopAndRefresh}
      title="Back On The Top & Refresh Website"
      aria-label="Back On The Top and Refresh"
      className="fixed bottom-20 right-3.5 sm:bottom-20 sm:right-6 z-40 group flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white border border-slate-700 shadow-lg transition-all cursor-pointer select-none"
    >
      {isRefreshing ? (
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
      ) : (
        <ArrowUp className="w-3.5 h-3.5 text-white group-hover:-translate-y-0.5 transition-transform" />
      )}
      <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
        Back On The Top
      </span>
    </button>
  );
};

export default BackToTopButton;
