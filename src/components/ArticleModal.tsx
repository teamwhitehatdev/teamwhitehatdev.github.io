import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Maximize2,
  Minimize2,
  RotateCcw
} from 'lucide-react';
import { CMSItem } from '../types';
import { useApp } from '../context/AppContext';
import { AdSenseSlot } from './AdSenseSlot';
import { isUserAdminOrDeveloper } from '../utils/adminAuth';
import {
  getEffectiveArticleDestination,
  saveCustomDestinationLink,
  removeCustomDestinationLink,
  getCustomDestinationLinks
} from '../utils/customDestinationLinks';

interface ArticleModalProps {
  article: CMSItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  const { cmsItems } = useApp();
  const [activeArticle, setActiveArticle] = useState<CMSItem | null>(article);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showMediaSection, setShowMediaSection] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isAdminOrDev, setIsAdminOrDev] = useState<boolean>(() => isUserAdminOrDeveloper());
  const [isEditingDestination, setIsEditingDestination] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customLabelInput, setCustomLabelInput] = useState('');
  const [linkSavedMsg, setLinkSavedMsg] = useState<string | null>(null);
  const [customLinksState, setCustomLinksState] = useState(() => getCustomDestinationLinks());
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveArticle(article);
    setShowMediaSection(false);
    setIsEditingDestination(false);
    if (article) {
      const dest = getEffectiveArticleDestination(article, customLinksState);
      setCustomUrlInput(dest.url);
      setCustomLabelInput(dest.label);
    }
  }, [article, customLinksState]);

  // Auth & Destination Links sync listeners
  useEffect(() => {
    const handleAuthChange = () => setIsAdminOrDev(isUserAdminOrDeveloper());
    const handleLinksChange = () => setCustomLinksState(getCustomDestinationLinks());
    window.addEventListener('wh_admin_auth_changed', handleAuthChange);
    window.addEventListener('wh_destination_links_changed', handleLinksChange);
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('storage', handleLinksChange);
    return () => {
      window.removeEventListener('wh_admin_auth_changed', handleAuthChange);
      window.removeEventListener('wh_destination_links_changed', handleLinksChange);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('storage', handleLinksChange);
    };
  }, []);

  // Strict Body Scroll Lock & Escape key listener
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !activeArticle) return null;

  const destination = getEffectiveArticleDestination(activeArticle, customLinksState);

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

  const handleSaveCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomDestinationLink(activeArticle.id, customUrlInput, customLabelInput);
    setIsEditingDestination(false);
    setLinkSavedMsg('Destination Link updated successfully!');
    setTimeout(() => setLinkSavedMsg(null), 3000);
  };

  const handleResetLink = () => {
    removeCustomDestinationLink(activeArticle.id);
    const def = getEffectiveArticleDestination(
      {
        id: activeArticle.id,
        url: activeArticle.url,
        referralUrl: activeArticle.referralUrl,
        buttonText: activeArticle.buttonText
      },
      {}
    );
    setCustomUrlInput(def.url);
    setCustomLabelInput(def.label);
    setIsEditingDestination(false);
    setLinkSavedMsg('Destination Link reset to default.');
    setTimeout(() => setLinkSavedMsg(null), 3000);
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
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-cyan-200 font-mono text-xs overflow-x-auto my-3 leading-relaxed"
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
            className="text-lg sm:text-2xl font-black text-slate-950 pt-4 pb-2 border-b border-slate-200 mt-2"
          >
            {line.replace('# ', '')}
          </h1>
        );
      }

      if (line.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-base sm:text-lg font-black text-slate-950 pt-4 pb-1.5 border-b border-slate-100 mt-3"
          >
            {line.replace('## ', '')}
          </h2>
        );
      }

      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm sm:text-base font-extrabold text-slate-950 pt-3 pb-1 mt-2">
            {line.replace('### ', '')}
          </h3>
        );
      }

      if (line.startsWith('> ')) {
        return (
          <blockquote
            key={idx}
            className="border-l-4 border-indigo-600 pl-4 py-2 my-2 bg-indigo-50/60 text-slate-900 text-xs sm:text-sm italic rounded-r-xl"
          >
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line.replace('> ', '')) }} />
          </blockquote>
        );
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li
            key={idx}
            className="ml-5 list-disc text-slate-700 text-xs sm:text-sm py-0.5 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatInlineMarkdown(line.replace(/^[-*]\s+/, ''))
            }}
          />
        );
      }

      if (/^\d+\.\s/.test(line)) {
        return (
          <li
            key={idx}
            className="ml-5 list-decimal text-slate-700 text-xs sm:text-sm py-0.5 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatInlineMarkdown(line.replace(/^\d+\.\s+/, ''))
            }}
          />
        );
      }

      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').filter((c) => c.trim() !== '');
        if (cells.every((c) => c.trim().match(/^-+$/))) {
          return null;
        }
        return (
          <div
            key={idx}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-slate-50 border border-slate-200 p-2.5 text-xs my-1 rounded-lg"
          >
            {cells.map((c, cIdx) => (
              <span
                key={cIdx}
                className="text-slate-800 font-medium"
                dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(c.trim()) }}
              />
            ))}
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p
          key={idx}
          className="text-slate-700 text-xs sm:text-sm leading-relaxed py-0.5"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
        />
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-950 font-black">$1</strong>')
      .replace(
        /`([^`]+)`/g,
        '<code class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-indigo-900 font-mono text-xs rounded font-bold">$1</code>'
      );
  };

  // Render via React Portal directly into document.body:
  // This guarantees absolutely fixed alignment in the current viewport with zero scroll offset errors!
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all"
      onClick={onClose}
    >
      {/* WINDOW POPPING OUT CONTAINER */}
      <div
        className={`relative bg-white border-2 border-slate-300 rounded-2xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden transition-all duration-150 animate-in fade-in zoom-in-95 ${
          isMaximized
            ? 'w-[98vw] h-[96vh] max-w-none max-h-none'
            : 'max-w-4xl w-full h-[88vh] max-h-[88vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* WINDOW OS TITLE BAR (WINDOWS POPPING OUT STYLE) */}
        <div className="bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
          {/* Left: Window Dots & Title Info */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Window OS Control Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer"
                title="Close Window"
              />
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer"
                title={isMaximized ? 'Restore Window' : 'Maximize Window'}
              />
              <button
                type="button"
                onClick={() => setShowMediaSection(!showMediaSection)}
                className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
                title="Toggle Media Preview"
              />
            </div>

            <div className="flex items-center gap-2 truncate">
              <span className="px-2 py-0.5 rounded bg-indigo-900/80 border border-indigo-700 text-indigo-200 text-[10px] font-mono font-bold uppercase shrink-0">
                {activeArticle.category.split('&')[0].trim()}
              </span>
              <span className="text-xs font-mono font-bold text-slate-200 truncate">
                {activeArticle.title}
              </span>
            </div>
          </div>

          {/* Right: Window Controls */}
          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>10–15 Min Read</span>
            </span>

            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer hidden sm:block"
              title={isMaximized ? 'Restore Size' : 'Maximize Window'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-rose-600 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              title="Close Guide"
            >
              <X className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold hidden md:inline">Close</span>
            </button>
          </div>
        </div>

        {/* SUB-HEADER METADATA BAR */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {activeArticle.badge && (
              <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded-md uppercase">
                {activeArticle.badge}
              </span>
            )}
            {activeArticle.publishDate && (
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{activeArticle.publishDate}</span>
              </span>
            )}
          </div>

          {destination.url && (
            <div className="flex items-center gap-1.5">
              <a
                href={destination.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-300 text-indigo-950 font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 shadow-2xs"
              >
                <span>{destination.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              {destination.isCustom && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
                  Custom
                </span>
              )}
            </div>
          )}
        </div>

        {/* MODAL BODY (SCROLLS SMOOTHLY INSIDE THE FIXED WINDOW) */}
        <div
          ref={modalContentRef}
          className="p-4 sm:p-7 overflow-y-auto space-y-4 flex-1 text-slate-700 text-sm leading-relaxed bg-white"
        >
          {/* TOAST MESSAGE IF LINK SAVED */}
          {linkSavedMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-between">
              <span>{linkSavedMsg}</span>
              <button
                type="button"
                onClick={() => setLinkSavedMsg(null)}
                className="text-emerald-700 hover:text-emerald-950"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ARTICLE MAIN TITLE */}
          <div className="space-y-1 pb-1">
            <h1 className="text-lg sm:text-2xl font-black text-slate-950 leading-tight">
              {activeArticle.title}
            </h1>
          </div>

          {/* EXECUTIVE OVERVIEW CALLOUT (DIRECTLY AT EYE-LEVEL) */}
          {activeArticle.description && (
            <div className="p-4 bg-indigo-50/70 border-l-4 border-indigo-600 rounded-r-2xl text-slate-900 text-xs sm:text-sm space-y-1 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 block">
                Executive Overview &amp; Learning Objective
              </span>
              <p className="font-semibold text-slate-900 leading-relaxed">{activeArticle.description}</p>
            </div>
          )}

          {/* COMPACT MEDIA DRAWER */}
          {(embedUrl || showImage) && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowMediaSection(!showMediaSection)}
                className="w-full px-3.5 py-2 flex items-center justify-between text-left hover:bg-slate-100 transition-colors cursor-pointer text-xs font-semibold text-slate-900"
              >
                <div className="flex items-center gap-2">
                  {embedUrl ? (
                    <PlayCircle className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  )}
                  <span className="font-bold text-slate-900 text-xs">
                    {embedUrl ? 'Video Walkthrough Available' : 'Featured Infographic / Image'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-mono font-bold">
                    {showMediaSection ? 'Hide' : 'Expand Media'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-600 font-bold">
                  <span>{showMediaSection ? '▲' : '▼'}</span>
                </div>
              </button>

              {showMediaSection && (
                <div className="p-3 border-t border-slate-200 space-y-3 bg-white">
                  {embedUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 w-full aspect-video">
                      {embedUrl.startsWith('http') && embedUrl.includes('embed') ? (
                        <iframe
                          src={embedUrl}
                          title={activeArticle.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video src={embedUrl} controls className="w-full h-full object-contain" />
                      )}
                    </div>
                  )}

                  {showImage && (
                    <div className="w-full max-h-64 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={activeArticle.mainImage}
                        alt={activeArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PRIMARY TUTORIAL / ARTICLE CONTENT */}
          <div className="space-y-1.5 pt-1">
            {renderFormattedMarkdown(activeArticle.fullContent || activeArticle.description)}
          </div>

          {/* IN-ARTICLE SPONSORED / GOOGLE ADSENSE MONETIZATION SLOT */}
          <AdSenseSlot placement="in-article" />

          {/* EXTENDED DEEP-DIVE MASTERCLASS BONUS: PRO TIPS, SOP & TEMPLATES */}
          <div className="border-t border-slate-200 pt-5 space-y-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <Lightbulb className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>Extended Practitioner Guide: Step-by-Step Execution &amp; Pro Tips</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                To master <strong>{activeArticle.title}</strong> in real client environments, follow this structured 4-phase implementation framework:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 1: Environment &amp; Requirements Audit
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Document client input sources, target turnaround times, and naming conventions in a shared SOP.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 2: Sandbox Prototype &amp; Dry Run
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Test the workflow on 3–5 sample records first. Verify formatting accuracy before live deployment.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 3: Quality Assurance (QA) Verification
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Cross-check links, permissions, grammar, and record a 60-second video walkthrough.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-900 block">
                    Phase 4: KPI Tracking &amp; Continuous Optimization
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Log hours saved, error reduction, or conversion lift in weekly client reports.
                  </p>
                </div>
              </div>
            </div>

            {/* MASTERCLASS COPY-PASTE PROMPT TEMPLATE */}
            <div className="bg-slate-950 text-white rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Copy-Paste Client Deliverable Master Prompt
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <pre className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-[11px] font-mono text-cyan-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {masterclassPromptTemplate}
              </pre>
            </div>
          </div>

          {/* OFFICIAL DESTINATION / REFERRAL LINK BOX */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-indigo-50/50 border border-slate-200 rounded-2xl space-y-3 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Destination Link &amp; Official Resource</span>
                {destination.isCustom && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300">
                    Custom Referral Active
                  </span>
                )}
              </div>
              {isAdminOrDev && (
                <button
                  type="button"
                  onClick={() => setIsEditingDestination(!isEditingDestination)}
                  className="text-xs font-mono text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingDestination ? 'Close Editor' : 'Edit Destination Link'}</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600">
              {activeArticle.referralCta ||
                'Access official tools, free starter credits, or templates referenced in this tutorial.'}
            </p>

            {isEditingDestination && isAdminOrDev ? (
              <form onSubmit={handleSaveCustomLink} className="p-3.5 bg-white border-2 border-indigo-200 rounded-xl space-y-3">
                <span className="text-xs font-mono font-bold text-slate-950 block">
                  Developer &amp; Admin: Customize Destination Link for this Guide:
                </span>
                <div>
                  <label className="text-[11px] font-mono text-slate-500 block mb-1 font-bold">
                    Target URL (Your Referral Link):
                  </label>
                  <input
                    type="url"
                    required
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://your-referral-link.com?ref=whitehatdev"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-500 block mb-1 font-bold">
                    Button Label:
                  </label>
                  <input
                    type="text"
                    value={customLabelInput}
                    onChange={(e) => setCustomLabelInput(e.target.value)}
                    placeholder="e.g. Try Meshy AI Free →"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-indigo-950 hover:bg-indigo-800 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    Save Destination Link
                  </button>
                  {destination.isCustom && (
                    <button
                      type="button"
                      onClick={handleResetLink}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 cursor-pointer"
                    >
                      Reset to Default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsEditingDestination(false)}
                    className="px-3 py-1.5 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              destination.url && (
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={destination.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-xs"
                  >
                    <span>{destination.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
                    {destination.url}
                  </span>
                </div>
              )
            )}
          </div>

          {/* KEEP READING — NEXT RECOMMENDED ARTICLES */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-900" />
                  <span>Next Recommended Tutorials &amp; Masterclasses</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setActiveArticle(rel)}
                    className="text-left p-3 rounded-xl border border-slate-200 hover:border-slate-900 bg-slate-50/70 hover:bg-white transition-all flex flex-col justify-between space-y-2 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700 inline-block font-mono">
                        {rel.category.split('&')[0].trim()}
                      </span>
                      <h5 className="text-xs font-extrabold text-slate-900 line-clamp-2 group-hover:underline">
                        {rel.title}
                      </h5>
                    </div>
                    <span className="text-[10px] font-bold text-slate-900 inline-flex items-center gap-1 pt-1">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* WINDOW STATUS BAR / FOOTER */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[11px] text-slate-500 font-mono truncate hidden sm:inline">
              Guide ID: {activeArticle.id}
            </span>
            {destination.url && (
              <a
                href={destination.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white hover:bg-indigo-50 border border-slate-300 text-indigo-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <span>{destination.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ArticleModal;
