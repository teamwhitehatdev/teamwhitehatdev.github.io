import React, { useState } from 'react';
import { Terminal, Mail, Send,    Globe, PhoneCall } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { audioEngine } from '../components/AudioEngine';

export const Contact: React.FC = () => {
  const [cmdInput, setCmdInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'WHITE_HAT_DEV SECURITY TERMINAL v4.2 [ONLINE]',
    'Type "help" for available system commands or use the direct contact form below.'
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Custom Web & Mobile App Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    audioEngine.playClick();
    const cmd = cmdInput.trim().toLowerCase();
    setCmdInput('');

    let res = `Command not recognized: "${cmd}". Type "help" for commands.`;
    if (cmd === 'help') {
      res = 'Available commands: help, contact, hire, services, shop, socials, theme, clear';
    } else if (cmd === 'contact' || cmd === 'hire') {
      res = 'Email: dev@whitehat.com | Telegram: @whitehatdev_official | Discord: WhiteHatDev#9999';
    } else if (cmd === 'services') {
      res = 'Full-Stack Web ($1499), Mobile Apps ($2499), Virtual Assistant Retainer ($499/mo), Security Audit ($899)';
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      return;
    } else if (cmd === 'socials') {
      res = 'GitHub: github.com/whitehatdev | YouTube: youtube.com/@whitehatdev | Play Store: dev?id=whitehat';
    }

    setTerminalLogs(prev => [...prev, `> ${cmd}`, res]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSuccess();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white">
          CONTACT & HIRE <span className="neon-text-primary">TERMINAL</span>
        </h1>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          Targeting worldwide clients. Reach out for custom web development, Google Play Store app engineering, virtual assistant services, or security audits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Hacker Terminal */}
        <HUDPanel title="CYBER TERMINAL INTERFACE">
          <div className="bg-black/90 p-4 rounded border border-cyan-500/30 text-xs font-mono h-80 overflow-y-auto space-y-2 text-cyan-400">
            {terminalLogs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="mt-4 flex space-x-2">
            <span className="text-[var(--primary-color)] font-bold font-mono py-1.5">&gt;</span>
            <input
              type="text"
              value={cmdInput}
              onChange={e => setCmdInput(e.target.value)}
              placeholder="type 'help', 'services', or 'contact'..."
              className="flex-1 bg-black border border-gray-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--primary-color)] font-mono"
            />
          </form>
        </HUDPanel>

        {/* Contact Form */}
        <HUDPanel title="DIRECT EMAIL & MESSAGE FORM">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-3xl text-green-400">✓</div>
              <h3 className="font-orbitron font-bold text-lg text-white">MESSAGE TRANSMITTED!</h3>
              <p className="text-xs text-gray-300">Thank you, {formData.name}. Our developer team will respond within 2-4 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded bg-[var(--primary-color)] text-black font-bold text-xs"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">YOUR NAME / ORGANIZATION:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-[var(--primary-color)]"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">EMAIL ADDRESS:</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@company.com"
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-[var(--primary-color)]"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">PROJECT TYPE / SUBJECT:</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-[var(--primary-color)]"
                >
                  <option value="Custom Web App Development">Custom Web App Development ($1,499+)</option>
                  <option value="Android & iOS Mobile App">Android & iOS Mobile App ($2,499+)</option>
                  <option value="Virtual Assistant Retainer">Virtual Assistant Retainer ($499/mo)</option>
                  <option value="Cyber Security Audit">Cyber Security Audit ($899)</option>
                  <option value="Marketplace Digital Goods Inquiry">Marketplace Digital Goods Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">MESSAGE / PROJECT SPECIFICATIONS:</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your web or mobile app requirements..."
                  className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-[var(--primary-color)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>TRANSMIT MESSAGE TO WHITE HAT DEV</span>
              </button>
            </form>
          )}
        </HUDPanel>
      </div>
    </div>
  );
};
