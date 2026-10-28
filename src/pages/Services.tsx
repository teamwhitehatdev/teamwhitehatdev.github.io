import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  ArrowRight,
  Send,
  User,
  Mail,
  Calendar,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { SERVICES } from '../utils/initialData';
import { validateEmailAndAntiBot, recordSuccessfulSubmission } from '../utils/emailValidator';
import { sanitizeUserInput } from '../components/SecurityEngine';

interface ServicesProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const { getPublicPageCMSItems, services: contextServices, addInquiry, addHireVaInquiry } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [service, setService] = useState('Starter Virtual Assistant Trial Pack ($5/hr or $49/wk)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FETCH SERVICES CONTENT MANAGED VIA CMS (pageOwner === 'services')
  const cmsServices = getPublicPageCMSItems('services').filter(
    (item) => item.contentType === 'Service' || item.price
  );

  const formattedCMSServices = cmsServices.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category || 'Virtual Assistance',
    price: item.price || '$5 / hr ($49 / week)',
    description: item.description,
    features: item.metrics
      ? item.metrics.split(',').map((s) => s.trim())
      : [
          'Dedicated Pre-Vetted Specialist',
          'Zero Platform Markup Fees',
          'Daily Progress Reports',
          'Cancel or Pause Anytime'
        ]
  }));

  // Combine CMS services with context services (deduplicated by title)
  const baseServices = contextServices && contextServices.length > 0 ? contextServices : SERVICES;
  const combined = [...formattedCMSServices, ...baseServices];
  const seenTitles = new Set<string>();
  const allServices = combined.filter((s) => {
    const norm = s.title.trim().toLowerCase();
    if (seenTitles.has(norm)) return false;
    seenTitles.add(norm);
    return true;
  });

  const handleSubmitInquiry = (e: React.FormEvent) => {
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
          sourcePage: '#/services'
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
      }, 3000);
    }
  };

  const handleBook = (title: string, price?: string) => {
    const label = price ? `${title} (${price})` : title;
    setService(label);
    if (onOpenConsultation) {
      onOpenConsultation(label);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12 bg-white text-slate-900">
      {/* PAGE HEADLINE (PRIVATE DIRECT-LINK OFFER PAGE — PURE WHITE THEME) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xs">
        <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full text-xs text-slate-800 font-bold uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5 text-slate-700" />
          <span>Direct-Link Exclusive Rates • Up to 70% Lower Than Traditional Agencies</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Ultra-Affordable Virtual Assistant, AI Automation &amp; Web Packages
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Start small with zero risk. Hire a dedicated Virtual Assistant from just <strong className="text-slate-900">$5/hr ($49/week Starter Pack)</strong>, automate repetitive workflows for <strong className="text-slate-900">$39</strong>, or launch a complete modern website for <strong className="text-slate-900">$99</strong>.
        </p>

        {/* QUICK VALUE HIGHLIGHTS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-4xl mx-auto text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-lg font-extrabold text-slate-900">$5 / hr</div>
            <div className="text-slate-500 font-medium">Starter VA Rate</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-lg font-extrabold text-slate-900">$39</div>
            <div className="text-slate-500 font-medium">AI Workflow Setup</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-lg font-extrabold text-slate-900">$99</div>
            <div className="text-slate-500 font-medium">Complete Website</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-lg font-extrabold text-slate-900">0% Markup</div>
            <div className="text-slate-500 font-medium">Cancel Anytime</div>
          </div>
        </div>
      </div>

      {/* SERVICES GRID WITH DIRECT BOOKING BUTTONS */}
      <HUDPanel title="Affordable Service Packages &amp; Starter Bundles" badge="Direct Link Pricing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all shadow-2xs"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-white bg-slate-900 px-3 py-1 rounded-full">
                    {s.price}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {s.category === 'va' ? 'VIRTUAL ASSISTANCE' : s.category === 'dev' ? 'ENGINEERING & AI' : s.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                    {s.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    What's Included:
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {(s.features || []).map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBook(s.title, s.price)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
              >
                <span>Claim This Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </HUDPanel>

      {/* DIRECT INLINE CLIENT INQUIRY FORM (PURE WHITE THEME) */}
      <HUDPanel title="Direct Booking &amp; Custom Task Inquiry Form" badge="Instant CMS Log">
        <div className="p-2 sm:p-4 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Booking Request Saved to Admin CMS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="text-slate-900 font-bold">{name}</span>! Your service request has been logged in our All-in-One CMS. We will reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
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
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                  <span>Zero Obligation • Lock In Starter Pricing</span>
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 pt-1">
                  Tell Us What Tasks or Project You Need Done
                </h3>
                <p className="text-xs text-slate-600">
                  Fill out the form below. All inquiries are encrypted and stored directly inside our Admin CMS.
                </p>
              </div>

              {validationError && (
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-slate-900" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Your Full Name:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Miller"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setValidationError('');
                    }}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Your Email Address:</span>
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
                  <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
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
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Select Affordable Service Package:</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                >
                  {allServices.map((s) => (
                    <option key={s.id} value={`${s.title} (${s.price})`}>
                      {s.title} — {s.price}
                    </option>
                  ))}
                  <option value="Cloud Hosting & Domain Setup ($19)">
                    Cloud Hosting &amp; Domain Setup — $19 one-time
                  </option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold block pb-1.5 flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Task Details, Hours Needed, or Project Goals:</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your tasks, hours per week, or automation goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>Submit Booking Inquiry</span>
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
