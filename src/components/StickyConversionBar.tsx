import React from 'react';
import { Briefcase, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StickyConversionBar: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => (
  <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2 text-slate-700 font-medium">
        <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
        <span className="hidden sm:inline text-slate-800 font-semibold">
          Free VA &amp; AI Automation Academy — Learn skills for free or hire our dedicated Virtual Assistant team.
        </span>
        <span className="sm:hidden text-slate-800 font-semibold">
          Free VA Guides &amp; Dedicated VA Team
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/ai"
          className="hidden md:inline-flex items-center space-x-1 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors"
        >
          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
          <span>Free AI Flow Guides</span>
        </Link>

        <button
          onClick={onOpenConsultation}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-all flex items-center space-x-1 shadow-xs"
        >
          <span>Hire Dedicated VA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);
export default StickyConversionBar;
