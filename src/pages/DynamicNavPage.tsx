import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  ExternalLink,
  Video,
  Sparkles,
  ArrowLeft,
  Layers,
  X,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CMSItem, BuilderBlock } from '../types';
import { ArticleModal } from '../components/ArticleModal';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { HUDPanel } from '../components/HUDPanel';
import { getBlockTailwindClasses } from '../utils/builderCodeGenerator';

const RenderCustomBuilderBlock: React.FC<{ block: BuilderBlock }> = ({ block }) => {
  const twClasses = getBlockTailwindClasses(block);
  const s = block.styles || {};
  const inlineStyle = {
    backgroundColor: s.backgroundColor || undefined,
    color: s.textColor || undefined,
    borderColor: s.borderColor || undefined
  };

  switch (block.type) {
    case 'hero':
      return (
        <section className={`border border-slate-200/80 ${twClasses}`} style={inlineStyle}>
          <div className="max-w-4xl mx-auto text-center space-y-5">
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
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {block.title || 'Welcome'}
            </h1>
            {block.subtitle && (
              <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
                {block.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {block.buttonText && (
                <a
                  href={block.buttonLink || '#'}
                  className={`px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-md ${
                    block.buttonStyle === 'apple-green'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : block.buttonStyle === 'indigo'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {block.buttonText}
                </a>
              )}
              {block.secondaryButtonText && (
                <a
                  href={block.secondaryButtonLink || '#'}
                  className="px-6 py-3 font-bold rounded-xl text-sm transition-all border border-slate-300 hover:bg-slate-100/60 text-slate-800"
                >
                  {block.secondaryButtonText}
                </a>
              )}
            </div>
          </div>
        </section>
      );

    case 'heading':
      return (
        <div className={twClasses} style={inlineStyle}>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{block.title}</h2>
          {block.subtitle && <p className="text-sm opacity-75 mt-1">{block.subtitle}</p>}
        </div>
      );

    case 'paragraph':
      return (
        <div className={twClasses} style={inlineStyle}>
          <p className="text-sm sm:text-base leading-relaxed opacity-90">{block.content}</p>
        </div>
      );

    case 'features-grid':
    case '3-column':
      return (
        <div className={twClasses} style={inlineStyle}>
          {block.title && (
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold tracking-tight">{block.title}</h3>
              {block.subtitle && <p className="text-xs opacity-75 mt-1">{block.subtitle}</p>}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(block.gridItems || []).map((it) => (
              <div key={it.id} className="p-5 rounded-2xl border border-slate-200/90 bg-white/90 space-y-2.5 shadow-xs">
                {it.badge && (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                    {it.badge}
                  </span>
                )}
                <h4 className="text-base font-bold text-slate-900">{it.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{it.description}</p>
                {it.linkText && (
                  <a href={it.link || '#'} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800">
                    {it.linkText} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case '2-column':
      return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-slate-200 p-6 sm:p-8 ${twClasses}`} style={inlineStyle}>
          <div className="space-y-4">
            {block.badgeText && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                {block.badgeText}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{block.title}</h3>
            <p className="text-sm leading-relaxed opacity-85">{block.content}</p>
            {block.buttonText && (
              <a href={block.buttonLink || '#'} className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs">
                {block.buttonText}
              </a>
            )}
          </div>
          <div>
            <img src={block.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'} alt="Showcase" className="w-full h-auto rounded-xl object-cover shadow-sm max-h-80" />
          </div>
        </div>
      );

    case 'image':
      return (
        <figure className={`overflow-hidden border border-slate-200 ${twClasses}`} style={inlineStyle}>
          <img src={block.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'} alt={block.imageAlt || 'Banner'} className="w-full h-auto object-cover max-h-[500px]" />
          {(block.title || block.subtitle) && (
            <figcaption className="p-4 bg-white/90 border-t border-slate-100">
              {block.title && <h4 className="font-bold text-sm text-slate-900">{block.title}</h4>}
              {block.subtitle && <p className="text-xs text-slate-500">{block.subtitle}</p>}
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      return (
        <div className={`overflow-hidden border border-slate-200 ${twClasses}`} style={inlineStyle}>
          {block.title && <div className="p-4 border-b border-slate-100"><h4 className="font-bold text-sm text-slate-900">{block.title}</h4></div>}
          <div className="aspect-video w-full bg-slate-900 flex items-center justify-center">
            {block.videoUrl && (block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')) ? (
              <iframe className="w-full h-full" src={block.videoUrl.replace('watch?v=', 'embed/')} title={block.title || 'Video'} allowFullScreen />
            ) : block.videoUrl ? (
              <video className="w-full h-full object-cover" controls src={block.videoUrl} />
            ) : (
              <div className="text-white text-xs opacity-75">No video stream loaded</div>
            )}
          </div>
        </div>
      );

    case 'card':
      return (
        <div className={`border border-slate-200 p-6 space-y-3 ${twClasses}`} style={inlineStyle}>
          {block.badgeText && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800">{block.badgeText}</span>}
          <h3 className="text-xl font-bold tracking-tight">{block.title}</h3>
          {block.subtitle && <h5 className="text-xs font-semibold opacity-75">{block.subtitle}</h5>}
          <p className="text-sm leading-relaxed opacity-90">{block.content}</p>
          {block.buttonText && (
            <a href={block.buttonLink || '#'} className="inline-block mt-3 px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white">
              {block.buttonText}
            </a>
          )}
        </div>
      );

    case 'call-to-action':
      return (
        <div className={`border border-indigo-200 p-8 text-center space-y-4 bg-gradient-to-r from-indigo-50/80 to-emerald-50/80 ${twClasses}`} style={inlineStyle}>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{block.title || 'Ready to Scale?'}</h3>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">{block.content}</p>
          <div className="pt-2">
            <a href={block.buttonLink || '#'} className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all">
              <span>{block.buttonText || 'Get Started Now'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      );

    case 'accordion':
      return (
        <div className={twClasses} style={inlineStyle}>
          {block.title && <h3 className="text-2xl font-extrabold mb-4">{block.title}</h3>}
          <div className="space-y-3">
            {(block.accordionItems || []).map((it) => (
              <details key={it.id} className="p-4 rounded-xl border border-slate-200 bg-white/80 group">
                <summary className="font-bold text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{it.question}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed pt-2 border-t border-slate-100">{it.answer}</p>
              </details>
            ))}
          </div>
        </div>
      );

    case 'button':
      return (
        <div className={twClasses}>
          <a
            href={block.buttonLink || '#'}
            className={`inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-sm ${
              block.buttonStyle === 'apple-green'
                ? 'bg-emerald-600 text-white'
                : block.buttonStyle === 'indigo'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-white'
            }`}
            style={inlineStyle}
          >
            <span>{block.buttonText || 'Take Action'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      );

    case 'divider':
      return (
        <div className={`${twClasses} my-6`}>
          <hr className="border-t border-slate-200" style={inlineStyle} />
        </div>
      );

    case 'html-embed':
      return <div className={twClasses} dangerouslySetInnerHTML={{ __html: block.htmlContent || '' }} />;

    default:
      return null;
  }
};

export const DynamicNavPage: React.FC = () => {
  const { tabSlug } = useParams<{ tabSlug: string }>();
  const location = useLocation();
  const { navTabs, getPublicPageCMSItems } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);

  // Resolve current tab by slug or path
  const rawSlug = (
    tabSlug ||
    location.pathname.replace(/^\/page\//, '').replace(/^\//, '').replace(/\/$/, '')
  )
    .toLowerCase()
    .trim();

  const currentTab = (navTabs || []).find(
    (t) =>
      t.slug.toLowerCase() === rawSlug ||
      t.path.replace(/^\//, '').toLowerCase() === rawSlug
  );

  const effectiveSlug = currentTab?.slug || rawSlug || 'custom';
  const tabItems =
    typeof getPublicPageCMSItems === 'function' ? getPublicPageCMSItems(effectiveSlug) : [];

  // Build dynamic category pills from items in this tab
  const dynamicCategories = [
    'ALL',
    ...Array.from(
      new Set(
        tabItems
          .map((item) => (item.category || '').toUpperCase().trim())
          .filter(Boolean)
      )
    )
  ];

  const filteredItems = tabItems.filter((item) => {
    const matchesCat =
      selectedCategory === 'ALL' ||
      (item.category || '').toUpperCase().includes(selectedCategory);
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const pageTitle =
    currentTab?.heroTitle ||
    currentTab?.label ||
    rawSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const pageSubtitle =
    currentTab?.heroSubtitle ||
    `Explore curated guides, resources, tutorials, and media published under ${
      currentTab?.label || pageTitle
    }.`;

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-14 bg-transparent text-slate-900">
      {/* HERO HEADER (MINIMALIST WHITE GLASS CARD) */}
      <section className="white-glass-card rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-slate-700" />
              <span>{currentTab?.badge || currentTab?.label || 'Custom Navigation Section'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {pageTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {pageSubtitle}
            </p>
          </div>

          <Link
            to="/"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* RESPONSIVE SEARCH & CATEGORY FILTER BAR */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${currentTab?.label || 'this section'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-xs font-semibold text-slate-500 shrink-0">
              Showing <strong className="text-slate-900">{filteredItems.length}</strong> Published
              Items
            </div>
          </div>

          {dynamicCategories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CUSTOM DRAG & DROP BUILDER BLOCKS IF CONFIGURED ON THIS TAB */}
      {currentTab?.builderBlocks && currentTab.builderBlocks.length > 0 && (
        <div className="space-y-6 pb-4">
          {currentTab.builderBlocks.map((block) => (
            <RenderCustomBuilderBlock key={block.id} block={block} />
          ))}
        </div>
      )}

      {/* 2-COLUMN RESPONSIVE CONTENT + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <HUDPanel
            title={`${currentTab?.label || pageTitle} — Published Content (${filteredItems.length})`}
            badge="CMS Live"
          >
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  No Published Content Yet in "{currentTab?.label || pageTitle}"
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  You can add articles, tutorials, images, and videos to this navigation tab anytime
                  from the Admin CMS under Page Owner: <strong>{effectiveSlug}</strong>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredItems.map((item) => {
                  const showImage = Boolean(item.mainImage && !item.hideImage);
                  const showVideo = Boolean(item.videoUrl && !item.hideVideo);

                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 hover:border-slate-400 hover:-translate-y-1 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xs group"
                    >
                      {showImage && (
                        <div className="h-44 w-full relative overflow-hidden bg-slate-50 border-b border-slate-100">
                          <img
                            src={item.mainImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold rounded-full border border-slate-200 uppercase">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase">
                              {item.badge}
                            </span>
                          )}
                          {showVideo && (
                            <span className="absolute bottom-3 right-3 px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              <span>Video</span>
                            </span>
                          )}
                        </div>
                      )}

                      {!showImage && showVideo && (
                        <div className="w-full bg-slate-50 border-b border-slate-100">
                          {item.videoUrl!.includes('youtube.com') ||
                          item.videoUrl!.includes('youtu.be') ? (
                            <iframe
                              src={
                                item.videoUrl!.includes('watch?v=')
                                  ? item.videoUrl!.replace('watch?v=', 'embed/')
                                  : item.videoUrl
                              }
                              title={item.title}
                              className="w-full aspect-video border-0"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={item.videoUrl}
                              controls
                              className="w-full h-44 object-cover"
                            />
                          )}
                        </div>
                      )}

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          {!showImage && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-full border border-slate-200 uppercase">
                                {item.category}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}

                          <h3
                            onClick={() => setSelectedArticle(item)}
                            className="text-base font-extrabold text-slate-900 group-hover:underline cursor-pointer line-clamp-2"
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>
                          {item.price && (
                            <div className="text-xs font-extrabold text-slate-900 pt-1">
                              {item.price}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedArticle(item)}
                            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Open Details</span>
                          </button>

                          {(item.url || item.referralUrl) && (
                            <a
                              href={item.url || item.referralUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1"
                            >
                              <span>{item.buttonText || 'Open Link'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </HUDPanel>
        </div>

        <aside className="lg:col-span-1 space-y-6 sticky top-20 self-start">
          <DynamicAdsSidebar />
        </aside>
      </div>

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};

export default DynamicNavPage;
