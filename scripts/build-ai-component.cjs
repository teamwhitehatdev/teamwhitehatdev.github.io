// scripts/build-ai-component.cjs
const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'components', 'AIAutomationDiagrams.tsx');
let code = fs.readFileSync(targetPath, 'utf8').replace(/\r\n/g, '\n');

// 1. UPDATE IMPORTS AT THE TOP
const oldImportLucide = `  Target,
  Lightbulb,
  CheckSquare
} from 'lucide-react';
import { WORKFLOW_STRATEGY_DATA } from '../data/workflowStrategyData';`;

const newImportLucide = `  Target,
  Lightbulb,
  CheckSquare,
  Edit,
  Save,
  RotateCcw,
  DollarSign,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  Folder,
  FolderOpen,
  Filter,
  Share2,
  UserCheck,
  SlidersHorizontal
} from 'lucide-react';
import { WORKFLOW_STRATEGY_DATA, DEFAULT_TOOL_REFERRAL_LINKS, WorkflowStrategy } from '../data/workflowStrategyData';
import {
  WORKFLOW_CATEGORIES,
  EXTENDED_WORKFLOW_BLUEPRINTS,
  EXTENDED_WORKFLOW_STRATEGIES,
  WorkflowCategoryMeta
} from '../data/extendedWorkflowsData';

export { WORKFLOW_CATEGORIES };
export type { WorkflowCategoryMeta };

const renderCategoryIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'Zap': return <Zap className={className} />;
    case 'Mail': return <Mail className={className} />;
    case 'Box': return <Box className={className} />;
    case 'Video': return <Video className={className} />;
    case 'PhoneCall': return <PhoneCall className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'UserCheck': return <UserCheck className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'Network': return <Network className={className} />;
    default: return <Workflow className={className} />;
  }
};`;

