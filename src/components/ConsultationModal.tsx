import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Calendar, Mail, User, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialServiceTitle = 'Executive Virtual Assistance'
}) => {
  const { addInquiry } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialServiceTitle);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      addInquiry({
        name: name.trim(),
        email: email.trim(),
        service: service,
        message: message.trim()
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-gradient-to-b from-gray-900 via-black to-cyan-950/90 border-2 border-cyan-500/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/60 p-1.5 rounded-full border border-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 font-sans animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-lime-500/20 border border-lime-500/50 flex items-center justify-center text-lime-400">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black font-rajdhani text-white uppercase">
              BOOKING APPOINTMENT RECEIVED!
            </h3>
            <p className="text-xs text-gray-300">
              Thank you, <span className="text-lime-400 font-bold">{name}</span>! Your consultation booking has been routed to our Master Admin Inbox. Our team will contact you at <span className="text-cyan-400 font-bold">{email}</span> within 2 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1 text-xs text-cyan-400 bg-cyan-500/20 px-2.5 py-0.5 rounded border border-cyan-500/40 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                <span>BOOK AN APPOINTMENT (20% OFF DISCOUNT)</span>
              </div>
              <h3 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
                HIRE VA & CONSULTATION INQUIRY
              </h3>
              <p className="text-xs text-gray-300 font-sans">
                Schedule a consultation appointment with our executive Virtual Assistants or full-stack developers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="text-cyan-400 font-mono font-bold block pb-1 flex items-center space-x-1">
                  <User className="w-3.5 h-3.5" />
                  <span>FULL NAME:</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-cyan-400 font-mono font-bold block pb-1 flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>EMAIL ADDRESS:</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-cyan-400 font-mono font-bold block pb-1 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>SELECT SERVICE REQUIRED:</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400"
                >
                  <option value="Executive Virtual Assistance">Executive Virtual Assistance ($15/hr)</option>
                  <option value="Full-Stack Web Development">Full-Stack Web Development ($499/proj)</option>
                  <option value="Mobile App Development">Mobile App Development ($799/proj)</option>
                  <option value="Hostinger Web Hosting Setup">Hostinger Web Hosting Setup (Code: DPDCABINCEHM)</option>
                  <option value="Graphic Design & Branding">Graphic Design & Branding ($250)</option>
                </select>
              </div>

              <div>
                <label className="text-cyan-400 font-mono font-bold block pb-1 flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>PROJECT DETAILS & MESSAGE:</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your project requirements or VA needs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl shadow-xl hover:opacity-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>SUBMIT CONSULTATION INQUIRY</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
export default ConsultationModal;
