import React, { useState } from 'react';
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  Calendar,
  Mail,
  User,
  MessageSquare,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { validateEmailAndAntiBot, recordSuccessfulSubmission } from '../utils/emailValidator';

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
  const { addInquiry, addHireVaInquiry } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [service, setService] = useState(initialServiceTitle);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const validation = validateEmailAndAntiBot(email, honeypot);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid email or submission detected.');
      return;
    }

    if (name.trim() && email.trim() && message.trim()) {
      addInquiry({
        name: name.trim(),
        email: email.trim(),
        service: service,
        message: message.trim()
      });

      if (typeof addHireVaInquiry === 'function') {
        addHireVaInquiry({
          name: name.trim(),
          email: email.trim(),
          contactInfo: contactInfo.trim() || undefined,
          serviceRequested: service,
          message: message.trim(),
          sourcePage: window.location.hash || 'HomePage'
        });
      }

      recordSuccessfulSubmission();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setContactInfo('');
        setMessage('');
        setHoneypot('');
        onClose();
      }, 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 bg-slate-100 p-1.5 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Inquiry Logged Securely!</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <span className="text-blue-600 font-bold">{name}</span>! Your inquiry has been received and saved to our Admin CMS.
            </p>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center justify-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Team Review in Progress</span>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 text-xs text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Hire Dedicated VA &amp; Project Inquiry</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Book a Free VA / Automation Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Tell us about your Virtual Assistant, AI workflow automation, or web development needs.
              </p>
            </div>

            {validationError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-1">
              <input
                type="text"
                name="website_hp_check"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <div>
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setValidationError('');
                  }}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email Address:</span>
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidationError('');
                  }}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Select Service Required:</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                >
                  <option value="Executive Virtual Assistance">Executive Virtual Assistance ($15/hr)</option>
                  <option value="AI Workflow Automation Setup">AI Workflow Automation Setup ($750/setup)</option>
                  <option value="Full-Stack Web Development">Full-Stack Web Development ($2,500/proj)</option>
                  <option value="Mobile App Development">Mobile App Development ($799/proj)</option>
                  <option value="Hostinger Web Hosting Setup">Hostinger Web Hosting Setup (Code: DPDCABINCEHM)</option>
                  <option value="Graphic Design & Branding">Graphic Design &amp; Branding ($250/pack)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Project Details &amp; Requirements:</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your tasks, hours needed, or automation goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <span>Submit Inquiry</span>
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
