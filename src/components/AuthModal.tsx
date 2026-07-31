import React, { useState } from 'react';
import { X, UserCheck, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { audioEngine } from './AudioEngine';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, user, registerUser, logoutUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    registerUser(name.trim(), email.trim(), country);
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
      <div className="bg-[#0d0f18] border-2 border-[var(--primary-color)] rounded-lg p-6 max-w-md w-full shadow-[0_0_30px_var(--glow-color)] relative">
        <button 
          onClick={() => {
            audioEngine.playGlitch();
            setIsAuthOpen(false);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded bg-black border border-[var(--primary-color)] text-[var(--primary-color)]">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-white text-lg">CLIENT AUTH PORTAL</h3>
            <p className="text-xs text-gray-400">Register account for instant download tracking</p>
          </div>
        </div>

        {user ? (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-black/60 border border-green-500/30 rounded space-y-2">
              <div className="text-green-400 font-bold flex items-center space-x-1">
                <UserCheck size={16} />
                <span>AUTHENTICATED CLIENT</span>
              </div>
              <div>Name: <span className="text-white font-bold">{user.name}</span></div>
              <div>Email: <span className="text-cyan-400">{user.email}</span></div>
              <div>Country: <span className="text-yellow-400">{user.country}</span></div>
            </div>
            <button
              onClick={logoutUser}
              className="w-full py-2 rounded bg-red-600/30 border border-red-500 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
            >
              LOGOUT CLIENT ACCOUNT
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">FULL NAME / COMPANY:</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">CLIENT EMAIL ADDRESS:</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">COUNTRY / REGION:</label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold tracking-wider hover:bg-yellow-400 transition-colors shadow-[0_0_10px_var(--glow-color)]"
            >
              REGISTER & SECURE ACCOUNT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
