import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  ExternalLink,
  Sparkles,
  PlayCircle,
  Clock,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import { CMSItem } from '../types';
import { useApp } from '../context/AppContext';
import { AdSenseSlot } from './AdSenseSlot';

interface ArticleModalProps {
  article: CMSItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  const { cmsItems } = useApp();
  const [activeArticle, setActiveArticle] = useState<CMSItem | null>(article);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    setActiveArticle(article);
  }, [article]);

  if (!isOpen || !activeArticle) return null;

  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const embedUrl = !activeArticle.hideVideo ? getEmbedUrl(activeArticle.videoUrl) : '';
  const showImage = Boolean(activeArticle.mainImage && !activeArticle.hideImage);

  // Pick 3 related articles so readers stay on the website reading more guides
  const relatedArticles = (cmsItems || [])
    .filter((i) => i.visible !== false && i.id !== activeArticle.id)
    .slice(0, 3);

  const masterclassPromptTemplate = `Act as a Senior Operations Architect & Virtual Assistant Mentor specializing in "${activeArticle.title}" (${activeArticle.category}).
1. Build a step-by-step Standard Operating Procedure (SOP) checklist for executing this workflow for an international client.
2. Provide 3 high-converting quality-control checks before delivering the final output.
3. Draft a concise End-of-Day (EOD) client update message summarizing the completed deliverable and measurable time saved.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterclassPromptTemplate);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const renderFormattedMarkdown = (content: string) => {
    if (!content) return null;
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    return lines.map((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const code = codeBlockContent.join('\n');
          codeBlockContent = [];
          return (
            <pre
              key={idx}
              className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-800 font-mono text-xs overflow-x-auto my-3 leading-relaxed"
            >
              <code>{code}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return null;
      }

      if (line.startsWith('# ')) {
        return (
          <h1
            key={idx}
            className="text-xl sm:text-2xl font-extrabold text-slate-900 pt-4 pb-2 border-b border-slate-200"
          >
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 pt-5 pb-1.5">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-slate-800 pt-3.5 pb-1">
            {line.replace('### ', '')}
          </h3>
        );
      }

      if (line.trim() === '---' || line.trim() === '***') {
        return <hr key={idx} className="border-slate-200 my-5" />;
      }

      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-5 list-disc text-slate-700 py-0.5 text-sm leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(bulletText) }} />
          </li>
        );
      }

      if (/^\d+\.\s/.test(line.trim())) {
        const itemText = line.trim().replace(/^\d+\.\s/, '');
        return (
          <li key={idx} className="ml-5 list-decimal text-slate-700 py-0.5 text-sm leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </li>
        );
      }

      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (line.includes('---')) return null;
        const cells = line.split('|').filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1);
        return (
          <div
            key={idx}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-slate-50 border border-slate-200 p-2.5 text-xs my-1 rounded-lg"
          >
            {cells.map((c, cIdx) => (
              <span
                key={cIdx}
                className="text-slate-700 font-medium"
                dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(c.trim()) }}
              />
            ))}
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p
          key={idx}
          className="text-slate-700 text-sm leading-relaxed py-1"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
        />
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(
        /`([^`]+)`/g,
        '<code class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs rounded">$1</code>'
      );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between bg-white">
          <div className="space-y-2 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-full border border-slate-200 uppercase">
                {activeArticle.category}
              </span>
              {activeArticle.badge && (
                <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full uppercase">
                  {activeArticle.badge}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-slate-700" />
                <span>10–15 Min Deep-Dive Guide</span>
              </span>
              {activeArticle.publishDate && (
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeArticle.publishDate}</span>
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {activeArticle.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm leading-relaxed bg-white">
          {/* VIDEO PLAYER IF PRESENT & NOT HIDDEN */}
          {embedUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 w-full">
              <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4 text-slate-700" />
                <span>Featured Video Walkthrough</span>
              </div>
              <div className="aspect-video w-full">
                {embedUrl.startsWith('http') && embedUrl.includes('embed') ? (
                  <iframe
                    src={embedUrl}
                    title={activeArticle.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={embedUrl} controls className="w-full h-full object-contain bg-slate-50" />
                )}
              </div>
            </div>
          )}

          {/* MAIN IMAGE IF PRESENT & NOT HIDDEN */}
          {showImage && (
            <div className="w-full h-60 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src={activeArticle.mainImage}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* EXECUTIVE OVERVIEW CALLOUT */}
          {activeArticle.description && (
            <div className="p-4 sm:p-5 bg-slate-50 border-l-4 border-slate-900 rounded-r-2xl text-slate-800 text-sm space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Executive Overview &amp; Learning Objective
              </span>
              <p className="font-semibold leading-relaxed">{activeArticle.description}</p>
            </div>
          )}

          {/* PRIMARY TUTORIAL / ARTICLE CONTENT */}
          <div className="space-y-1.5">
            {renderFormattedMarkdown(activeArticle.fullContent || activeArticle.description)}
          </div>

          {/* IN-ARTICLE THEMEFOREST / GOOGLE ADSENSE MONETIZATION SLOT */}
          <AdSenseSlot placement="in-article" />

          {/* ===================================================================== */}
          {/* EXTENDED DEEP-DIVE MASTERCLASS BONUS: PRO TIPS, SOP & TEMPLATES       */}
          {/* ===================================================================== */}
          <div className="border-t border-slate-200 pt-6 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <Lightbulb className="w-5 h-5 text-slate-900 shrink-0" />
                <span>Extended Practitioner Guide: Step-by-Step Execution &amp; Pro Tips</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To master <strong>{activeArticle.title}</strong> in real client environments, follow this structured 4-phase implementation framework used by top-rated remote Virtual Assistants and automation engineers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 1: Environment &amp; Requirements Audit
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Before building or executing, document the client&apos;s exact input sources, target turnaround time, naming conventions, and folder hierarchy inside a shared Notion or Google Doc SOP.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 2: Sandbox Prototype &amp; Dry Run
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Test the workflow on 3–5 sample records first. Verify formatting accuracy, edge-case handling, and mobile/desktop responsiveness before deploying across live client data.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 3: Quality Assurance (QA) Verification
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Cross-check all links, permissions, grammar, and visual alignment. Record a 60-second Loom video walkthrough demonstrating the finished result so the client can review asynchronously.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 4: KPI Tracking &amp; Continuous Optimization
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Log hours saved, error reduction, or conversion lift in your weekly EOD report. Quantifiable ROI is the #1 way to turn a starter task into a long-term monthly retainer.
                  </p>
                </div>
              </div>
            </div>

            {/* COPY-PASTE AI PROMPT / SOP GENERATOR */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-900" />
                  <span>Copy-Paste AI Prompt for This Topic</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt Template</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
                {masterclassPromptTemplate}
              </pre>
            </div>
          </div>

          {/* OFFICIAL PARTNER / RESOURCE CTA */}
          {(activeArticle.url || activeArticle.referralUrl) && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 mt-6">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-slate-700" />
                <span>Recommended Resource &amp; Official Partner Link</span>
              </div>
              <p className="text-xs text-slate-600">
                {activeArticle.referralCta ||
                  'Access official tools, free starter credits, or templates referenced in this tutorial.'}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={activeArticle.url || activeArticle.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
                >
                  <span>{activeArticle.buttonText || 'Open Official Resource →'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* KEEP READING — NEXT RECOMMENDED ARTICLES (KEEPS VISITORS ON WEBSITE LONGER) */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-900" />
                  <span>Keep Learning — Next Recommended Tutorials &amp; Guides</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">
                  Click any guide to read immediately
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setActiveArticle(rel)}
                    className="text-left p-3.5 rounded-2xl border border-slate-200 hover:border-slate-900 bg-slate-50/70 hover:bg-white transition-all flex flex-col justify-between space-y-2 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700 inline-block">
                        {rel.category}
                      </span>
                      <h5 className="text-xs font-extrabold text-slate-900 line-clamp-2 group-hover:underline">
                        {rel.title}
                      </h5>
                    </div>
                    <span className="text-[11px] font-bold text-slate-900 inline-flex items-center gap-1 pt-1">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Free VA &amp; AI Learning Library • ID: {activeArticle.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArticleModal;
