import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import { Code, Smartphone, Shield, Cpu, CheckCircle2, ArrowRight, Send, User, Mail, Calendar, MessageSquare, Sparkles, AlertTriangle } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { SERVICES } from '../utils/initialData';
import { validateEmailAndAntiBot, recordSuccessfulSubmission } from '../utils/emailValidator';

interface ServicesProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const { getPublicPageCMSItems, addInquiry, addHireVaInquiry } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Executive Virtual Assistance ($15/hr)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FETCH SERVICES CONTENT MANAGED VIA CMS (pageOwner === 'services')
  const cmsServices = getPublicPageCMSItems('services');

  const formattedCMSServices = cmsServices.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category || 'Service',
    price: item.price || '$1,500 / month',
    description: item.description,
    features: item.metrics ? item.metrics.split(',').map(s => s.trim()) : ['CMS Managed Service', 'Custom Solution', 'Full Support', '24/7 Dedicated Team']
  }));

  // COMBINE CMS SERVICES WITH FALLBACK DATA (CMS items display first in exact sortOrder)
  const allServices = [...formattedCMSServices, ...SERVICES];

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // EMAIL SYNTAX, DOMAIN, DISPOSABLE & ANTI-BOT VALIDATION
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
          serviceRequested: service,
          message: message.trim(),
          sourcePage: 'Services'
        });
      }

      recordSuccessfulSubmission();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
        setHoneypot('');
      }, 3000);
    }
  };

  const handleBook = (title: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(title);
    }
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-6 font-mono">

      {/* PAGE HEADLINE */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-xs text-cyan-300">
          <Code className="w-4 h-4 text-lime-400" />
          <span>WHITE HAT DEV SERVICES &amp; TECHNICAL MATRIX</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-rajdhani uppercase text-white tracking-wider">
          EXECUTIVE VIRTUAL ASSISTANCE &amp; SOFTWARE SOLUTIONS
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
          High-performance full-stack web applications, mobile apps, cybersecurity audits, executive Virtual Assistance, and dedicated technical solutions managed dynamically via CMS.
        </p>
      </div>

      {/* SERVICES GRID WITH DIRECT BOOKING BUTTONS */}
      <HUDPanel title="💻 AVAILABLE SERVICES &amp; VA SOLUTIONS">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {allServices.map((s) => (
            <div
              key={s.id}
              className="bg-black/80 border border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all hover:scale-[1.01] shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-rajdhani uppercase">{s.title}</h3>
                      <span className="text-xs text-lime-400 font-mono font-bold uppercase">{s.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/40">
                    {s.price}
                  </span>
                </div>

                <p className="text-xs text-gray-300 font-sans leading-relaxed">{s.description}</p>

                <div className="space-y-2 pt-2 border-t border-gray-800/80">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">KEY FEATURES:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                    {s.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-1 text-cyan-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBook(s.title)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-lime-400 to-purple-400 text-black font-extrabold font-orbitron text-xs rounded-xl uppercase hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>HIRE VA &amp; BOOK SERVICE &rarr;</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </HUDPanel>

      {/* DIRECT INLINE CLIENT INQUIRY FORM */}
      <HUDPanel title="📩 DIRECT CLIENT INQUIRY &amp; HIRE VA FORM">
        <div className="p-6 sm:p-8 space-y-6">

          {submitted ? (
            <div className="text-center py-8 space-y-4 font-sans animate-fadeIn bg-lime-950/30 border border-lime-500/40 rounded-2xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-lime-500/20 border border-lime-500/50 flex items-center justify-center text-lime-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-black font-rajdhani text-white uppercase">
                INQUIRY LOGGED TO BACK-END CMS!
              </h3>
              <p className="text-xs text-gray-200">
                Thank you, <span className="text-lime-400 font-bold">{name}</span>! Your client inquiry has been logged securely into our CMS system.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs font-sans">
              
              {/* HIDDEN HONEYPOT FIELD */}
              <input
                type="text"
                name="website_hp_check"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <div className="space-y-1">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                  <span>CLIENT CONSULTATION &amp; HIRE VA</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-rajdhani text-white uppercase">
                  SUBMIT CLIENT INQUIRY TO BACK-END CMS
                </h3>
                <p className="text-xs text-gray-300">
                  Fill out the form below. All submitted inquiries are instantly stored in our secure system for response.
                </p>
              </div>

              {/* INLINE VALIDATION ERROR NOTICE */}
              {validationError && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/60 rounded-xl text-rose-300 text-xs flex items-center space-x-2 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-cyan-400 font-mono font-bold block pb-1 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5" />
                    <span>YOUR FULL NAME:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Miller"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setValidationError(''); }}
                    required
                    className="w-full px-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-cyan-400 font-mono font-bold block pb-1 flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>YOUR EMAIL ADDRESS:</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com (e.g. Gmail, Outlook, Business)"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setValidationError(''); }}
                    required
                    className="w-full px-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
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
                  <option value="Executive Virtual Assistance ($15/hr)">Executive Virtual Assistance ($15/hr)</option>
                  <option value="Full-Stack Web Development ($499/proj)">Full-Stack Web Development ($499/proj)</option>
                  <option value="Mobile App Development ($799/proj)">Mobile App Development ($799/proj)</option>
                  <option value="Hostinger Web Hosting Setup">Hostinger Web Hosting Setup (Code: DPDCABINCEHM)</option>
                  <option value="Graphic Design & Branding ($250)">Graphic Design & Branding ($250)</option>
                </select>
              </div>

              <div>
                <label className="text-cyan-400 font-mono font-bold block pb-1 flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>INQUIRY MESSAGE &amp; REQUIREMENTS:</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your project details, required VA hours, or custom software specifications..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-black border border-cyan-500/40 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-400 text-black font-extrabold font-orbitron text-xs rounded-xl uppercase hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>SUBMIT INQUIRY TO CMS BACK-END</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </HUDPanel>

    </div>
  );
};
export default Services;
