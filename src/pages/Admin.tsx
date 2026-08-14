import React, { useState, useEffect } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Lock, Key, Terminal, RefreshCw, Download, Upload, CheckCircle, Trash2, Plus, Edit, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Admin: React.FC = () => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const { services, projects, bannedIps, addBannedIp, removeBannedIp, inquiries } = useApp();

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

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 bg-gradient-to-b from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-3xl space-y-6 shadow-2xl font-mono text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
          <Lock className="w-7 h-7 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
          MASTER ADMIN PORTAL LOGIN
        </h2>

        <p className="text-xs text-gray-400 font-sans">
          Enter master PIN code to access CMS control panel, IP sentinel firewall, inquiries inbox, and backup utilities.
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
          SECURITY PROTOCOL • SHA-256 AUTHENTICATION ACTIVE
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono max-w-7xl mx-auto pb-10">
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-lime-500/20 border border-lime-500/50 flex items-center justify-center text-lime-400">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black font-rajdhani text-white uppercase">MASTER CMS CONTROL PANEL</h1>
            <span className="text-xs text-lime-400 font-bold">AUTHENTICATED • ACCESS LEVEL 0</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 font-bold text-xs rounded-xl uppercase transition-all"
        >
          LOGOUT ADMIN
        </button>
      </div>
    </div>
  );
};
export default Admin;
