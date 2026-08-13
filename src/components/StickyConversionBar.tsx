import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

export const StickyConversionBar: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => (
  <div className="fixed bottom-0 inset-x-0 z-30 bg-black/95 border-t border-cyan-500/40 p-3 font-mono">
    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2 text-cyan-400 font-bold">
        <Briefcase className="w-4 h-4 text-lime-400 animate-pulse" />
        <span className="hidden sm:inline text-white">READY TO SCALE YOUR BUSINESS WITH A DEDICATED VIRTUAL ASSISTANT?</span>
        <span className="sm:hidden text-white font-extrabold">HIRE EXECUTIVE VIRTUAL ASSISTANT</span>
      </div>

      <button
        onClick={onOpenConsultation}
        className="px-5 py-2 bg-gradient-to-r from-cyan-500 via-lime-400 to-cyan-500 text-black font-black font-rajdhani text-xs uppercase rounded-xl hover:opacity-95 transition-all flex items-center space-x-1 shadow-lg"
      >
        <span>HIRE VA (20% OFF)</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);
export default StickyConversionBar;