if (!code.includes(oldImportLucide)) {
  console.error("Could not find oldImportLucide in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(oldImportLucide, newImportLucide);

// 2. INSERT ALL_WORKFLOW_BLUEPRINTS & ALL_WORKFLOW_STRATEGIES RIGHT AFTER WORKFLOW_BLUEPRINTS CLOSING
const targetBlueprintEnd = `Have a great weekend!
[Your Name]\`
  }
];

// DEFAULT POSITIONS FOR THE 5 NODES (BALANCED FULL VIEW, NO SPLIT DIVISIONS)`;

const replacementBlueprintEnd = `Have a great weekend!
[Your Name]\`
  }
];

// COMBINED 100+ ADVANCED WORKFLOW BLUEPRINTS (112 TOTAL)
export const ALL_WORKFLOW_BLUEPRINTS: WorkflowBlueprint[] = (() => {
  const map = new Map<string, WorkflowBlueprint>();
  for (const bp of WORKFLOW_BLUEPRINTS) {
    map.set(bp.id, bp);
  }
  for (const bp of EXTENDED_WORKFLOW_BLUEPRINTS) {
    if (!map.has(bp.id)) {
      map.set(bp.id, bp);
    }
  }
  return Array.from(map.values());
})();

// COMBINED STRATEGY REPOSITORY (ALL 112 BLUEPRINTS + DEFAULT STRATEGIES)
export const ALL_WORKFLOW_STRATEGIES: Record<string, WorkflowStrategy> = {
  ...EXTENDED_WORKFLOW_STRATEGIES,
  ...WORKFLOW_STRATEGY_DATA
};

// DEFAULT POSITIONS FOR THE 5 NODES (BALANCED FULL VIEW, NO SPLIT DIVISIONS)`;

if (!code.includes(targetBlueprintEnd)) {
  console.error("Could not find targetBlueprintEnd in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetBlueprintEnd, replacementBlueprintEnd);

// 3. UPDATE COMPONENT STATE FOR REFERRAL LINKS, CATEGORY COLLAPSIBLE, AND BLUEPRINT REFERENCES
const targetStateSection = `  // Filter or detect blueprints matching search query
  const query = searchQuery.trim().toLowerCase();

  const matchingBlueprintIds = useMemo(() => {
    if (!query) return [];
    return WORKFLOW_BLUEPRINTS.filter((bp) => {
      const matchMeta =
        bp.title.toLowerCase().includes(query) ||
        bp.subtitle.toLowerCase().includes(query) ||
        bp.categoryLabel.toLowerCase().includes(query) ||
        bp.tools.some((t) => t.toLowerCase().includes(query));
      const matchNodes = bp.nodes.some(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.tool.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query) ||
          n.processingLogic.toLowerCase().includes(query)
      );
      const matchPrompt = bp.aiPromptSample.toLowerCase().includes(query);
      return matchMeta || matchNodes || matchPrompt;
    }).map((bp) => bp.id);
  }, [query]);

  // Auto-switch to matching blueprint if user searches and current isn't in matches
  useEffect(() => {
    if (matchingBlueprintIds.length > 0 && !matchingBlueprintIds.includes(activeBlueprintId)) {
      setActiveBlueprintId(matchingBlueprintIds[0]);
    }
  }, [matchingBlueprintIds, activeBlueprintId]);

  const activeBlueprint = useMemo(() => {
    return (
      WORKFLOW_BLUEPRINTS.find((bp) => bp.id === activeBlueprintId) ||
      WORKFLOW_BLUEPRINTS[0]
    );
  }, [activeBlueprintId]);

  const selectedNode = activeBlueprint.nodes[selectedNodeIndex] || activeBlueprint.nodes[0];

  const activeStrategy = useMemo(() => {
    return (
      WORKFLOW_STRATEGY_DATA[activeBlueprint.id] ||
      WORKFLOW_STRATEGY_DATA[activeBlueprint.categoryKey] ||
      WORKFLOW_STRATEGY_DATA['lead-triage']
    );
  }, [activeBlueprint.id, activeBlueprint.categoryKey]);

  // Reset positions to default when blueprint changes
  useEffect(() => {
    setNodePositions(DEFAULT_NODE_POSITIONS);
    setSelectedNodeIndex(0);
  }, [activeBlueprintId]);`;

const replacementStateSection = `  // Storage key for custom referral links overrides
  const STORAGE_AI_REFERRAL_KEY = 'wh_ai_custom_referral_links_v1';

  // Custom referral links dictionary loaded from localStorage
  const [customReferralLinks, setCustomReferralLinks] = useState<
    Record<string, { url: string; label?: string; updatedAt?: number }>
  >(() => {
    try {
      const saved = localStorage.getItem('wh_ai_custom_referral_links_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Error loading custom referral links:', e);
      return {};
    }
  });

  // Inline card edit states
  const [editingWebsiteKey, setEditingWebsiteKey] = useState<string | null>(null);
  const [editUrlInput, setEditUrlInput] = useState<string>('');
  const [editLabelInput, setEditLabelInput] = useState<string>('Open Browser');
  const [referralToastMsg, setReferralToastMsg] = useState<string | null>(null);

  // Admin Modal states
  const [isAdminReferralModalOpen, setIsAdminReferralModalOpen] = useState<boolean>(false);
  const [adminModalTab, setAdminModalTab] = useState<'current' | 'all' | 'backup'>('current');
  const [importExportJson, setImportExportJson] = useState<string>('');
  const [importExportStatus, setImportExportStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 100+ Collapsible Category state
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    return { sales: true, support: true };
  });
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');
  const [categorySearchFilter, setCategorySearchFilter] = useState<string>('');

  // Toggle category expansion
  const toggleCategoryExpand = (catKey: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey]
    }));
  };

  // Expand all categories
  const expandAllCategories = () => {
    const next: Record<string, boolean> = {};
    WORKFLOW_CATEGORIES.forEach((c) => {
      next[c.key] = true;
    });
    setExpandedCategories(next);
  };

  // Collapse all categories
  const collapseAllCategories = () => {
    setExpandedCategories({});
  };

  // Helper to compute effective URL, label, and whether it's custom
  const getEffectiveWebsiteLink = (siteName: string, defaultUrl: string, blueprintId: string) => {
    const specificKey = \`\${blueprintId}::\${siteName}\`;
    const generalKey = siteName;
    const override = customReferralLinks[specificKey] || customReferralLinks[generalKey];
    const baseFallback = DEFAULT_TOOL_REFERRAL_LINKS[siteName] || defaultUrl;

    const finalUrl = override?.url?.trim() || baseFallback;
    const finalLabel = override?.label?.trim() || 'Open Browser';
    const isCustom = Boolean(override?.url?.trim());

    return {
      url: finalUrl,
      label: finalLabel,
      isCustom,
      key: specificKey,
      generalKey
    };
  };

  // Save an inline override for a website card
  const handleSaveWebsiteOverride = (siteName: string, blueprintId: string) => {
    if (!editUrlInput.trim()) return;
    const specificKey = \`\${blueprintId}::\${siteName}\`;
    const updated = {
      ...customReferralLinks,
      [specificKey]: {
        url: editUrlInput.trim(),
        label: editLabelInput.trim() || 'Open Browser',
        updatedAt: Date.now()
      }
    };
    setCustomReferralLinks(updated);
    try {
      localStorage.setItem(STORAGE_AI_REFERRAL_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom referral links:', e);
    }
    setEditingWebsiteKey(null);
    setReferralToastMsg(\`Saved custom destination link for \${siteName}!\`);
    setTimeout(() => setReferralToastMsg(null), 3500);
  };

  // Reset a custom override for a website
  const handleResetWebsiteOverride = (siteName: string, blueprintId: string) => {
    const specificKey = \`\${blueprintId}::\${siteName}\`;
    const updated = { ...customReferralLinks };
    delete updated[specificKey];
    delete updated[siteName];
    setCustomReferralLinks(updated);
    try {
      localStorage.setItem(STORAGE_AI_REFERRAL_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to reset custom referral link:', e);
    }
    setEditingWebsiteKey(null);
    setReferralToastMsg(\`Reset \${siteName} to default official/referral destination.\`);
    setTimeout(() => setReferralToastMsg(null), 3500);
  };

  // Export referral links to JSON
  const handleExportReferralConfig = () => {
    const jsonStr = JSON.stringify(customReferralLinks, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`teamwhitehatdev-referral-links-\${new Date().toISOString().slice(0, 10)}.json\`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import referral links from JSON string
  const handleImportReferralConfig = () => {
    try {
      const parsed = JSON.parse(importExportJson);
      if (typeof parsed !== 'object' || parsed === null) {
        setImportExportStatus({ type: 'error', text: 'Invalid JSON format: Must be an object.' });
        return;
      }
      setCustomReferralLinks(parsed);
      localStorage.setItem(STORAGE_AI_REFERRAL_KEY, JSON.stringify(parsed));
      setImportExportStatus({
        type: 'success',
        text: \`Successfully imported \${Object.keys(parsed).length} destination/referral links!\`
      });
      setTimeout(() => setImportExportStatus(null), 4000);
    } catch (err: any) {
      setImportExportStatus({ type: 'error', text: \`JSON Parse Error: \${err.message}\` });
    }
  };

  // Reset all custom referral overrides
  const handleResetAllReferrals = () => {
    if (window.confirm('Reset ALL customized referral links back to repository defaults?')) {
      setCustomReferralLinks({});
      localStorage.removeItem(STORAGE_AI_REFERRAL_KEY);
      setImportExportJson('{}');
      setImportExportStatus({ type: 'success', text: 'All customized links have been reset to default!' });
      setTimeout(() => setImportExportStatus(null), 3000);
    }
  };

  // Filter or detect blueprints matching search query across all 112 blueprints
  const query = searchQuery.trim().toLowerCase();

  const matchingBlueprintIds = useMemo(() => {
    if (!query) return [];
    return ALL_WORKFLOW_BLUEPRINTS.filter((bp) => {
      const matchMeta =
        bp.title.toLowerCase().includes(query) ||
        bp.subtitle.toLowerCase().includes(query) ||
        bp.categoryLabel.toLowerCase().includes(query) ||
        bp.tools.some((t) => t.toLowerCase().includes(query));
      const matchNodes = bp.nodes.some(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.tool.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query) ||
          n.processingLogic.toLowerCase().includes(query)
      );
      const matchPrompt = bp.aiPromptSample.toLowerCase().includes(query);
      return matchMeta || matchNodes || matchPrompt;
    }).map((bp) => bp.id);
  }, [query]);

  // Auto-switch to matching blueprint if user searches and current isn't in matches
  useEffect(() => {
    if (matchingBlueprintIds.length > 0 && !matchingBlueprintIds.includes(activeBlueprintId)) {
      setActiveBlueprintId(matchingBlueprintIds[0]);
    }
  }, [matchingBlueprintIds, activeBlueprintId]);

  const activeBlueprint = useMemo(() => {
    return (
      ALL_WORKFLOW_BLUEPRINTS.find((bp) => bp.id === activeBlueprintId) ||
      ALL_WORKFLOW_BLUEPRINTS[0]
    );
  }, [activeBlueprintId]);

  const selectedNode = activeBlueprint.nodes[selectedNodeIndex] || activeBlueprint.nodes[0];

  const activeStrategy = useMemo(() => {
    return (
      ALL_WORKFLOW_STRATEGIES[activeBlueprint.id] ||
      ALL_WORKFLOW_STRATEGIES[activeBlueprint.categoryKey] ||
      WORKFLOW_STRATEGY_DATA[activeBlueprint.id] ||
      WORKFLOW_STRATEGY_DATA['lead-triage']
    );
  }, [activeBlueprint.id, activeBlueprint.categoryKey]);

  // Reset positions to default when blueprint changes
  useEffect(() => {
    setNodePositions(DEFAULT_NODE_POSITIONS);
    setSelectedNodeIndex(0);
  }, [activeBlueprintId]);

  // Auto-expand active blueprint's category
  useEffect(() => {
    if (activeBlueprint && activeBlueprint.categoryKey) {
      setExpandedCategories((prev) => ({
        ...prev,
        [activeBlueprint.categoryKey]: true
      }));
    }
  }, [activeBlueprint]);

  // Auto-expand categories matching search query
  useEffect(() => {
    if (query && matchingBlueprintIds.length > 0) {
      const next: Record<string, boolean> = {};
      ALL_WORKFLOW_BLUEPRINTS.forEach((bp) => {
        if (matchingBlueprintIds.includes(bp.id)) {
          next[bp.categoryKey] = true;
        }
      });
      setExpandedCategories((prev) => ({ ...prev, ...next }));
    }
  }, [query, matchingBlueprintIds]);`;

if (!code.includes(targetStateSection)) {
  console.error("Could not find targetStateSection in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetStateSection, replacementStateSection);

// 4. REPLACE CATEGORY SWITCHER IN SECTION 1 WITH COLLAPSIBLE CATEGORIES & MINIMALISTIC BUTTONS
const targetCategorySwitcher = `        {/* Category Switcher Tabs */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="text-xs font-mono text-slate-950 uppercase tracking-wider flex items-center gap-2 font-black">
            <Sliders className="w-4 h-4 text-slate-900" />
            <span className="text-slate-950 font-black">
              Select AI Automation Category • Instant Topology Switching ({WORKFLOW_BLUEPRINTS.length} Workflows):
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {WORKFLOW_BLUEPRINTS.map((bp, idx) => {
              const isSelected = bp.id === activeBlueprintId;
              const matchesSearch = matchingBlueprintIds.includes(bp.id);
              return (
                <button
                  key={bp.id}
                  onClick={() => {
                    setActiveBlueprintId(bp.id);
                  }}
                  className={\`text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-1.5 cursor-pointer relative overflow-hidden \${
                    isSelected
                      ? 'bg-slate-900 border-2 border-slate-900 text-white shadow-md ring-2 ring-cyan-400'
                      : 'bg-white border-2 border-slate-200 text-slate-950 hover:border-slate-400 hover:bg-slate-50 shadow-2xs'
                  }\`}
                >
                  {matchesSearch && query && (
                    <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-cyan-500 text-slate-950 text-[9px] font-bold rounded-full">
                      MATCH
                    </span>
                  )}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-slate-600 font-bold'}>
                      TOPOLOGY 0{idx + 1}
                    </span>
                    <span className={\`w-1.5 h-1.5 rounded-full \${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}\`} />
                  </div>
                  <div className={\`font-black text-xs leading-snug line-clamp-2 \${isSelected ? 'text-white' : 'text-slate-950'}\`}>
                    {bp.categoryLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>`;

const replacementCategorySwitcher = `        {/* Category Switcher Tabs: 100+ Workflows Collapsible Categories */}
        <div className="space-y-4 pt-5 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-mono text-slate-950 uppercase tracking-wider flex items-center gap-2 font-black">
              <SlidersHorizontal className="w-4 h-4 text-indigo-700" />
              <span className="text-slate-950 font-black">
                Select AI Automation Category • Instant Topology Switching ({ALL_WORKFLOW_BLUEPRINTS.length}+ Workflows Across 10 Specializations):
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={expandAllCategories}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-[11px] font-mono font-bold transition-all cursor-pointer"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAllCategories}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-[11px] font-mono font-bold transition-all cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Quick Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={categorySearchFilter}
                onChange={(e) => setCategorySearchFilter(e.target.value)}
                placeholder="Filter 100+ workflows by keyword (e.g. Lead, Stripe, Claude, Voice, 3D, Webhook, Video...)"
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-950 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              {categorySearchFilter && (
                <button
                  type="button"
                  onClick={() => setCategorySearchFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategoryTab('all')}
                className={\`px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer \${
                  selectedCategoryTab === 'all'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                }\`}
              >
                All Categories ({ALL_WORKFLOW_BLUEPRINTS.length})
              </button>
              {WORKFLOW_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategoryTab(cat.key)}
                  className={\`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer \${
                    selectedCategoryTab === cat.key
                      ? 'bg-indigo-900 text-white shadow-xs ring-1 ring-indigo-400'
                      : 'bg-white hover:bg-indigo-50 text-slate-700 border border-slate-300'
                  }\`}
                >
                  {renderCategoryIcon(cat.iconName, 'w-3 h-3 text-indigo-600')}
                  <span>{cat.label.split(',')[0].trim()}</span>
                  <span className="text-[10px] opacity-75 font-semibold">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Category Sections with Minimalistic Workflow Buttons */}
          <div className="space-y-3.5 pt-1">
            {WORKFLOW_CATEGORIES
              .filter((cat) => selectedCategoryTab === 'all' || selectedCategoryTab === cat.key)
              .map((cat) => {
                const categoryBlueprints = ALL_WORKFLOW_BLUEPRINTS.filter((bp) => bp.categoryKey === cat.key);
                const filterTerm = categorySearchFilter.trim().toLowerCase();
                const filteredBlueprints = filterTerm
                  ? categoryBlueprints.filter(
                      (bp) =>
                        bp.title.toLowerCase().includes(filterTerm) ||
                        bp.subtitle.toLowerCase().includes(filterTerm) ||
                        bp.tools.some((t) => t.toLowerCase().includes(filterTerm))
                    )
                  : categoryBlueprints;

                if (filteredBlueprints.length === 0 && filterTerm) return null;

                const isExpanded = expandedCategories[cat.key] || false;
                const hasActive = categoryBlueprints.some((bp) => bp.id === activeBlueprintId);

                return (
                  <div
                    key={cat.key}
                    className={\`rounded-2xl border-2 transition-all overflow-hidden \${
                      hasActive
                        ? 'border-indigo-300 bg-indigo-50/30 shadow-xs'
                        : 'border-slate-200 bg-white'
                    }\`}
                  >
                    {/* Collapsible Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategoryExpand(cat.key)}
                      className="w-full p-3 sm:p-4 flex items-center justify-between text-left hover:bg-indigo-50/40 transition-colors cursor-pointer gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={\`p-2 rounded-xl border shrink-0 flex items-center justify-center \${
                          hasActive
                            ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                            : 'bg-slate-100 text-slate-800 border-slate-200'
                        }\`}>
                          {renderCategoryIcon(cat.iconName, 'w-4 h-4')}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-sm text-slate-950">
                              {cat.label}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-[10px] font-mono font-bold">
                              {filteredBlueprints.length} {filteredBlueprints.length === 1 ? 'Workflow' : 'Workflows'}
                            </span>
                            {hasActive && (
                              <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold animate-pulse">
                                Active Blueprint Inside
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5 hidden sm:block">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono font-bold text-slate-500 hidden md:inline">
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </span>
                        <div className="p-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {/* Minimalistic Button Grid (Collapsible Body) */}
                    {isExpanded && (
                      <div className="p-3 sm:p-4 pt-1 border-t border-slate-200/80 bg-slate-50/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                          {filteredBlueprints.map((bp) => {
                            const isSelected = bp.id === activeBlueprintId;
                            const matchesSearch = matchingBlueprintIds.includes(bp.id);
                            const globalIndex = ALL_WORKFLOW_BLUEPRINTS.findIndex((b) => b.id === bp.id);

                            return (
                              <button
                                key={bp.id}
                                type="button"
                                onClick={() => {
                                  setActiveBlueprintId(bp.id);
                                }}
                                className={\`text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 cursor-pointer relative overflow-hidden group \${
                                  isSelected
                                    ? 'bg-slate-900 border-2 border-indigo-400 text-white shadow-md ring-2 ring-indigo-400/50'
                                    : 'bg-white hover:bg-indigo-50/70 border-2 border-slate-200 text-slate-950 hover:border-indigo-300 shadow-2xs'
                                }\`}
                              >
                                {matchesSearch && query && (
                                  <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-indigo-500 text-white text-[9px] font-mono font-bold rounded-full">
                                    MATCH
                                  </span>
                                )}

                                <div>
                                  <div className="flex items-center justify-between text-[10px] font-mono font-bold pb-1 mb-1 border-b border-slate-200/50">
                                    <span className={isSelected ? 'text-indigo-300 font-extrabold' : 'text-indigo-800 font-bold'}>
                                      TOPOLOGY #{String(globalIndex + 1).padStart(2, '0')}
                                    </span>
                                    <span className={\`px-1.5 py-0.2 rounded text-[9px] font-bold \${
                                      isSelected
                                        ? 'bg-indigo-800 text-indigo-200'
                                        : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                                    }\`}>
                                      {bp.timeSaved}
                                    </span>
                                  </div>

                                  <div className={\`font-black text-xs leading-snug line-clamp-2 \${isSelected ? 'text-white' : 'text-slate-950'}\`}>
                                    {bp.title}
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                                    <span className={isSelected ? 'text-emerald-300 font-bold truncate max-w-[130px]' : 'text-emerald-700 font-bold truncate max-w-[130px]'}>
                                      {bp.vaServiceValue}
                                    </span>
                                    <span className={\`w-1.5 h-1.5 rounded-full shrink-0 \${isSelected ? 'bg-indigo-400 animate-ping' : 'bg-slate-300 group-hover:bg-indigo-400'}\`} />
                                  </div>

                                  <div className="flex flex-wrap gap-1 mt-1.5">
                                    {bp.tools.slice(0, 2).map((t, tidx) => (
                                      <span
                                        key={tidx}
                                        className={\`text-[9px] font-mono px-1.5 py-0.2 rounded \${
                                          isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                                        }\`}
                                      >
                                        {t.split('/')[0].trim()}
                                      </span>
                                    ))}
                                    {bp.tools.length > 2 && (
                                      <span className={\`text-[9px] font-mono px-1 py-0.2 rounded \${
                                        isSelected ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                                      }\`}>
                                        +{bp.tools.length - 2}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>`;

if (!code.includes(targetCategorySwitcher)) {
  console.error("Could not find targetCategorySwitcher in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetCategorySwitcher, replacementCategorySwitcher);

// 5. UPDATE SECTION 2 CONTAINER TO PURPLE LIGHT THEME (FROM HOME PAGE)
const targetSection2Header = `      {/* =====================================================================
          SECTION 2: DEDICATED SEPARATED SECTION:
          LIVE ANIMATED TOPOLOGY WORKFLOW • DRAGGABLE FULL VIEW CANVAS
      ====================================================================== */}
      <section
        className={\`relative rounded-3xl bg-white border-2 border-slate-300 shadow-md p-5 sm:p-8 lg:p-9 overflow-hidden text-slate-900 transition-all \${
          isExpanded ? 'fixed inset-3 z-50 overflow-y-auto' : ''
        }\`}
      >`;

const replacementSection2Header = `      {/* =====================================================================
          SECTION 2: DEDICATED SEPARATED SECTION:
          LIVE ANIMATED TOPOLOGY WORKFLOW • DRAGGABLE FULL VIEW CANVAS
          (PURPLE LIGHT HUD THEME MATCHING HOME PAGE TUTORIALS SECTION)
      ====================================================================== */}
      <section
        className={\`relative rounded-3xl bg-gradient-to-br from-indigo-50/85 via-purple-50/70 to-blue-50/80 backdrop-blur-md border-2 border-indigo-200/90 shadow-xl p-5 sm:p-8 lg:p-9 overflow-hidden text-slate-900 transition-all \${
          isExpanded ? 'fixed inset-3 z-50 overflow-y-auto' : ''
        }\`}
      >
        {/* Subtle Top Animated Architectural Shimmer Line */}
        <div className="relative h-1 w-full -mt-5 sm:-mt-8 lg:-mt-9 -mx-5 sm:-mx-8 lg:-mx-9 mb-5 sm:mb-8 bg-indigo-100/60 overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/3 animate-shimmer-slide bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </div>`;

if (!code.includes(targetSection2Header)) {
  console.error("Could not find targetSection2Header in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetSection2Header, replacementSection2Header);

// 6. UPDATE RETICLE IN SECTION 2 TO INDIGO/PURPLE ACCENT
const targetReticle = `<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-400 text-slate-950 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>LIVE ANIMATED TOPOLOGY WORKFLOW • DRAGGABLE FULL VIEW CANVAS</span>
          </div>`;

const replacementReticle = `<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/90 border border-indigo-300 text-indigo-950 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
            <span>LIVE ANIMATED TOPOLOGY WORKFLOW • DRAGGABLE FULL VIEW CANVAS</span>
          </div>`;

if (code.includes(targetReticle)) {
  code = code.replace(targetReticle, replacementReticle);
}

// 7. UPDATE SUBSECTION A (NODE TELEMETRY INSPECTOR) WITH INTERACTIVE 5-NODE EXECUTION TRACE
const targetSubA = `        {/* ===============================================================
            SUBSECTION A: INTERACTIVE NODE ARCHITECTURE & LIVE TELEMETRY INSPECTOR
        =============================================================== */}
        <div className="relative z-10 mt-6 pt-6 border-t-2 border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-900 text-xs font-mono font-bold">
                <Cpu className="w-3.5 h-3.5 text-cyan-600" />
                <span>INTERACTIVE NODE TELEMETRY & SPECIFICATION INSPECTOR</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-950 mt-1">
                Node {selectedNode.step} Architecture: {selectedNode.title}
              </h3>
            </div>`;

const replacementSubA = `        {/* ===============================================================
            SUBSECTION A: DETAILED NODE TELEMETRY & SPECIFICATION INSPECTOR
        =============================================================== */}
        <div className="relative z-10 mt-8 pt-6 border-t-2 border-indigo-200/80">
          {/* Step-by-Step 5-Node Execution Trace Pipeline */}
          <div className="mb-5 bg-white/95 border-2 border-indigo-200/90 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-indigo-100">
              <span className="text-xs font-mono font-black text-indigo-950 flex items-center gap-1.5 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
                <span>Step-by-Step 5-Node Execution Trace Pipeline</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-bold">
                Click any node step to inspect telemetry
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {activeBlueprint.nodes.map((node, i) => {
                const isCurrent = selectedNodeIndex === i;
                return (
                  <button
                    key={node.step}
                    type="button"
                    onClick={() => setSelectedNodeIndex(i)}
                    className={\`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1 \${
                      isCurrent
                        ? 'bg-slate-950 text-white border-2 border-indigo-400 shadow-md ring-2 ring-indigo-400/40'
                        : 'bg-slate-50 hover:bg-indigo-50/70 border-slate-200 text-slate-900 hover:border-indigo-300'
                    }\`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className={isCurrent ? 'text-indigo-300 font-extrabold' : 'text-indigo-700'}>
                        STEP {node.step}
                      </span>
                      <span className={\`w-1.5 h-1.5 rounded-full \${isCurrent ? 'bg-indigo-400 animate-ping' : 'bg-slate-400'}\`} />
                    </div>
                    <div className={\`font-black text-[11px] line-clamp-1 \${isCurrent ? 'text-white' : 'text-slate-950'}\`}>
                      {node.title}
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-mono opacity-80 pt-0.5">
                      <span className="truncate">{node.tool}</span>
                      <span className="font-semibold uppercase">{node.type}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-950 text-xs font-mono font-bold">
                <Cpu className="w-3.5 h-3.5 text-indigo-700" />
                <span>INTERACTIVE NODE TELEMETRY & SPECIFICATION INSPECTOR</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-950 mt-1">
                Node {selectedNode.step} Architecture: {selectedNode.title}
              </h3>
            </div>`;

if (!code.includes(targetSubA)) {
  console.error("Could not find targetSubA in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetSubA, replacementSubA);

// 8. UPDATE SUBSECTION B (3-PHASE PLAN) TO PURPLE ACCENTS & STEP-BY-STEP CHECKLIST
const targetSubBHeader = `        {/* ===============================================================
            SUBSECTION B: SUGGESTED 3-PHASE IMPLEMENTATION PLAN & PROGRESSION ROADMAP
        =============================================================== */}
        <div className="relative z-10 mt-8 pt-6 border-t-2 border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-300 text-slate-950 text-xs font-mono font-bold">
              <Compass className="w-3.5 h-3.5 text-cyan-700" />
              <span>SUGGESTED 3-PHASE IMPLEMENTATION PLAN & PROGRESSION ROADMAP</span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-700">
              ESTIMATED ROLLOUT: <span className="text-cyan-700">1 TO 2 BUSINESS DAYS</span>
            </div>
          </div>`;

const replacementSubBHeader = `        {/* ===============================================================
            SUBSECTION B: SUGGESTED 3-PHASE IMPLEMENTATION PLAN & PROGRESSION ROADMAP
        =============================================================== */}
        <div className="relative z-10 mt-8 pt-6 border-t-2 border-indigo-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-950 text-xs font-mono font-bold">
              <Compass className="w-3.5 h-3.5 text-indigo-700" />
              <span>SUGGESTED 3-PHASE IMPLEMENTATION PLAN & PROGRESSION ROADMAP</span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-700">
              ESTIMATED ROLLOUT: <span className="text-indigo-700 font-extrabold">1 TO 2 BUSINESS DAYS</span>
            </div>
          </div>`;

if (!code.includes(targetSubBHeader)) {
  console.error("Could not find targetSubBHeader in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetSubBHeader, replacementSubBHeader);

// 9. REPLACE SUBSECTION C WITH THE FULL REFERRAL CUSTOMIZER & ADMIN MODAL INTEGRATION
const targetSubCStart = `        {/* ===============================================================
            SUBSECTION C: RECOMMENDED WEBSITES & PRODUCTION TOOLKITS
        =============================================================== */}
        <div className="relative z-10 mt-8 pt-6 border-t-2 border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-950 text-xs font-mono font-bold mb-3">
            <Globe className="w-3.5 h-3.5 text-cyan-600" />
            <span>RECOMMENDED WEBSITES & PRODUCTION TOOLKITS</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-950">
            Recommended Websites & Platforms to Deploy This Automation
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 leading-relaxed">
            Direct links to the official orchestration portals, model APIs, and vector databases used in this architecture:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
            {activeStrategy.recommendedWebsites.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border-2 border-slate-300 hover:border-cyan-500 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-slate-950 group-hover:text-cyan-700 transition-colors flex items-center gap-1.5">
                      <span>{site.name}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                      {site.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-mono font-bold">
                      {site.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2">
                    {site.description}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-cyan-700 group-hover:underline">
                  <span>Open Platform</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>`;

const replacementSubCStart = `        {/* ===============================================================
            SUBSECTION C: RECOMMENDED WEBSITES & PRODUCTION TOOLKITS
            (WITH DEVELOPER / ADMIN REFERRAL LINK CUSTOMIZATION ENGINE)
        =============================================================== */}
        <div className="relative z-10 mt-8 pt-6 border-t-2 border-indigo-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-950 text-xs font-mono font-bold">
              <Globe className="w-3.5 h-3.5 text-indigo-700" />
              <span>RECOMMENDED WEBSITES & PRODUCTION TOOLKITS</span>
            </div>

            {/* Admin Referral Manager Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setImportExportJson(JSON.stringify(customReferralLinks, null, 2));
                setIsAdminReferralModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Admin & Developer: Customize destination & referral links for all tools"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin: Manage Referral Links</span>
              {Object.keys(customReferralLinks).length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold">
                  {Object.keys(customReferralLinks).length} custom
                </span>
              )}
            </button>
          </div>

          {/* Toast Notification */}
          {referralToastMsg && (
            <div className="mb-3 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold flex items-center gap-2 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{referralToastMsg}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                Recommended Websites & Platforms to Deploy This Automation
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 leading-relaxed">
                Direct links to the production orchestration portals, model APIs, and deployment toolkits used in this blueprint. Click <span className="font-bold text-slate-950">"Open Browser"</span> to visit each tool, or use <span className="font-bold text-indigo-700">"Edit Link"</span> to plug in your custom affiliate / referral URLs to earn commissions.
              </p>
            </div>
            <div className="shrink-0 text-[11px] font-mono text-slate-500 font-bold">
              STACK: <span className="text-indigo-700 font-extrabold">{activeBlueprint.tools.length} Production Tools</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
            {activeStrategy.recommendedWebsites.map((site) => {
              const effective = getEffectiveWebsiteLink(site.name, site.url, activeBlueprint.id);
              const isEditing = editingWebsiteKey === effective.key;

              return (
                <div
                  key={site.name}
                  className="p-4 rounded-2xl bg-white/95 border-2 border-indigo-200/80 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between group shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-slate-950 group-hover:text-indigo-700 transition-colors flex items-center gap-1.5">
                        <span>{site.name}</span>
                      </span>
                      {effective.isCustom && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold border border-emerald-300">
                          ✓ Referral Active
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                        {site.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-mono font-bold">
                        {site.role}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed mt-2 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
                      {site.description}
                    </p>

                    {/* Inline Editor Panel when triggered */}
                    {isEditing ? (
                      <div className="mt-3 p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs font-mono">
                        <div className="text-[11px] font-bold text-indigo-950 flex items-center justify-between">
                          <span>Customize Referral Link:</span>
                          <button
                            type="button"
                            onClick={() => setEditingWebsiteKey(null)}
                            className="text-slate-400 hover:text-slate-700"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block uppercase font-bold">Destination URL:</label>
                          <input
                            type="url"
                            value={editUrlInput}
                            onChange={(e) => setEditUrlInput(e.target.value)}
                            placeholder="https://..."
                            className="w-full mt-0.5 px-2 py-1 bg-white border border-slate-300 rounded text-slate-950 text-xs font-sans focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-600 block uppercase font-bold">Button CTA Label:</label>
                          <input
                            type="text"
                            value={editLabelInput}
                            onChange={(e) => setEditLabelInput(e.target.value)}
                            placeholder="Open Browser"
                            className="w-full mt-0.5 px-2 py-1 bg-white border border-slate-300 rounded text-slate-950 text-xs font-sans focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => handleSaveWebsiteOverride(site.name, activeBlueprint.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save Link</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResetWebsiteOverride(site.name, activeBlueprint.id)}
                            className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="truncate max-w-[120px]" title={effective.url}>
                          {effective.url.replace(/^https?:\/\//, '').split('/')[0]}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingWebsiteKey(effective.key);
                            setEditUrlInput(effective.url);
                            setEditLabelInput(effective.label);
                          }}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200 transition-colors cursor-pointer"
                          title="Change to your personal affiliate / referral link"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit Link</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Primary CTA: "Open Browser" */}
                  <div className="mt-3.5 pt-2.5 border-t border-slate-200">
                    <a
                      href={effective.url}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-900 text-white font-mono font-bold text-xs flex items-center justify-between transition-colors shadow-xs group/btn"
                    >
                      <span className="flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>{effective.label}</span>
                      </span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>`;

if (!code.includes(targetSubCStart)) {
  console.error("Could not find targetSubCStart in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetSubCStart, replacementSubCStart);

// 10. UPDATE SUBSECTION D (PRO TIPS) TO PURPLE LIGHT ACCENTS
const targetSubD = `        {/* ===============================================================
            SUBSECTION D: ARCHITECTURAL PRO TIPS & SECRET STRATEGIES
        =============================================================== */}
        <div className="relative z-10 mt-8 pt-6 border-t-2 border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-mono font-bold mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
            <span>ARCHITECTURAL PRO TIPS & HIGH-IMPACT IMPLEMENTATION STRATEGIES</span>
          </div>`;

const replacementSubD = `        {/* ===============================================================
            SUBSECTION D: ARCHITECTURAL PRO TIPS & SECRET STRATEGIES
        =============================================================== */}
        <div className="relative z-10 mt-8 pt-6 border-t-2 border-indigo-200/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-mono font-bold mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-purple-700" />
            <span>ARCHITECTURAL PRO TIPS & HIGH-IMPACT IMPLEMENTATION STRATEGIES</span>
          </div>`;

if (!code.includes(targetSubD)) {
  console.error("Could not find targetSubD in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetSubD, replacementSubD);

// 11. UPDATE SUBSECTION E (PROGRESSION MILESTONES) & INSERT ADMIN REFERRAL MODAL BEFORE CLOSING OF SECTION 2
const targetSubEEnd = `                  <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{m.roiImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`;

const replacementSubEEnd = `                  <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{m.roiImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===============================================================
            ADMIN & DEVELOPER REFERRAL & DESTINATION LINKS MANAGER MODAL
        =============================================================== */}
        {isAdminReferralModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white border-2 border-slate-300 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-950">
                      Developer & Admin Referral Links Manager
                    </h3>
                    <p className="text-xs text-slate-600 font-mono font-medium">
                      Configure custom affiliate & referral links to earn commissions across all toolcards
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAdminReferralModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-200 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setAdminModalTab('current')}
                  className={\`pb-2.5 px-3 text-xs font-mono font-bold border-b-2 transition-colors cursor-pointer \${
                    adminModalTab === 'current'
                      ? 'border-indigo-600 text-indigo-950'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }\`}
                >
                  Current Blueprint Tools ({activeStrategy.recommendedWebsites.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminModalTab('all')}
                  className={\`pb-2.5 px-3 text-xs font-mono font-bold border-b-2 transition-colors cursor-pointer \${
                    adminModalTab === 'all'
                      ? 'border-indigo-600 text-indigo-950'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }\`}
                >
                  Centralized Tool Directory ({Object.keys(DEFAULT_TOOL_REFERRAL_LINKS).length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImportExportJson(JSON.stringify(customReferralLinks, null, 2));
                    setAdminModalTab('backup');
                  }}
                  className={\`pb-2.5 px-3 text-xs font-mono font-bold border-b-2 transition-colors cursor-pointer \${
                    adminModalTab === 'backup'
                      ? 'border-indigo-600 text-indigo-950'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }\`}
                >
                  Import / Export Backup JSON
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto flex-1 space-y-4">
                {importExportStatus && (
                  <div
                    className={\`p-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 \${
                      importExportStatus.type === 'success'
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                        : 'bg-red-50 border border-red-300 text-red-900'
                    }\`}
                  >
                    {importExportStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{importExportStatus.text}</span>
                  </div>
                )}

                {adminModalTab === 'current' && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-600 font-medium leading-relaxed">
                      Tools deployed in the currently selected blueprint (<span className="font-bold text-slate-950">{activeBlueprint.title}</span>). Editing here overrides the destination link for this blueprint.
                    </div>
                    <div className="space-y-2.5">
                      {activeStrategy.recommendedWebsites.map((site) => {
                        const effective = getEffectiveWebsiteLink(site.name, site.url, activeBlueprint.id);
                        return (
                          <div
                            key={site.name}
                            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-sm text-slate-950">{site.name}</span>
                                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[10px] font-mono font-bold">
                                  {site.role}
                                </span>
                                {effective.isCustom && (
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold">
                                    Custom Active
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-mono text-slate-500 truncate max-w-md mt-1">
                                {effective.url}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAdminReferralModalOpen(false);
                                  setEditingWebsiteKey(effective.key);
                                  setEditUrlInput(effective.url);
                                  setEditLabelInput(effective.label);
                                }}
                                className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit Destination</span>
                              </button>
                              {effective.isCustom && (
                                <button
                                  type="button"
                                  onClick={() => handleResetWebsiteOverride(site.name, activeBlueprint.id)}
                                  className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Reset</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {adminModalTab === 'all' && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-600 font-medium leading-relaxed">
                      Central directory of all 48+ supported platforms with their default referral links. You can export this configuration to backup your commissions or restore on other browsers.
                    </div>
                    <div className="max-h-[380px] overflow-y-auto space-y-2 border border-slate-200 rounded-xl p-2 bg-slate-50">
                      {Object.entries(DEFAULT_TOOL_REFERRAL_LINKS).map(([toolName, defaultUrl]) => {
                        const override = customReferralLinks[toolName];
                        const activeUrl = override?.url || defaultUrl;
                        return (
                          <div
                            key={toolName}
                            className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 truncate">{toolName}</div>
                              <div className="font-mono text-[11px] text-slate-500 truncate max-w-sm">
                                {activeUrl}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {override && (
                                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  Overridden
                                </span>
                              )}
                              <a
                                href={activeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-slate-500 hover:text-slate-900"
                                title="Open destination in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {adminModalTab === 'backup' && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-600 font-medium leading-relaxed">
                      Backup and restore your custom referral links as JSON. This allows you to persist affiliate IDs across multiple browsers or migrate to other developer machines without losing custom links.
                    </div>

                    <textarea
                      value={importExportJson}
                      onChange={(e) => setImportExportJson(e.target.value)}
                      rows={9}
                      placeholder={'{\\n  "Make.com": { "url": "https://www.make.com/en/register?pc=...", "label": "Open Browser" }\\n}'}
                      className="w-full p-3 bg-slate-950 text-cyan-300 font-mono text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleImportReferralConfig}
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Import JSON Into Browser</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleExportReferralConfig}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Backup JSON</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetAllReferrals}
                        className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 border border-red-300 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset All Overrides</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Storage: browser \`localStorage['wh_ai_custom_referral_links_v1']\`
                </span>
                <button
                  type="button"
                  onClick={() => setIsAdminReferralModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>`;

if (!code.includes(targetSubEEnd)) {
  console.error("Could not find targetSubEEnd in AIAutomationDiagrams.tsx");
  process.exit(1);
}
code = code.replace(targetSubEEnd, replacementSubEEnd);

fs.writeFileSync(targetPath, code, 'utf8');
console.log("Successfully updated AIAutomationDiagrams.tsx with 100+ Workflows, Collapsible Categories, Purple Light Theme, and Referral Engine!");
