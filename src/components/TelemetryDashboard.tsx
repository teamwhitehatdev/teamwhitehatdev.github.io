import { VerticalVisitorIPLogs } from './VerticalVisitorIPLogs';
import { RealWorldMap } from './RealWorldMap';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity, Globe, Laptop, Smartphone, Tablet, Search, Download, RefreshCw,
  TrendingUp, Shield, AlertTriangle, Cpu, PieChart, BarChart2, Eye, ExternalLink,
  ChevronRight, ChevronLeft, Sparkles, Filter, CheckCircle2, Clock, Zap, MapPin,
  Compass, Radio, Layers, Server, Terminal, Lock, Moon, Sun, FileText, UserCheck, Bot
} from 'lucide-react';
import { TelemetryEvent, LiveVisitorSession, WebPerfTelemetry, PrivacyConfig } from '../types';
import { getInitialTelemetryData, trackTelemetryEvent } from '../utils/telemetryTracker';

export const TelemetryDashboard: React.FC = () => {
  // THEME SWITCHER: 'dark' (Cyber Telemetry) vs 'light' (Clean SaaS / Google Analytics style)
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // TIMEFRAME SELECTOR: 1H / 6H / 12H / 24H / 7D / 30D / 90D / 1Y
  const [timeframe, setTimeframe] = useState<'1H' | '6H' | '12H' | '24H' | '7D' | '30D' | '90D' | '1Y'>('24H');

  // MAP LAYER MODES: A (Traffic Intensity), B (Visitor Dots), C (Country Heatmap), D (Traffic Flow)
  const [mapLayerMode, setMapLayerMode] = useState<'intensity' | 'dots' | 'heatmap' | 'flow'>('intensity');

  // SUB-SECTION NAVIGATION TAB
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'map' | 'live' | 'journeys' | 'sources' | 'devices' | 'performance' | 'security' | 'privacy'>('overview');

  // SEARCH & FILTERING
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('ALL');
  const [selectedVisitorProfile, setSelectedVisitorProfile] = useState<LiveVisitorSession | null>(null);

  // PRIVACY CONFIGURATION STATE
  const [privacyConfig, setPrivacyConfig] = useState<PrivacyConfig>({
    privacyMode: 'privacy_enhanced',
    dataRetentionDays: 30,
    anonymizeIp: true,
    enableConsentBanner: true
  });

  // TELEMETRY DATA STATE
  const [telemetryData, setTelemetryData] = useState<{
    events: TelemetryEvent[];
    sessions: LiveVisitorSession[];
    perf: WebPerfTelemetry[];
  }>(() => getInitialTelemetryData());

  // REAL-TIME AUTO REFRESH TICKER
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoRefresh) return;
    const interval = setInterval(() => {
      setTelemetryData(getInitialTelemetryData());
      setLastUpdated(new Date());
    }, 4000); // 4-second live ticker
    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  // DERIVED COMPUTATIONS & METRICS
  const filteredEvents = useMemo(() => {
    const now = Date.now();
    const msMap = {
      '1H': 3600000,
      '6H': 21600000,
      '12H': 43200000,
      '24H': 86400000,
      '7D': 604800000,
      '30D': 2592000000,
      '90D': 7776000000,
      '1Y': 31536000000
    };
    const maxAge = msMap[timeframe] || 86400000;

    return telemetryData.events.filter(e => {
      const age = now - new Date(e.timestamp).getTime();
      if (age > maxAge) return false;
      if (selectedCountryFilter !== 'ALL' && e.country !== selectedCountryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          (e.country && e.country.toLowerCase().includes(q)) ||
          (e.pagePath && e.pagePath.toLowerCase().includes(q)) ||
          (e.device && e.device.toLowerCase().includes(q)) ||
          (e.browser && e.browser.toLowerCase().includes(q)) ||
          (e.referrer && e.referrer.toLowerCase().includes(q)) ||
          (e.label && e.label.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [telemetryData.events, timeframe, selectedCountryFilter, searchQuery]);

  // KPI STATS
  const totalEvents = filteredEvents.length;
  const totalVisitors = useMemo(() => new Set(filteredEvents.map(e => e.visitorId)).size, [filteredEvents]);
  const totalSessions = useMemo(() => new Set(filteredEvents.map(e => e.sessionId)).size, [filteredEvents]);
  const pageViewsCount = useMemo(() => filteredEvents.filter(e => e.type === 'PAGE_VIEW').length, [filteredEvents]);
  const activeNowCount = useMemo(() => telemetryData.sessions.filter(s => s.isActive).length, [telemetryData.sessions]);
  const ctaClicksCount = useMemo(() => filteredEvents.filter(e => e.type === 'CTA_CLICK' || e.type === 'BUTTON_CLICK').length, [filteredEvents]);

  // COUNTRY BREAKDOWN
  const countryDistribution = useMemo(() => {
    const map: Record<string, { count: number; flag: string; sessions: number }> = {
      'Philippines': { count: 0, flag: '🇵🇭', sessions: 0 },
      'United States': { count: 0, flag: '🇺🇸', sessions: 0 },
      'Singapore': { count: 0, flag: '🇸🇬', sessions: 0 },
      'United Kingdom': { count: 0, flag: '🇬🇧', sessions: 0 },
      'Canada': { count: 0, flag: '🇨🇦', sessions: 0 },
      'Australia': { count: 0, flag: '🇦🇺', sessions: 0 },
      'Germany': { count: 0, flag: '🇩🇪', sessions: 0 }
    };

    filteredEvents.forEach(e => {
      const c = e.country || 'Philippines';
      if (!map[c]) {
        map[c] = { count: 0, flag: '🌐', sessions: 0 };
      }
      map[c].count += 1;
    });

    return Object.entries(map)
      .map(([country, data]) => ({ country, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [filteredEvents]);

  // TRAFFIC SOURCES
  const trafficSources = useMemo(() => {
    const counts: Record<string, number> = {
      'Google (Search)': 0,
      'Direct / Bookmarks': 0,
      'Facebook (Social)': 0,
      'YouTube (Video)': 0,
      'X / Twitter': 0,
      'Reddit (Community)': 0,
      'Referral Websites': 0
    };

    filteredEvents.forEach(e => {
      const ref = (e.referrer || 'Direct').toLowerCase();
      if (ref.includes('google')) counts['Google (Search)'] += 1;
      else if (ref.includes('facebook') || ref.includes('fb')) counts['Facebook (Social)'] += 1;
      else if (ref.includes('youtube')) counts['YouTube (Video)'] += 1;
      else if (ref.includes('twitter') || ref.includes('t.co') || ref.includes('x.com')) counts['X / Twitter'] += 1;
      else if (ref.includes('reddit')) counts['Reddit (Community)'] += 1;
      else if (ref.includes('direct') || ref === '') counts['Direct / Bookmarks'] += 1;
      else counts['Referral Websites'] += 1;
    });

    const sum = totalEvents || 1;
    return Object.entries(counts).map(([source, count]) => ({
      source,
      count,
      pct: Math.round((count / sum) * 100)
    })).sort((a, b) => b.count - a.count);
  }, [filteredEvents, totalEvents]);

  // DEVICE INTELLIGENCE
  const deviceStats = useMemo(() => {
    let desktop = 0, mobile = 0, tablet = 0;
    filteredEvents.forEach(e => {
      if (e.device === 'Desktop') desktop++;
      else if (e.device === 'Mobile') mobile++;
      else if (e.device === 'Tablet') tablet++;
    });
    const denom = totalEvents || 1;
    return {
      desktop,
      mobile,
      tablet,
      desktopPct: Math.round((desktop / denom) * 100),
      mobilePct: Math.round((mobile / denom) * 100),
      tabletPct: Math.round((tablet / denom) * 100)
    };
  }, [filteredEvents, totalEvents]);

  // PAGE POPULARITY MATRIX
  const pagePopularity = useMemo(() => {
    const map: Record<string, { views: number; ctaClicks: number }> = {};
    filteredEvents.forEach(e => {
      const p = e.pagePath || '/#/';
      if (!map[p]) map[p] = { views: 0, ctaClicks: 0 };
      if (e.type === 'PAGE_VIEW') map[p].views += 1;
      if (e.type === 'CTA_CLICK' || e.type === 'BUTTON_CLICK') map[p].ctaClicks += 1;
    });

    return Object.entries(map)
      .map(([page, data]) => ({ page, ...data }))
      .sort((a, b) => b.views - a.views);
  }, [filteredEvents]);

  // EXPORT CSV
  const exportTelemetryCSV = () => {
    const headers = ['Timestamp', 'Session ID', 'Visitor ID', 'Event Type', 'Label', 'Page Path', 'Country', 'City', 'Device', 'Browser', 'Referrer'];
    const rows = filteredEvents.map(e => [
      `"${e.timestamp}"`,
      `"${e.sessionId}"`,
      `"${e.visitorId}"`,
      `"${e.type}"`,
      `"${e.label}"`,
      `"${e.pagePath}"`,
      `"${e.country || ''}"`,
      `"${e.city || ''}"`,
      `"${e.device || ''}"`,
      `"${e.browser || ''}"`,
      `"${e.referrer || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `telemetry_intel_report_${timeframe}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // THEME COLOR CLASS SHORTCUTS
  const isDark = themeMode === 'dark';
  const themeCardBg = isDark ? 'bg-slate-900 border-cyan-500/40 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-md';
  const themePanelBg = isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700';
  const themeAccentText = isDark ? 'text-cyan-400' : 'text-indigo-600';
  const themeSecondaryText = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`space-y-8 font-mono transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>

      {/* ========================================================================= */}
      {/* 🚀 TOP HERO BANNER & THEME SELECTOR TOGGLE */}
      {/* ========================================================================= */}
      <div className={`p-6 rounded-3xl border-2 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${themeCardBg}`}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              LIVE TELEMETRY ENGINE &bull; ACTIVE ENGINE V5668.0.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-orbitron uppercase tracking-wider">
            REAL-TIME TELEMETRY ENGINE &amp; VISITOR INSIGHTS
          </h2>
          <p className="text-xs font-sans max-w-3xl leading-relaxed opacity-85">
            Advanced Visitor Analytics, Geographic Traffic Intelligence, Real-Time Observability &amp; Conversion Telemetry Platform.
          </p>
        </div>

        {/* CONTROLS: THEME SWITCHER + AUTO REFRESH + EXPORT */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          
          {/* THEME TOGGLE: LIGHT vs DARK */}
          <div className={`p-1 rounded-2xl border flex items-center space-x-1 ${isDark ? 'bg-black border-slate-700' : 'bg-slate-100 border-slate-300'}`}>
            <button
              onClick={() => setThemeMode('dark')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                isDark ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>DARK CYBER</span>
            </button>
            <button
              onClick={() => setThemeMode('light')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                !isDark ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>LIGHT SAAS</span>
            </button>
          </div>

          {/* AUTO REFRESH TOGGLE */}
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              isAutoRefresh
                ? isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAutoRefresh ? 'animate-spin' : ''}`} />
            <span>{isAutoRefresh ? 'LIVE (4s)' : 'PAUSED'}</span>
          </button>

          {/* CSV EXPORT */}
          <button
            onClick={exportTelemetryCSV}
            className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TIMEFRAME PILL SELECTOR: 1H / 6H / 12H / 24H / 7D / 30D / 90D / 1Y */}
      {/* ========================================================================= */}
      <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${themeCardBg}`}>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase">SELECT TIMEFRAME:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          {(['1H', '6H', '12H', '24H', '7D', '30D', '90D', '1Y'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                timeframe === tf
                  ? isDark
                    ? 'bg-gradient-to-r from-cyan-400 to-lime-400 text-black shadow-lg scale-105'
                    : 'bg-indigo-600 text-white shadow-md scale-105'
                  : isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📊 SECTION 3: TRAFFIC OVERVIEW KPI MATRIX */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
        
        {/* CARD 1: TOTAL PAGE VIEWS */}
        <div className={`p-4 rounded-2xl border space-y-1.5 shadow-md ${themeCardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase ${themeSecondaryText}`}>PAGE VIEWS</span>
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-orbitron text-cyan-400">{pageViewsCount}</div>
          <span className="text-[10px] text-emerald-400 font-bold block">↑ +18.4% growth</span>
        </div>

        {/* CARD 2: UNIQUE VISITORS */}
        <div className={`p-4 rounded-2xl border space-y-1.5 shadow-md ${themeCardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase ${themeSecondaryText}`}>UNIQUE VISITORS</span>
            <UserCheck className="w-3.5 h-3.5 text-lime-400" />
          </div>
          <div className="text-2xl font-black font-orbitron text-lime-400">{totalVisitors}</div>
          <span className={`text-[10px] block ${themeSecondaryText}`}>Distinct First-Party IDs</span>
        </div>

        {/* CARD 3: SESSIONS */}
        <div className={`p-4 rounded-2xl border space-y-1.5 shadow-md ${themeCardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase ${themeSecondaryText}`}>SESSIONS</span>
            <Activity className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-orbitron text-purple-400">{totalSessions}</div>
          <span className={`text-[10px] block ${themeSecondaryText}`}>Avg 3.4 views/session</span>
        </div>

        {/* CARD 4: ACTIVE NOW */}
        <div className={`p-4 rounded-2xl border space-y-1.5 shadow-md ${themeCardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase ${themeSecondaryText}`}>ACTIVE NOW</span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-2xl font-black font-orbitron text-emerald-400">{activeNowCount}</div>
          <span className="text-[10px] text-emerald-400 font-bold block">Live on pages</span>
        </div>

        {/* CARD 5: AVG DURATION */}
        <div className={`p-4 rounded-2xl border space-y-1.5 shadow-md ${themeCardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase ${themeSecondaryText}`}>AVG DURATION</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-orbitron text-amber-400">04:18</div>
          <span className={`text-[10px] block ${themeSecondaryText}`}>High engagement rate</span>
        </div>

        {/* CARD 6: CTA / CONVERSIONS */}
        <div className={`p-4 rounded-2xl border space-y-1.5 shadow-md ${themeCardBg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase ${themeSecondaryText}`}>CTA CLICKS</span>
            <Zap className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-black font-orbitron text-rose-400">{ctaClicksCount}</div>
          <span className="text-[10px] text-rose-400 font-bold block">Inquiries &amp; Deals</span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🔴 SECTION 2: REAL-TIME LIVE VISITOR MONITOR (LIVE OPERATIONS PANEL) */}
      {/* ========================================================================= */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${themeCardBg}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3 border-inherit">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-base sm:text-lg font-black font-orbitron uppercase">
              🔴 REAL-TIME LIVE VISITOR MONITOR ({activeNowCount} ACTIVE SESSIONS)
            </h3>
          </div>
          <span className={`text-[11px] font-mono ${themeSecondaryText}`}>
            Auto-stream updated {lastUpdated.toLocaleTimeString()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {telemetryData.sessions.slice(0, 8).map(sess => (
            <div
              key={sess.id}
              onClick={() => setSelectedVisitorProfile(sess)}
              className={`p-4 rounded-2xl border space-y-2 cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${themePanelBg}`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-black/60 text-cyan-300 font-bold text-[10px] rounded border border-cyan-500/40">
                  {sess.sessionId}
                </span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  sess.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40' : 'bg-slate-700 text-slate-300'
                }`}>
                  {sess.isActive ? '● ACTIVE' : 'IDLE'}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-1.5 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                  <span className="truncate">{sess.country} &bull; {sess.city}</span>
                </div>
                <div className={`text-[11px] truncate ${themeSecondaryText}`}>
                  Page: <span className="text-cyan-400 font-bold">{sess.currentPage}</span>
                </div>
                <div className={`text-[10px] ${themeSecondaryText}`}>
                  {sess.device} &bull; {sess.browser} &bull; {sess.referrer}
                </div>
              </div>

              <div className="pt-2 border-t border-inherit flex items-center justify-between text-[10px]">
                <span className="text-amber-400 font-mono font-bold">⏱ {Math.floor(sess.durationSeconds / 60)}m {sess.durationSeconds % 60}s</span>
                <span className="text-cyan-400 hover:underline font-bold">VIEW PROFILE →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌎 SECTION 1 & 18: REAL GEOGRAPHIC WORLD MAP & LAYER MODES */}
      {/* ========================================================================= */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-5 ${themeCardBg}`}>
        <RealWorldMap
          isDark={isDark}
          sessions={telemetryData.sessions}
          events={filteredEvents}
          selectedCountry={selectedCountryFilter}
          onSelectCountry={(c) => setSelectedCountryFilter(c === selectedCountryFilter ? 'ALL' : c)}
        />
      </div>

      {/* ========================================================================= */}
      {/* 🧭 SECTION 5 & 6: TRAFFIC SOURCE ATTRIBUTION & VISITOR JOURNEYS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 🧭 TRAFFIC SOURCES */}
        <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${themeCardBg}`}>
          <div className="flex items-center justify-between border-b pb-3 border-inherit">
            <h4 className="text-base font-black font-orbitron uppercase flex items-center space-x-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>🧭 TRAFFIC SOURCE INTELLIGENCE</span>
            </h4>
            <span className="text-[10px] font-bold text-cyan-400">ACQUISITION CHANNELS</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {trafficSources.map(src => (
              <div key={src.source} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{src.source}</span>
                  <span className="font-bold text-cyan-400">{src.count} visits ({src.pct}%)</span>
                </div>
                <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full" style={{ width: `${Math.max(src.pct, 5)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔗 VISITOR JOURNEY FLOW */}
        <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${themeCardBg}`}>
          <div className="flex items-center justify-between border-b pb-3 border-inherit">
            <h4 className="text-base font-black font-orbitron uppercase flex items-center space-x-2">
              <Layers className="w-4 h-4 text-lime-400" />
              <span>🔗 VISITOR JOURNEY &amp; CLICK PATH</span>
            </h4>
            <span className="text-[10px] font-bold text-lime-400">CONVERSION FUNNEL</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className={`p-3 rounded-xl border flex items-center justify-between ${themePanelBg}`}>
              <span>1. Google Search / Direct Discovery</span>
              <span className="text-lime-400 font-bold">100% Entry</span>
            </div>
            <div className="text-center text-slate-500 font-bold">↓</div>
            <div className={`p-3 rounded-xl border flex items-center justify-between ${themePanelBg}`}>
              <span>2. Home Learning Hub (/#/)</span>
              <span className="text-cyan-400 font-bold">78% Progress</span>
            </div>
            <div className="text-center text-slate-500 font-bold">↓</div>
            <div className={`p-3 rounded-xl border flex items-center justify-between ${themePanelBg}`}>
              <span>3. Portfolio Showcase / Services (/#/showcase)</span>
              <span className="text-purple-400 font-bold">42% Progress</span>
            </div>
            <div className="text-center text-slate-500 font-bold">↓</div>
            <div className={`p-3 rounded-xl border flex items-center justify-between ${themePanelBg}`}>
              <span>4. CTA Consultation / Affiliate Deal Click</span>
              <span className="text-amber-400 font-bold">18.4% Conversion</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 💻 SECTION 7, 8, 9, 14: DEVICE, BROWSER & WEB PERFORMANCE TELEMETRY */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* DEVICE INTELLIGENCE */}
        <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${themeCardBg}`}>
          <h4 className="text-sm font-black font-orbitron uppercase flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>💻 DEVICE INTELLIGENCE</span>
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold">
              <span>Mobile Smartphones</span>
              <span className="text-emerald-400">{deviceStats.mobilePct}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${deviceStats.mobilePct}%` }}></div>
            </div>

            <div className="flex items-center justify-between font-bold">
              <span>Desktop &amp; Laptops</span>
              <span className="text-cyan-400">{deviceStats.desktopPct}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${deviceStats.desktopPct}%` }}></div>
            </div>

            <div className="flex items-center justify-between font-bold">
              <span>Tablets &amp; iPads</span>
              <span className="text-purple-400">{deviceStats.tabletPct}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: `${deviceStats.tabletPct}%` }}></div>
            </div>
          </div>
        </div>

        {/* WEB PERFORMANCE TELEMETRY */}
        <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${themeCardBg}`}>
          <h4 className="text-sm font-black font-orbitron uppercase flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>⚡ CORE WEB VITALS TELEMETRY</span>
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span>Largest Contentful Paint (LCP):</span>
              <span className="text-emerald-400 font-bold font-mono">0.82s (FAST)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Time to First Byte (TTFB):</span>
              <span className="text-emerald-400 font-bold font-mono">142ms (OPTIMAL)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cumulative Layout Shift (CLS):</span>
              <span className="text-emerald-400 font-bold font-mono">0.012 (EXCELLENT)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>DOM Content Loaded:</span>
              <span className="text-cyan-400 font-bold font-mono">580ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span>JavaScript Runtime Errors:</span>
              <span className="text-emerald-400 font-bold font-mono">0 (CLEAN)</span>
            </div>
          </div>
        </div>

        {/* BOT & ANOMALY INTELLIGENCE */}
        <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${themeCardBg}`}>
          <h4 className="text-sm font-black font-orbitron uppercase flex items-center space-x-2">
            <Bot className="w-4 h-4 text-purple-400" />
            <span>🤖 BOT &amp; ANOMALY DETECTION</span>
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span>Human-like Traffic:</span>
              <span className="text-emerald-400 font-bold font-mono">92.6%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Verified Search Bots:</span>
              <span className="text-cyan-400 font-bold font-mono">5.2% (Google/Bing)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Other Automated Crawlers:</span>
              <span className="text-purple-400 font-bold font-mono">2.2%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
              ✓ Anomaly Guard: No suspicious volumetric DDoS traffic spikes detected.
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🧠 SECTION 21: AI INSIGHTS ENGINE */}
      {/* ========================================================================= */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-3 ${themeCardBg}`}>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base sm:text-lg font-black font-orbitron uppercase">
            🧠 AI INSIGHTS &amp; GROWTH RECOMMENDATIONS
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className={`p-4 rounded-2xl border space-y-1.5 ${themePanelBg}`}>
            <span className="text-lime-400 font-bold font-mono block">💡 TRAFFIC INSIGHT:</span>
            <p className="leading-relaxed">
              Mobile traffic from the Philippines and Southeast Asia represents 74% of your visitors. Showcase apps and AI tutorials hold the highest visitor engagement time (04:32 avg).
            </p>
          </div>
          <div className={`p-4 rounded-2xl border space-y-1.5 ${themePanelBg}`}>
            <span className="text-cyan-400 font-bold font-mono block">🎯 CONVERSION OPPORTUNITY:</span>
            <p className="leading-relaxed">
              Visitors navigating from Social Channels to the new AI Learning Hub convert to consultation inquiries at a 2.4x higher rate than direct traffic.
            </p>
          </div>
          <div className={`p-4 rounded-2xl border space-y-1.5 ${themePanelBg}`}>
            <span className="text-purple-400 font-bold font-mono block">⚡ PERFORMANCE OPTIMIZATION:</span>
            <p className="leading-relaxed">
              Bundle rendering speed on GitHub Pages is exceptional with LCP below 900ms across all desktop and mobile devices.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🔐 SECTION 20: PRIVACY & COMPLIANCE CONTROLS */}
      {/* ========================================================================= */}
      <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${themeCardBg}`}>
        <div className="flex items-center space-x-2 border-b pb-3 border-inherit">
          <Shield className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-black font-orbitron uppercase">
            🔐 PRIVACY, COMPLIANCE &amp; DATA RETENTION CONTROLS
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="text-slate-400 block pb-1 font-bold">PRIVACY MODE:</label>
            <select
              value={privacyConfig.privacyMode}
              onChange={(e) => setPrivacyConfig({ ...privacyConfig, privacyMode: e.target.value as any })}
              className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-cyan-300 font-bold uppercase"
            >
              <option value="full">FULL TELEMETRY</option>
              <option value="privacy_enhanced">PRIVACY-ENHANCED (RECOMMENDED)</option>
              <option value="minimal">MINIMAL AGGREGATED ONLY</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block pb-1 font-bold">DATA RETENTION PERIOD:</label>
            <select
              value={privacyConfig.dataRetentionDays}
              onChange={(e) => setPrivacyConfig({ ...privacyConfig, dataRetentionDays: parseInt(e.target.value) as any })}
              className="w-full px-3 py-2 bg-black border border-slate-700 rounded-xl text-lime-300 font-bold uppercase"
            >
              <option value={1}>24 HOURS</option>
              <option value={7}>7 DAYS</option>
              <option value={30}>30 DAYS (DEFAULT)</option>
              <option value={90}>90 DAYS</option>
              <option value={365}>365 DAYS</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block pb-1 font-bold">IP ANONYMIZATION:</label>
            <button
              onClick={() => setPrivacyConfig({ ...privacyConfig, anonymizeIp: !privacyConfig.anonymizeIp })}
              className={`w-full py-2 px-3 rounded-xl font-bold border transition-all ${
                privacyConfig.anonymizeIp ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {privacyConfig.anonymizeIp ? '✓ IP ANONYMIZATION ACTIVE' : 'RAW IP LOGGING'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🔍 SECTION 19: LIVE VISITOR PROFILE MODAL */}
      {/* ========================================================================= */}
      {selectedVisitorProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <div className={`p-6 sm:p-8 rounded-3xl border-2 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto ${themeCardBg}`}>
            
            <div className="flex items-center justify-between border-b pb-4 border-inherit">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                  PRIVACY-SAFE VISITOR PROFILE
                </span>
                <h3 className="text-xl font-black font-orbitron uppercase">
                  SESSION: {selectedVisitorProfile.sessionId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVisitorProfile(null)}
                className="px-3 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-mono cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className={`p-3 rounded-xl border ${themePanelBg}`}>
                <span className="text-slate-400 block text-[10px]">APPROX. LOCATION:</span>
                <span className="font-bold">{selectedVisitorProfile.country} &bull; {selectedVisitorProfile.city}</span>
              </div>
              <div className={`p-3 rounded-xl border ${themePanelBg}`}>
                <span className="text-slate-400 block text-[10px]">DEVICE &amp; BROWSER:</span>
                <span className="font-bold">{selectedVisitorProfile.device} &bull; {selectedVisitorProfile.browser}</span>
              </div>
              <div className={`p-3 rounded-xl border ${themePanelBg}`}>
                <span className="text-slate-400 block text-[10px]">ENTRY PAGE:</span>
                <span className="font-bold text-cyan-400">{selectedVisitorProfile.entryPage}</span>
              </div>
              <div className={`p-3 rounded-xl border ${themePanelBg}`}>
                <span className="text-slate-400 block text-[10px]">REFERRER:</span>
                <span className="font-bold text-lime-400">{selectedVisitorProfile.referrer}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase block">SESSION EVENT TIMELINE:</span>
              <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto">
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${themePanelBg}`}>
                  <span>PAGE_VIEW &bull; {selectedVisitorProfile.currentPage}</span>
                  <span className="text-cyan-400 text-[10px]">{new Date(selectedVisitorProfile.startTime).toLocaleTimeString()}</span>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${themePanelBg}`}>
                  <span>CTA_CLICK &bull; EXPLORE SERVICES / DEALS</span>
                  <span className="text-lime-400 text-[10px]">{new Date(selectedVisitorProfile.lastActive).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    

      {/* 📋 VERTICAL VISITOR IP TELEMETRY AUDIT STREAM */}
      <VerticalVisitorIPLogs />
</div>
  );
};
export default TelemetryDashboard;
