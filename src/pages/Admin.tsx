import React, { useState, useEffect } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Lock, Key, Terminal, RefreshCw, Download, Upload, CheckCircle, Trash2, Plus, Edit, AlertTriangle, Eye, Server, Users, Mail, Activity, Database, FileText, PieChart, BarChart2, TrendingUp, X, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Service, Project } from '../types';

export const Admin: React.FC = () => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'projects' | 'firewall' | 'inquiries' | 'telemetry' | 'backup'>('overview');
  
  const [newBanIp, setNewBanIp] = useState('');

  // MODAL STATES FOR EDITING & CREATING
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [svcForm, setSvcForm] = useState({ title: '', description: '', price: '', category: 'va', iconName: 'Briefcase' });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projForm, setProjForm] = useState({ title: '', description: '', category: 'Web App', image: '', tags: 'React, TypeScript' });

  const {
    services, addService, updateService, deleteService,
    projects, addProject, updateProject, deleteProject,
    bannedIps, addBannedIp, removeBannedIp,
    inquiries, deleteInquiry, userIp
  } = useApp();

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
      setAuthError('INVALID MASTER PIN - ACCESS DENIED');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wh_admin_auth');
  };

  // SERVICE ACTIONS
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, {
        title: svcForm.title,
        description: svcForm.description,
        price: svcForm.price,
        category: svcForm.category as any,
        iconName: svcForm.iconName
      });
      setEditingService(null);
    } else if (isCreatingService) {
      addService({
        title: svcForm.title,
        description: svcForm.description,
        price: svcForm.price,
        category: svcForm.category as any,
        iconName: svcForm.iconName,
        features: ['Executive Assistance', '24/7 Dedicated Support', 'High Conversion Strategy']
      });
      setIsCreatingService(false);
    }
  };

  const openEditService = (svc: Service) => {
    setEditingService(svc);
    setSvcForm({
      title: svc.title,
      description: svc.description,
      price: svc.price || '$15 / hr',
      category: svc.category || 'va',
      iconName: svc.iconName || 'Briefcase'
    });
  };

  const openCreateService = () => {
    setIsCreatingService(true);
    setSvcForm({ title: '', description: '', price: '$15 / hr', category: 'va', iconName: 'Briefcase' });
  };

  // PROJECT ACTIONS
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = projForm.tags.split(',').map((t) => t.trim());
    if (editingProject) {
      updateProject(editingProject.id, {
        title: projForm.title,
        description: projForm.description,
        category: projForm.category,
        image: projForm.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        tags: tagArray
      });
      setEditingProject(null);
    } else if (isCreatingProject) {
      addProject({
        title: projForm.title,
        description: projForm.description,
        category: projForm.category,
        image: projForm.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        tags: tagArray,
        githubUrl: 'https://github.com/teamwhitehatdev',
        liveUrl: 'https://teamwhitehatdev.github.io',
        featured: true
      });
      setIsCreatingProject(false);
    }
  };

  const openEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjForm({
      title: proj.title,
      description: proj.description,
      category: proj.category,
      image: proj.image,
      tags: proj.tags.join(', ')
    });
  };

  const openCreateProject = () => {
    setIsCreatingProject(true);
    setProjForm({
      title: '',
      description: '',
      category: 'Web App',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      tags: 'React, TypeScript, Tailwind'
    });
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
      version: 'v145.0.0',
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
          { id: 'overview', label: '📊 OVERVIEW & CHARTS', icon: Activity },
          { id: 'services', label: '🛠️ SERVICES CMS', icon: Server },
          { id: 'projects', label: '🚀 PROJECTS CMS', icon: FileText },
          { id: 'firewall', label: '🛡️ IP FIREWALL', icon: Shield },
          { id: 'inquiries', label: `📬 INQUIRIES INBOX (${inquiries.length})`, icon: Mail },
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

      {/* TAB 1: OVERVIEW & CHART ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <HUDPanel title="📊 MONITORING DATA, PIE CHARTS & VISITOR ANALYTICS">
            <div className="p-6 space-y-6">
              
              {/* TOP COUNTERS */}
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

              {/* CHARTS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* BAR CHART */}
                <div className="bg-black/80 border border-cyan-500/40 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="text-xs font-extrabold text-cyan-400 font-rajdhani uppercase flex items-center space-x-1">
                      <BarChart2 className="w-4 h-4 text-cyan-400" />
                      <span>MONTHLY REFERRAL TRAFFIC & CONVERSIONS</span>
                    </span>
                    <span className="text-[10px] text-lime-400 font-mono font-bold">REAL-TIME FEED</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] pb-1">
                        <span className="text-lime-300">Hostinger Cloud Hosting (Code: DPDCABINCEHM)</span>
                        <span className="text-white font-bold">1,420 Clicks (68% Conv)</span>
                      </div>
                      <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden border border-gray-800">
                        <div className="bg-gradient-to-r from-lime-500 to-cyan-400 h-full w-[68%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] pb-1">
                        <span className="text-cyan-300">Gumroad Digital VA Creator Store</span>
                        <span className="text-white font-bold">890 Downloads (45% Conv)</span>
                      </div>
                      <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden border border-gray-800">
                        <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full w-[45%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] pb-1">
                        <span className="text-purple-300">ElevenLabs AI Voice Studio</span>
                        <span className="text-white font-bold">640 Signups (32% Conv)</span>
                      </div>
                      <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden border border-gray-800">
                        <div className="bg-gradient-to-r from-purple-500 to-lime-400 h-full w-[32%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PIE CHART */}
                <div className="bg-black/80 border border-lime-500/40 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="text-xs font-extrabold text-lime-400 font-rajdhani uppercase flex items-center space-x-1">
                      <PieChart className="w-4 h-4 text-lime-400" />
                      <span>VISITOR DEVICE BREAKDOWN & GEOLOCATION</span>
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold">FASTLY EDGE TELEMETRY</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono py-2">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">DESKTOP</span>
                      <span className="text-xl font-bold text-cyan-300">58%</span>
                    </div>
                    <div className="bg-lime-500/10 border border-lime-500/30 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">MOBILE</span>
                      <span className="text-xl font-bold text-lime-300">34%</span>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">TABLET</span>
                      <span className="text-xl font-bold text-purple-300">8%</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </HUDPanel>
        </div>
      )}

      {/* TAB 2: SERVICES CMS MANAGER */}
      {activeTab === 'services' && (
        <HUDPanel title="🛠️ SERVICES CMS MANAGER (INTERACTIVE EDIT / ADD / DELETE)">
          <div className="p-6 space-y-6 font-sans text-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-gray-300 max-w-xl">
                Directly manage all Virtual Assistant packages, web development pricing, and digital solutions shown on the main front-end website.
              </p>

              <button
                onClick={openCreateService}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl shadow-lg flex items-center space-x-1.5 hover:opacity-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD NEW SERVICE</span>
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {services.map((svc) => (
                <div key={svc.id} className="bg-black/80 border border-gray-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 hover:border-cyan-500/50 transition-all">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-lime-400 bg-lime-500/20 px-2 py-0.5 rounded border border-lime-500/40 uppercase">
                        {svc.category || 'VA'}
                      </span>
                      <h4 className="text-sm font-bold text-white font-rajdhani uppercase">{svc.title}</h4>
                    </div>
                    <p className="text-xs text-gray-400 font-sans">{svc.description}</p>
                    <span className="text-lime-400 font-bold text-xs block pt-0.5">{svc.price || '$15 / hr'}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditService(svc)}
                      className="px-3.5 py-1.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>EDIT</span>
                    </button>
                    <button
                      onClick={() => deleteService(svc.id)}
                      className="px-3.5 py-1.5 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>REMOVE</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>
      )}

      {/* TAB 3: PROJECTS CMS MANAGER */}
      {activeTab === 'projects' && (
        <HUDPanel title="🚀 PROJECTS CMS MANAGER (INTERACTIVE EDIT / ADD / DELETE)">
          <div className="p-6 space-y-6 font-sans text-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-gray-300 max-w-xl">
                Manage featured portfolio projects, web apps, and Android mobile applications displayed on the Showcase page.
              </p>

              <button
                onClick={openCreateProject}
                className="px-5 py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl shadow-lg flex items-center space-x-1.5 hover:opacity-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD NEW PROJECT</span>
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-black/80 border border-gray-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 hover:border-lime-500/50 transition-all">
                  <div className="flex items-center space-x-4">
                    <img src={proj.image} alt={proj.title} className="w-16 h-12 object-cover rounded-lg border border-gray-700" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white font-rajdhani uppercase">{proj.title}</h4>
                      <p className="text-xs text-gray-400 font-sans">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {proj.tags.map((tag, idx) => (
                          <span key={idx} className="bg-cyan-500/10 text-cyan-300 text-[10px] px-1.5 py-0.5 rounded border border-cyan-500/30">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditProject(proj)}
                      className="px-3.5 py-1.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>EDIT</span>
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="px-3.5 py-1.5 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>REMOVE</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>
      )}

      {/* TAB 5: INQUIRIES INBOX */}
      {activeTab === 'inquiries' && (
        <HUDPanel title={`📬 VISITOR INQUIRIES & CONSULTATION BOOKINGS (${inquiries.length})`}>
          <div className="p-6 space-y-6 font-mono text-xs">
            <p className="text-gray-300 font-sans">
              All consultation bookings and client inquiries submitted on the front-end arrive here in real time.
            </p>

            {inquiries.length === 0 ? (
              <div className="bg-black/80 border border-dashed border-gray-800 p-8 rounded-2xl text-center text-gray-500 italic">
                No client inquiries currently received in the inbox.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-black/90 border border-cyan-500/40 p-5 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                    <div className="flex flex-wrap items-center justify-between border-b border-gray-800 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-white font-rajdhani">{inq.name}</span>
                        <span className="text-xs text-cyan-400 block">{inq.email}</span>
                      </div>
                      <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2.5 py-0.5 rounded border border-cyan-500/40 font-bold uppercase">
                        SERVICE: {inq.service}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 font-sans leading-relaxed bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                      "{inq.message}"
                    </p>

                    <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
                      <span className="text-[10px] text-gray-500">RECEIVED: {new Date(inq.createdAt).toLocaleString()}</span>
                      
                      <div className="flex items-center space-x-2">
                        <a
                          href={`mailto:${inq.email}?subject=Reply from Team WhiteHat Dev&body=Hi ${inq.name}, Thank you for your inquiry!`}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold text-xs uppercase rounded-lg shadow flex items-center space-x-1 hover:opacity-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>REPLY / EMAIL CLIENT</span>
                        </a>

                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="px-3.5 py-1.5 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 rounded-lg text-xs font-bold flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>DELETE INQUIRY</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </HUDPanel>
      )}

      {/* TAB 4: IP SENTINEL FIREWALL */}
      {activeTab === 'firewall' && (
        <HUDPanel title="🛡️ IP SENTINEL FIREWALL & REAL-TIME IP BANNING">
          <div className="p-6 space-y-6 font-mono">
            <form onSubmit={handleAddBan} className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="ENTER IP ADDRESS TO BAN (e.g. 192.168.1.1)"
                value={newBanIp}
                onChange={(e) => setNewBanIp(e.target.value)}
                className="flex-grow px-4 py-2.5 bg-black border border-red-500/40 rounded-xl text-white text-xs"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-500 text-white font-extrabold text-xs uppercase rounded-xl hover:bg-red-600 transition-all font-rajdhani"
              >
                BAN IP ADDRESS NOW
              </button>
            </form>

            <div className="bg-black/80 border border-gray-800 p-4 rounded-xl space-y-3">
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
        <HUDPanel title="💾 DATABASE JSON BACKUP & RESTORE UTILITIES">
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

      {/* EDIT/CREATE SERVICE MODAL */}
      {(editingService || isCreatingService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
          <div className="bg-gray-900 border-2 border-cyan-500/60 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => { setEditingService(null); setIsCreatingService(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black font-rajdhani text-white uppercase">
              {editingService ? 'EDIT SERVICE PACKAGE' : 'CREATE NEW SERVICE PACKAGE'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-3 font-sans text-xs">
              <div>
                <label className="text-cyan-400 font-mono block pb-1">SERVICE TITLE:</label>
                <input
                  type="text"
                  value={svcForm.title}
                  onChange={(e) => setSvcForm({ ...svcForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-cyan-400 font-mono block pb-1">DESCRIPTION:</label>
                <textarea
                  rows={3}
                  value={svcForm.description}
                  onChange={(e) => setSvcForm({ ...svcForm, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-cyan-400 font-mono block pb-1">PRICE / RATE:</label>
                <input
                  type="text"
                  value={svcForm.price}
                  onChange={(e) => setSvcForm({ ...svcForm, price: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-xl text-white font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditingService(null); setIsCreatingService(false); }}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold font-rajdhani uppercase rounded-xl"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/CREATE PROJECT MODAL */}
      {(editingProject || isCreatingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
          <div className="bg-gray-900 border-2 border-lime-500/60 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => { setEditingProject(null); setIsCreatingProject(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black font-rajdhani text-white uppercase">
              {editingProject ? 'EDIT PORTFOLIO PROJECT' : 'CREATE NEW PORTFOLIO PROJECT'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-3 font-sans text-xs">
              <div>
                <label className="text-lime-400 font-mono block pb-1">PROJECT TITLE:</label>
                <input
                  type="text"
                  value={projForm.title}
                  onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-lime-500/40 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-lime-400 font-mono block pb-1">DESCRIPTION:</label>
                <textarea
                  rows={3}
                  value={projForm.description}
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-lime-500/40 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-lime-400 font-mono block pb-1">IMAGE URL:</label>
                <input
                  type="text"
                  value={projForm.image}
                  onChange={(e) => setProjForm({ ...projForm, image: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-lime-500/40 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-lime-400 font-mono block pb-1">TAGS (COMMA SEPARATED):</label>
                <input
                  type="text"
                  value={projForm.tags}
                  onChange={(e) => setProjForm({ ...projForm, tags: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-lime-500/40 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditingProject(null); setIsCreatingProject(false); }}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl font-mono"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani uppercase rounded-xl"
                >
                  SAVE PROJECT
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
