import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Link2,
  ExternalLink,
  Save,
  RotateCcw,
  Search,
  Download,
  Upload,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Maximize2,
  Minimize2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { CMSItem } from '../types';
import { useApp } from '../context/AppContext';
import { isUserAdminOrDeveloper } from '../utils/adminAuth';
import {
  getCustomDestinationLinks,
  saveCustomDestinationLink,
  removeCustomDestinationLink,
  getEffectiveArticleDestination,
  exportDestinationLinksJson,
  importDestinationLinksJson,
  CustomDestinationLink
} from '../utils/customDestinationLinks';
import { AdminDevUnlockModal } from './AdminDevUnlockModal';

interface DestinationLinksManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DestinationLinksManagerModal: React.FC<DestinationLinksManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { cmsItems } = useApp();
  const [isAdminOrDev, setIsAdminOrDev] = useState<boolean>(() => isUserAdminOrDeveloper());
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [customLinks, setCustomLinks] = useState<Record<string, CustomDestinationLink>>(() =>
    getCustomDestinationLinks()
  );
  const [editingDrafts, setEditingDrafts] = useState<
    Record<string, { url: string; label: string }>
  >({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync auth and custom links
  useEffect(() => {
    const handleAuthChange = () => setIsAdminOrDev(isUserAdminOrDeveloper());
    const handleLinksChange = () => setCustomLinks(getCustomDestinationLinks());

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

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !showUnlockModal) {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, showUnlockModal]);

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    cmsItems.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set).sort();
  }, [cmsItems]);

  // Filtered articles
  const filteredItems = useMemo(() => {
    return cmsItems.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const eff = getEffectiveArticleDestination(item, customLinks);
      return (
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        eff.url.toLowerCase().includes(q)
      );
    });
  }, [cmsItems, selectedCategory, searchQuery, customLinks]);

  // Count active custom links
  const customCount = useMemo(() => {
    return Object.keys(customLinks).length;
  }, [customLinks]);

  if (!isOpen) return null;

  const showFlash = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleDraftChange = (id: string, field: 'url' | 'label', val: string) => {
    setEditingDrafts((prev) => {
      const current = prev[id] || {
        url: customLinks[id]?.url || cmsItems.find((i) => i.id === id)?.url || '',
        label:
          customLinks[id]?.label ||
          cmsItems.find((i) => i.id === id)?.buttonText ||
          ''
      };
      return {
        ...prev,
        [id]: {
          ...current,
          [field]: val
        }
      };
    });
  };

  const handleSaveItem = (item: CMSItem) => {
    if (!isAdminOrDev) {
      setShowUnlockModal(true);
      return;
    }
    const draft = editingDrafts[item.id] || {
      url: customLinks[item.id]?.url || item.url || '',
      label: customLinks[item.id]?.label || item.buttonText || ''
    };
    saveCustomDestinationLink(item.id, draft.url, draft.label);
    showFlash('success', `Updated destination link for "${item.title.slice(0, 32)}..."`);
  };

  const handleResetItem = (item: CMSItem) => {
    if (!isAdminOrDev) {
      setShowUnlockModal(true);
      return;
    }
    removeCustomDestinationLink(item.id);
    setEditingDrafts((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    showFlash('success', `Reset link to default for "${item.title.slice(0, 32)}..."`);
  };

  const handleExport = () => {
    const jsonStr = exportDestinationLinksJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whitehat_knowledge_destination_links_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showFlash('success', 'Destination links configuration exported successfully!');
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminOrDev) {
      setShowUnlockModal(true);
      return;
    }
    if (!importJsonText.trim()) {
      showFlash('error', 'Please paste valid JSON or choose a JSON file.');
      return;
    }
    const res = importDestinationLinksJson(importJsonText);
    if (res.success) {
      showFlash('success', `Successfully imported ${res.count} custom destination link(s)!`);
      setImportJsonText('');
      setShowImportBox(false);
    } else {
      showFlash('error', `Import failed: ${res.error}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setImportJsonText(text);
        setShowImportBox(true);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const handleClearAll = () => {
    if (!isAdminOrDev) {
      setShowUnlockModal(true);
      return;
    }
    if (window.confirm('Are you sure you want to reset ALL custom destination links to their factory defaults?')) {
      localStorage.removeItem('wh_ai_custom_knowledge_links_v1');
      window.dispatchEvent(new Event('wh_destination_links_changed'));
      setEditingDrafts({});
      showFlash('success', 'All destination links have been reset to factory defaults.');
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all"
      onClick={onClose}
    >
      {/* WINDOW CONTAINER */}
      <div
        className={`relative bg-white border-2 border-slate-300 rounded-2xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden transition-all duration-150 animate-in fade-in zoom-in-95 ${
          isMaximized
            ? 'w-[98vw] h-[96vh] max-w-none max-h-none'
            : 'max-w-5xl w-full h-[90vh] max-h-[90vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* WINDOW OS TITLE BAR (WINDOWS POPPING OUT STYLE) */}
        <div className="bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
          <div className="flex items-center gap-3 min-w-0">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer"
                title="Close"
              />
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer"
                title={isMaximized ? 'Restore' : 'Maximize'}
              />
              <span className="w-3 h-3 rounded-full bg-emerald-500" title="Active Window" />
            </div>

            <div className="flex items-center gap-2 truncate">
              <span className="px-2 py-0.5 rounded bg-indigo-900 border border-indigo-700 text-indigo-200 text-[10px] font-mono font-bold uppercase shrink-0">
                ADMIN CONSOLE
              </span>
              <span className="text-xs font-mono font-bold text-slate-200 truncate">
                Knowledge Library Destination Links &amp; Referral Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 pl-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
              <Link2 className="w-3 h-3 text-cyan-400" />
              <span>{customCount} Custom Overrides</span>
            </span>

            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer hidden sm:block"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-rose-600 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              title="Close Manager"
            >
              <X className="w-4 h-4" />
              <span className="text-[11px] font-mono font-bold hidden md:inline">Close</span>
            </button>
          </div>
        </div>

        {/* SUBHEADER & CONTROL TOOLBAR */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-black text-slate-950 flex items-center gap-2">
                <span>Manage Destination Links across {cmsItems.length} Knowledge Guides</span>
                {isAdminOrDev ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                    Admin Authenticated
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-bold border border-amber-200 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Visitor Read-Only</span>
                  </span>
                )}
              </h4>
              <p className="text-xs text-slate-600">
                Modify where buttons lead when clicked (insert personal referral links, affiliate codes, or custom destination pages).
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {!isAdminOrDev ? (
                <button
                  type="button"
                  onClick={() => setShowUnlockModal(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Admin / Dev to Edit</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-mono font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    title="Export all custom destination links to JSON"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Export JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowImportBox(!showImportBox)}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-mono font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    title="Import destination links from JSON"
                  >
                    <Upload className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Import JSON</span>
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".json,application/json"
                    className="hidden"
                  />

                  {customCount > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-mono font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      title="Clear all custom destination links"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                      <span>Reset All</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* STATUS NOTIFICATION BANNER */}
          {statusMessage && (
            <div
              className={`p-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 animate-fade-in ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border border-rose-200 text-rose-950'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* IMPORT JSON EXPANDABLE PANEL */}
          {showImportBox && isAdminOrDev && (
            <form
              onSubmit={handleImportSubmit}
              className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-950 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Import Destination Links from JSON</span>
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 text-[11px] bg-white border border-indigo-300 rounded font-mono font-bold text-indigo-900 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  Choose File...
                </button>
              </div>
              <textarea
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste JSON here: { "guide-id": { "url": "https://...", "label": "Visit Partner" } }'
                rows={3}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportBox(false)}
                  className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Apply Imported Links
                </button>
              </div>
            </form>
          )}

          {/* SEARCH & CATEGORY FILTER */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 pt-1">
            {/* Search Input without scrollbars */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide title, ID, or destination URL..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar text-xs">
              <button
                type="button"
                onClick={() => setSelectedCategory('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'ALL'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                All ({cmsItems.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  {cat.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SCROLLABLE ARTICLE LIST */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-slate-100/50"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-3 bg-white rounded-2xl border border-slate-200 p-6">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <h5 className="text-sm font-extrabold text-slate-900">No Guides Found</h5>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No articles matched &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const eff = getEffectiveArticleDestination(item, customLinks);
              const draft = editingDrafts[item.id] || {
                url: customLinks[item.id]?.url ?? eff.url,
                label: customLinks[item.id]?.label ?? eff.label
              };
              const isItemCustom = eff.isCustom;
              const hasUnsavedChanges =
                draft.url !== (customLinks[item.id]?.url ?? eff.url) ||
                draft.label !== (customLinks[item.id]?.label ?? eff.label);

              return (
                <div
                  key={item.id}
                  className={`p-3.5 sm:p-4 rounded-2xl bg-white border transition-all ${
                    isItemCustom
                      ? 'border-emerald-300 shadow-xs ring-1 ring-emerald-200'
                      : 'border-slate-200/90 shadow-2xs'
                  }`}
                >
                  {/* Row Header: Category, ID, Title, Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase border border-slate-200">
                          {item.category?.split('&')[0].trim() || 'General'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          ID: {item.id}
                        </span>
                        {isItemCustom && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-mono font-bold flex items-center gap-1 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>CUSTOM LINK ACTIVE</span>
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs sm:text-sm font-black text-slate-950 truncate">
                        {item.title}
                      </h5>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {eff.url && (
                        <a
                          href={eff.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono font-bold rounded-lg transition-all flex items-center gap-1 border border-slate-300"
                          title="Test destination link in new tab"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3 text-indigo-600" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Form Fields: Destination URL & Button Label */}
                  <div className="pt-3 grid grid-cols-1 md:grid-cols-12 gap-2.5">
                    {/* Destination URL Input */}
                    <div className="md:col-span-8 space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                        <span>Destination Link URL:</span>
                        {item.url && (
                          <span
                            onClick={() => {
                              if (isAdminOrDev) {
                                handleDraftChange(item.id, 'url', item.url || '');
                              }
                            }}
                            className="text-[9px] text-indigo-600 hover:underline cursor-pointer font-mono"
                            title="Click to copy original default URL into input"
                          >
                            Default: {item.url.slice(0, 36)}...
                          </span>
                        )}
                      </label>
                      <input
                        type="url"
                        value={draft.url}
                        disabled={!isAdminOrDev}
                        onChange={(e) => handleDraftChange(item.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Button Label Input */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                        Button Label:
                      </label>
                      <input
                        type="text"
                        value={draft.label}
                        disabled={!isAdminOrDev}
                        onChange={(e) => handleDraftChange(item.id, 'label', e.target.value)}
                        placeholder="e.g. Visit Tool"
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Row Actions: Save & Reset */}
                  {isAdminOrDev && (
                    <div className="pt-2.5 flex items-center justify-end gap-2">
                      {isItemCustom && (
                        <button
                          type="button"
                          onClick={() => handleResetItem(item)}
                          className="px-2.5 py-1 text-xs font-mono font-bold text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 border border-slate-300 hover:border-rose-300 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset to Default</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSaveItem(item)}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                          hasUnsavedChanges
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <Save className="w-3 h-3" />
                        <span>{hasUnsavedChanges ? 'Save Changes *' : 'Save Link'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER BAR */}
        <div className="px-4 py-3 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-mono text-slate-600 flex items-center gap-2">
            <span>Showing {filteredItems.length} of {cmsItems.length} items</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">{customCount} active custom overrides</span>
          </div>

          <div className="flex items-center gap-2">
            {!isAdminOrDev && (
              <button
                type="button"
                onClick={() => setShowUnlockModal(true)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold rounded-xl cursor-pointer"
              >
                Admin Unlock
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Done &amp; Close
            </button>
          </div>
        </div>
      </div>

      {/* ADMIN UNLOCK MODAL GATE */}
      <AdminDevUnlockModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onAuthSuccess={() => {
          setIsAdminOrDev(true);
          showFlash('success', 'Developer & Admin mode unlocked! You can now edit all destination links.');
        }}
      />
    </div>,
    document.body
  );
};

export default DestinationLinksManagerModal;
