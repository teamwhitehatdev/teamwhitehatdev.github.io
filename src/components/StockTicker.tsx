import React from 'react';
import { BookOpen, Box, CheckCircle2, ExternalLink, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const MESHY_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const StockTicker: React.FC = () => {
  return (
    <div className="bg-white border-b border-slate-200 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Free Portal Status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center space-x-1.5 text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-700" />
            <span>100% Free VA &amp; Freelancer Intelligence Portal</span>
          </span>

          <Link
            to="/ai"
            className="hidden sm:inline-flex items-center space-x-1.5 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full font-medium text-[11px] transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
            <span>Explore Free AI &amp; Automation Flow Guides &rarr;</span>
          </Link>
        </div>

        {/* Right: Featured Referral Partner Link (Meshy AI 3D) */}
        <div className="flex items-center gap-3">
          <a
            href={MESHY_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-2.5 py-0.5 rounded-full font-semibold text-[11px] transition-colors"
          >
            <Box className="w-3.5 h-3.5 text-slate-800" />
            <span className="truncate max-w-[260px] sm:max-w-none">
              AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy
            </span>
            <ExternalLink className="w-3 h-3 text-slate-700 shrink-0" />
          </a>

          <Link
            to="/affiliate-guide"
            className="hidden md:inline-flex items-center space-x-1 text-slate-600 hover:text-slate-900 font-medium text-[11px]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Free VA Templates</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default StockTicker;
