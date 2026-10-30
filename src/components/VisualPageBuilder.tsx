import React, { useState, useRef } from 'react';
import {
  Layers,
  Layout,
  Type,
  Image as ImageIcon,
  Video,
  MousePointer,
  Square,
  HelpCircle,
  Megaphone,
  Code,
  Minus,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Trash2,
  Copy,
  Check,
  Download,
  Eye,
  Edit3,
  X,
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Save,
  RotateCcw,
  Palette,
  FileCode,
  Upload,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  BuilderBlock,
  BuilderBlockType,
  BuilderPageSettings,
  NavTabConfig,
  BuilderBlockStyle,
  BuilderGridItem,
  BuilderAccordionItem
} from '../types';
import { PREBUILT_BUILDER_TEMPLATES } from '../utils/builderTemplates';
import {
  generateStandaloneHtml,
  generateReactJsx,
  generateJsonSchema,
  getBlockTailwindClasses
} from '../utils/builderCodeGenerator';

interface VisualPageBuilderProps {
  initialTab?: NavTabConfig | null;
  navTabs: NavTabConfig[];
  onSaveToTab: (tabId: string, blocks: BuilderBlock[], settings: BuilderPageSettings) => void;
  onCreateNewTabWithBuilder: (tabData: Omit<NavTabConfig, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

export const VisualPageBuilder: React.FC<VisualPageBuilderProps> = ({
  initialTab,
  navTabs,
  onSaveToTab,
  onCreateNewTabWithBuilder,
  onClose
}) => {
  // Target tab state (or "new" tab)
  const [selectedTabId, setSelectedTabId] = useState<string>(
    initialTab?.id || (navTabs.length > 0 ? navTabs[0].id : 'new')
  );
  const [newTabLabel, setNewTabLabel] = useState<string>('My Custom Landing Page');
  const [newTabSlug, setNewTabSlug] = useState<string>('landing-page');

  // Page Settings
  const [pageSettings, setPageSettings] = useState<BuilderPageSettings>(() => {
    if (initialTab?.builderPageSettings) {
      return initialTab.builderPageSettings;
    }
    return {
      pageTitle: initialTab?.label || 'Custom Landing Page',
      pageSubtitle: initialTab?.heroSubtitle || 'Built with Team WhiteHat Dev Visual Page Builder.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    };
  });

  // Canvas Blocks
  const [blocks, setBlocks] = useState<BuilderBlock[]>(() => {
    if (initialTab?.builderBlocks && initialTab.builderBlocks.length > 0) {
      return initialTab.builderBlocks;
    }
    // Default to SaaS starter template
    return PREBUILT_BUILDER_TEMPLATES[0].blocks;
  });

  // Active Selected Block for Inspector
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    blocks.length > 0 ? blocks[0].id : null
  );

  // Inspector Sub-tab ('content' | 'style')
  const [inspectorTab, setInspectorTab] = useState<'content' | 'style'>('content');

  // Viewport mode: 'desktop' | 'tablet' | 'mobile'
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Preview Mode Toggle
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<'html' | 'jsx' | 'json'>('html');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Import JSON Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importError, setImportError] = useState<string>('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string>('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Drag and drop tracking
  const draggedIndexRef = useRef<number | null>(null);

  // Helper to get active block
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;

  // --------------------------------------------------------------------------
  // BLOCK MANIPULATION ACTIONS
  // --------------------------------------------------------------------------
  const handleAddBlock = (type: BuilderBlockType) => {
    const newId = `block-${Date.now()}`;
    let newBlock: BuilderBlock;

    const baseStyle: BuilderBlockStyle = {
      backgroundColor: '#ffffff',
      borderRadius: '2xl',
      paddingY: 'md',
      paddingX: 'md',
      textAlign: 'left',
      fontFamily: 'inter',
      shadow: 'sm',
      borderColor: '#e2e8f0',
      borderWidth: 'thin'
    };

    switch (type) {
      case 'hero':
        newBlock = {
          id: newId,
          type: 'hero',
          badgeText: 'New Opportunity',
          badgeColor: '#10b981',
          title: 'High-Converting Headline That Engages Visitors',
          subtitle: 'Detailed explanation of your value proposition, software features, or executive service offer.',
          buttonText: 'Get Started Today',
          buttonLink: '#',
          buttonStyle: 'apple-green',
          secondaryButtonText: 'Learn More',
          secondaryButtonLink: '#',
          styles: { ...baseStyle, textAlign: 'center', paddingY: 'xl', borderRadius: '3xl' }
        };
        break;

      case 'heading':
        newBlock = {
          id: newId,
          type: 'heading',
          title: 'New Section Heading',
          subtitle: 'A brief subheading offering context or instructions.',
          styles: { ...baseStyle, fontSize: '3xl', fontWeight: 'bold' }
        };
        break;

      case 'paragraph':
        newBlock = {
          id: newId,
          type: 'paragraph',
          content: 'Add high-clarity copy, case studies, workflow instructions, or value descriptions. You can style text colors, font sizes, and alignment in the right inspector.',
          styles: baseStyle
        };
        break;

      case 'features-grid':
      case '3-column':
        newBlock = {
          id: newId,
          type: 'features-grid',
          title: 'Core Features & Benefits',
          subtitle: 'Why our automated systems outperform traditional workflows.',
          columns: 3,
          gridItems: [
            { id: '1', title: 'Feature One', description: 'Enterprise-grade speed and reliability for daily tasks.', badge: 'Fast' },
            { id: '2', title: 'Feature Two', description: 'Zero-hallucination AI pipelines designed for VAs.', badge: 'Secure' },
            { id: '3', title: 'Feature Three', description: 'Seamless drag & drop CMS controls and live export.', badge: 'Flexible' }
          ],
          styles: { ...baseStyle, backgroundColor: '#f8fafc' }
        };
        break;

      case '2-column':
        newBlock = {
          id: newId,
          type: '2-column',
          title: 'Two-Column Showcase',
          content: 'Balance compelling promotional text on one side with high-resolution imagery or interactive diagrams on the other.',
          buttonText: 'Explore Solution',
          buttonLink: '#',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          styles: baseStyle
        };
        break;

      case 'image':
        newBlock = {
          id: newId,
          type: 'image',
          title: 'Interactive Diagram or Feature Showcase',
          subtitle: 'High-resolution media banner with optional title caption.',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Feature diagram banner',
          styles: { ...baseStyle, paddingY: 'none', paddingX: 'none' }
        };
        break;

      case 'video':
        newBlock = {
          id: newId,
          type: 'video',
          title: 'Product Walkthrough & Demonstration Video',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          styles: { ...baseStyle, backgroundColor: '#0f172a', paddingY: 'none', paddingX: 'none' }
        };
        break;

      case 'button':
        newBlock = {
          id: newId,
          type: 'button',
          buttonText: 'Click Here to Take Action',
          buttonLink: '#',
          buttonStyle: 'apple-green',
          styles: { ...baseStyle, textAlign: 'center' }
        };
        break;

      case 'card':
        newBlock = {
          id: newId,
          type: 'card',
          badgeText: 'Spotlight',
          title: 'Feature Spotlight Card',
          subtitle: 'Important announcement or special deal',
          content: 'Highlight a specialized niche playbook, partner discount, or software release here.',
          buttonText: 'View Details',
          buttonLink: '#',
          styles: baseStyle
        };
        break;

      case 'call-to-action':
        newBlock = {
          id: newId,
          type: 'call-to-action',
          title: 'Ready to Accelerate Your Freelance or Agency Career?',
          content: 'Access certified masterclasses, tested AI prompts, and direct partnership deals inside the WhiteHat Dev Portal.',
          buttonText: 'Join WhiteHat Dev Free',
          buttonLink: '#',
          buttonStyle: 'indigo',
          styles: { ...baseStyle, textAlign: 'center', shadow: 'glow-indigo' }
        };
        break;

      case 'accordion':
        newBlock = {
          id: newId,
          type: 'accordion',
          title: 'Frequently Asked Questions',
          accordionItems: [
            { id: '1', question: 'How do I edit or publish this custom page?', answer: 'Click the Save button at the top right to link this layout to any navigation tab.' },
            { id: '2', question: 'Can I export the code for WordPress or Wix?', answer: 'Yes! Click the Export button to get clean, standalone HTML/Tailwind CSS or React TSX.' }
          ],
          styles: baseStyle
        };
        break;

      case 'badge':
        newBlock = {
          id: newId,
          type: 'badge',
          badgeText: 'CERTIFIED AI MASTERCLASS',
          styles: { ...baseStyle, backgroundColor: '#10b98120', textColor: '#065f46', textAlign: 'center' }
        };
        break;

      case 'divider':
        newBlock = {
          id: newId,
          type: 'divider',
          dividerStyle: 'solid',
          styles: { ...baseStyle, paddingY: 'none', paddingX: 'none', borderColor: '#cbd5e1' }
        };
        break;

      case 'html-embed':
        newBlock = {
          id: newId,
          type: 'html-embed',
          title: 'Custom HTML Block',
          htmlContent: '<div class="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl"><code>// Custom embed: iframe, newsletter signup, or tracking widget</code></div>',
          styles: baseStyle
        };
        break;

      default:
        newBlock = {
          id: newId,
          type: 'paragraph',
          content: 'New content block...',
          styles: baseStyle
        };
    }

    setBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newId);
    showToast(`Added new ${type} element to page`);
  };

  const handleUpdateBlock = (id: string, updates: Partial<BuilderBlock>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const handleUpdateBlockStyles = (id: string, styleUpdates: Partial<BuilderBlockStyle>) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, styles: { ...b.styles, ...styleUpdates } } : b
      )
    );
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
    showToast('Block removed');
  };

  const handleDuplicateBlock = (id: string) => {
    const blockToDup = blocks.find((b) => b.id === id);
    if (!blockToDup) return;
    const duplicated: BuilderBlock = {
      ...JSON.parse(JSON.stringify(blockToDup)),
      id: `block-${Date.now()}`
    };
    const index = blocks.findIndex((b) => b.id === id);
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, duplicated);
    setBlocks(newBlocks);
    setSelectedBlockId(duplicated.id);
    showToast('Block duplicated');
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setBlocks(newBlocks);
  };

  // Drag and drop reordering
  const handleDragStart = (index: number) => {
    draggedIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    const dragIndex = draggedIndexRef.current;
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newBlocks = [...blocks];
    const draggedItem = newBlocks.splice(dragIndex, 1)[0];
    newBlocks.splice(dropIndex, 0, draggedItem);
    setBlocks(newBlocks);
    draggedIndexRef.current = null;
    showToast('Layout reordered');
  };

  // Template loader
  const handleLoadTemplate = (templateId: string) => {
    const tmpl = PREBUILT_BUILDER_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;
    if (window.confirm(`Load template "${tmpl.name}"? This will replace current blocks.`)) {
      setBlocks(JSON.parse(JSON.stringify(tmpl.blocks)));
      setPageSettings(JSON.parse(JSON.stringify(tmpl.settings)));
      if (tmpl.blocks.length > 0) {
        setSelectedBlockId(tmpl.blocks[0].id);
      }
      showToast(`Loaded "${tmpl.name}" template`);
    }
  };

  // Save to Navigation Tab
  const handleSave = () => {
    if (selectedTabId === 'new') {
      const cleanSlug = newTabSlug
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'new-landing-page';

      onCreateNewTabWithBuilder({
        label: newTabLabel || 'New Landing Page',
        slug: cleanSlug,
        path: `/page/${cleanSlug}`,
        visible: true,
        isExternal: false,
        heroTitle: pageSettings.pageTitle,
        heroSubtitle: pageSettings.pageSubtitle,
        badge: 'PAGE BUILDER',
        sortOrder: navTabs.length + 1,
        pageLayoutType: 'builder',
        builderBlocks: blocks,
        builderPageSettings: pageSettings
      });
      showToast(`Created new tab "${newTabLabel}" with custom drag & drop design!`);
      setTimeout(() => onClose(), 1200);
    } else {
      onSaveToTab(selectedTabId, blocks, pageSettings);
      const targetTab = navTabs.find((t) => t.id === selectedTabId);
      showToast(`Saved custom layout to navigation tab "${targetTab?.label || selectedTabId}"!`);
      setTimeout(() => onClose(), 1200);
    }
  };

  // Export code generator
  const getExportCode = () => {
    switch (exportFormat) {
      case 'html':
        return generateStandaloneHtml(blocks, pageSettings);
      case 'jsx':
        return generateReactJsx(blocks, pageSettings);
      case 'json':
        return generateJsonSchema(blocks, pageSettings);
      default:
        return '';
    }
  };

  const handleCopyCode = () => {
    const code = getExportCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
    showToast('Code copied to clipboard!');
  };

  const handleDownloadCode = () => {
    const code = getExportCode();
    let ext = 'html';
    let mime = 'text/html';
    if (exportFormat === 'jsx') {
      ext = 'tsx';
      mime = 'text/typescript';
    } else if (exportFormat === 'json') {
      ext = 'json';
      mime = 'application/json';
    }

    const filename = `${(pageSettings.pageTitle || 'custom-page')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')}-${exportFormat}.${ext}`;

    const blob = new Blob([code], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  };

  // Import JSON handler
  const handleImportJson = () => {
    try {
      setImportError('');
      const parsed = JSON.parse(importJsonText);
      if (parsed.blocks && Array.isArray(parsed.blocks)) {
        setBlocks(parsed.blocks);
        if (parsed.settings) {
          setPageSettings(parsed.settings);
        }
        setIsImportModalOpen(false);
        setImportJsonText('');
        showToast('Successfully imported website layout!');
      } else {
        setImportError('Invalid JSON format: missing "blocks" array.');
      }
    } catch (err: any) {
      setImportError(`JSON Parse Error: ${err.message}`);
    }
  };

  // Color Swatches
  const colorSwatches = [
    { label: 'Crisp White', value: '#ffffff' },
    { label: 'Soft Slate', value: '#f8fafc' },
    { label: 'Light Slate', value: '#f1f5f9' },
    { label: 'Apple Green', value: '#10b981' },
    { label: 'Cyber Indigo', value: '#6366f1' },
    { label: 'Deep Indigo', value: '#4338ca' },
    { label: 'Dark Slate', value: '#0f172a' },
    { label: 'Transparent', value: 'transparent' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col text-slate-900 select-none overflow-hidden">
      {/* ===================================================================== */}
      {/* 🚀 BUILDER TOP APPLICATION TOOLBAR                                    */}
      {/* ===================================================================== */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 shadow-xs z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block leading-tight">
                WordPress &amp; Wix Style Engine
              </span>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Visual Drag &amp; Drop Website Builder
              </h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200 text-xs">
            <span className="font-semibold text-slate-500">Target Tab:</span>
            <select
              value={selectedTabId}
              onChange={(e) => setSelectedTabId(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-xs text-slate-800 focus:outline-none focus:border-slate-900 cursor-pointer"
            >
              <option value="new">+ Create As Brand New Navigation Tab</option>
              {navTabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} (/{t.path.replace(/^\//, '')})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* VIEWPORT SWITCHER + ACTION BUTTONS */}
        <div className="flex items-center gap-2">
          {/* Responsive Device Switcher */}
          <div className="hidden sm:inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-white shadow-2xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewportMode === 'tablet' ? 'bg-white shadow-2xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-white shadow-2xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Mobile View (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Preview Toggle */}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
              isPreviewMode
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isPreviewMode ? 'Editing Mode' : 'Live Preview'}</span>
          </button>

          {/* Import JSON */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            title="Import JSON Layout"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Import JSON</span>
          </button>

          {/* Export Code Modal Trigger */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600" />
            <span>Export Full Code</span>
          </button>

          {/* Save to Tab */}
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save to Tab</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
            title="Close Builder"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* TOAST MESSAGE BANNER */}
      {toastMessage && (
        <div className="absolute top-18 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-slate-700 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 📐 MAIN 3-PANE WORKSPACE: PALETTE (LEFT) + CANVAS (CENTER) + INSPECTOR */}
      {/* ===================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* =================================================================== */}
        {/* 🎨 LEFT PALETTE: WIX / ELEMENTOR STYLE COMPONENT LIBRARY            */}
        {/* =================================================================== */}
        {!isPreviewMode && (
          <aside className="w-64 sm:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
            {/* TEMPLATE PICKER ACCORDION */}
            <div className="p-4 border-b border-slate-100 space-y-2 bg-slate-50/50">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                1-Click Starter Templates
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {PREBUILT_BUILDER_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleLoadTemplate(tmpl.id)}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="font-bold text-slate-800 group-hover:text-emerald-700 truncate">
                      {tmpl.name}
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold">{tmpl.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* DRAGGABLE & CLICKABLE COMPONENT BLOCKS */}
            <div className="p-4 space-y-5 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Layout &amp; Structure
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAddBlock('hero')}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Layout className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">Hero Banner</span>
                    <span className="text-[10px] text-slate-500">Headline + CTA</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('2-column')}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Square className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">2-Column Split</span>
                    <span className="text-[10px] text-slate-500">Text + Media</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('features-grid')}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">3-Col Grid</span>
                    <span className="text-[10px] text-slate-500">Feature Cards</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('card')}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Square className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">Panel Card</span>
                    <span className="text-[10px] text-slate-500">Glass Panel</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Typography &amp; Content
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAddBlock('heading')}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Type className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900">Heading</span>
                    <span className="text-[10px] text-slate-500">H1, H2, H3</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('paragraph')}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Edit3 className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900">Paragraph</span>
                    <span className="text-[10px] text-slate-500">Rich Description</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Media &amp; Interactive
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAddBlock('image')}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">Image Banner</span>
                    <span className="text-[10px] text-slate-500">Graphic / Photo</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('video')}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">Video Player</span>
                    <span className="text-[10px] text-slate-500">YouTube / Stream</span>
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Action &amp; Conversion
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAddBlock('button')}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <MousePointer className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900">CTA Button</span>
                    <span className="text-[10px] text-slate-500">Action Link</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('call-to-action')}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Megaphone className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900">CTA Banner</span>
                    <span className="text-[10px] text-slate-500">High Converting</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('accordion')}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900">Accordion FAQ</span>
                    <span className="text-[10px] text-slate-500">Collapsible</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('badge')}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-slate-900">Status Badge</span>
                    <span className="text-[10px] text-slate-500">Cyber Tag</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('divider')}
                    className="p-3 bg-slate-50 hover:bg-slate-200 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Minus className="w-4 h-4 text-slate-600" />
                    <span className="font-bold text-slate-900">Divider</span>
                    <span className="text-[10px] text-slate-500">Spacer Line</span>
                  </button>

                  <button
                    onClick={() => handleAddBlock('html-embed')}
                    className="p-3 bg-slate-50 hover:bg-slate-200 border border-slate-200 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1"
                  >
                    <Code className="w-4 h-4 text-slate-600" />
                    <span className="font-bold text-slate-900">HTML Embed</span>
                    <span className="text-[10px] text-slate-500">Raw Script/Iframe</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* =================================================================== */}
        {/* 🖥️ CENTER CANVAS: INTERACTIVE DRAG & DROP LIVE PREVIEW               */}
        {/* =================================================================== */}
        <main
          className="flex-1 bg-slate-200/70 p-4 sm:p-8 overflow-y-auto flex flex-col items-center"
          onClick={() => {
            // Deselect when clicking canvas background
          }}
        >
          {/* VIEWPORT SIZING CONTAINER */}
          <div
            className={`w-full transition-all duration-300 ${
              viewportMode === 'mobile'
                ? 'max-w-[390px] shadow-2xl rounded-3xl overflow-hidden border-8 border-slate-800 min-h-[750px] bg-slate-50 my-auto'
                : viewportMode === 'tablet'
                ? 'max-w-[768px] shadow-2xl rounded-2xl overflow-hidden border-4 border-slate-700 min-h-[700px] bg-slate-50'
                : `${pageSettings.maxWidth || 'max-w-7xl'}`
            }`}
            style={{ backgroundColor: pageSettings.backgroundColor || '#f8fafc' }}
          >
            {/* CANVAS BLOCKS CONTAINER */}
            <div className="p-4 sm:p-8 space-y-6">
              {blocks.length === 0 ? (
                <div className="py-20 text-center space-y-4 bg-white/70 border-2 border-dashed border-slate-300 rounded-3xl p-8">
                  <Layout className="w-12 h-12 text-slate-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-800">Your Canvas is Empty</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click any element from the left library or pick a starter template above to build your page.
                  </p>
                  <button
                    onClick={() => handleLoadTemplate('template-saas-landing')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Load SaaS Starter Template
                  </button>
                </div>
              ) : (
                blocks.map((block, index) => {
                  const isSelected = selectedBlockId === block.id && !isPreviewMode;
                  const twClasses = getBlockTailwindClasses(block);
                  const s = block.styles || {};
                  const inlineStyle = {
                    backgroundColor: s.backgroundColor || undefined,
                    color: s.textColor || undefined,
                    borderColor: s.borderColor || undefined
                  };

                  return (
                    <div
                      key={block.id}
                      draggable={!isPreviewMode}
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isPreviewMode) setSelectedBlockId(block.id);
                      }}
                      className={`relative group transition-all ${
                        isSelected
                          ? 'ring-2 ring-indigo-600 ring-offset-2 shadow-lg'
                          : 'hover:ring-1 hover:ring-slate-300'
                      }`}
                    >
                      {/* DRAG HANDLE & QUICK CONTROLS BAR (HOVER / SELECTED) */}
                      {!isPreviewMode && (
                        <div
                          className={`absolute -top-3.5 left-4 z-10 flex items-center gap-1 bg-slate-900 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-md transition-opacity ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <span className="cursor-grab active:cursor-grabbing font-mono">
                            ⠿ {block.type.toUpperCase()}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveBlock(index, 'up');
                            }}
                            className="p-1 hover:text-emerald-400 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveBlock(index, 'down');
                            }}
                            className="p-1 hover:text-emerald-400 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateBlock(block.id);
                            }}
                            className="p-1 hover:text-indigo-400 cursor-pointer"
                            title="Duplicate"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBlock(block.id);
                            }}
                            className="p-1 hover:text-red-400 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {/* RENDER THE BLOCK PREVIEW */}
                      <div className={`border border-slate-200/90 ${twClasses}`} style={inlineStyle}>
                        {block.type === 'hero' && (
                          <div className="space-y-4 max-w-4xl mx-auto">
                            {block.badgeText && (
                              <span
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                                style={{
                                  backgroundColor: block.badgeColor ? `${block.badgeColor}20` : '#10b98120',
                                  color: block.badgeColor || '#065f46'
                                }}
                              >
                                {block.badgeText}
                              </span>
                            )}
                            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                              {block.title || 'Headline'}
                            </h2>
                            {block.subtitle && (
                              <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
                                {block.subtitle}
                              </p>
                            )}
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                              {block.buttonText && (
                                <span
                                  className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md cursor-pointer ${
                                    block.buttonStyle === 'apple-green'
                                      ? 'bg-emerald-600 text-white'
                                      : block.buttonStyle === 'indigo'
                                      ? 'bg-indigo-600 text-white'
                                      : 'bg-slate-900 text-white'
                                  }`}
                                >
                                  {block.buttonText}
                                </span>
                              )}
                              {block.secondaryButtonText && (
                                <span className="px-6 py-3 rounded-xl font-bold text-sm border border-slate-300 text-slate-700 bg-white/60">
                                  {block.secondaryButtonText}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {block.type === 'heading' && (
                          <div className="space-y-1">
                            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                              {block.title || 'Heading'}
                            </h3>
                            {block.subtitle && <p className="text-sm opacity-75">{block.subtitle}</p>}
                          </div>
                        )}

                        {block.type === 'paragraph' && (
                          <p className="text-sm sm:text-base leading-relaxed opacity-90">
                            {block.content || 'Paragraph content...'}
                          </p>
                        )}

                        {block.type === '2-column' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="space-y-3">
                              {block.badgeText && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                                  {block.badgeText}
                                </span>
                              )}
                              <h3 className="text-2xl font-extrabold">{block.title || 'Two Column Title'}</h3>
                              <p className="text-sm opacity-85 leading-relaxed">{block.content}</p>
                              {block.buttonText && (
                                <span className="inline-block px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs">
                                  {block.buttonText}
                                </span>
                              )}
                            </div>
                            <div>
                              <img
                                src={block.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                                alt="Showcase"
                                className="w-full h-auto rounded-xl object-cover max-h-72 shadow-sm"
                              />
                            </div>
                          </div>
                        )}

                        {(block.type === 'features-grid' || block.type === '3-column') && (
                          <div className="space-y-4">
                            {block.title && (
                              <div>
                                <h3 className="text-2xl font-extrabold">{block.title}</h3>
                                {block.subtitle && <p className="text-xs opacity-75">{block.subtitle}</p>}
                              </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {(block.gridItems || []).map((it) => (
                                <div key={it.id} className="p-4 rounded-xl border border-slate-200/80 bg-white/90 space-y-2 shadow-2xs">
                                  {it.badge && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                                      {it.badge}
                                    </span>
                                  )}
                                  <h4 className="text-sm font-bold text-slate-900">{it.title}</h4>
                                  <p className="text-xs text-slate-600 leading-relaxed">{it.description}</p>
                                  {it.linkText && (
                                    <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                                      {it.linkText} &rarr;
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {block.type === 'image' && (
                          <div className="space-y-2">
                            <img
                              src={block.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'}
                              alt={block.imageAlt || 'Banner'}
                              className="w-full h-auto object-cover max-h-[450px] rounded-xl shadow-xs"
                            />
                            {(block.title || block.subtitle) && (
                              <div className="p-3 bg-white/80 rounded-lg border border-slate-100">
                                {block.title && <h4 className="font-bold text-xs text-slate-900">{block.title}</h4>}
                                {block.subtitle && <p className="text-[11px] text-slate-500">{block.subtitle}</p>}
                              </div>
                            )}
                          </div>
                        )}

                        {block.type === 'video' && (
                          <div className="space-y-2">
                            {block.title && <h4 className="font-bold text-sm text-slate-900">{block.title}</h4>}
                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                              {block.videoUrl && (block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')) ? (
                                <iframe
                                  src={block.videoUrl.replace('watch?v=', 'embed/')}
                                  title={block.title || 'Video'}
                                  className="w-full h-full"
                                  allowFullScreen
                                />
                              ) : block.videoUrl ? (
                                <video controls src={block.videoUrl} className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-white text-xs opacity-75">Paste video link in Inspector</div>
                              )}
                            </div>
                          </div>
                        )}

                        {block.type === 'button' && (
                          <div>
                            <span
                              className={`inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-sm shadow-xs ${
                                block.buttonStyle === 'apple-green'
                                  ? 'bg-emerald-600 text-white'
                                  : block.buttonStyle === 'indigo'
                                  ? 'bg-indigo-600 text-white'
                                  : block.buttonStyle === 'outline'
                                  ? 'border border-slate-300 text-slate-800'
                                  : 'bg-slate-900 text-white'
                              }`}
                            >
                              <span>{block.buttonText || 'Take Action'}</span>
                              <ExternalLink className="w-4 h-4" />
                            </span>
                          </div>
                        )}

                        {block.type === 'card' && (
                          <div className="space-y-2">
                            {block.badgeText && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                                {block.badgeText}
                              </span>
                            )}
                            <h3 className="text-xl font-bold">{block.title || 'Card Headline'}</h3>
                            {block.subtitle && <h5 className="text-xs font-semibold opacity-75">{block.subtitle}</h5>}
                            <p className="text-sm opacity-90 leading-relaxed">{block.content}</p>
                            {block.buttonText && (
                              <span className="inline-block mt-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">
                                {block.buttonText}
                              </span>
                            )}
                          </div>
                        )}

                        {block.type === 'call-to-action' && (
                          <div className="text-center space-y-3 max-w-2xl mx-auto">
                            <h3 className="text-2xl sm:text-3xl font-extrabold">{block.title || 'Call to Action'}</h3>
                            <p className="text-sm opacity-85 leading-relaxed">{block.content}</p>
                            <span className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer">
                              <span>{block.buttonText || 'Get Started Now'}</span>
                              <ExternalLink className="w-4 h-4" />
                            </span>
                          </div>
                        )}

                        {block.type === 'accordion' && (
                          <div className="space-y-3">
                            {block.title && <h3 className="text-xl font-extrabold mb-3">{block.title}</h3>}
                            {(block.accordionItems || []).map((it) => (
                              <div key={it.id} className="p-3.5 rounded-xl border border-slate-200 bg-white/90">
                                <div className="font-bold text-sm text-slate-900 flex items-center justify-between">
                                  <span>{it.question}</span>
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>
                                <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-100 leading-relaxed">
                                  {it.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {block.type === 'badge' && (
                          <div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                              {block.badgeText || 'Cyber Badge'}
                            </span>
                          </div>
                        )}

                        {block.type === 'divider' && <hr className="border-t border-slate-300 my-2" />}

                        {block.type === 'html-embed' && (
                          <div dangerouslySetInnerHTML={{ __html: block.htmlContent || '' }} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>

        {/* =================================================================== */}
        {/* 🎛️ RIGHT INSPECTOR: WIX / ELEMENTOR STYLE DESIGN & CONTENT CONTROLS */}
        {/* =================================================================== */}
        {!isPreviewMode && selectedBlock && (
          <aside className="w-72 sm:w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Element Inspector
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase">
                  {selectedBlock.type}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBlockId(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* INSPECTOR SUB-TABS (CONTENT vs DESIGN) */}
            <div className="flex border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => setInspectorTab('content')}
                className={`flex-1 py-2.5 text-center border-b-2 transition-all cursor-pointer ${
                  inspectorTab === 'content'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Content &amp; Media
              </button>
              <button
                onClick={() => setInspectorTab('style')}
                className={`flex-1 py-2.5 text-center border-b-2 transition-all cursor-pointer ${
                  inspectorTab === 'style'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Colors &amp; Styles
              </button>
            </div>

            {/* TAB 1: CONTENT EDITING */}
            {inspectorTab === 'content' && (
              <div className="p-4 space-y-4 text-xs">
                {/* Title */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Headline / Title</label>
                  <input
                    type="text"
                    value={selectedBlock.title || ''}
                    onChange={(e) => handleUpdateBlock(selectedBlock.id, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-slate-900"
                    placeholder="Enter headline..."
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={selectedBlock.subtitle || ''}
                    onChange={(e) => handleUpdateBlock(selectedBlock.id, { subtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-slate-900"
                    placeholder="Enter subtitle..."
                  />
                </div>

                {/* Body Content */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description / Content</label>
                  <textarea
                    rows={4}
                    value={selectedBlock.content || ''}
                    onChange={(e) => handleUpdateBlock(selectedBlock.id, { content: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-slate-900"
                    placeholder="Enter detailed content..."
                  />
                </div>

                {/* Badge text */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge / Tag Text</label>
                  <input
                    type="text"
                    value={selectedBlock.badgeText || ''}
                    onChange={(e) => handleUpdateBlock(selectedBlock.id, { badgeText: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-slate-900"
                    placeholder="e.g. 100% FREE • VERIFIED"
                  />
                </div>

                {/* Image URL */}
                {(selectedBlock.type === 'image' || selectedBlock.type === '2-column') && (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                    <input
                      type="text"
                      value={selectedBlock.imageUrl || ''}
                      onChange={(e) => handleUpdateBlock(selectedBlock.id, { imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-slate-900"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                )}

                {/* Video URL */}
                {selectedBlock.type === 'video' && (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Video URL (YouTube or MP4)</label>
                    <input
                      type="text"
                      value={selectedBlock.videoUrl || ''}
                      onChange={(e) => handleUpdateBlock(selectedBlock.id, { videoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-slate-900"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                )}

                {/* Button Controls */}
                {(selectedBlock.type === 'hero' ||
                  selectedBlock.type === 'button' ||
                  selectedBlock.type === 'card' ||
                  selectedBlock.type === 'call-to-action' ||
                  selectedBlock.type === '2-column') && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <span className="font-bold text-slate-800 text-[11px] block">Button Configuration</span>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Button Label</label>
                      <input
                        type="text"
                        value={selectedBlock.buttonText || ''}
                        onChange={(e) => handleUpdateBlock(selectedBlock.id, { buttonText: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Destination URL / Link</label>
                      <input
                        type="text"
                        value={selectedBlock.buttonLink || ''}
                        onChange={(e) => handleUpdateBlock(selectedBlock.id, { buttonLink: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        placeholder="https://... or #/page/..."
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Button Style</label>
                      <select
                        value={selectedBlock.buttonStyle || 'primary'}
                        onChange={(e) => handleUpdateBlock(selectedBlock.id, { buttonStyle: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        <option value="apple-green">Apple Green (#10b981)</option>
                        <option value="indigo">Cyber Indigo (#6366f1)</option>
                        <option value="primary">Dark Slate (#0f172a)</option>
                        <option value="outline">Border Outline</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* HTML Embed code */}
                {selectedBlock.type === 'html-embed' && (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Raw HTML / Iframe / Embed Code</label>
                    <textarea
                      rows={6}
                      value={selectedBlock.htmlContent || ''}
                      onChange={(e) => handleUpdateBlock(selectedBlock.id, { htmlContent: e.target.value })}
                      className="w-full px-3 py-2 font-mono text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                    />
                  </div>
                )}

                {/* Grid Items Manager */}
                {(selectedBlock.type === 'features-grid' || selectedBlock.type === '3-column') && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-[11px]">Feature Cards ({(selectedBlock.gridItems || []).length})</span>
                      <button
                        onClick={() => {
                          const newItems = [
                            ...(selectedBlock.gridItems || []),
                            {
                              id: `item-${Date.now()}`,
                              title: 'New Feature Card',
                              description: 'Explanation of this feature.'
                            }
                          ];
                          handleUpdateBlock(selectedBlock.id, { gridItems: newItems });
                        }}
                        className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        + Add Card
                      </button>
                    </div>

                    {(selectedBlock.gridItems || []).map((it, idx) => (
                      <div key={it.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[10px] text-slate-500">Card #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const newItems = (selectedBlock.gridItems || []).filter((x) => x.id !== it.id);
                              handleUpdateBlock(selectedBlock.id, { gridItems: newItems });
                            }}
                            className="text-red-500 hover:text-red-700 text-[10px]"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={it.title}
                          onChange={(e) => {
                            const newItems = (selectedBlock.gridItems || []).map((x) =>
                              x.id === it.id ? { ...x, title: e.target.value } : x
                            );
                            handleUpdateBlock(selectedBlock.id, { gridItems: newItems });
                          }}
                          placeholder="Card Title"
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                        />
                        <textarea
                          rows={2}
                          value={it.description}
                          onChange={(e) => {
                            const newItems = (selectedBlock.gridItems || []).map((x) =>
                              x.id === it.id ? { ...x, description: e.target.value } : x
                            );
                            handleUpdateBlock(selectedBlock.id, { gridItems: newItems });
                          }}
                          placeholder="Description"
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: STYLES, COLORS & TYPOGRAPHY INSPECTOR */}
            {inspectorTab === 'style' && (
              <div className="p-4 space-y-5 text-xs">
                {/* Background Color Swatches + Picker */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Background Color</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {colorSwatches.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => handleUpdateBlockStyles(selectedBlock.id, { backgroundColor: c.value })}
                        className={`w-6 h-6 rounded-lg border transition-all cursor-pointer ${
                          selectedBlock.styles?.backgroundColor === c.value
                            ? 'ring-2 ring-indigo-600 ring-offset-1 scale-110'
                            : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.label}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedBlock.styles?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { backgroundColor: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedBlock.styles?.backgroundColor || '#ffffff'}
                      onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { backgroundColor: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono text-xs"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Text Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedBlock.styles?.textColor || '#0f172a'}
                      onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { textColor: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedBlock.styles?.textColor || '#0f172a'}
                      onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { textColor: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Font Family</label>
                  <select
                    value={selectedBlock.styles?.fontFamily || 'inter'}
                    onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { fontFamily: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    <option value="inter">Inter (Clean Sans)</option>
                    <option value="mono">Share Tech Mono (Cyber Tech)</option>
                    <option value="serif">Serif (Editorial Classic)</option>
                    <option value="poppins">Poppins (Modern Bold)</option>
                  </select>
                </div>

                {/* Text Alignment */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Text Alignment</label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => handleUpdateBlockStyles(selectedBlock.id, { textAlign: align })}
                        className={`py-1 text-center font-bold rounded-lg capitalize transition-all cursor-pointer ${
                          (selectedBlock.styles?.textAlign || 'left') === align
                            ? 'bg-white shadow-2xs text-slate-900'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Border Radius (Corner Roundness) */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Corner Roundness</label>
                  <select
                    value={selectedBlock.styles?.borderRadius || '2xl'}
                    onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { borderRadius: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <option value="none">Square (0px)</option>
                    <option value="md">Rounded MD (6px)</option>
                    <option value="xl">Rounded XL (12px)</option>
                    <option value="2xl">Rounded 2XL (16px)</option>
                    <option value="3xl">Rounded 3XL (24px)</option>
                    <option value="full">Full Pill (9999px)</option>
                  </select>
                </div>

                {/* Shadows & Glow */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Shadows &amp; Glow Effect</label>
                  <select
                    value={selectedBlock.styles?.shadow || 'sm'}
                    onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { shadow: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <option value="none">None</option>
                    <option value="sm">Subtle Shadow (sm)</option>
                    <option value="md">Medium Card Shadow (md)</option>
                    <option value="lg">Deep Shadow (lg)</option>
                    <option value="xl">Floating Elevation (xl)</option>
                    <option value="glow-emerald">Apple Green Neon Glow</option>
                    <option value="glow-indigo">Cyber Indigo Neon Glow</option>
                  </select>
                </div>

                {/* Vertical Padding */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vertical Padding (Spacing)</label>
                  <select
                    value={selectedBlock.styles?.paddingY || 'md'}
                    onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { paddingY: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <option value="none">None (0px)</option>
                    <option value="sm">Compact (16px)</option>
                    <option value="md">Normal (32px)</option>
                    <option value="lg">Spacious (48px)</option>
                    <option value="xl">Extra Large (64px)</option>
                  </select>
                </div>

                {/* Border Color */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Border Outline Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedBlock.styles?.borderColor || '#e2e8f0'}
                      onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { borderColor: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedBlock.styles?.borderColor || '#e2e8f0'}
                      onChange={(e) => handleUpdateBlockStyles(selectedBlock.id, { borderColor: e.target.value })}
                      className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 💾 MODAL: EXPORT FULL CODE (HTML, REACT JSX, JSON)                   */}
      {/* ===================================================================== */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-5 shadow-2xl text-slate-900 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Export Production Code
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Export Full Website Design &amp; Layout
                </h3>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FORMAT SELECTOR TABS */}
            <div className="flex gap-2 border-b border-slate-200 pb-3 text-xs">
              <button
                onClick={() => setExportFormat('html')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  exportFormat === 'html'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Standalone HTML &amp; Tailwind CSS (.html)
              </button>
              <button
                onClick={() => setExportFormat('jsx')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  exportFormat === 'jsx'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                2. React TSX Component (.tsx)
              </button>
              <button
                onClick={() => setExportFormat('json')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  exportFormat === 'json'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                3. JSON Layout Schema (.json)
              </button>
            </div>

            {/* CODE PREVIEW BOX */}
            <div className="flex-1 min-h-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 relative">
              <pre className="p-4 text-emerald-400 font-mono text-xs overflow-auto h-full max-h-[450px]">
                {getExportCode()}
              </pre>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500">
                {exportFormat === 'html'
                  ? 'Includes Tailwind CDN & fonts. Open in any browser or upload to host.'
                  : exportFormat === 'jsx'
                  ? 'Drop directly into your React / Vite / Next.js app.'
                  : 'Portable template that can be re-imported into this builder anytime.'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCode}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 📥 MODAL: IMPORT JSON TEMPLATE                                        */}
      {/* ===================================================================== */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Import Builder JSON Layout</h3>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Paste the exported JSON schema below to restore your blocks, styles, and settings.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='Paste JSON here (e.g. {"blocks": [...], "settings": {...}})...'
              className="w-full p-3 font-mono text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
            />

            {importError && (
              <div className="p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold">
                {importError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleImportJson}
                disabled={!importJsonText.trim()}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs"
              >
                Import Design
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
