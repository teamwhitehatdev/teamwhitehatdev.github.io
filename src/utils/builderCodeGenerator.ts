import { BuilderBlock, BuilderPageSettings } from '../types';

/**
 * Escapes unsafe HTML characters for raw string injection
 */
function escapeHtml(text?: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Maps Builder style properties to Tailwind CSS utility classes
 */
export function getBlockTailwindClasses(block: BuilderBlock): string {
  const s = block.styles || {};
  const classes: string[] = [];

  // Background
  if (s.backgroundColor) {
    if (s.backgroundColor.startsWith('#') || s.backgroundColor.startsWith('rgb')) {
      // Inline styles preferred, but handled
    } else {
      classes.push(s.backgroundColor);
    }
  }

  // Padding
  switch (s.paddingY) {
    case 'none': classes.push('py-0'); break;
    case 'sm': classes.push('py-4'); break;
    case 'md': classes.push('py-8'); break;
    case 'lg': classes.push('py-12'); break;
    case 'xl': classes.push('py-16'); break;
    default: classes.push('py-6');
  }

  switch (s.paddingX) {
    case 'none': classes.push('px-0'); break;
    case 'sm': classes.push('px-4'); break;
    case 'md': classes.push('px-6'); break;
    case 'lg': classes.push('px-8'); break;
    case 'xl': classes.push('px-12'); break;
    default: classes.push('px-6');
  }

  // Border Radius
  switch (s.borderRadius) {
    case 'none': classes.push('rounded-none'); break;
    case 'sm': classes.push('rounded-sm'); break;
    case 'md': classes.push('rounded-md'); break;
    case 'lg': classes.push('rounded-lg'); break;
    case 'xl': classes.push('rounded-xl'); break;
    case '2xl': classes.push('rounded-2xl'); break;
    case '3xl': classes.push('rounded-3xl'); break;
    case 'full': classes.push('rounded-full'); break;
    default: classes.push('rounded-2xl');
  }

  // Alignment
  switch (s.textAlign) {
    case 'center': classes.push('text-center'); break;
    case 'right': classes.push('text-right'); break;
    default: classes.push('text-left');
  }

  // Font family
  if (s.fontFamily === 'mono') classes.push('font-mono');
  else if (s.fontFamily === 'serif') classes.push('font-serif');
  else classes.push('font-sans');

  // Shadow
  switch (s.shadow) {
    case 'sm': classes.push('shadow-xs'); break;
    case 'md': classes.push('shadow-md'); break;
    case 'lg': classes.push('shadow-lg'); break;
    case 'xl': classes.push('shadow-xl'); break;
    case 'glow-emerald': classes.push('shadow-lg shadow-emerald-500/20'); break;
    case 'glow-indigo': classes.push('shadow-lg shadow-indigo-500/20'); break;
    default: break;
  }

  return classes.join(' ');
}

/**
 * Generate Standalone HTML with Tailwind CSS CDN
 */
export function generateStandaloneHtml(blocks: BuilderBlock[], settings: BuilderPageSettings): string {
  const blocksHtml = blocks.map((block) => renderBlockHtml(block)).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(settings.pageTitle || 'Custom Landing Page')}</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Inter & Share Tech Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Share+Tech+Mono&family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: ${settings.backgroundColor || '#f8fafc'};
      color: #0f172a;
    }
    .font-mono { font-family: 'Share Tech Mono', monospace; }
    .font-poppins { font-family: 'Poppins', sans-serif; }
    ${settings.customCss || ''}
  </style>
</head>
<body class="min-h-screen antialiased">
  <main class="${settings.maxWidth || 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
${blocksHtml}
  </main>
