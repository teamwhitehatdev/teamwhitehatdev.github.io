import React, { useState } from 'react';
import { 
  BarChart3, Users, ShieldAlert, Package, Image as ImageIcon, 
  Search, Lock, Printer, Trash2, Edit, Ban, CheckCircle2, 
  AlertTriangle, Globe, Laptop, Smartphone, DollarSign, Activity, 
  TrendingUp, Eye, FileText, UserCheck, RefreshCw, Key, Settings,
  Sliders, Shield, Server, Database, Bell, Radio, Cpu
} from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { GlitchText } from '../components/GlitchText';
import { useApp } from '../context/AppContext';
import { audioEngine } from '../components/AudioEngine';

// Mock Analytics & System Data
const MOCK_ANALYTICS = {
  totalRevenue: 48290,
  activeUsersOnline: 142,
  vpnDetections: 18,
  totalOrders: 324,
  countryBreakdown: [
    { country: 'Australia 🇦🇺', visits: 1240, percentage: 14, sales: 5800 },
    { country: 'Canada 🇨🇦', visits: 980, percentage: 11, sales: 4200 },
    { country: 'France 🇫🇷', visits: 850, percentage: 9, sales: 3900 },
    { country: 'Germany 🇩🇪', visits: 1450, percentage: 16, sales: 7400 },
    { country: 'Japan 🇯🇵', visits: 1120, percentage: 12, sales: 6100 },
    { country: 'Philippines 🇵🇭', visits: 1680, percentage: 18, sales: 8200 },
    { country: 'Singapore 🇸🇬', visits: 720, percentage: 8, sales: 4100 },
    { country: 'United Kingdom 🇬🇧', visits: 1050, percentage: 12, sales: 8690 }
  ],
  deviceBreakdown: [
    { name: 'Desktop (Windows)', percentage: 48, count: 4368 },
    { name: 'Mobile (Android)', percentage: 32, count: 2912 },
    { name: 'Mobile (iOS)', percentage: 14, count: 1274 },
    { name: 'Desktop (macOS / Linux)', percentage: 6, count: 546 }
  ],
  trafficSources: [
    { source: 'Direct Terminal Access', count: 3840, share: 42 },
    { source: 'Google Search & SEO', count: 2650, share: 29 },
    { source: 'GitHub Repositories', count: 1720, share: 19 },
    { source: 'Social Media & Discord', count: 890, share: 10 }
  ]
};

interface UserAccount {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  joinedDate: string;
  ipAddress: string;
  country: string;
  device: string;
  isVpn: boolean;
  purchasesCount: number;
  totalSpent: number;
  status: 'ACTIVE' | 'SUSPICIOUS' | 'BANNED';
}

const INITIAL_USERS: UserAccount[] = [
  { id: 'usr-101', username: 'cyber_ghost_01', email: 'ghost@vancecyber.com', passwordHash: '●●●●●●●● (SHA256)', joinedDate: '2026-07-28', ipAddress: '192.168.1.45', country: 'United States 🇺🇸', device: 'Desktop (Windows)', isVpn: false, purchasesCount: 4, totalSpent: 1290, status: 'ACTIVE' },
  { id: 'usr-102', username: 'matrix_hacker_de', email: 'elena@aerogames.de', passwordHash: '●●●●●●●● (SHA256)', joinedDate: '2026-07-29', ipAddress: '85.214.132.10', country: 'Germany 🇩🇪', device: 'Desktop (Linux)', isVpn: false, purchasesCount: 2, totalSpent: 780, status: 'ACTIVE' },
  { id: 'usr-103', username: 'tokyo_drift_net', email: 'hiroshi@neotokyo.jp', passwordHash: '●●●●●●●● (SHA256)', joinedDate: '2026-07-30', ipAddress: '185.220.101.5', country: 'Japan 🇯🇵', device: 'Mobile (Android)', isVpn: true, purchasesCount: 1, totalSpent: 499, status: 'SUSPICIOUS' },
  { id: 'usr-104', username: 'krypton_val', email: 'val@krypton.io', passwordHash: '●●●●●●●● (SHA256)', joinedDate: '2026-07-31', ipAddress: '45.142.120.88', country: 'United Kingdom 🇬🇧', device: 'Desktop (Windows)', isVpn: false, purchasesCount: 3, totalSpent: 1650, status: 'ACTIVE' },
  { id: 'usr-105', username: 'bot_spammer_x', email: 'spammer99@fake-temp.net', passwordHash: '●●●●●●●● (SHA256)', joinedDate: '2026-08-01', ipAddress: '198.51.100.42', country: 'Proxy Node 🌐', device: 'Automated Bot Script', isVpn: true, purchasesCount: 0, totalSpent: 0, status: 'BANNED' }
];

