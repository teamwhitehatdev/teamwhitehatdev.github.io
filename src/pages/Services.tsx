import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Tag,
  ExternalLink,
  Lock,
  KeyRound,
  Crown
} from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { BuilderPageRenderer } from '../components/BuilderPageRenderer';
import { SERVICES } from '../utils/initialData';
import { validateEmailAndAntiBot, recordSuccessfulSubmission } from '../utils/emailValidator';
import { sanitizeUserInput } from '../components/SecurityEngine';
import {
  registerPurchasedServiceBuyer,
  buildBuyerEmailDispatchUrl,
  VerifiedServiceBuyer
} from '../utils/exclusiveSkillsAuth';

interface ServicesProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultation }) => {
  const {
    getPublicPageCMSItems,
    services: contextServices,
    addInquiry,
    addHireVaInquiry,
    navTabs,
    updateNavTab,
    servicesHeadlineConfig,
    servicesPromoAd
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [service, setService] = useState('Executive VA & Advanced Skill Mastery Starter Pack ($5 / hr ($49 / week))');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [registeredBuyer, setRegisteredBuyer] = useState<VerifiedServiceBuyer | null>(null);

  const servicesTab = (navTabs || []).find(
    (t) => t.id === 'nav_services' || t.slug === 'services'
  );

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
    image: !item.hideImage ? item.mainImage : '',
    videoUrl: !item.hideVideo ? item.videoUrl : '',
    hideImage: item.hideImage,
    hideVideo: item.hideVideo,
    visible: item.visible !== false,
    highlighted: Boolean(item.homeFeatured || item.featured),
    badge: item.badge,
    features: item.metrics
      ? item.metrics.split(',').map((s) => s.trim())
      : [
          'Dedicated Pre-Vetted Specialist',
          'Zero Platform Markup Fees',
          'Daily Progress Reports',
          'Cancel or Pause Anytime'
        ]
  }));

  // Preserve user custom sequence from contextServices (Affordable Services Manager)
  const baseServices = (
    contextServices && contextServices.length > 0 ? contextServices : SERVICES
  ).filter((s) => s.visible !== false);

  const seenIds = new Set(baseServices.map((s) => s.id));
  const seenTitles = new Set(baseServices.map((s) => s.title.trim().toLowerCase()));
  const extraCmsServices = formattedCMSServices.filter(
    (s) => !seenIds.has(s.id) && !seenTitles.has(s.title.trim().toLowerCase())
  );
  const allServices = [...baseServices, ...extraCmsServices];

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

      const verifiedBuyer = registerPurchasedServiceBuyer(cleanName, cleanEmail, service);
      setRegisteredBuyer(verifiedBuyer);

      recordSuccessfulSubmission();
      setSubmitted(true);
    }
  };

  const handleBook = (title: string, price?: string) => {
    const label = price ? `${title} (${price})` : title;
    setService(label);
    if (onOpenConsultation) {
      onOpenConsultation(label);
    }
  };

  // Safe builder check AFTER all hooks to adhere strictly to React Rules of Hooks
  if (servicesTab?.pageLayoutType === 'builder' && servicesTab.builderBlocks && servicesTab.builderBlocks.length > 0) {
    return (
      <BuilderPageRenderer
        blocks={servicesTab.builderBlocks}
        settings={servicesTab.builderPageSettings}
        tab={servicesTab}
        onRevertDefault={() => {
          updateNavTab(servicesTab.id, { pageLayoutType: 'standard' });
        }}
      />
    );
  }

  // RENDER VERIFIED PARTNER • HOSTING PROMO AD BANNER
  const renderVerifiedPartnerAd = () => {
    if (!servicesPromoAd || servicesPromoAd.enabled === false) return null;
    const showImg = Boolean(servicesPromoAd.imageUrl && !servicesPromoAd.hideImage);

    return (
      <div className="partner-verified-card overflow-hidden my-4 border border-slate-200/90 rounded-3xl bg-white shadow-xs">
        {/* Top Marketplace Bar */}
        <div className="bg-gradient-to-r from-purple-50/90 via-slate-50 to-indigo-50/70 border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-800 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-700 shrink-0" />
            <span className="truncate">Verified Partner • {servicesPromoAd.partnerCategory || 'HOSTING PROMO'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>Verified Partner</span>
            </span>
            {servicesPromoAd.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-900 text-white shadow-2xs">
                {servicesPromoAd.badge}
              </span>
            )}
          </div>
        </div>

        {/* Ad Main Body */}
        <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {showImg && (
            <div className="md:col-span-4 h-48 md:h-full min-h-[170px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
              <img
                src={servicesPromoAd.imageUrl}
                alt={servicesPromoAd.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {servicesPromoAd.discountText && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-purple-700 text-white text-[11px] font-extrabold rounded-full shadow-md">
                  {servicesPromoAd.discountText}
                </span>
              )}
            </div>
          )}

          <div className={`${showImg ? 'md:col-span-8' : 'md:col-span-12'} space-y-3`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
                {servicesPromoAd.vendorName || 'Official Infrastructure Partner'}
              </span>
              <div className="flex items-center gap-2">
                {servicesPromoAd.priceBadge && (
                  <span className="text-base sm:text-lg font-black text-slate-950">
                    {servicesPromoAd.priceBadge}
                  </span>
                )}
                {servicesPromoAd.subPrice && (
                  <span className="text-xs text-slate-500 font-semibold">
                    ({servicesPromoAd.subPrice})
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {servicesPromoAd.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {servicesPromoAd.description}
            </p>

            {servicesPromoAd.features && servicesPromoAd.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700 font-medium">
                {servicesPromoAd.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 italic">
                Official affiliate recommendation • Instant deployment guarantee
              </span>
              <a
                href={servicesPromoAd.destinationUrl || 'https://hostinger.ph?REFERRALCODE=1JOMAR46'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs inline-flex items-center justify-center space-x-2 cursor-pointer shrink-0"
              >
                <span>{servicesPromoAd.ctaButtonText || 'Claim Hosting Deal →'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const adPos = servicesPromoAd?.position || 'below-headline';

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12 bg-transparent text-slate-900">
      {/* PAGE HEADLINE (DYNAMICALLY MANAGED IN ADMIN CMS) */}
      <div className="white-glass-card rounded-3xl p-6 sm:p-10 text-center space-y-4">
        {servicesHeadlineConfig?.badgeText && (
          <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full text-xs text-slate-800 font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-slate-700" />
            <span>{servicesHeadlineConfig.badgeText}</span>
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {servicesHeadlineConfig?.title || 'Ultra-Affordable Virtual Assistant, AI Automation & Web Packages'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {servicesHeadlineConfig?.description ||
            'Start small with zero risk. Hire a dedicated Virtual Assistant from just $5/hr ($49/week Starter Pack), automate repetitive workflows for $39, or launch a complete modern website for $99.'}
        </p>

        {/* QUICK VALUE HIGHLIGHTS */}
        {servicesHeadlineConfig?.showQuickStats !== false &&
          servicesHeadlineConfig?.quickStats &&
          servicesHeadlineConfig.quickStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-4xl mx-auto text-xs">
              {servicesHeadlineConfig.quickStats.map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* VERIFIED PARTNER • HOSTING PROMO AD (BELOW HEADLINE POSITION) */}
      {(adPos === 'below-headline' || adPos === 'both') && renderVerifiedPartnerAd()}

      {/* SERVICES GRID WITH DIRECT BOOKING BUTTONS & OPTIONAL IMAGE/VIDEO */}
      <HUDPanel title="Affordable Service Packages &amp; Starter Bundles" badge="Direct Link Pricing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((s) => {
            const showImage = Boolean(s.image && !s.hideImage);
            const showVideo = Boolean(s.videoUrl && !s.hideVideo);
            const isHighlighted = Boolean(s.highlighted);

            return (
              <div
                key={s.id}
                className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all group ${
                  isHighlighted
                    ? 'bg-white border-2 border-slate-900 shadow-md ring-2 ring-slate-900/10 hover:shadow-lg hover:-translate-y-1'
                    : 'bg-white border border-slate-200 hover:border-slate-400 hover:-translate-y-1 shadow-2xs'
                }`}
              >
                <div>
                  {/* HIGHLIGHT RIBBON ON TOP */}
                  {isHighlighted && (
                    <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{s.badge || 'HIGHLIGHTED • MOST POPULAR'}</span>
                      </div>
                      <span className="text-[10px] text-slate-300 font-semibold lowercase">client choice</span>
                    </div>
                  )}

                  {showVideo && (
                    <div className="w-full bg-slate-50 border-b border-slate-100">
                      {s.videoUrl!.includes('youtube.com') || s.videoUrl!.includes('youtu.be') ? (
                        <iframe
                          src={
                            s.videoUrl!.includes('watch?v=')
                              ? s.videoUrl!.replace('watch?v=', 'embed/')
                              : s.videoUrl
                          }
                          title={s.title}
                          className="w-full aspect-video border-0"
                          allowFullScreen
                        />
                      ) : (
                        <video src={s.videoUrl} controls className="w-full h-44 object-cover" />
                      )}
                    </div>
                  )}

                  {showImage && (
                    <div className="h-40 w-full relative overflow-hidden bg-slate-50 border-b border-slate-100">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 text-xs font-extrabold text-white bg-slate-900 px-3 py-1 rounded-full shadow-xs">
                        {s.price}
                      </span>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    {!showImage && (
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-extrabold text-white bg-slate-900 px-3 py-1 rounded-full">
                          {s.price}
                        </span>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        {s.category === 'va'
                          ? 'VIRTUAL ASSISTANCE'
                          : s.category === 'dev'
                          ? 'ENGINEERING & AI'
                          : s.category}
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
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleBook(s.title, s.price)}
                    className={`w-full py-3 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      isHighlighted
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md ring-1 ring-slate-900 font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
                    }`}
                  >
                    <span>Claim This Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </HUDPanel>

      {/* VERIFIED PARTNER • HOSTING PROMO AD (ABOVE BOOKING FORM POSITION) */}
      {(adPos === 'above-booking' || adPos === 'both') && renderVerifiedPartnerAd()}

      {/* EXCLUSIVE BUYERS-ONLY ADVANCED SKILLS VAULT GATEWAY BANNER (/#/exclusive-skills) */}
      <div className="rounded-3xl border-2 border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                <span>Included With Every Purchased Service Package</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-[11px] font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Restricted: Email-Filtered Buyers Only</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Unlock the Private VA &amp; Freelancer Advanced Skills Vault (/#/exclusive-skills)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every client or student who purchases/claims a package below receives a verified{' '}
              <strong className="text-white">VIP Buyer Email &amp; Access Passkey</strong> to our restricted{' '}
              <strong className="text-amber-300">/#/exclusive-skills</strong> portal—featuring our{' '}
              <strong className="text-white">Real-Time VA &amp; Freelancer Profit &amp; ROI Simulator</strong> and{' '}
              <strong className="text-white">8 Full Advanced Curriculum Tracks</strong> with production scripts, JSON schemas, and real-data retainers. Non-buyers are strictly blocked by email filtering.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full lg:w-auto">
            <Link
              to="/exclusive-skills"
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Enter Exclusive Skills Vault →</span>
            </Link>
            <a
              href="#direct-booking-form"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Claim Package to Unlock Email Access</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="font-black text-amber-300">1. Real-Time ROI Simulator</div>
            <p className="text-[11px] text-slate-300">
              Interactive retainer, hourly rate, AI speed multiplier &amp; client labor-savings calculator.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="font-black text-emerald-300">2. 8 Advanced Master Tracks</div>
            <p className="text-[11px] text-slate-300">
              Executive Chief-of-Staff, Make/n8n AI Architect, B2B Lead Enrichment, E-Com &amp; Retainer Scaling.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="font-black text-cyan-300">3. Production JSON &amp; Scripts</div>
            <p className="text-[11px] text-slate-300">
              1-click copyable system prompts, outreach scripts, SLA contracts &amp; Notion database schemas.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="font-black text-rose-300">4. Strict Email Verification</div>
            <p className="text-[11px] text-slate-300">
              Protected by verified buyer email filtering + personal VIP Passkey &amp; direct email link delivery.
            </p>
          </div>
        </div>
      </div>

      {/* DIRECT INLINE CLIENT INQUIRY FORM (PURE WHITE THEME) */}
      <div id="direct-booking-form">
      <HUDPanel title="Direct Booking, Service Purchase &amp; VIP Vault Activation Form" badge="Priority Client Booking">
        <div className="p-2 sm:p-4 space-y-6">
          {submitted ? (
            <div className="p-6 sm:p-8 space-y-5 bg-slate-50 border-2 border-slate-900 rounded-3xl text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Booking Logged &amp; VIP Buyer Email Authorized</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Your Exclusive Advanced Skills Vault Access Is Ready!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                  Thank you, <span className="text-slate-900 font-bold">{registeredBuyer?.name || name}</span>! Your service package request (<span className="font-bold text-slate-900">{registeredBuyer?.purchasedService || registeredBuyer?.servicePackage || service}</span>) has been registered and your email is now whitelisted for <strong className="text-slate-900">/#/exclusive-skills</strong>.
                </p>
              </div>

              {registeredBuyer && (
                <div className="max-w-lg mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-indigo-700" />
                      <span>Your Verified Buyer Credentials</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      ACTIVE VIP ACCESS
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Verified Buyer Email</span>
                      <span className="font-mono font-bold text-slate-900 break-all">{registeredBuyer.email}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">VIP Access Passkey</span>
                      <span className="font-mono font-black text-indigo-900">{registeredBuyer.accessKey}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <Link
                      to={`/exclusive-skills?email=${encodeURIComponent(registeredBuyer.email)}&key=${encodeURIComponent(registeredBuyer.accessKey)}`}
                      className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span>Enter Exclusive Skills Vault Now →</span>
                    </Link>
                    <a
                      href={buildBuyerEmailDispatchUrl(registeredBuyer)}
                      className="py-3 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-200 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email My Access Link</span>
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setContactInfo('');
                    setMessage('');
                    setHoneypot('');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
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
                  Fill out the form below. All inquiries are encrypted and routed directly to our project engineering team.
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
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
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
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
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
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
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
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-slate-900"
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
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>Submit Booking &amp; Unlock Exclusive Skills Vault Access</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </HUDPanel>
      </div>
    </div>
  );
};
export default Services;
