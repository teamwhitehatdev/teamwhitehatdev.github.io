import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VisitorLog } from '../types';
import {
  Globe, Shield, AlertTriangle, Search, Download, Trash2,
  Copy, Check, ExternalLink, Laptop, Smartphone, Tablet,
  Clock, ArrowUpDown, ChevronLeft, ChevronRight, Eye, RefreshCw, Filter
} from 'lucide-react';

const COUNTRY_FLAGS: Record<string, string> = {
  'Philippines': '🇵🇭',
  'United States': '🇺🇸',
  'Singapore': '🇸🇬',
  'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'Japan': '🇯🇵',
  'India': '🇮🇳',
  'France': '🇫🇷',
  'Brazil': '🇧🇷',
  'Netherlands': '🇳🇱',
  'Unknown': '🌐'
};

export const VerticalVisitorIPLogs: React.FC = () => {
  const { visitorLogs, clearVisitorLogs, bannedIps, addBannedIp, removeBannedIp } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedDevice, setSelectedDevice] = useState('ALL');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | 'today' | '7d' | '30d'>('all');
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // COPY IP TO CLIPBOARD
  const handleCopyIp = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  // FILTERED LOGS
  const filteredLogs = useMemo(() => {
    const now = new Date().getTime();
    return (visitorLogs || []).filter(log => {
      // Timeframe filter
      if (selectedTimeframe !== 'all') {
        const logTime = new Date(log.timestamp).getTime();
        const diffHours = (now - logTime) / (1000 * 60 * 60);
        if (selectedTimeframe === 'today' && diffHours > 24) return false;
        if (selectedTimeframe === '7d' && diffHours > 24 * 7) return false;
        if (selectedTimeframe === '30d' && diffHours > 24 * 30) return false;
      }

      // Country filter
      if (selectedCountry !== 'ALL' && log.country !== selectedCountry) {
        return false;
      }

      // Device filter
      if (selectedDevice !== 'ALL' && log.device !== selectedDevice) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesIp = log.ip.toLowerCase().includes(q);
        const matchesCountry = (log.country || '').toLowerCase().includes(q);
        const matchesCity = (log.city || '').toLowerCase().includes(q);
        const matchesPage = (log.pageVisited || '').toLowerCase().includes(q);
        const matchesBrowser = (log.browser || '').toLowerCase().includes(q);
        const matchesOs = (log.os || '').toLowerCase().includes(q);
        return matchesIp || matchesCountry || matchesCity || matchesPage || matchesBrowser || matchesOs;
      }

      return true;
    });
  }, [visitorLogs, searchQuery, selectedCountry, selectedDevice, selectedTimeframe]);

  // PAGINATION
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  // EXPORT TO CSV
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) return;
    const headers = ['ID,IP Address,Country,City,Device,Browser,OS,Page Visited,Timestamp'];
    const rows = filteredLogs.map(l => 
      `"${l.id}","${l.ip}","${l.country}","${l.city || ''}","${l.device}","${l.browser}","${l.os}","${l.pageVisited}","${l.timestamp}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `visitor_ip_telemetry_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // EXPORT TO JSON
  const handleExportJSON = () => {
    if (filteredLogs.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `visitor_ip_telemetry_logs_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // COUNTRY OPTIONS FOR FILTER
  const availableCountries = useMemo(() => {
    const set = new Set((visitorLogs || []).map(l => l.country).filter(Boolean));
    return Array.from(set);
  }, [visitorLogs]);

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-6 text-white font-mono">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/40">
              <Globe className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="text-lg font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                REAL-TIME VISITOR IP TELEMETRY AUDIT STREAM
              </h3>
              <p className="text-xs text-slate-400">
                Live vertical stream of all connecting visitor IP addresses, geolocation data, devices, and visited routes.
              </p>
            </div>
          </div>
        </div>

        {/* METRICS & QUICK STATS */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 bg-black/60 border border-cyan-500/40 rounded-xl flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-400">TOTAL LOGS:</span>
            <span className="text-cyan-300 font-bold">{(visitorLogs || []).length}</span>
          </div>

          <div className="px-3 py-1.5 bg-black/60 border border-purple-500/40 rounded-xl flex items-center space-x-2">
            <span className="text-slate-400">UNIQUE IPS:</span>
            <span className="text-purple-300 font-bold">{new Set((visitorLogs || []).map(l => l.ip)).size}</span>
          </div>

          <div className="px-3 py-1.5 bg-black/60 border border-red-500/40 rounded-xl flex items-center space-x-2">
            <span className="text-slate-400">BANNED:</span>
            <span className="text-red-400 font-bold">{(bannedIps || []).length}</span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        
        {/* SEARCH BAR */}
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search IP, Country, City, Path, Device, Browser..."
            className="w-full pl-10 pr-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* COUNTRY SELECT */}
        <div>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-cyan-300 uppercase font-bold focus:outline-none"
          >
            <option value="ALL">🌐 ALL COUNTRIES</option>
            {availableCountries.map(c => (
              <option key={c} value={c}>
                {(COUNTRY_FLAGS[c] || '📍')} {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* DEVICE SELECT */}
        <div>
          <select
            value={selectedDevice}
            onChange={(e) => {
              setSelectedDevice(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-purple-300 uppercase font-bold focus:outline-none"
          >
            <option value="ALL">📱 ALL DEVICES</option>
            <option value="Desktop">💻 DESKTOP ONLY</option>
            <option value="Mobile">📱 MOBILE ONLY</option>
            <option value="Tablet">📟 TABLET ONLY</option>
          </select>
        </div>

        {/* TIMEFRAME SELECT */}
        <div>
          <select
            value={selectedTimeframe}
            onChange={(e) => {
              setSelectedTimeframe(e.target.value as any);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-emerald-300 uppercase font-bold focus:outline-none"
          >
            <option value="all">⏳ ALL TIME</option>
            <option value="today">⚡ PAST 24 HOURS</option>
            <option value="7d">📅 PAST 7 DAYS</option>
            <option value="30d">🗓️ PAST 30 DAYS</option>
          </select>
        </div>

      </div>

      {/* EXPORT & ACTION CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="text-slate-400 flex items-center space-x-2">
          <span>Showing <strong className="text-white">{filteredLogs.length}</strong> matching IP visitor entries</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            disabled={filteredLogs.length === 0}
            className="px-3.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            disabled={filteredLogs.length === 0}
            className="px-3.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl font-bold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT JSON</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all recorded visitor IP telemetry logs?')) {
                clearVisitorLogs();
              }
            }}
            disabled={(visitorLogs || []).length === 0}
            className="px-3.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-xl font-bold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>CLEAR LOGS</span>
          </button>
        </div>
      </div>

      {/* VERTICAL DETAILED VISITOR IP LOGS STREAM */}
      <div className="space-y-2.5">
        {paginatedLogs.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-black/40 space-y-2">
            <Globe className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm font-bold">No Visitor IP telemetry logs found.</p>
            <p className="text-slate-600 text-xs">New visitor navigations and API interactions will automatically appear here live.</p>
          </div>
        ) : (
          paginatedLogs.map((log, idx) => {
            const isBanned = (bannedIps || []).includes(log.ip);
            const flag = COUNTRY_FLAGS[log.country] || '🌐';
            const logDate = new Date(log.timestamp);
            const formattedTime = logDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const formattedDate = logDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

            return (
              <div
                key={log.id || idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isBanned
                    ? 'bg-red-950/20 border-red-500/50 text-red-200'
                    : 'bg-black/60 hover:bg-slate-800/60 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                
                {/* 1. IP & STATUS */}
                <div className="flex items-center space-x-3 shrink-0">
                  <div className="relative">
                    <span className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl inline-block">
                      {log.device === 'Mobile' ? (
                        <Smartphone className="w-4 h-4 text-purple-400" />
                      ) : log.device === 'Tablet' ? (
                        <Tablet className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Laptop className="w-4 h-4 text-cyan-400" />
                      )}
                    </span>
                    <span className={`w-2 h-2 rounded-full absolute -top-0.5 -right-0.5 ${isBanned ? 'bg-red-500 ring-2 ring-red-900' : 'bg-emerald-400 animate-pulse'}`}></span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-black text-cyan-300 tracking-wider">
                        {log.ip}
                      </span>
                      <button
                        onClick={() => handleCopyIp(log.ip)}
                        title="Copy IP Address"
                        className="p-1 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                      >
                        {copiedIp === log.ip ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-0.5">
                      <span>{log.device || 'Desktop'}</span>
                      <span>&bull;</span>
                      <span>{log.browser || 'Chrome'}</span>
                      <span>&bull;</span>
                      <span>{log.os || 'Windows'}</span>
                    </div>
                  </div>
                </div>

                {/* 2. GEOLOCATION & COUNTRY */}
                <div className="flex items-center space-x-2.5">
                  <span className="text-xl">{flag}</span>
                  <div>
                    <span className="font-bold text-xs text-white block">
                      {log.country || 'Unknown Country'}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {log.city ? `📍 ${log.city}` : '📍 City Verified'}
                    </span>
                  </div>
                </div>

                {/* 3. ROUTE / PAGE VISITED */}
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">ROUTE VISITED:</span>
                  <span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 rounded-lg text-xs font-mono font-bold mt-0.5 inline-block">
                    {log.pageVisited || '/#/'}
                  </span>
                </div>

                {/* 4. TIMESTAMP */}
                <div className="text-left md:text-right shrink-0">
                  <div className="flex items-center md:justify-end space-x-1 text-slate-300 text-xs font-bold">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{formattedTime}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {formattedDate}
                  </span>
                </div>

                {/* 5. FIREWALL & ACTION BUTTONS */}
                <div className="flex items-center space-x-2 shrink-0">
                  {isBanned ? (
                    <button
                      onClick={() => removeBannedIp(log.ip)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all shadow"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>UNBAN IP</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (window.confirm(`Add IP ${log.ip} (${log.country}) to the Security Firewall Blocklist?`)) {
                          addBannedIp(log.ip);
                        }
                      }}
                      className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all shadow hover:shadow-red-900/50"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>BAN IP</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black border border-slate-700 hover:border-cyan-500/50 rounded-xl text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:border-slate-700 flex items-center space-x-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREVIOUS</span>
          </button>

          <span className="text-slate-400 font-bold">
            PAGE <span className="text-cyan-300">{currentPage}</span> OF <span className="text-white">{totalPages}</span>
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black border border-slate-700 hover:border-cyan-500/50 rounded-xl text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:border-slate-700 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
export default VerticalVisitorIPLogs;