const MOCK_AUDIT_LOGS = [
  { id: 'log-901', timestamp: '2026-08-01 05:42:10', type: 'SECURITY_ALERT', severity: 'HIGH', message: 'Blocked F12 inspect element attempt from IP 198.51.100.42 (Bot Proxy)' },
  { id: 'log-902', timestamp: '2026-08-01 05:38:45', type: 'PAYMENT_SUCCESS', severity: 'INFO', message: 'Verified PayPal checkout $499 USD by user matrix_hacker_de' },
  { id: 'log-903', timestamp: '2026-08-01 05:20:12', type: 'SYSTEM_CONFIG', severity: 'INFO', message: 'Updated default active theme to CYBERPUNK.NET OFFICIAL' },
  { id: 'log-904', timestamp: '2026-08-01 04:55:30', type: 'USER_REGISTER', severity: 'INFO', message: 'New user registered: cyber_ghost_01 (US Residential IP)' },
  { id: 'log-905', timestamp: '2026-08-01 04:12:05', type: 'FIREWALL_BLOCK', severity: 'WARNING', message: 'Rate limit threshold exceeded for IP 185.220.101.5 (VPN Node)' }
];

export const Admin: React.FC = () => {
  const { orders, products, gallery, addProduct, deleteProduct, addGalleryItem, deleteGalleryItem } = useApp();
  
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('whitehat_admin_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'security' | 'orders' | 'settings' | 'audit'>('analytics');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);

  // User Management state
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [userSearch, setUserSearch] = useState('');

  // IP Ban list state
  const [bannedIPs, setBannedIPs] = useState<string[]>(['198.51.100.42', '185.220.101.5', '193.27.228.12']);
  const [newBanIP, setNewBanIP] = useState('');

  // Enterprise System Configurations state
  const [sysConfig, setSysConfig] = useState({
    siteMode: 'PRODUCTION',
    antiInspectEnabled: true,
    strictCspEnabled: true,
    antiBotCaptchaRequired: true,
    paypalMode: 'LIVE',
    merchantEmail: 'teamwhitehatdev@gmail.com',
    currency: 'USD',
    aiBotEnabled: true,
    aiBotMode: 'AUTONOMOUS_SALES',
    audioEngineEnabled: true,
    maxDailyCoupons: 50
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'whitehat2026') {
      audioEngine.playClick();
      setIsAuthenticated(true);
      localStorage.setItem('whitehat_admin_auth', 'true');
    } else {
      audioEngine.playGlitch();
      alert('ACCESS DENIED: Invalid Security Passcode!');
    }
  };

  const handleLogout = () => {
    audioEngine.playClick();
    setIsAuthenticated(false);
    localStorage.removeItem('whitehat_admin_auth');
  };

  const handleBanIP = (ip: string) => {
    audioEngine.playClick();
    if (!bannedIPs.includes(ip)) {
      setBannedIPs([...bannedIPs, ip]);
      setUsers(users.map(u => u.ipAddress === ip ? { ...u, status: 'BANNED' } : u));
    }
  };

  const handleUnbanIP = (ip: string) => {
    audioEngine.playClick();
    setBannedIPs(bannedIPs.filter(i => i !== ip));
    setUsers(users.map(u => u.ipAddress === ip ? { ...u, status: 'ACTIVE' } : u));
  };

  const handleAddManualBan = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBanIP.trim() && !bannedIPs.includes(newBanIP.trim())) {
      handleBanIP(newBanIP.trim());
      setNewBanIP('');
    }
  };

  const handlePrintInvoice = (order: any) => {
    audioEngine.playClick();
    setSelectedInvoiceOrder(order);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();
    alert('SUCCESS: Enterprise System Configurations Saved & Applied to Live Production Server!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-mono px-4">
        <HUDPanel className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-[var(--primary-color)] flex items-center justify-center mx-auto text-[var(--primary-color)] shadow-[0_0_20px_var(--glow-color)]">
            <Lock size={32} />
          </div>
          <div>
            <h1 className="font-orbitron font-bold text-2xl text-white tracking-wider">CYBER BACKEND ADMIN</h1>
            <p className="text-xs text-gray-400 mt-1">RESTRICTED ACCESS • ENTER PASSCODE</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              placeholder="ENTER PASSCODE (whitehat2026)"
              className="w-full bg-black/80 border border-cyan-500/40 rounded px-4 py-3 text-center text-sm font-mono text-white focus:outline-none focus:border-[var(--primary-color)] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
            />
            <button
              type="submit"
              className="w-full py-3 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold text-sm hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)]"
            >
              AUTHENTICATE ADMIN SESSION
            </button>
          </form>
        </HUDPanel>
      </div>
    );
  }

  // Filtered Users List (Alphabetical)
  const filteredUsers = users
    .filter(u => u.username.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()) || u.ipAddress.includes(userSearch))
    .sort((a, b) => a.username.localeCompare(b.username));

  return (
    <div className="space-y-8 pb-16 font-mono">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-cyan-500/20 pb-4 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>ENTERPRISE COMMAND CENTER • ROOT SYSTEM ACCESS</span>
          </div>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-wider mt-1">
            <GlitchText text="WHITE HAT DEV EXECUTIVE DASHBOARD" speed={50} />
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-950/60 border border-red-500/50 text-red-400 hover:bg-red-900 transition-colors rounded text-xs font-bold"
        >
          TERMINATE ADMIN SESSION
        </button>
      </div>

      {/* Admin Tab Navigation Bar */}
      <div className="flex flex-wrap gap-2 border-b border-cyan-500/20 pb-4">
        {[
          { id: 'analytics', label: 'ANALYTICS & INSIGHTS', icon: BarChart3 },
          { id: 'users', label: 'USER REGISTRY', icon: Users },
          { id: 'security', label: 'IP THREAT MONITOR', icon: ShieldAlert },
          { id: 'orders', label: 'ORDERS & INVOICES', icon: FileText },
          { id: 'settings', label: 'SYSTEM CONFIGURATIONS', icon: Settings },
          { id: 'audit', label: 'SYSTEM AUDIT LOGS', icon: Database }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2 rounded text-xs font-orbitron font-bold flex items-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--primary-color)] text-black shadow-[0_0_15px_var(--glow-color)]'
                  : 'bg-black/60 border border-cyan-500/30 text-gray-300 hover:border-[var(--primary-color)] hover:text-white'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS & GOOGLE ANALYTICS STYLE INSIGHTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <HUDPanel>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">TOTAL GROSS REVENUE</div>
                  <div className="text-2xl font-orbitron font-extrabold text-[var(--secondary-color)] mt-1">${MOCK_ANALYTICS.totalRevenue.toLocaleString()} USD</div>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400">
                  <DollarSign size={24} />
                </div>
              </div>
            </HUDPanel>

            <HUDPanel>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">ACTIVE USERS ONLINE</div>
                  <div className="text-2xl font-orbitron font-extrabold text-[var(--primary-color)] mt-1">{MOCK_ANALYTICS.activeUsersOnline} Live</div>
                </div>
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded text-[var(--primary-color)]">
                  <Activity size={24} />
                </div>
              </div>
            </HUDPanel>

            <HUDPanel>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">TOTAL PROCESSED ORDERS</div>
                  <div className="text-2xl font-orbitron font-extrabold text-green-400 mt-1">{MOCK_ANALYTICS.totalOrders} Completed</div>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-green-400">
                  <TrendingUp size={24} />
                </div>
              </div>
            </HUDPanel>

            <HUDPanel>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">VPN & PROXY DETECTIONS</div>
                  <div className="text-2xl font-orbitron font-extrabold text-red-400 mt-1">{MOCK_ANALYTICS.vpnDetections} Blocked</div>
                </div>
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400">
                  <ShieldAlert size={24} />
                </div>
              </div>
            </HUDPanel>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HUDPanel title="DEVICE & OPERATING SYSTEM METRICS (PIE CHART)">
              <div className="space-y-4">
                <div className="flex justify-center items-center py-4">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-cyan-500/20" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-[var(--primary-color)]" strokeDasharray="48, 100" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-[var(--secondary-color)]" strokeDasharray="32, 100" strokeDashoffset="-48" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-purple-400" strokeDasharray="14, 100" strokeDashoffset="-80" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {MOCK_ANALYTICS.deviceBreakdown.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-black/50 border border-gray-800 rounded">
                      <span className="text-gray-300 flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[var(--primary-color)]' : i === 1 ? 'bg-[var(--secondary-color)]' : i === 2 ? 'bg-purple-400' : 'bg-gray-400'}`}></span>
                        <span>{d.name}</span>
                      </span>
                      <span className="font-bold text-white">{d.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </HUDPanel>

            <HUDPanel title="GEOGRAPHIC TRAFFIC & SALES BY COUNTRY (ALPHABETICAL)">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {MOCK_ANALYTICS.countryBreakdown.map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">{c.country}</span>
                      <span className="text-[var(--primary-color)]">${c.sales.toLocaleString()} USD ({c.visits} visits)</span>
                    </div>
                    <div className="w-full bg-gray-900 h-2 rounded overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-[var(--primary-color)] h-full transition-all duration-500" 
                        style={{ width: `${c.percentage * 4}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </HUDPanel>
          </div>
        </div>
      )}

      {/* TAB 2: USER REGISTRY */}
      {activeTab === 'users' && (
        <HUDPanel title="REGISTERED USER ACCOUNTS & SECURITY CREDENTIALS">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="SEARCH USERS BY USERNAME, EMAIL, OR IP ADDRESS..."
                className="w-full bg-black/80 border border-cyan-500/40 rounded pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-cyan-500/30 text-gray-400 bg-gray-900/60 uppercase">
                    <th className="p-3">User ID & Username</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Password Hash</th>
                    <th className="p-3">IP Address</th>
                    <th className="p-3">Country & Device</th>
                    <th className="p-3">Purchases</th>
                    <th className="p-3">Security Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-cyan-950/20 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white">{u.username}</div>
                        <div className="text-[10px] text-gray-500">{u.id} • Joined {u.joinedDate}</div>
                      </td>
                      <td className="p-3 text-cyan-300">{u.email}</td>
                      <td className="p-3 text-yellow-400 font-mono flex items-center space-x-1">
                        <Key size={12} />
                        <span>{u.passwordHash}</span>
                      </td>
                      <td className="p-3 font-bold text-gray-300">{u.ipAddress}</td>
                      <td className="p-3">
                        <div>{u.country}</div>
                        <div className="text-[10px] text-gray-400">{u.device}</div>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-green-400">${u.totalSpent}</span>
                        <span className="text-[10px] text-gray-400"> ({u.purchasesCount} orders)</span>
                      </td>
                      <td className="p-3">
                        {u.status === 'BANNED' ? (
                          <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 text-[10px] font-bold">
                            BANNED
                          </span>
                        ) : u.isVpn ? (
                          <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-400 border border-yellow-500/40 text-[10px] font-bold">
                            VPN / PROXY DETECTED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-green-950 text-green-400 border border-green-500/40 text-[10px] font-bold">
                            VERIFIED USER
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {u.status === 'BANNED' ? (
                          <button
                            onClick={() => handleUnbanIP(u.ipAddress)}
                            className="p-1 rounded bg-green-900/60 text-green-300 hover:bg-green-800"
                            title="Unban User"
                          >
                            <UserCheck size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBanIP(u.ipAddress)}
                            className="p-1 rounded bg-red-900/60 text-red-300 hover:bg-red-800"
                            title="Ban IP & User"
                          >
                            <Ban size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </HUDPanel>
      )}

      {/* TAB 3: IP THREAT MONITOR */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <HUDPanel title="MANUAL IP BAN CONTROL & SECURITY THREAT ENGINE">
            <form onSubmit={handleAddManualBan} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newBanIP}
                onChange={e => setNewBanIP(e.target.value)}
                placeholder="ENTER IP ADDRESS TO BAN (e.g. 192.168.1.100)"
                className="flex-1 bg-black/80 border border-cyan-500/40 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs flex items-center justify-center space-x-2"
              >
                <Ban size={14} />
                <span>BAN IP ADDRESS</span>
              </button>
            </form>

            <div className="pt-4">
              <h3 className="text-xs font-bold text-white mb-2">ACTIVE BANNED IP LIST ({bannedIPs.length} Banned IPs)</h3>
              <div className="flex flex-wrap gap-2">
                {bannedIPs.map((ip, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-red-950/80 border border-red-500/50 px-3 py-1 rounded text-xs text-red-300">
                    <span>{ip}</span>
                    <button onClick={() => handleUnbanIP(ip)} className="hover:text-white">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>
        </div>
      )}

      {/* TAB 4: ORDERS & PRINTABLE INVOICES */}
      {activeTab === 'orders' && (
        <HUDPanel title="CUSTOMER ORDERS & PRINTABLE INVOICES">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-cyan-500/30 text-gray-400 bg-gray-900/60 uppercase">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Invoice Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-cyan-950/20">
                    <td className="p-3 font-bold text-white">{o.id}</td>
                    <td className="p-3 text-white font-bold">{o.userName}</td>
                    <td className="p-3 text-gray-300">{o.items.length} item(s)</td>
                    <td className="p-3 font-bold text-[var(--secondary-color)]">${o.totalPrice} USD</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-green-950 text-green-400 border border-green-500/40 text-[10px] font-bold">
                        {o.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handlePrintInvoice(o)}
                        className="px-3 py-1 bg-[var(--primary-color)] text-black font-bold rounded text-xs hover:bg-yellow-400 transition-colors flex items-center space-x-1 ml-auto"
                      >
                        <Printer size={12} />
                        <span>PRINT INVOICE</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </HUDPanel>
      )}

      {/* NEW TAB 5: ENTERPRISE SYSTEM CONFIGURATIONS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <HUDPanel title="GLOBAL ENTERPRISE SYSTEM CONFIGURATIONS & FEATURE SWITCHES">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Site Production Mode */}
              <div className="space-y-2 p-4 bg-black/50 border border-gray-800 rounded">
                <label className="font-bold text-white flex items-center space-x-2">
                  <Server size={16} className="text-[var(--primary-color)]" />
                  <span>PRODUCTION ENVIRONMENT MODE</span>
                </label>
                <select
                  value={sysConfig.siteMode}
                  onChange={e => setSysConfig({ ...sysConfig, siteMode: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/40 rounded p-2 text-white font-mono"
                >
                  <option value="PRODUCTION">LIVE PRODUCTION SERVER (ACTIVE)</option>
                  <option value="MAINTENANCE">MAINTENANCE LOCKDOWN MODE</option>
                  <option value="SANDBOX">DEV SANDBOX TESTING</option>
                </select>
                <p className="text-[10px] text-gray-400">Controls global site availability and system status header.</p>
              </div>

              {/* PayPal Merchant Setup */}
              <div className="space-y-2 p-4 bg-black/50 border border-gray-800 rounded">
                <label className="font-bold text-white flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-400" />
                  <span>PAYPAL MERCHANT ACCOUNT CONFIG</span>
                </label>
                <input
                  type="email"
                  value={sysConfig.merchantEmail}
                  onChange={e => setSysConfig({ ...sysConfig, merchantEmail: e.target.value })}
                  className="w-full bg-gray-900 border border-cyan-500/40 rounded p-2 text-white font-mono"
                  placeholder="MERCHANT PAYPAL EMAIL"
                />
                <p className="text-[10px] text-gray-400">Email receiving instant PayPal checkout payments.</p>
              </div>

              {/* Anti-Inspect Protection */}
              <div className="space-y-2 p-4 bg-black/50 border border-gray-800 rounded flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center space-x-2">
                    <Shield size={16} className="text-yellow-400" />
                    <span>ANTI-INSPECT SECURITY SHIELD</span>
                  </div>
                  <div className="text-[10px] text-gray-400">Blocks F12, Ctrl+U, and right click page inspection.</div>
                </div>
                <input
                  type="checkbox"
                  checked={sysConfig.antiInspectEnabled}
                  onChange={e => setSysConfig({ ...sysConfig, antiInspectEnabled: e.target.checked })}
                  className="w-5 h-5 accent-[var(--primary-color)]"
                />
              </div>

              {/* AI Sales Bot */}
              <div className="space-y-2 p-4 bg-black/50 border border-gray-800 rounded flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center space-x-2">
                    <Cpu size={16} className="text-cyan-400" />
                    <span>AI SALES ASSISTANT (`CYBER_BOT_AI`)</span>
                  </div>
                  <div className="text-[10px] text-gray-400">Enable floating AI Chatbot sales agent.</div>
                </div>
                <input
                  type="checkbox"
                  checked={sysConfig.aiBotEnabled}
                  onChange={e => setSysConfig({ ...sysConfig, aiBotEnabled: e.target.checked })}
                  className="w-5 h-5 accent-[var(--primary-color)]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <button
                type="submit"
                className="px-8 py-3 bg-[var(--primary-color)] text-black font-orbitron font-bold rounded text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] flex items-center space-x-2"
              >
                <Sliders size={16} />
                <span>SAVE ENTERPRISE SYSTEM CONFIGURATIONS</span>
              </button>
            </div>
          </HUDPanel>
        </form>
      )}

      {/* NEW TAB 6: SYSTEM AUDIT LOGS */}
      {activeTab === 'audit' && (
        <HUDPanel title="REAL-TIME SYSTEM AUDIT TRAIL & SECURITY EVENT LOGS">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-cyan-500/30 text-gray-400 bg-gray-900/60 uppercase">
                  <th className="p-3">Log ID & Timestamp</th>
                  <th className="p-3">Event Type</th>
                  <th className="p-3">Severity Level</th>
                  <th className="p-3">Event Description & Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {MOCK_AUDIT_LOGS.map(l => (
                  <tr key={l.id} className="hover:bg-cyan-950/20">
                    <td className="p-3">
                      <div className="font-bold text-white">{l.id}</div>
                      <div className="text-[10px] text-gray-400">{l.timestamp}</div>
                    </td>
                    <td className="p-3 font-bold text-cyan-400">{l.type}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        l.severity === 'HIGH' ? 'bg-red-950 text-red-400 border border-red-500/40' :
                        l.severity === 'WARNING' ? 'bg-yellow-950 text-yellow-400 border border-yellow-500/40' :
                        'bg-blue-950 text-blue-400 border border-blue-500/40'
                      }`}>
                        {l.severity}
                      </span>
                    </td>
                    <td className="p-3 text-gray-300">{l.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </HUDPanel>
      )}
    </div>
  );
};
