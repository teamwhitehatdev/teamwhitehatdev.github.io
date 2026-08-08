import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield, Mail, User, Briefcase, DollarSign, FileText } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Web Application');
  const [budget, setBudget] = useState('$1,000 - $5,000');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setDetails('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-gray-900 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 font-mono">
            <CheckCircle2 className="w-16 h-16 text-lime-400 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold font-rajdhani text-white uppercase">INQUIRY RECEIVED 🟢</h2>
            <p className="text-xs text-gray-300">
              Thank you, <span className="text-cyan-400 font-bold">{name}</span>! Senior Architect Team White Hat will review your proposal and respond to <span className="text-lime-400 font-bold">{email}</span> within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-md shadow-cyan-500/10">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-rajdhani text-white uppercase tracking-wider">
                HIRE OUR TEAM / PROJECT CONSULTATION
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Submit your project specifications to discuss architecture, timeline, and deliverables.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-gray-400 mb-1">YOUR FULL NAME</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">YOUR EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="m.vance@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">PROJECT TYPE</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-black/60 border border-gray-800 rounded-lg px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                    <option value="Cybersecurity Audit">Cybersecurity Audit</option>
                    <option value="Automation Bot">Automation Bot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">ESTIMATED BUDGET</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-black/60 border border-gray-800 rounded-lg px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $7,000">$3,000 - $7,000</option>
                    <option value="$7,000 - $15,000">$7,000 - $15,000</option>
                    <option value="$15,000+">$15,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">PROJECT SPECIFICATIONS & DETAILS</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your project requirements, target goals, features, and timeline..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-black/60 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold font-rajdhani rounded-lg text-sm tracking-wider uppercase hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT INQUIRY TO LEAD DEVELOPER</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