</body>
</html>`;
}

function renderBlockHtml(block: BuilderBlock): string {
  const s = block.styles || {};
  const bgStyle = s.backgroundColor ? `background-color: ${s.backgroundColor};` : '';
  const textStyle = s.textColor ? `color: ${s.textColor};` : '';
  const borderStyle = s.borderColor ? `border-color: ${s.borderColor}; border-width: ${s.borderWidth === 'medium' ? '2px' : s.borderWidth === 'thin' ? '1px' : '1px'};` : '';
  const inlineStyles = [bgStyle, textStyle, borderStyle].filter(Boolean).join(' ');
  const twClasses = getBlockTailwindClasses(block);

  switch (block.type) {
    case 'hero':
      return `    <!-- Hero Section -->
    <section class="border border-slate-200/80 ${twClasses}" style="${inlineStyles}">
      <div class="max-w-4xl mx-auto text-center space-y-5">
        ${block.badgeText ? `<span class="inline-flex items-center px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${block.badgeColor ? '' : 'bg-emerald-100 text-emerald-800'}" style="${block.badgeColor ? `background-color: ${block.badgeColor}20; color: ${block.badgeColor};` : ''}">${escapeHtml(block.badgeText)}</span>` : ''}
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">${escapeHtml(block.title || 'Enter Hero Headline')}</h1>
        ${block.subtitle ? `<p class="text-base sm:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">${escapeHtml(block.subtitle)}</p>` : ''}
        ${block.content ? `<p class="text-sm opacity-70 max-w-xl mx-auto">${escapeHtml(block.content)}</p>` : ''}
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          ${block.buttonText ? `<a href="${escapeHtml(block.buttonLink || '#')}" class="px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-md ${block.buttonStyle === 'apple-green' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : block.buttonStyle === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}">${escapeHtml(block.buttonText)}</a>` : ''}
          ${block.secondaryButtonText ? `<a href="${escapeHtml(block.secondaryButtonLink || '#')}" class="px-6 py-3 font-bold rounded-xl text-sm transition-all border border-slate-300 hover:bg-slate-100/60">${escapeHtml(block.secondaryButtonText)}</a>` : ''}
        </div>
      </div>
    </section>`;

    case 'heading': {
      const sizeClass = s.fontSize === '5xl' ? 'text-5xl' : s.fontSize === '4xl' ? 'text-4xl' : s.fontSize === '3xl' ? 'text-3xl' : s.fontSize === '2xl' ? 'text-2xl' : 'text-xl';
      return `    <!-- Heading -->
    <div class="${twClasses}" style="${inlineStyles}">
      <h2 class="${sizeClass} font-extrabold tracking-tight">${escapeHtml(block.title || 'Section Heading')}</h2>
      ${block.subtitle ? `<p class="text-sm opacity-75 mt-1">${escapeHtml(block.subtitle)}</p>` : ''}
    </div>`;
    }

    case 'paragraph':
      return `    <!-- Paragraph -->
    <div class="${twClasses}" style="${inlineStyles}">
      <p class="text-sm sm:text-base leading-relaxed opacity-90">${escapeHtml(block.content || 'Your paragraph description here...')}</p>
    </div>`;

    case 'button':
      return `    <!-- Action Button -->
    <div class="${twClasses}">
      <a href="${escapeHtml(block.buttonLink || '#')}" class="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-sm ${block.buttonStyle === 'apple-green' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : block.buttonStyle === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : block.buttonStyle === 'outline' ? 'border border-slate-300 hover:bg-slate-100 text-slate-800' : 'bg-slate-900 hover:bg-slate-800 text-white'}" style="${inlineStyles}">
        <span>${escapeHtml(block.buttonText || 'Take Action')}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>
    </div>`;

    case 'image':
      return `    <!-- Image Banner -->
    <figure class="overflow-hidden border border-slate-200 ${twClasses}" style="${inlineStyles}">
      <img src="${escapeHtml(block.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80')}" alt="${escapeHtml(block.imageAlt || block.title || 'Image')}" class="w-full h-auto object-cover max-h-[500px]" />
      ${block.title || block.subtitle ? `<figcaption class="p-4 bg-white/90 border-t border-slate-100"><h4 class="font-bold text-sm text-slate-900">${escapeHtml(block.title || '')}</h4><p class="text-xs text-slate-500">${escapeHtml(block.subtitle || '')}</p></figcaption>` : ''}
    </figure>`;

    case 'video':
      return `    <!-- Video Embed -->
    <div class="overflow-hidden border border-slate-200 ${twClasses}" style="${inlineStyles}">
      ${block.title ? `<div class="p-4 border-b border-slate-100"><h4 class="font-bold text-sm text-slate-900">${escapeHtml(block.title)}</h4></div>` : ''}
      <div class="aspect-video w-full bg-slate-900 flex items-center justify-center">
        ${block.videoUrl && (block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')) ? `
        <iframe class="w-full h-full" src="${escapeHtml(block.videoUrl.replace('watch?v=', 'embed/'))}" title="${escapeHtml(block.title || 'Video')}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : block.videoUrl ? `
        <video class="w-full h-full object-cover" controls src="${escapeHtml(block.videoUrl)}"></video>` : `
        <div class="text-white text-xs opacity-75">Paste video link in Inspector to stream</div>`}
      </div>
    </div>`;

    case 'card':
      return `    <!-- Content Card -->
    <div class="border border-slate-200 p-6 space-y-3 ${twClasses}" style="${inlineStyles}">
      ${block.badgeText ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800">${escapeHtml(block.badgeText)}</span>` : ''}
      <h3 class="text-xl font-bold tracking-tight">${escapeHtml(block.title || 'Card Title')}</h3>
      ${block.subtitle ? `<h5 class="text-xs font-semibold opacity-75">${escapeHtml(block.subtitle)}</h5>` : ''}
      <p class="text-sm leading-relaxed opacity-90">${escapeHtml(block.content || 'Content text...')}</p>
      ${block.buttonText ? `<a href="${escapeHtml(block.buttonLink || '#')}" class="inline-block mt-3 px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white">${escapeHtml(block.buttonText)}</a>` : ''}
    </div>`;

    case 'features-grid':
    case '3-column': {
      const items = block.gridItems || [
        { id: '1', title: 'Feature 01', description: 'Enterprise-grade speed and responsive architecture.' },
        { id: '2', title: 'Feature 02', description: 'Zero-latency AI automation diagrams and workflows.' },
        { id: '3', title: 'Feature 03', description: '100% full customizable CMS controls and drag & drop.' }
      ];
      const cols = block.columns || 3;
      const colClass = cols === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';

      return `    <!-- Features Grid (${cols} Columns) -->
    <div class="${twClasses}" style="${inlineStyles}">
      ${block.title ? `<div class="mb-6"><h3 class="text-2xl font-extrabold tracking-tight">${escapeHtml(block.title)}</h3>${block.subtitle ? `<p class="text-xs opacity-75 mt-1">${escapeHtml(block.subtitle)}</p>` : ''}</div>` : ''}
      <div class="grid ${colClass} gap-5">
        ${items.map((it) => `
        <div class="p-5 rounded-2xl border border-slate-200/90 bg-white/80 space-y-2.5 shadow-xs">
          ${it.badge ? `<span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">${escapeHtml(it.badge)}</span>` : ''}
          <h4 class="text-base font-bold text-slate-900">${escapeHtml(it.title)}</h4>
          <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(it.description)}</p>
          ${it.linkText ? `<a href="${escapeHtml(it.link || '#')}" class="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800">${escapeHtml(it.linkText)} &rarr;</a>` : ''}
        </div>`).join('')}
      </div>
    </div>`;
    }

    case '2-column':
      return `    <!-- 2-Column Split -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-slate-200 p-6 sm:p-8 ${twClasses}" style="${inlineStyles}">
      <div class="space-y-4">
        ${block.badgeText ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800">${escapeHtml(block.badgeText)}</span>` : ''}
        <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight">${escapeHtml(block.title || 'Two Column Split Section')}</h3>
        <p class="text-sm leading-relaxed opacity-85">${escapeHtml(block.content || 'Explain your high-converting product, service, or VA automation workflow here with balanced typography.')}</p>
        ${block.buttonText ? `<a href="${escapeHtml(block.buttonLink || '#')}" class="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs">${escapeHtml(block.buttonText)}</a>` : ''}
      </div>
      <div>
        <img src="${escapeHtml(block.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')}" alt="Media" class="w-full h-auto rounded-xl object-cover shadow-sm max-h-80" />
      </div>
    </div>`;

    case 'call-to-action':
      return `    <!-- Call to Action Banner -->
    <div class="border border-indigo-200 p-8 text-center space-y-4 bg-gradient-to-r from-indigo-50/80 to-emerald-50/80 ${twClasses}" style="${inlineStyles}">
      <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900">${escapeHtml(block.title || 'Ready to Scale Your Digital Career?')}</h3>
      <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">${escapeHtml(block.content || 'Join our private network, access free automation playbooks, and connect with top-tier international clients today.')}</p>
      <div class="pt-2">
        <a href="${escapeHtml(block.buttonLink || '#')}" class="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all">
          <span>${escapeHtml(block.buttonText || 'Get Started Now Free')}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
      </div>
    </div>`;

    case 'accordion': {
      const items = block.accordionItems || [
        { id: '1', question: 'How do I customize this page?', answer: 'Use the Admin Drag & Drop Website Builder to edit text, swap images, add videos, and change colors in real time.' },
        { id: '2', question: 'Is this responsive on mobile phones?', answer: 'Yes! All containers and typography use fully responsive Tailwind CSS breakpoints.' }
      ];
      return `    <!-- Accordion FAQ -->
    <div class="${twClasses}" style="${inlineStyles}">
      ${block.title ? `<h3 class="text-2xl font-extrabold mb-4">${escapeHtml(block.title)}</h3>` : ''}
      <div class="space-y-3">
        ${items.map((it) => `
        <details class="p-4 rounded-xl border border-slate-200 bg-white/80 group">
          <summary class="font-bold text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between">
            <span>${escapeHtml(it.question)}</span>
            <span class="text-xs text-slate-400 group-open:rotate-180 transition-transform">&#9660;</span>
          </summary>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed pt-2 border-t border-slate-100">${escapeHtml(it.answer)}</p>
        </details>`).join('')}
      </div>
    </div>`;
    }

    case 'divider':
      return `    <!-- Divider / Spacer -->
    <div class="${twClasses} my-6">
      <hr class="border-t border-slate-200" style="${inlineStyles}" />
    </div>`;

    case 'badge':
      return `    <!-- Status Badge -->
    <div class="${twClasses}">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style="${inlineStyles}">
        ${escapeHtml(block.badgeText || block.title || 'Cyber Tag')}
      </span>
    </div>`;

    case 'html-embed':
      return `    <!-- Custom HTML Embed -->
    <div class="${twClasses}">
      ${block.htmlContent || '<!-- Custom HTML Embed Block -->'}
    </div>`;

    default:
      return '';
  }
}

/**
 * Generate Clean React TSX Component Code
 */
export function generateReactJsx(blocks: BuilderBlock[], settings: BuilderPageSettings): string {
  const componentName = (settings.pageTitle || 'CustomLandingPage')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^[0-9]/, 'Page$&') || 'CustomLandingPage';

  return `import React from 'react';

