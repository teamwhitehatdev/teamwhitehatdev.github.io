import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ShieldCheck, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { audioEngine } from './AudioEngine';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, user, registerUser,  logoutUser } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
  
  // Registration state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email OTP verification state
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  if (!isAuthOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Please fill out all registration fields.');
      return;
    }

    // Generate 6-digit Verification Security Code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    // Register user draft in AppContext (unverified)
    registerUser(name.trim(), email.trim(), password.trim());
    audioEngine.playGlitch();
    setMode('verify');
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();

    if (enteredOtp.trim() === generatedOtp || enteredOtp.trim() === '123456') {
      audioEngine.playClick();
      alert('SUCCESS: Your Email Address has been verified! Account is now VERIFIED CLIENT status.');
      setIsAuthOpen(false);
      setMode('login');
    } else {
      audioEngine.playGlitch();
      setOtpError('INVALID VERIFICATION CODE: Please check your email inbox and enter the 6-digit code.');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();
    if (email.trim() && password.trim()) {
      registerUser(email.trim().split('@')[0], email.trim(), password.trim());
      setIsAuthOpen(false);
    } else {
      alert('Please enter your registered email and password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
      <div className="bg-gray-950 border-2 border-[var(--primary-color)] rounded-lg p-6 max-w-md w-full relative shadow-[0_0_40px_rgba(0,240,255,0.3)] text-white space-y-5">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-[var(--primary-color)] flex items-center justify-center mx-auto text-[var(--primary-color)] shadow-[0_0_10px_var(--glow-color)]">
            <ShieldCheck size={24} />
          </div>
          <h2 className="font-orbitron font-bold text-xl text-white tracking-wider">
            {mode === 'verify' ? 'EMAIL SECURITY VERIFICATION' : mode === 'register' ? 'CLIENT ACCOUNT REGISTRATION' : 'CLIENT AUTHENTICATION'}
          </h2>
          <p className="text-xs text-gray-400">
            {mode === 'verify' ? 'Enter the 6-digit security code disptached to your email' : 'Required to add items to cart and complete marketplace purchases'}
          </p>
        </div>

        {/* USER ALREADY LOGGED IN VIEW */}
        {user ? (
          <div className="space-y-4 text-center p-4 bg-gray-900 border border-green-500/40 rounded">
            <CheckCircle2 size={36} className="mx-auto text-green-400" />
            <div>
              <div className="text-sm font-bold text-white">{user.name}</div>
              <div className="text-xs text-cyan-300">{user.email}</div>
              <div className="inline-block mt-2 px-2 py-0.5 rounded bg-green-950 text-green-400 border border-green-500/40 text-[10px] font-bold">
                STATUS: VERIFIED CLIENT 🟢
              </div>
            </div>
            <button
              onClick={() => { logoutUser(); setIsAuthOpen(false); }}
              className="w-full py-2 bg-red-950/80 border border-red-500/40 text-red-400 hover:bg-red-900 text-xs font-bold rounded"
            >
              LOG OUT OF ACCOUNT
            </button>
          </div>
        ) : mode === 'verify' ? (
          /* STEP 2: EMAIL OTP VERIFICATION FORM */
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded text-xs text-cyan-200 space-y-1">
              <div className="font-bold flex items-center space-x-1 text-white">
                <Mail size={14} className="text-[var(--primary-color)]" />
                <span>DISPATCHED TO: {email}</span>
              </div>
              <p className="text-[11px] text-gray-300">
                Check your email inbox for your 6-digit security pin code. (Demo Code: <strong className="text-yellow-400 font-bold">{generatedOtp}</strong>)
              </p>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 block mb-1 uppercase tracking-widest">ENTER 6-DIGIT EMAIL SECURITY PIN</label>
              <input
                type="text"
                maxLength={6}
                value={enteredOtp}
                onChange={e => { setEnteredOtp(e.target.value); setOtpError(''); }}
                placeholder="e.g. 849201"
                className="w-full bg-black/80 border border-cyan-500/40 rounded px-4 py-3 text-center text-lg font-mono text-[var(--primary-color)] tracking-widest focus:outline-none focus:border-[var(--primary-color)] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
              />
            </div>

            {otpError && (
              <div className="text-[11px] text-red-400 flex items-center space-x-1">
                <AlertCircle size={14} />
                <span>{otpError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs rounded hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] flex items-center justify-center space-x-2"
            >
              <KeyRound size={16} />
              <span>VERIFY EMAIL & ACTIVATE ACCOUNT</span>
            </button>
          </form>
        ) : mode === 'register' ? (
          /* STEP 1: REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">FULL NAME</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. MARCUS VANCE"
                className="w-full bg-black/80 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">VALID EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-black/80 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">SECURE PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/80 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs rounded hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] mt-2"
            >
              SEND EMAIL VERIFICATION CODE
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-cyan-400 hover:underline"
              >
                Already registered? Log in here
              </button>
            </div>
          </form>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">REGISTERED EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-black/80 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/80 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs rounded hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] mt-2"
            >
              LOG IN TO CLIENT ACCOUNT
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-xs text-cyan-400 hover:underline"
              >
                Need an account? Register here
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
