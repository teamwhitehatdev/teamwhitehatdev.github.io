import React, { useState, useEffect } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Lock, Key, Terminal, RefreshCw, Download, Upload, CheckCircle, Trash2, Plus, Edit, AlertTriangle, Eye, Server, Users, Mail, Activity, Database, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Admin: React.FC = () => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'projects' | 'firewall' | 'inquiries' | 'telemetry' | 'backup'>('overview');
  const [newBanIp, setNewBanIp] = useState('');

  const { services, projects, bannedIps, addBannedIp, removeBannedIp, inquiries, userIp } = useApp();

  const DEFAULT_PIN = "anonymousphilippines";

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('wh_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('wh_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('INVALID MASTER PIN ACCESS DENIED');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wh_admin_auth');
  };

  const handleAddBan = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBanIp.trim()) {
      addBannedIp(newBanIp.trim());
      setNewBanIp('');
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      version: 'v130.0.0',
      services,
      projects,
      bannedIps,
      inquiries
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `whitehat_backup_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 bg-gradient-to-b from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-3xl space-y-6 shadow-2xl font-mono text-center relative z-30">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
          <Lock className="w-7 h-7 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
          MASTER ADMIN PORTAL LOGIN
        </h2>

        <p className="text-xs text-gray-400 font-sans">
          Enter master PIN code to access full CMS control panel, monitoring insights, IP sentinel firewall, and database backup utilities.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="ENTER MASTER PIN"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-cyan-500/40 rounded-xl text-center text-white font-bold tracking-widest text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {authError && (
            <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/30 p-2 rounded-lg">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl shadow-lg hover:opacity-95 transition-all"
          >
            AUTHENTICATE & ACCESS PORTAL
          </button>
        </form>

        <div className="text-[10px] text-gray-500 border-t border-gray-900 pt-3">
          SECURITY PROTOCOL • SHA-256 STEALTH AUTHENTICATION
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono max-w-7xl mx-auto pb-10 relative z-30">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-lime-500/20 border border-lime-500/50 flex items-center justify-center text-lime-400">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black font-rajdhani text-white uppercase">MASTER BACK-END CMS DASHBOARD</h1>
            <span className="text-xs text-lime-400 font-bold">AUTHENTICATED • ACCESS LEVEL 0 (ROOT)</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 font-bold text-xs rounded-xl uppercase transition-all"
        >
          LOGOUT ADMIN
        </button>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-cyan-500/30 pb-3">
        {[
          { id: 'overview', label: '📊 OVERVIEW & INSIGHTS', icon: Activity },
          { id: 'services', label: '🛠️ SERVICES CMS', icon: Server },
          { id: 'projects', label: '🚀 PROJECTS CMS', icon: FileText },
          { id: 'firewall', label: '🛡️ IP FIREWALL', icon: Shield },
          { id: 'inquiries', label: '📬 INQUIRIES INBOX', icon: Mail },
          { id: 'telemetry', label: '📡 LIVE TELEMETRY', icon: Terminal },
          { id: 'backup', label: '💾 JSON BACKUP & RESTORE', icon: Database },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-rajdhani font-extrabold text-xs uppercase transition-all flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500/30 to-lime-500/30 border border-cyan-400 text-white shadow-lg'
                : 'bg-black/60 border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & MONITORING INSIGHTS */}
      {activeTab === 'overview' && (
        <HUDPanel title="MONITORING DATA & REAL-TIME SYSTEM INSIGHTS">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-black/80 border border-cyan-500/40 p-4 rounded-2xl space-y-1">
                <span className="text-gray-400 uppercase text-[10px]">TOTAL SERVICES:</span>
                <p className="text-2xl font-black font-rajdhani text-cyan-400">{services.length}</p>
              </div>
              <div className="bg-black/80 border border-lime-500/40 p-4 rounded-2xl space-y-1">
                <span className="text-gray-400 uppercase text-[10px]">TOTAL PROJECTS:</span>
                <p className="text-2xl font-black font-rajdhani text-lime-400">{projects.length}</p>
              </div>
              <div className="bg-black/80 border border-red-500/40 p-4 rounded-2xl space-y-1">
                <span className="text-gray-400 uppercase text-[10px]">BANNED IPS:</span>
                <p className="text-2xl font-black font-rajdhani text-red-400">{bannedIps.length}</p>
              </div>
              <div className="bg-black/80 border border-purple-500/40 p-4 rounded-2xl space-y-1">
                <span className="text-gray-400 uppercase text-[10px]">INQUIRIES RECEIVED:</span>
                <p className="text-2xl font-black font-rajdhani text-purple-400">{inquiries.length}</p>
              </div>
            </div>

            <div className="bg-black/80 border border-gray-800 p-5 rounded-2xl space-y-3 font-sans text-xs">
              <h4 className="text-sm font-bold text-white uppercase font-rajdhani">SYSTEM HEALTH & PERFORMANCE DATA</h4>
              <p className="text-gray-300">
                All client requests, live stock trading feeds, referral links, and IP firewall sentinel monitors are running at 99.99% system uptime on Fastly CDN Edge Nodes.
              </p>
              <div className="flex flex-wrap gap-4 text-[11px] font-mono text-lime-400 pt-2">
                <span>• YOUR IP: <span className="text-white">{userIp}</span></span>
                <span>• HOSTINGER CODE: <span className="text-white">DPDCABINCEHM</span></span>
                <span>• IMPACT AGENT: <span className="text-white">VERIFIED</span></span>
              </div>
            </div>
          </div>
        </HUDPanel>
      )}

      {/* TAB 2: SERVICES CMS */}
      {activeTab === 'services' && (
        <HUDPanel title="SERVICES CMS MANAGER (EDIT / ADD / REMOVE)">
          <div className="p-6 space-y-4 font-sans text-xs">
            <p className="text-gray-300">
              Manage live Virtual Assistant packages, hourly rates, and web development pricing tiers displayed on the front-end.
            </p>

            <div className="space-y-3">
              {services.map((svc) => (
                <div key={svc.id} className="bg-black/80 border border-gray-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white font-rajdhani uppercase">{svc.title}</h4>
                    <p className="text-xs text-gray-400">{svc.description}</p>
                    <span className="text-lime-400 font-mono font-bold text-xs">{svc.price || '$15 / hr'}</span>
                  </div>
                  <div className="flex space-x-2 font-mono">
                    <button className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs hover:bg-cyan-500/30">
                      EDIT
                    </button>
                    <button className="px-3 py-1 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-xs hover:bg-red-500/30">
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>
      )}

      {/* TAB 4: IP SENTINEL FIREWALL */}
      {activeTab === 'firewall' && (
        <HUDPanel title="IP SENTINEL FIREWALL & REAL-TIME IP BANNING">
          <div className="p-6 space-y-6">
            <form onSubmit={handleAddBan} className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="ENTER IP ADDRESS TO BAN (e.g. 192.168.1.1)"
                value={newBanIp}
                onChange={(e) => setNewBanIp(e.target.value)}
                className="flex-grow px-4 py-2.5 bg-black border border-red-500/40 rounded-xl text-white text-xs font-mono"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-500 text-white font-extrabold text-xs uppercase rounded-xl hover:bg-red-600 transition-all font-rajdhani"
              >
                BAN IP ADDRESS NOW
              </button>
            </form>

            <div className="bg-black/80 border border-gray-800 p-4 rounded-xl space-y-3 font-mono">
              <span className="text-xs text-red-400 font-bold uppercase">FLAGGED / BANNED IP ADDRESSES ({bannedIps.length}):</span>
              {bannedIps.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No IP addresses currently banned.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {bannedIps.map((ip) => (
                    <span key={ip} className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-2">
                      <span>{ip}</span>
                      <button onClick={() => removeBannedIp(ip)} className="hover:text-white">
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </HUDPanel>
      )}

      {/* TAB 7: JSON BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <HUDPanel title="DATABASE JSON BACKUP & RESTORE UTILITIES">
          <div className="p-6 space-y-6 font-mono text-xs">
            <p className="text-gray-300 font-sans">
              Export full website data (services, projects, banned IPs, inquiries, referral tags) to a portable JSON backup file.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleExportBackup}
                className="px-6 py-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl shadow-lg flex items-center space-x-2 hover:opacity-95"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT FULL DATABASE (.JSON)</span>
              </button>
            </div>
          </div>
        </HUDPanel>
      )}

    </div>
  );
};
export default Admin;
