import React from 'react';
import {
  ExternalLink,
  ChevronDown,
  Edit,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { BuilderBlock, BuilderPageSettings, NavTabConfig } from '../types';
import { getBlockTailwindClasses } from '../utils/builderCodeGenerator';
import { isUserAdminOrDeveloper } from '../utils/adminAuth';

interface BuilderPageRendererProps {
  blocks: BuilderBlock[];
  settings?: BuilderPageSettings;
  tab?: NavTabConfig;
  onOpenBuilder?: () => void;
  onRevertDefault?: () => void;
}

export const BuilderPageRenderer: React.FC<BuilderPageRendererProps> = ({
  blocks,
  settings,
  tab,
  onOpenBuilder,
  onRevertDefault
}) => {
  const isAdminOrDev = isUserAdminOrDeveloper();

  const maxWidthClass = settings?.maxWidth || 'max-w-7xl';
  const pageBg = settings?.backgroundColor || 'transparent';
  const fontFamilyClass =
    settings?.fontFamily === 'mono'
      ? 'font-mono'
      : settings?.fontFamily === 'serif'
      ? 'font-serif'
      : 'font-sans';

  const handleRevert = () => {
    if (
      window.confirm(
        `Revert "${tab?.label || 'this page'}" back to the standard code layout? (Your custom builder blocks will remain saved in memory)`
      )
    ) {
      if (onRevertDefault) {
        onRevertDefault();
      }
    }
  };

  const handleEdit = () => {
    if (onOpenBuilder) {
      onOpenBuilder();
    } else if (tab) {
      window.location.hash = `#/admin?builder=true&tab=${encodeURIComponent(tab.id)}`;
    }
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors pb-16 ${fontFamilyClass}`}
      style={{ backgroundColor: pageBg }}
    >
      {/* ADMIN FLOATING MANAGEMENT BAR (WHEN VIEWING BUILDER-CUSTOMIZED PAGE) */}
      {isAdminOrDev && (
        <div className="sticky top-16 z-40 bg-slate-950/90 backdrop-blur-md border-b border-indigo-900/60 text-white px-4 py-2.5 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-indigo-200">[Visual Builder Active]</span>
            <span className="text-slate-300 hidden sm:inline">
              Rendering {blocks.length} custom drag &amp; drop blocks for &quot;{tab?.label || 'This Page'}&quot;
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEdit}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Page in Builder</span>
            </button>

            {onRevertDefault && (
              <button
                type="button"
                onClick={handleRevert}
                className="px-3 py-1 bg-slate-800 hover:bg-rose-900 text-slate-200 hover:text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
                title="Restore default hardcoded layout"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden md:inline">Revert to Code Default</span>
                <span className="md:hidden">Revert</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* RENDERED BLOCKS CONTAINER */}
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6`}>
        {blocks.map((block) => (
          <RenderBlockItem key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};

/**
 * High-fidelity individual block renderer supporting all 16 builder block types
 * with accurate margins, borders, paddings, alignments, and multi-column grids.
 */
const RenderBlockItem: React.FC<{ block: BuilderBlock }> = ({ block }) => {
  const twClasses = getBlockTailwindClasses(block);
  const s = block.styles || {};
  const inlineStyle: React.CSSProperties = {
    backgroundColor: s.backgroundColor || undefined,
    color: s.textColor || undefined,
    borderColor: s.borderColor || undefined
  };

  const gapClass =
    s.columnGap === 'sm'
      ? 'gap-3'
      : s.columnGap === 'lg'
      ? 'gap-7'
      : s.columnGap === 'xl'
      ? 'gap-10'
      : 'gap-5';

  const alignItemsClass =
    s.verticalAlign === 'start'
      ? 'items-start'
      : s.verticalAlign === 'center'
      ? 'items-center'
      : 'items-stretch';

  switch (block.type) {
    case 'hero': {
      const destUrl = block.destinationLink || block.buttonLink || '#';
      const destTarget = block.destinationLinkTarget || '_self';

      return (
        <section className={`transition-all ${twClasses}`} style={inlineStyle}>
          <div className="max-w-4xl mx-auto space-y-5">
            {block.badgeText && (
              <span
                className="inline-flex items-center px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full"
                style={{
                  backgroundColor: block.badgeColor ? `${block.badgeColor}20` : '#10b98120',
                  color: block.badgeColor || '#065f46'
                }}
              >
                {block.badgeText}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
              {block.title || 'Welcome to Our Modern Portal'}
            </h1>
            {block.subtitle && (
              <p className="text-base sm:text-lg opacity-85 max-w-2xl mx-auto leading-relaxed">
                {block.subtitle}
              </p>
            )}
            {block.content && (
              <p className="text-sm opacity-75 max-w-2xl mx-auto leading-relaxed">
                {block.content}
              </p>
            )}
            <div
              className={`flex flex-wrap items-center gap-3 pt-3 ${
                s.textAlign === 'left'
                  ? 'justify-start'
                  : s.textAlign === 'right'
                  ? 'justify-end'
                  : 'justify-center'
              }`}
            >
              {block.buttonText && (
                <a
                  href={destUrl}
                  target={destTarget}
                  rel={destTarget === '_blank' ? 'noopener noreferrer' : undefined}
                  className={`px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                    block.buttonStyle === 'apple-green'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : block.buttonStyle === 'indigo'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : block.buttonStyle === 'outline'
                      ? 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{block.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {block.secondaryButtonText && (
                <a
                  href={block.secondaryButtonLink || '#'}
                  className="px-6 py-3 font-bold rounded-xl text-sm transition-all border border-slate-300 hover:bg-slate-100/70 text-slate-800 cursor-pointer"
                >
                  {block.secondaryButtonText}
                </a>
              )}
            </div>
          </div>
        </section>
      );
    }

    case 'heading':
      return (
        <div className={twClasses} style={inlineStyle}>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {block.title}
          </h2>
          {block.subtitle && (
            <p className="text-sm opacity-80 mt-1.5 leading-relaxed">
              {block.subtitle}
            </p>
          )}
        </div>
      );

    case 'paragraph':
      return (
        <div className={twClasses} style={inlineStyle}>
          <p className="text-sm sm:text-base leading-relaxed opacity-90 whitespace-pre-line">
            {block.content}
          </p>
        </div>
      );

    case 'empty-column': {
      const cols = block.columns || 3;
      const colClass =
        cols === 1
          ? 'grid-cols-1'
          : cols === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : cols === 4
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          : 'grid-cols-1 md:grid-cols-3';

      return (
        <div className={`space-y-5 ${twClasses}`} style={inlineStyle}>
          {(block.title || block.subtitle) && (
            <div className="space-y-1">
              {block.title && (
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {block.title}
                </h3>
              )}
              {block.subtitle && (
                <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
                  {block.subtitle}
                </p>
              )}
            </div>
          )}

          <div className={`grid ${colClass} ${gapClass} ${alignItemsClass}`}>
            {(block.customColumnsData || []).map((col, cIdx) => (
              <div
                key={col.id || `col-${cIdx}`}
                className="p-5 rounded-2xl border border-slate-200/90 bg-white/95 space-y-3 shadow-xs flex flex-col justify-between transition-all hover:border-indigo-400 hover:shadow-md h-full"
                style={{ backgroundColor: col.backgroundColor || undefined }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    {col.badge ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                        {col.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        COLUMN #{cIdx + 1}
                      </span>
                    )}
                  </div>

                  {col.imageUrl && (
                    <div className="overflow-hidden rounded-xl border border-slate-200 h-40 bg-slate-50">
                      <img
                        src={col.imageUrl}
                        alt={col.imageAlt || col.title || 'Column image'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {col.title && (
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {col.title}
                    </h4>
                  )}
                  {col.subtitle && (
                    <p className="text-xs text-indigo-700 font-semibold">{col.subtitle}</p>
                  )}
                  {col.content && (
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {col.content}
                    </p>
                  )}
                </div>

                {(col.destinationLink || col.buttonText) && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <a
                      href={col.destinationLink || '#'}
                      target={col.destinationLinkTarget || '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
                    >
                      <span>{col.buttonText || 'Explore Link'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'features-grid':
    case '3-column': {
      const cols = block.columns || 3;
      const colClass =
        cols === 1
          ? 'grid-cols-1'
          : cols === 4
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          : cols === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-3';

      const items = block.gridItems || [];

      return (
        <div className={twClasses} style={inlineStyle}>
          {(block.title || block.subtitle) && (
            <div className="mb-6 space-y-1">
              {block.title && (
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {block.title}
                </h3>
              )}
              {block.subtitle && (
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  {block.subtitle}
                </p>
              )}
            </div>
          )}

          <div className={`grid ${colClass} ${gapClass} ${alignItemsClass}`}>
            {items.map((it) => (
              <div
                key={it.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-white/95 space-y-3 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between h-full text-slate-900"
              >
                <div className="space-y-2">
                  {it.imageUrl && (
                    <img
                      src={it.imageUrl}
                      alt={it.title}
                      className="w-full h-36 object-cover rounded-xl mb-2 border border-slate-100"
                    />
                  )}
                  {it.badge && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase inline-block">
                      {it.badge}
                    </span>
                  )}
                  <h4 className="text-base font-extrabold text-slate-950 group-hover:text-indigo-600 transition-colors leading-snug">
                    {it.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {it.description}
                  </p>
                </div>

                {(it.link || it.linkText) && (
                  <a
                    href={it.link || '#'}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-2 border-t border-slate-100 mt-auto"
                  >
                    <span>{it.linkText || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case '2-column':
      return (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${gapClass} items-center ${twClasses}`}
          style={inlineStyle}
        >
          <div className="space-y-4">
            {block.badgeText && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-800 border border-slate-200 inline-block">
                {block.badgeText}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {block.title}
            </h3>
            {block.subtitle && (
              <p className="text-xs font-semibold opacity-75">{block.subtitle}</p>
            )}
            <p className="text-sm leading-relaxed opacity-85 whitespace-pre-line">
              {block.content}
            </p>
            {block.buttonText && (
              <a
                href={block.destinationLink || block.buttonLink || '#'}
                target={block.destinationLinkTarget || '_self'}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>{block.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <div>
            <img
              src={
                block.imageUrl ||
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
              }
              alt={block.imageAlt || 'Showcase'}
              className="w-full h-auto rounded-2xl object-cover shadow-sm max-h-80 border border-slate-200"
            />
          </div>
        </div>
      );

    case 'card':
      return (
        <div className={`space-y-3 ${twClasses}`} style={inlineStyle}>
          {block.badgeText && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-800 inline-block">
              {block.badgeText}
            </span>
          )}
          <h3 className="text-xl font-black tracking-tight">{block.title}</h3>
          {block.subtitle && (
            <h5 className="text-xs font-semibold opacity-75">{block.subtitle}</h5>
          )}
          <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line">{block.content}</p>
          {block.buttonText && (
            <a
              href={block.destinationLink || block.buttonLink || '#'}
              target={block.destinationLinkTarget || '_self'}
              className="inline-block mt-3 px-4 py-2 text-xs font-bold rounded-lg bg-slate-950 text-white hover:bg-slate-800 transition-all shadow-xs"
            >
              {block.buttonText}
            </a>
          )}
        </div>
      );

    case 'call-to-action':
      return (
        <div
          className={`text-center space-y-4 bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-emerald-50/90 ${twClasses}`}
          style={inlineStyle}
        >
          <h3 className="text-2xl sm:text-3xl font-black">
            {block.title || 'Ready to Scale?'}
          </h3>
          <p className="text-sm opacity-85 max-w-2xl mx-auto leading-relaxed">
            {block.content}
          </p>
          <div className="pt-2">
            <a
              href={block.destinationLink || block.buttonLink || '#'}
              target={block.destinationLinkTarget || '_self'}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>{block.buttonText || 'Get Started Now'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      );

    case 'accordion':
      return (
        <div className={twClasses} style={inlineStyle}>
          {block.title && (
            <h3 className="text-2xl font-black mb-4">{block.title}</h3>
          )}
          <div className="space-y-3">
            {(block.accordionItems || []).map((it) => (
              <details
                key={it.id}
                className="p-4 rounded-xl border border-slate-200 bg-white/95 text-slate-900 group"
              >
                <summary className="font-bold text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{it.question}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed pt-2 border-t border-slate-100">
                  {it.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      );

    case 'image':
      return (
        <figure className={`overflow-hidden ${twClasses}`} style={inlineStyle}>
          <img
            src={
              block.imageUrl ||
              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
            }
            alt={block.imageAlt || 'Banner'}
            className="w-full h-auto object-cover max-h-[500px] rounded-xl"
          />
          {(block.title || block.subtitle) && (
            <figcaption className="p-4 bg-white/95 border-t border-slate-100 mt-2 rounded-lg text-slate-900">
              {block.title && (
                <h4 className="font-bold text-sm text-slate-900">{block.title}</h4>
              )}
              {block.subtitle && (
                <p className="text-xs text-slate-500">{block.subtitle}</p>
              )}
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      return (
        <div className={`overflow-hidden ${twClasses}`} style={inlineStyle}>
          {block.title && (
            <div className="pb-3 mb-3 border-b border-slate-200/80">
              <h4 className="font-bold text-sm">{block.title}</h4>
            </div>
          )}
          <div className="aspect-video w-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
            {block.videoUrl &&
            (block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')) ? (
              <iframe
                className="w-full h-full"
                src={block.videoUrl.replace('watch?v=', 'embed/')}
                title={block.title || 'Video'}
                allowFullScreen
              />
            ) : block.videoUrl ? (
              <video className="w-full h-full object-cover" controls src={block.videoUrl} />
            ) : (
              <div className="text-white text-xs opacity-75">No video stream loaded</div>
            )}
          </div>
        </div>
      );

    case 'button':
      return (
        <div className={twClasses}>
          <a
            href={block.destinationLink || block.buttonLink || '#'}
            target={block.destinationLinkTarget || '_self'}
            className={`inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-xs cursor-pointer ${
              block.buttonStyle === 'apple-green'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : block.buttonStyle === 'indigo'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : block.buttonStyle === 'outline'
                ? 'border-2 border-slate-800 text-slate-900 hover:bg-slate-100'
                : 'bg-slate-950 hover:bg-slate-800 text-white'
            }`}
            style={inlineStyle}
          >
            <span>{block.buttonText || 'Take Action'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      );

    case 'divider':
      return (
        <div className={`${twClasses} my-4`}>
          <hr className="border-t border-slate-200" style={inlineStyle} />
        </div>
      );

    case 'badge':
      return (
        <div className={twClasses}>
          <span
            className="inline-flex items-center px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full"
            style={{
              backgroundColor: block.badgeColor ? `${block.badgeColor}20` : '#6366f120',
              color: block.badgeColor || '#4f46e5'
            }}
          >
            {block.badgeText || block.title || 'NEW ANNOUNCEMENT'}
          </span>
        </div>
      );

    case 'html-embed':
      return (
        <div
          className={twClasses}
          dangerouslySetInnerHTML={{ __html: block.htmlContent || '' }}
        />
      );

    default:
      return null;
  }
};

export default BuilderPageRenderer;
