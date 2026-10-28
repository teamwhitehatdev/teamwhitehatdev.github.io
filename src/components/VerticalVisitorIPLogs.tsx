import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Shield,
  Search,
  Download,
  Trash2,
  Copy,
  Check,
  Laptop,
  Smartphone,
  Tablet,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const COUNTRY_FLAGS: Record<string, string> = {
  Philippines: '🇵🇭',
  'United States': '🇺🇸',
  Singapore: '🇸🇬',
  'United Kingdom': '🇬🇧',
  Canada: '🇨🇦',
  Australia: '🇦🇺',
  Germany: '🇩🇪',
  Japan: '🇯🇵',
  India: '🇮🇳',
  France: '🇫🇷',
  Brazil: '🇧🇷',
  Netherlands: '🇳🇱',
  Unknown: '🌐'
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

  const handleCopyIp = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const filteredLogs = useMemo(() => {
    const now = new Date().getTime();
    return (visitorLogs || []).filter((log) => {
      if (selectedTimeframe !== 'all') {
        const logTime = new Date(log.timestamp).getTime();
        const diffHours = (now - logTime) / (1000 * 60 * 60);
        if (selectedTimeframe === 'today' && diffHours > 24) return false;
        if (selectedTimeframe === '7d' && diffHours > 24 * 7) return false;
        if (selectedTimeframe === '30d' && diffHours > 24 * 30) return false;
      }

      if (selectedCountry !== 'ALL' && log.country !== selectedCountry) {
        return false;
      }

      if (selectedDevice !== 'ALL' && log.device !== selectedDevice) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesIp = log.ip.toLowerCase().includes(q);
        const matchesCountry = (log.country || '').toLowerCase().includes(q);
        const matchesCity = (log.city || '').toLowerCase().includes(q);
        const matchesPage = (log.pageVisited || '').toLowerCase().includes(q);
        const matchesBrowser = (log.browser || '').toLowerCase().includes(q);
        const matchesOs = (log.os || '').toLowerCase().includes(q);
        return (
          matchesIp ||
          matchesCountry ||
          matchesCity ||
          matchesPage ||
          matchesBrowser ||
          matchesOs
        );
      }

      return true;
    });
  }, [visitorLogs, searchQuery, selectedCountry, selectedDevice, selectedTimeframe]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  const handleExportCSV = () => {
    if (filteredLogs.length === 0) return;
    const headers = [
      'ID,IP Address,Country,City,Device,Browser,OS,Page Visited,Timestamp'
    ];
    const rows = filteredLogs.map(
      (l) =>
        `"${l.id}","${l.ip}","${l.country}","${l.city || ''}","${l.device}","${l.browser}","${l.os}","${l.pageVisited}","${l.timestamp}"`
    );
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `visitor_ip_telemetry_logs_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    if (filteredLogs.length === 0) return;
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute(
      'download',
      `visitor_ip_telemetry_logs_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const availableCountries = useMemo(() => {
    const set = new Set((visitorLogs || []).map((l) => l.country).filter(Boolean));
    return Array.from(set);
  }, [visitorLogs]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6 text-slate-900">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center space-x-3">
          <span className="p-2.5 bg-slate-100 text-slate-900 rounded-xl border border-slate-200">
            <Globe className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Real-Time Visitor IP Telemetry Audit Stream
            </h3>
            <p className="text-xs text-slate-500">
              Live vertical stream of connecting visitor IP addresses, geolocation data, devices, and visited routes.
            </p>
          </div>
        </div>

        {/* METRICS & QUICK STATS */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
            <span className="text-slate-500 font-semibold">TOTAL LOGS:</span>
            <span className="text-slate-900 font-extrabold">
              {(visitorLogs || []).length}
            </span>
          </div>

          <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-2">
            <span className="text-slate-500 font-semibold">UNIQUE IPS:</span>
            <span className="text-slate-900 font-extrabold">
              {new Set((visitorLogs || []).map((l) => l.ip)).size}
            </span>
          </div>

          <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-2">
            <span className="text-slate-500 font-semibold">BANNED:</span>
            <span className="text-slate-900 font-extrabold">
              {(bannedIps || []).length}
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search IP, Country, City, Path, Device, Browser..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
          />
        </div>

        <div>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none"
          >
            <option value="ALL">All Countries</option>
            {availableCountries.map((c) => (
              <option key={c} value={c}>
                {COUNTRY_FLAGS[c] || '📍'} {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedDevice}
            onChange={(e) => {
              setSelectedDevice(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none"
          >
            <option value="ALL">All Devices</option>
            <option value="Desktop">Desktop Only</option>
            <option value="Mobile">Mobile Only</option>
            <option value="Tablet">Tablet Only</option>
          </select>
        </div>

        <div>
          <select
            value={selectedTimeframe}
            onChange={(e) => {
              setSelectedTimeframe(e.target.value as any);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none"
          >
            <option value="all">All Time</option>
            <option value="today">Past 24 Hours</option>
            <option value="7d">Past 7 Days</option>
            <option value="30d">Past 30 Days</option>
          </select>
        </div>
      </div>

      {/* EXPORT & ACTION CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="text-slate-500">
          Showing <strong className="text-slate-900">{filteredLogs.length}</strong> matching IP visitor entries
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            disabled={filteredLogs.length === 0}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-semibold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            disabled={filteredLogs.length === 0}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-semibold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to clear all recorded visitor IP telemetry logs?'
                )
              ) {
                clearVisitorLogs();
              }
            }}
            disabled={(visitorLogs || []).length === 0}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-semibold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* VERTICAL DETAILED VISITOR IP LOGS STREAM */}
      <div className="space-y-2.5">
        {paginatedLogs.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50 space-y-2">
            <Globe className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-700 text-sm font-bold">
              No Visitor IP telemetry logs found.
            </p>
            <p className="text-slate-500 text-xs">
              New visitor navigations will automatically appear here live.
            </p>
          </div>
        ) : (
          paginatedLogs.map((log, idx) => {
            const isBanned = (bannedIps || []).includes(log.ip);
            const flag = COUNTRY_FLAGS[log.country] || '🌐';
            const logDate = new Date(log.timestamp);
            const formattedTime = logDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
            const formattedDate = logDate.toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={log.id || idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isBanned
                    ? 'bg-slate-100 border-slate-400 text-slate-900'
                    : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3 shrink-0">
                  <div className="relative">
                    <span className="p-2.5 bg-white border border-slate-200 rounded-xl inline-block text-slate-700">
                      {log.device === 'Mobile' ? (
                        <Smartphone className="w-4 h-4" />
                      ) : log.device === 'Tablet' ? (
                        <Tablet className="w-4 h-4" />
                      ) : (
                        <Laptop className="w-4 h-4" />
                      )}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-extrabold text-slate-900">
                        {log.ip}
                      </span>
                      <button
                        onClick={() => handleCopyIp(log.ip)}
                        title="Copy IP Address"
                        className="p-1 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded transition-colors cursor-pointer"
                      >
                        {copiedIp === log.ip ? (
                          <Check className="w-3.5 h-3.5 text-slate-900" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 pt-0.5">
                      <span>{log.device || 'Desktop'}</span>
                      <span>&bull;</span>
                      <span>{log.browser || 'Chrome'}</span>
                      <span>&bull;</span>
                      <span>{log.os || 'Windows'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <span className="text-xl">{flag}</span>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">
                      {log.country || 'Unknown Country'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {log.city ? `${log.city}` : 'City Verified'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Route Visited:
                  </span>
                  <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-mono font-bold mt-0.5 inline-block">
                    {log.pageVisited || '/#/'}
                  </span>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <div className="flex items-center md:justify-end space-x-1 text-slate-700 text-xs font-bold">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{formattedTime}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {formattedDate}
                  </span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {isBanned ? (
                    <button
                      onClick={() => removeBannedIp(log.ip)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Unban IP</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Add IP ${log.ip} (${log.country}) to the Security Firewall Blocklist?`
                          )
                        ) {
                          addBannedIp(log.ip);
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Ban IP</span>
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
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 disabled:opacity-40 flex items-center space-x-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-slate-500 font-bold">
            Page <span className="text-slate-900">{currentPage}</span> of{' '}
            <span className="text-slate-900">{totalPages}</span>
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 disabled:opacity-40 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
export default VerticalVisitorIPLogs;
