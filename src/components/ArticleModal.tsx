import React from 'react';
import { X, Calendar, ExternalLink, Video, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { CMSItem } from '../types';

interface ArticleModalProps {
  article: CMSItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  // Helper to extract YouTube embed URL if standard watch URL is provided
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

  const embedUrl = getEmbedUrl(article.videoUrl);

  // High-performance Native Markdown Renderer without external package dependencies
  const renderFormattedMarkdown = (content: string) => {
    if (!content) return null;
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    return lines.map((line, idx) => {
      // Code blocks ```
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const code = codeBlockContent.join('\n');
          codeBlockContent = [];
          return (
            <pre key={idx} className="bg-black/90 border border-cyan-500/30 p-4 rounded-xl text-emerald-300 font-mono text-xs overflow-x-auto my-3">
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

      // Headings
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-xl sm:text-2xl font-black font-orbitron text-cyan-300 pt-4 pb-2 border-b border-cyan-500/20">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-lg sm:text-xl font-bold font-orbitron text-emerald-300 pt-4 pb-1">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-base font-bold font-orbitron text-lime-300 pt-3 pb-1">{line.replace('### ', '')}</h3>;
      }

      // Horizontal rules
      if (line.trim() === '---' || line.trim() === '***') {
        return <hr key={idx} className="border-gray-800 my-4" />;
      }

      // Bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-5 list-disc text-gray-300 py-0.5 text-xs sm:text-sm leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(bulletText) }} />
          </li>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        const itemText = line.trim().replace(/^\d+\.\s/, '');
        return (
          <li key={idx} className="ml-5 list-decimal text-gray-300 py-0.5 text-xs sm:text-sm leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </li>
        );
      }

      // Tables (simple markdown table row)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (line.includes('---')) return null; // Table divider
        const cells = line.split('|').filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1);
        return (
          <div key={idx} className="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-black/40 border border-gray-800 p-2 text-xs font-mono my-1 rounded">
            {cells.map((c, cIdx) => (
              <span key={cIdx} className="text-gray-300 font-medium" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(c.trim()) }} />
            ))}
          </div>
        );
      }

      // Blank line
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      // Standard paragraph
      return (
        <p key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed py-1" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-black border border-cyan-500/40 text-cyan-300 font-mono text-xs rounded">$1</code>');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-cyan-500/30 flex items-start justify-between bg-black/50">
          <div className="space-y-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold rounded-lg border border-cyan-500/40 uppercase">
                {article.category}
              </span>
              {article.badge && (
                <span className="px-3 py-1 bg-lime-400 text-black font-mono text-xs font-black rounded-lg uppercase shadow">
                  {article.badge}
                </span>
              )}
              {article.publishDate && (
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>{article.publishDate}</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-orbitron text-white leading-tight">
              {article.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-200 font-sans text-sm leading-relaxed">

          {/* VIDEO PLAYER EMBED (IF PRESENT) */}
          {embedUrl && (
            <div className="rounded-xl overflow-hidden border border-red-500/40 shadow-lg bg-black aspect-video w-full">
              {embedUrl.startsWith('http') && embedUrl.includes('embed') ? (
                <iframe
                  src={embedUrl}
                  title={article.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={embedUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          )}

          {/* HERO COVER IMAGE (IF PRESENT AND NO VIDEO) */}
          {article.mainImage && !embedUrl && (
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-cyan-500/30">
              <img
                src={article.mainImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
                }}
              />
            </div>
          )}

          {/* SHORT SUMMARY CALLOUT */}
          {article.description && (
            <div className="p-4 bg-cyan-950/40 border-l-4 border-cyan-400 rounded-r-xl text-cyan-100 text-xs font-mono">
              <p className="font-semibold">{article.description}</p>
            </div>
          )}

          {/* NATIVE FORMATTED MARKDOWN CONTENT */}
          <div className="space-y-1 font-sans">
            {renderFormattedMarkdown(article.fullContent || article.description)}
          </div>

          {/* FEATURED RESOURCE & ACTION CALLOUT BANNER */}
          {(article.url || article.referralUrl) && (
            <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 border-2 border-lime-400/50 rounded-2xl space-y-3 mt-8 shadow-xl">
              <div className="flex items-center gap-2 text-lime-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span>RECOMMENDED RESOURCE &amp; EXCLUSIVE OFFER</span>
              </div>
              <p className="text-xs text-gray-200">
                {article.referralCta || 'Access official resources, special discounted software tools, or hire verified technical developers & virtual assistants directly.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={article.url || article.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 text-black font-black font-orbitron text-xs uppercase rounded-xl hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                >
                  <span>{article.buttonText || 'VISIT OFFICIAL PARTNER LINK →'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-cyan-500/30 bg-black/60 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">
            WHITE HAT DEV CMS READER • ID: {article.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-mono font-bold rounded-lg transition-all"
          >
            CLOSE READER
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArticleModal;
