import React from 'react';
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StickyConversionBar: React.FC<{ onOpenConsultation?: () => void }> = () => (
  <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5">
    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2 text-slate-700 font-medium">
        <GraduationCap className="w-4 h-4 text-slate-900 shrink-0" />
        <span className="hidden sm:inline text-slate-800 font-medium">
          100% Free Virtual Assistant &amp; AI Automation Portal — Step-by-step career blueprints &amp; workflow diagrams at zero cost.
        </span>
        <span className="sm:hidden text-slate-800 font-medium">
          100% Free VA &amp; AI Automation Guides
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/affiliate-guide"
          className="hidden md:inline-flex items-center space-x-1 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors border border-slate-200"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-700" />
          <span>Free VA Master Guide</span>
        </Link>

        <Link
          to="/ai"
          className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-all flex items-center space-x-1"
        >
          <span>AI Flow Diagrams</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  </div>
);
export default StickyConversionBar;
