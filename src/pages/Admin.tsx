import React, { useState, useEffect } from 'react';
import { Shield, Users, AlertTriangle, FileText, Settings, Activity, Plus, Trash2, Edit3, Save, CheckCircle, XCircle, Search, Lock, LogOut, Eye, ArrowUpRight, BarChart3, Database } from 'lucide-react';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'cms' | 'users' | 'threats' | 'orders' | 'config' | 'logs'>('analytics');

  // CMS State for Published Apps, Marketplace, Services, Cyber Gallery
  const [cmsSection, setCmsSection] = useState<'published_apps' | 'marketplace' | 'services_courses' | 'Cyber_gallery'>('published_apps');
  const [cmsItems, setCmsItems] = useState<any[]>([]);

  // Form state for adding/editing CMS items
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Website Templates');
  const [newItemPrice, setNewItemPrice] = useState('49.99');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Banned IPs state
  const [bannedIps, setBannedIps] = useState<string[]>(['192.168.1.105', '45.33.22.11']);
  const [ipToBan, setIpToBan] = useState('');

  // Users state
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');

  // Orders state
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  useEffect(() => {
    // Load registered users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('wh_registered_users') || '[]');
    if (savedUsers.length === 0) {
      const defaultUsers = [
        { id: 'USR-89102', username: 'marcus_vance', email: 'm.vance@vancedynamics.com', passwordHash: 'sha256_89a71b2f...', joinedDate: '2026-05-10', totalPurchases: 249.99, ordersCount: 3, status: 'VERIFIED CLIENT 🟢' },
        { id: 'USR-89103', username: 'elena_security', email: 'elena@nordicshield.io', passwordHash: 'sha256_91c34e1a...', joinedDate: '2026-06-01', totalPurchases: 189.50, ordersCount: 2, status: 'VERIFIED CLIENT 🟢' },
        { id: 'USR-89104', username: 'kenji_tokyo', email: 'kenji@neotokyo.jp', passwordHash: 'sha256_44b11f9d...', joinedDate: '2026-06-15', totalPurchases: 599.00, ordersCount: 4, status: 'VERIFIED CLIENT 🟢' }
      ];
      setRegisteredUsers(defaultUsers);
      localStorage.setItem('wh_registered_users', JSON.stringify(defaultUsers));
    } else {
      setRegisteredUsers(savedUsers);
    }

    // Load orders history
    const savedOrders = JSON.parse(localStorage.getItem('wh_orders_history') || '[]');
    if (savedOrders.length === 0) {
      const defaultOrders = [
        { id: 'ORD-982101', userEmail: 'm.vance@vancedynamics.com', itemsCount: 2, totalAmount: 149.99, paymentMethod: 'PayPal Gateway (Tokenized)', status: 'PAID & COMPLETED 🟢', date: '2026-07-28 14:22:10' },
        { id: 'ORD-982102', userEmail: 'elena@nordicshield.io', itemsCount: 1, totalAmount: 89.99, paymentMethod: 'Tokenized VISA (4111)', status: 'PAID & COMPLETED 🟢', date: '2026-07-29 09:15:44' },
        { id: 'ORD-982103', userEmail: 'kenji@neotokyo.jp', itemsCount: 3, totalAmount: 299.99, paymentMethod: 'Tokenized Mastercard (5424)', status: 'PAID & COMPLETED 🟢', date: '2026-07-31 18:40:02' }
      ];
      setOrders(defaultOrders);
      localStorage.setItem('wh_orders_history', JSON.stringify(defaultOrders));
    } else {
      setOrders(savedOrders);
    }

    // Load CMS section items
    loadCmsItems('published_apps');
  }, []);

  const loadCmsItems = (section: string) => {
    const key = `wh_cms_${section}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    if (stored.length === 0) {
      let defaults: any[] = [];
      if (section === 'published_apps') {
        defaults = [
          { id: 'APP-1', title: 'CyberShield Firewall v4', category: 'Security App', price: '129.99', desc: 'Real-time packet inspection & IP ban engine.' },
          { id: 'APP-2', title: 'Quantum Trading Bot', category: 'Automation Engine', price: '199.99', desc: 'High-frequency stock & crypto algorithmic trader.' }
        ];
      } else if (section === 'marketplace') {
        defaults = [
          { id: 'MKT-1', title: 'Streaming Layout Pack', category: 'HUD Pack', price: '39.99', desc: 'Futuristic OBS stream overlays & sound triggers.' },
          { id: 'MKT-2', title: 'React 19 Cyber Portfolio', category: 'Website Template', price: '49.99', desc: 'Next.js & Vite dark futuristic template.' }
        ];
      } else if (section === 'services_courses') {
        defaults = [
          { id: 'SVC-1', title: 'Full-Stack Security Audit', category: 'Services', price: '499.99', desc: 'Comprehensive penetration testing & code audit.' },
          { id: 'SVC-2', title: '1337 Developer Masterclass', category: 'Courses', price: '99.99', desc: 'Advanced Web & Mobile Architecture Video Course.' }
        ];
      } else if (section === 'Cyber_gallery') {
        defaults = [
          { id: 'GAL-1', title: 'Cyberpunk Neon City 3D', category: 'Digital Arts', price: '29.99', desc: '4K High-Res Sci-Fi Render Asset.' },
          { id: 'GAL-2', title: 'Hacker HUD Vector Elements', category: 'Vectors', price: '19.99', desc: 'SVG & PNG futuristic corner brackets pack.' }
        ];
      }
      setCmsItems(defaults);
      localStorage.setItem(key, JSON.stringify(defaults));
    } else {
      setCmsItems(stored);
    }
  };

  const handleCmsSectionChange = (section: any) => {
    setCmsSection(section);
    loadCmsItems(section);
  };

  const handleAddCmsItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle) return;
    const newItem = {
      id: 'ITEM-' + Date.now().toString().slice(-4),
      title: newItemTitle,
      category: newItemCategory,
      price: newItemPrice,
      desc: newItemDesc
    };
    const updated = [newItem, ...cmsItems];
    setCmsItems(updated);
    localStorage.setItem(`wh_cms_${cmsSection}`, JSON.stringify(updated));

    setNewItemTitle('');
    setNewItemDesc('');
  };

  const handleDeleteCmsItem = (id: string) => {
    const updated = cmsItems.filter(item => item.id !== id);
    setCmsItems(updated);
    localStorage.setItem(`wh_cms_${cmsSection}`, JSON.stringify(updated));
  };

  const handleBanIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipToBan || bannedIps.includes(ipToBan)) return;
    setBannedIps([...bannedIps, ipToBan]);
    setIpToBan('');
  };

  const handleUnbanIp = (ip: string) => {
    setBannedIps(bannedIps.filter(item => item !== ip));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((usernameInput === 'admin' || usernameInput === 'whitehatdev') && passwordInput === 'whitehat2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Username or Security Passcode.');
    }
  };

  // Dedicated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
              CYBER ADMIN AUTHENTICATION
            </h1>
            <p className="text-xs text-gray-400 font-mono">
              Restricted Back-End Command Center • System v9.0.0
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-mono text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono">
            <div>
              <label className="block text-xs text-gray-400 mb-1">ADMIN USERNAME</label>
              <input
                type="text"
                required
                placeholder="admin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-black/60 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">SECURITY PASSCODE</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-black/60 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold font-rajdhani rounded-lg text-sm tracking-wider uppercase hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
            >
              LOG IN TO BACK-END CONTROL CENTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Standalone Full-Stack High-Tech Admin Dashboard View
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      {/* Top Console Header */}
      <header className="bg-gray-900/90 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-black border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black font-rajdhani text-white uppercase tracking-wider">
              WHITE HAT <span className="text-cyan-400">BACK-END CONTROL CENTER</span>
            </h1>
            <span className="text-[10px] text-lime-400 font-mono block -mt-1">
              SYSTEM MODE: FULL-STACK ENTERPRISE 🟢
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs font-mono text-gray-400 hidden sm:inline">
            LOGGED IN: <span className="text-cyan-400 font-bold">ADMIN / WHITEHATDEV</span>
          </span>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded text-xs font-mono flex items-center space-x-1 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>TERMINATE SESSION</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs Header */}
      <div className="bg-black/60 border-b border-gray-800 px-6 py-2 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-2 ${
            activeTab === 'analytics' ? 'bg-cyan-500 text-black font-bold' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>ANALYTICS & INSIGHTS</span>
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-2 ${
            activeTab === 'cms' ? 'bg-lime-400 text-black font-bold' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>CMS CONTENT MANAGER</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-2 ${
            activeTab === 'users' ? 'bg-cyan-500 text-black font-bold' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>USER REGISTRY</span>
        </button>

        <button
          onClick={() => setActiveTab('threats')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-2 ${
            activeTab === 'threats' ? 'bg-red-500 text-white font-bold' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>IP THREAT MONITOR</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-2 ${
            activeTab === 'orders' ? 'bg-cyan-500 text-black font-bold' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>ORDERS & INVOICES</span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-2 ${
            activeTab === 'config' ? 'bg-amber-400 text-black font-bold' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>SYSTEM CONFIG</span>
        </button>
      </div>

      {/* Main Back-End Console Body */}
      <main className="flex-grow p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* TAB 1: ANALYTICS & INSIGHTS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-1">
                <span className="text-xs text-gray-400 font-mono">TOTAL CLIENT SALES</span>
                <p className="text-2xl font-bold font-rajdhani text-lime-400">$12,840.50 USD</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-1">
                <span className="text-xs text-gray-400 font-mono">VERIFIED CLIENTS</span>
                <p className="text-2xl font-bold font-rajdhani text-cyan-400">{registeredUsers.length} Active</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-1">
                <span className="text-xs text-gray-400 font-mono">CLIENT IP TELEMETRY</span>
                <p className="text-xl font-bold font-rajdhani text-white">185.220.101.4</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-1">
                <span className="text-xs text-gray-400 font-mono">SECURITY SHIELD</span>
                <p className="text-2xl font-bold font-rajdhani text-lime-400">100% PROTECTED</p>
              </div>
            </div>

            {/* SVG Pie Chart for Device & OS Breakdown */}
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold font-rajdhani text-white uppercase">DEVICE & OS TELEMETRY PIE CHART</h2>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00f0ff" strokeWidth="20" strokeDasharray="120 251" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#9fef00" strokeWidth="20" strokeDasharray="80 251" strokeDashoffset="-120" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fcee0a" strokeWidth="20" strokeDasharray="35 251" strokeDashoffset="-200" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ff0055" strokeWidth="20" strokeDasharray="16 251" strokeDashoffset="-235" />
                </svg>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-cyan-400 rounded"></span><span className="text-white font-bold">Windows Desktop (48%)</span></div>
                  <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-lime-400 rounded"></span><span className="text-white font-bold">Android Mobile (32%)</span></div>
                  <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-yellow-400 rounded"></span><span className="text-white font-bold">iOS Mobile (14%)</span></div>
                  <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-pink-500 rounded"></span><span className="text-white font-bold">Linux / macOS (6%)</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CMS CONTENT MANAGER (ADD / EDIT / DELETE) */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="flex space-x-2 border-b border-gray-800 pb-3">
              {(['published_apps', 'marketplace', 'services_courses', 'Cyber_gallery'] as const).map(sec => (
                <button
                  key={sec}
                  onClick={() => handleCmsSectionChange(sec)}
                  className={`px-3 py-1.5 rounded text-xs font-mono uppercase ${
                    cmsSection === sec ? 'bg-lime-400 text-black font-bold' : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  {sec.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Add New Item Form */}
            <form onSubmit={handleAddCmsItem} className="bg-gray-900 border border-gray-800 p-4 rounded-xl space-y-3 font-mono text-xs">
              <h3 className="font-bold text-white uppercase text-sm">ADD NEW ITEM TO [{cmsSection.toUpperCase()}]</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Title (e.g., Cyber Bot v2)"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="bg-black/60 border border-gray-800 rounded px-3 py-2 text-white focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Price (e.g., 49.99)"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="bg-black/60 border border-gray-800 rounded px-3 py-2 text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="bg-black/60 border border-gray-800 rounded px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-lime-400 text-black font-bold font-rajdhani rounded uppercase hover:bg-lime-300 transition-all flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>PUBLISH TO FRONT-END</span>
              </button>
            </form>

            {/* Existing CMS Items Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black/60 text-gray-400 uppercase">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">TITLE</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">PRICE</th>
                    <th className="p-3">DESCRIPTION</th>
                    <th className="p-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {cmsItems.map(item => (
                    <tr key={item.id} className="hover:bg-black/40">
                      <td className="p-3 text-cyan-400">{item.id}</td>
                      <td className="p-3 font-bold text-white">{item.title}</td>
                      <td className="p-3 text-lime-400">{item.category}</td>
                      <td className="p-3">${item.price} USD</td>
                      <td className="p-3 text-gray-400">{item.desc}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteCmsItem(item.id)}
                          className="p-1 text-red-400 hover:text-red-300"
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

        {/* TAB 3: USER REGISTRY */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-4 bg-black/60 border-b border-gray-800 flex justify-between items-center">
                <h3 className="font-bold text-white uppercase text-sm font-rajdhani">REGISTERED USERS DATABASE ({registeredUsers.length})</h3>
              </div>
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black/40 text-gray-400 uppercase">
                  <tr>
                    <th className="p-3">USER ID</th>
                    <th className="p-3">USERNAME</th>
                    <th className="p-3">REAL EMAIL</th>
                    <th className="p-3">SHA256 HASH</th>
                    <th className="p-3">PURCHASES</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {registeredUsers.map(u => (
                    <tr key={u.id}>
                      <td className="p-3 text-cyan-400">{u.id}</td>
                      <td className="p-3 font-bold text-white">{u.username}</td>
                      <td className="p-3 text-gray-300">{u.email}</td>
                      <td className="p-3 text-gray-500 font-mono text-[10px]">{u.passwordHash || 'sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}</td>
                      <td className="p-3 text-lime-400">${u.totalPurchases || 0} USD</td>
                      <td className="p-3 text-lime-400 font-bold">{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: IP THREAT MONITOR */}
        {activeTab === 'threats' && (
          <div className="space-y-4 font-mono text-xs">
            <form onSubmit={handleBanIp} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex gap-3">
              <input
                type="text"
                required
                placeholder="IP Address to Ban (e.g. 192.168.1.50)"
                value={ipToBan}
                onChange={(e) => setIpToBan(e.target.value)}
                className="flex-1 bg-black/60 border border-gray-800 rounded px-3 py-2 text-white focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-red-500 text-white font-bold rounded uppercase hover:bg-red-600">
                BAN IP ADDRESS
              </button>
            </form>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
              <h3 className="font-bold text-white uppercase text-sm font-rajdhani">BANNED IP ADDRESS LIST ({bannedIps.length})</h3>
              <div className="space-y-2">
                {bannedIps.map(ip => (
                  <div key={ip} className="flex justify-between items-center p-2.5 bg-black/50 border border-gray-800 rounded">
                    <span className="text-red-400 font-bold">{ip}</span>
                    <button onClick={() => handleUnbanIp(ip)} className="text-xs text-gray-400 hover:text-white">
                      UNBAN IP
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS & INVOICES */}
        {activeTab === 'orders' && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-black/60 text-gray-400 uppercase">
                <tr>
                  <th className="p-3">ORDER ID</th>
                  <th className="p-3">USER EMAIL</th>
                  <th className="p-3">METHOD</th>
                  <th className="p-3">TOTAL</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="p-3 text-cyan-400">{o.id}</td>
                    <td className="p-3 text-white">{o.userEmail}</td>
                    <td className="p-3 text-lime-400">{o.paymentMethod}</td>
                    <td className="p-3 font-bold">${o.totalAmount} USD</td>
                    <td className="p-3 text-lime-400">{o.status}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => setSelectedInvoice(o)} className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded">
                        PRINT INVOICE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: SYSTEM CONFIG */}
        {activeTab === 'config' && (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl space-y-4 font-mono text-xs">
            <h3 className="font-bold text-white uppercase text-sm font-rajdhani">ENTERPRISE SYSTEM CONFIGURATION</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Merchant PayPal Account: <span className="text-lime-400 font-bold">teamwhitehatdev@gmail.com</span></p>
              <p className="text-gray-400">Merchant Tokenized Link: <span className="text-cyan-400 font-bold">https://paypal.me/facebookgamer</span></p>
              <p className="text-gray-400">Anti-Inspect Code Protection: <span className="text-lime-400 font-bold">ACTIVE 🟢</span></p>
            </div>
          </div>
        )}
      </main>

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white text-black p-8 rounded-xl max-w-md w-full space-y-4 font-mono">
            <h2 className="text-xl font-bold text-center border-b pb-2">OFFICIAL CYBER INVOICE</h2>
            <p className="text-xs">Order ID: {selectedInvoice.id}</p>
            <p className="text-xs">Client Email: {selectedInvoice.userEmail}</p>
            <p className="text-xs">Payment Method: {selectedInvoice.paymentMethod}</p>
            <p className="text-sm font-bold pt-2 border-t">Total Amount Paid: ${selectedInvoice.totalAmount} USD</p>
            <div className="flex justify-between pt-4">
              <button onClick={() => window.print()} className="px-4 py-2 bg-black text-white rounded text-xs">
                PRINT RECEIPT
              </button>
              <button onClick={() => setSelectedInvoice(null)} className="px-4 py-2 bg-gray-200 text-black rounded text-xs">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
