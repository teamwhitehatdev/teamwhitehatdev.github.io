import React from 'react';
import { X, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { CMSItem } from '../types';

interface ArticleModalProps {
  article: CMSItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

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
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-emerald-300 font-mono text-xs overflow-x-auto my-3 shadow-inner"
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
          <h1 key={idx} className="text-xl sm:text-2xl font-extrabold text-slate-900 pt-4 pb-2 border-b border-slate-200">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-lg sm:text-xl font-bold text-blue-700 pt-4 pb-1">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-slate-800 pt-3 pb-1">
            {line.replace('### ', '')}
          </h3>
        );
      }

      if (line.trim() === '---' || line.trim() === '***') {
        return <hr key={idx} className="border-slate-200 my-4" />;
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
        '<code class="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-blue-700 font-mono text-xs rounded">$1</code>'
      );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div className="space-y-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 uppercase">
                {article.category}
              </span>
              {article.badge && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full uppercase">
                  {article.badge}
                </span>
              )}
              {article.publishDate && (
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.publishDate}</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {article.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-all"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm leading-relaxed">
          {embedUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-black aspect-video w-full">
              {embedUrl.startsWith('http') && embedUrl.includes('embed') ? (
                <iframe
                  src={embedUrl}
                  title={article.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={embedUrl} controls className="w-full h-full object-contain" />
              )}
            </div>
          )}

          {article.mainImage && !embedUrl && (
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-200">
              <img
                src={article.mainImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
                }}
              />
            </div>
          )}

          {article.description && (
            <div className="p-4 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl text-slate-800 text-sm">
              <p className="font-medium">{article.description}</p>
            </div>
          )}

          <div className="space-y-1">
            {renderFormattedMarkdown(article.fullContent || article.description)}
          </div>

          {(article.url || article.referralUrl) && (
            <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200 rounded-2xl space-y-3 mt-8 shadow-xs">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Recommended Resource &amp; Official Partner Link</span>
              </div>
              <p className="text-xs text-slate-700">
                {article.referralCta ||
                  'Access official tools, free starter credits, or templates referenced in this tutorial.'}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={article.url || article.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
                >
                  <span>{article.buttonText || 'Open Official Resource →'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Free VA &amp; AI Learning Library • ID: {article.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArticleModal;
