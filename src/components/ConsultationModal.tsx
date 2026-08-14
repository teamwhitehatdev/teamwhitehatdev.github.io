import React, { useState } from 'react';
import { HUDPanel } from './HUDPanel';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose, selectedService }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addInquiry } = useApp();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name,
      email,
      message: `[Service: ${selectedService || 'General'}] ${message}`
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg">
        <HUDPanel title={selectedService ? `BOOK CONSULTATION: ${selectedService.toUpperCase()}` : "BOOK VIRTUAL ASSISTANT CONSULTATION"}>
          <div className="p-6 relative space-y-4 font-mono">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-lime-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white uppercase font-rajdhani">INQUIRY RECEIVED</h3>
                <p className="text-xs text-gray-300">We will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-cyan-400 font-bold mb-1 uppercase">YOUR FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-lg text-white font-sans"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 font-bold mb-1 uppercase">YOUR EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-lg text-white font-sans"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 font-bold mb-1 uppercase">PROJECT DETAILS & REQUIREMENTS</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-lg text-white font-sans"
                    placeholder="Describe your Virtual Assistant or Software Development requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT CONSULTATION INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </HUDPanel>
      </div>
    </div>
  );
};
