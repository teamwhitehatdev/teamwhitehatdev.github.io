import React, { useState } from 'react';
import { 
  Lock, Key, Shield, ShieldAlert, LogOut, CheckCircle2, XCircle, Trash2, Edit3, 
  Plus, Search, Eye, Filter, Download, Activity, Globe, Monitor, Smartphone, 
  UserCheck, Server, AlertTriangle, Database, BarChart3, Layers, FileText, 
  Settings, RefreshCw, Mail, Clock, ChevronRight, PieChart, Sparkles, Tag, ChevronDown, Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CMSItem, VisitorLog, InquiryItem } from '../types';

export const Admin: React.FC = () => {
  const {
    adminAuth,
    loginAdmin,
    logoutAdmin,
    cmsItems,
    addCMSItem,
    updateCMSItem,
    deleteCMSItem,
    visitorLogs,
    blockedIps,
    blockIp,
    unblockIp,
    inquiries,
    updateInquiryStatus,
    affiliateAds
  } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cms' | 'affiliates' | 'ads' | 'bookings' | 'analytics' | 'security' | 'export'>('dashboard');

  // CMS Form State
  const [editingItem, setEditingItem] = useState<Partial<CMSItem> | null>(null);
  const [showCMSModal, setShowCMSModal] = useState(false);

  // Search & Filter State
  const [cmsSearch, setCmsSearch] = useState('');
  const [cmsCategoryFilter, setCmsCategoryFilter] = useState('all');
  const [newBlockedIp, setNewBlockedIp] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pinInput);
    if (!success) {
      setAuthError(true);
      setPinInput('');
    } else {
      setAuthError(false);
    }
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.category) return;

    if (editingItem.id) {
      updateCMSItem(editingItem.id, editingItem);
    } else {
      addCMSItem({
        title: editingItem.title || '',
        category: editingItem.category || 'showcase',
        summary: editingItem.summary || '',
        content: editingItem.content || '',
        imageUrl: editingItem.imageUrl || '',
        tags: editingItem.tags || ['General'],
        published: editingItem.published !== undefined ? editingItem.published : true,
        author: editingItem.author || 'Admin',
        publishDate: editingItem.publishDate || new Date().toISOString().split('T')[0]
      });
    }
    setShowCMSModal(false);
    setEditingItem(null);
  };

  const handleExportCSV = (filename: string, rows: any[]) => {
    if (!rows || !rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) =>
          keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
              cell = cell.replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator)
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!adminAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 font-mono">
        <div className="bg-gradient-to-b from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl relative">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
              STEALTH ADMIN ACCESS
            </h2>
            <p className="text-xs text-gray-400 font-sans">
              Enter authorized security PIN to unlock CMS control center.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">SECURITY PIN</label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-bold flex items-center space-x-2">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Invalid Security PIN. Access Denied.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl shadow-lg hover:opacity-95 transition-all"
            >
              AUTHENTICATE & ACCESS CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredCMS = cmsItems.filter(item => {
    const matchesCat = cmsCategoryFilter === 'all' || item.category === cmsCategoryFilter;
    const matchesSearch = !cmsSearch || item.title.toLowerCase().includes(cmsSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 font-mono pb-12">
      
      {/* ADMIN TOP CONTROL BAR */}
      <div className="bg-gray-900/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-rajdhani text-white uppercase tracking-wider">
              CMS ADMIN CONTROL CENTER
            </h1>
            <p className="text-xs text-cyan-400 font-sans">
              Authorized Session Active • Security Level 10
            </p>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>LOGOUT SESSION</span>
        </button>
      </div>

      {/* MODULAR ADMIN NAVIGATION TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-800">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'cms', label: 'Content CMS', icon: FileText },
          { id: 'affiliates', label: 'Affiliate Manager', icon: Award },
          { id: 'ads', label: 'Ad Rotation Manager', icon: Layers },
          { id: 'bookings', label: 'Inquiries & Bookings', icon: Mail },
          { id: 'analytics', label: 'Privacy Analytics', icon: Activity },
          { id: 'security', label: 'Security & IP Blocklist', icon: ShieldAlert },
          { id: 'export', label: 'Exports & Backups', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900/80 border border-cyan-500/30 rounded-2xl p-5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>TOTAL VISITOR LOGS</span>
                <Globe className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-3xl font-black font-rajdhani text-white">{visitorLogs.length}</p>
            </div>

            <div className="bg-gray-900/80 border border-lime-500/30 rounded-2xl p-5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>ACTIVE CMS ITEMS</span>
                <FileText className="w-4 h-4 text-lime-400" />
              </div>
              <p className="text-3xl font-black font-rajdhani text-white">{cmsItems.length}</p>
            </div>

            <div className="bg-gray-900/80 border border-purple-500/30 rounded-2xl p-5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>INQUIRIES & BOOKINGS</span>
                <Mail className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-3xl font-black font-rajdhani text-white">{inquiries.length}</p>
            </div>

            <div className="bg-gray-900/80 border border-rose-500/30 rounded-2xl p-5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>BLOCKED IP ADDRESSES</span>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-3xl font-black font-rajdhani text-white">{blockedIps.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTENT CMS */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search CMS items..."
                value={cmsSearch}
                onChange={(e) => setCmsSearch(e.target.value)}
                className="bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <select
                value={cmsCategoryFilter}
                onChange={(e) => setCmsCategoryFilter(e.target.value)}
                className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Categories</option>
                <option value="showcase">Showcase Projects</option>
                <option value="services">Services</option>
                <option value="web-hosting">Web Hosting Deals</option>
                <option value="about">About Page</option>
                <option value="affiliate-guide">Affiliate Guide</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingItem({ category: 'showcase', published: true, tags: ['General'] });
                setShowCMSModal(true);
              }}
              className="px-4 py-2.5 bg-cyan-500 text-black font-bold rounded-xl text-xs flex items-center space-x-2 hover:brightness-110 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE NEW ITEM</span>
            </button>
          </div>

          {/* CMS TABLE */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 border-b border-gray-800 text-cyan-400 font-bold uppercase">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredCMS.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-4 font-bold text-white">{item.title}</td>
                    <td className="p-4 uppercase text-cyan-300">{item.category}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.published ? 'bg-lime-500/20 text-lime-400 border border-lime-500/40' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                      }`}>
                        {item.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{item.publishDate}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowCMSModal(true);
                        }}
                        className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCMSItem(item.id)}
                        className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES & BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 border-b border-gray-800 text-cyan-400 font-bold uppercase">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-4 font-bold text-white">{inq.name}</td>
                    <td className="p-4 text-cyan-300">{inq.email}</td>
                    <td className="p-4">{inq.serviceTitle}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 uppercase">
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{inq.dateSubmitted}</td>
                    <td className="p-4 text-right">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="bg-gray-950 border border-gray-800 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="NEW">NEW</option>
                        <option value="READ">READ</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="REPLIED">REPLIED</option>
                        <option value="SCHEDULED">SCHEDULED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: SECURITY & IP BLOCKLIST */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-gray-900/80 border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold font-rajdhani text-white uppercase flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>IP BLOCKLIST MANAGEMENT</span>
            </h3>

            <div className="flex items-center space-x-3 max-w-md">
              <input
                type="text"
                placeholder="Enter IP to block (e.g. 192.168.1.1)..."
                value={newBlockedIp}
                onChange={(e) => setNewBlockedIp(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={() => {
                  if (newBlockedIp.trim()) {
                    blockIp(newBlockedIp.trim());
                    setNewBlockedIp('');
                  }
                }}
                className="px-4 py-2 bg-rose-500 text-black font-bold rounded-xl text-xs whitespace-nowrap hover:brightness-110"
              >
                BLOCK IP
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {blockedIps.map((ip) => (
                <div key={ip} className="bg-gray-950 border border-rose-500/30 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300">{ip}</span>
                  <button
                    onClick={() => unblockIp(ip)}
                    className="p-1 text-gray-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: EXPORTS & BACKUPS */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-900/80 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
              <h4 className="text-base font-bold font-rajdhani text-white uppercase flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>EXPORT CONTENT CMS DATA</span>
              </h4>
              <p className="text-xs text-gray-400 font-sans">Download all CMS articles, showcase projects, and services as CSV.</p>
              <button
                onClick={() => handleExportCSV('whitehat_cms_export', cmsItems)}
                className="w-full py-2.5 bg-cyan-500 text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 transition-all cursor-pointer"
              >
                EXPORT CMS DATA (CSV)
              </button>
            </div>

            <div className="bg-gray-900/80 border border-lime-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
              <h4 className="text-base font-bold font-rajdhani text-white uppercase flex items-center space-x-2">
                <Mail className="w-5 h-5 text-lime-400" />
                <span>EXPORT CLIENT INQUIRIES</span>
              </h4>
              <p className="text-xs text-gray-400 font-sans">Download all client lead inquiries and bookings as CSV.</p>
              <button
                onClick={() => handleExportCSV('whitehat_inquiries_export', inquiries)}
                className="w-full py-2.5 bg-lime-400 text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 transition-all cursor-pointer"
              >
                EXPORT INQUIRIES (CSV)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CMS EDIT / CREATE MODAL */}
      {showCMSModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-gray-900 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="text-lg font-bold font-rajdhani text-white uppercase">
                {editingItem.id ? 'EDIT CMS ITEM' : 'CREATE NEW CMS ITEM'}
              </h3>
              <button onClick={() => setShowCMSModal(false)} className="text-gray-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCMS} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 uppercase">Title</label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase">Category</label>
                  <select
                    value={editingItem.category || 'showcase'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="showcase">Showcase Projects</option>
                    <option value="services">Services</option>
                    <option value="web-hosting">Web Hosting Deals</option>
                    <option value="about">About Page</option>
                    <option value="affiliate-guide">Affiliate Guide</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300 uppercase">Image URL</label>
                  <input
                    type="text"
                    value={editingItem.imageUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 uppercase">Summary</label>
                <textarea
                  value={editingItem.summary || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 h-20"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setShowCMSModal(false)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-500 text-black font-extrabold rounded-xl text-xs uppercase hover:brightness-110"
                >
                  SAVE CMS ITEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