/**
 * Auto-generated by Team WhiteHat Dev Visual Page Builder
 * Page: ${settings.pageTitle || 'Custom Page'}
 * Generated: ${new Date().toISOString()}
 */
export const ${componentName}: React.FC = () => {
  return (
    <div className="min-h-screen ${settings.backgroundColor ? '' : 'bg-slate-50'} text-slate-900 py-10 antialiased">
      <main className="${settings.maxWidth || 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
${blocks.map((b) => renderBlockJsx(b)).join('\n\n')}
      </main>
    </div>
  );
};

export default ${componentName};
`;
}

function renderBlockJsx(block: BuilderBlock): string {
  const twClasses = getBlockTailwindClasses(block);

  switch (block.type) {
    case 'hero':
      return `        {/* HERO SECTION */}
        <section className="border border-slate-200/80 ${twClasses}">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            {${JSON.stringify(block.badgeText || '')} && (
              <span className="inline-flex items-center px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800">
                {${JSON.stringify(block.badgeText || '')}}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {${JSON.stringify(block.title || 'Enter Hero Headline')}}
            </h1>
            {${JSON.stringify(block.subtitle || '')} && (
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {${JSON.stringify(block.subtitle || '')}}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="${block.buttonLink || '#'}"
                className="px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-md bg-slate-900 hover:bg-slate-800 text-white"
              >
                {${JSON.stringify(block.buttonText || 'Get Started')}}
              </a>
            </div>
          </div>
        </section>`;

    case 'heading':
      return `        {/* HEADING */}
        <div className="${twClasses}">
          <h2 className="text-3xl font-extrabold tracking-tight">{${JSON.stringify(block.title || 'Section Heading')}}</h2>
          {${JSON.stringify(block.subtitle || '')} && (
            <p className="text-sm text-slate-600 mt-1">{${JSON.stringify(block.subtitle || '')}}</p>
          )}
        </div>`;

    case 'paragraph':
      return `        {/* PARAGRAPH */}
        <div className="${twClasses}">
          <p className="text-sm sm:text-base leading-relaxed text-slate-700">{${JSON.stringify(block.content || '')}}</p>
        </div>`;

    case 'card':
      return `        {/* CONTENT CARD */}
        <div className="border border-slate-200 p-6 space-y-3 ${twClasses}">
          <h3 className="text-xl font-bold tracking-tight">{${JSON.stringify(block.title || 'Card Title')}}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{${JSON.stringify(block.content || '')}}</p>
        </div>`;

    case 'features-grid':
    case '3-column':
      return `        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ${twClasses}">
          {${JSON.stringify(block.gridItems || [])}.map((item: any) => (
            <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
              <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>`;

    default:
      return `        {/* ${block.type.toUpperCase()} */}
        <div className="${twClasses}">
          <h3 className="font-bold">{${JSON.stringify(block.title || block.type)}}</h3>
        </div>`;
  }
}

/**
 * Generate JSON Template for export & re-import
 */
export function generateJsonSchema(blocks: BuilderBlock[], settings: BuilderPageSettings): string {
  const schema = {
    generator: 'Team WhiteHat Dev Visual Page Builder (Wix / WordPress Style)',
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    settings,
    blocks
  };
  return JSON.stringify(schema, null, 2);
}
