import React from 'react';
import { X, BookOpen, Clock, Calendar, Tag, ExternalLink, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { CMSItem } from '../types';

interface ArticleModalProps {
  article: CMSItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn select-none font-sans">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border-2 border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER BAR */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-cyan-500/30 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full font-mono text-[11px] font-bold uppercase flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
              {article.featured && (
                <span className="px-2.5 py-0.5 bg-lime-500/20 text-lime-300 border border-lime-400/40 rounded-full font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-lime-400" />
                  FEATURED GUIDE
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-orbitron text-white leading-tight">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Updated 2026'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                5 Min Read • Practical Guide
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-200">
          
          {/* MAIN IMAGE BANNER IF PRESENT */}
          {article.mainImage && (
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-xl max-h-72">
              <img
                src={article.mainImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* SUMMARY BOX */}
          {article.summary && (
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-sm leading-relaxed font-sans italic">
              "{article.summary}"
            </div>
          )}

          {/* ARTICLE CONTENT BODY */}
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300 font-sans whitespace-pre-line">
            {article.fullContent || article.description}
          </div>

          {/* RESPONSIBLE AFFILIATE & FINANCIAL DISCLAIMER */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2 font-mono">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>RESPONSIBLE EDUCATION & FINANCIAL DISCLAIMER</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              This article is provided for educational and skill development purposes. Team WhiteHat Dev does NOT guarantee specific income levels, client bookings, or financial results. Success in virtual assistance, freelancing, and affiliate marketing depends on your commitment, skills, strategy, client acquisition, and continuous effort.
            </p>
          </div>

          {/* CTA LINK IF PRESENT */}
          {article.url && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest block">
                  RECOMMENDED RESOURCE &amp; TOOL
                </span>
                <h4 className="text-sm font-bold font-orbitron text-white">
                  Explore {article.title}
                </h4>
              </div>

              <a
                href={article.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="px-5 py-3 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-black font-orbitron text-xs uppercase rounded-xl hover:scale-105 transition-all flex items-center gap-2 shrink-0 shadow-lg cursor-pointer"
              >
                <span>{article.buttonText || 'EXPLORE RESOURCE'} &rarr;</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>TEAM WHITEHAT DEV • LEARNING &amp; RESOURCE HUB</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
          >
            CLOSE ARTICLE
          </button>
        </div>

      </div>
    </div>
  );
};
