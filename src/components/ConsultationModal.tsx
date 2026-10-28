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
import { sanitizeUserInput } from './SecurityEngine';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialServiceTitle = 'Starter Virtual Assistant Trial Pack ($5/hr or $49/wk)'
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

    const cleanName = sanitizeUserInput(name);
    const cleanEmail = email.trim();
    const cleanContact = sanitizeUserInput(contactInfo);
    const cleanMessage = sanitizeUserInput(message);

    if (cleanName && cleanEmail && cleanMessage) {
      addInquiry({
        name: cleanName,
        email: cleanEmail,
        service: service,
        message: cleanMessage
      });

      if (typeof addHireVaInquiry === 'function') {
        addHireVaInquiry({
          name: cleanName,
          email: cleanEmail,
          contactInfo: cleanContact || undefined,
          serviceRequested: service,
          message: cleanMessage,
          sourcePage: window.location.hash || '#/services'
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-xl relative text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 bg-slate-100 p-1.5 rounded-full transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Inquiry Logged Securely</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <span className="text-slate-900 font-bold">{name}</span>! Your service request has been saved to our Admin CMS.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>Team Review in Progress — Response Within 24 Hours</span>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 text-xs text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                <span>Affordable VA &amp; Automation Booking</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Claim Your Affordable Service Package
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Lock in our starter rates — no hidden agency markups, zero long-term lock-in contracts.
              </p>
            </div>

            {validationError && (
              <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-slate-900" />
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
                  <User className="w-3.5 h-3.5 text-slate-700" />
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
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-700" />
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                    <span>WhatsApp / Telegram (Optional):</span>
                  </label>
                  <input
                    type="text"
                    placeholder="+1 / @username"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-700" />
                  <span>Select Affordable Package:</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                >
                  <option value="Starter Virtual Assistant Trial Pack ($5/hr or $49/wk)">Starter VA Trial Pack ($5/hr or $49/week)</option>
                  <option value="Part-Time Dedicated Executive VA ($199/mo)">Part-Time Dedicated Executive VA ($199/month)</option>
                  <option value="AI Automation Workflow Setup ($39/workflow)">AI Automation Workflow Setup ($39/workflow)</option>
                  <option value="Modern Portfolio or Business Website ($99/site)">Modern Portfolio or Business Website ($99/website)</option>
                  <option value="Short-Form Video & Canva Social Pack ($29/bundle)">Short-Form Video &amp; Canva Social Pack ($29/bundle)</option>
                  <option value="Cross-Platform Mobile App MVP ($149/app)">Cross-Platform Mobile App MVP ($149/build)</option>
                  <option value="Cloud Hosting & Domain Setup ($19)">Cloud Hosting &amp; Domain Setup ($19 one-time)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-700" />
                  <span>Task Details &amp; Goals:</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the tasks, hours, or automation workflow you want us to handle..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>Submit Booking Request</span>
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
