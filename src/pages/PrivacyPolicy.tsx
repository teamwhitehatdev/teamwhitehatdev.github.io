import React from 'react';
import { Shield, Lock, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto text-slate-900">
      {/* HEADER */}
      <div className="white-glass-card rounded-3xl p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-slate-900" />
          <span>Google AdSense, GDPR, CCPA &amp; FTC Publisher Compliance</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy, Terms of Use &amp; Advertising Disclosure
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Last Updated: October 2026 &nbsp;•&nbsp; Publisher: <strong>Team WhiteHat Dev</strong> (Official Educational Academy, AI Workflow Documentation &amp; Software Engineering Portfolio).
        </p>
      </div>

      {/* SECTION 1: GOOGLE ADSENSE & DOUBLECLICK DART COOKIE DISCLOSURE */}
      <HUDPanel
        title="1. Google AdSense & Third-Party Advertising Cookies"
        badge="AdSense Compliant"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            This website uses <strong>Google AdSense</strong> and verified third-party advertising partners to display advertisements when you visit our educational tutorials, guides, and tools.
          </p>
          <ul className="space-y-2.5 pl-4 list-disc">
            <li>
              <strong>Third-Party Vendors &amp; Google:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
            </li>
            <li>
              <strong>Google Advertising Cookies (DoubleClick DART):</strong> Google&apos;s use of advertising cookies enables it and its partners to serve personalized and non-personalized advertisements to our visitors based on their visit to our site and/or other sites on the Internet.
            </li>
            <li>
              <strong>How to Opt Out of Personalized Advertising:</strong> Users may opt out of personalized advertising at any time by visiting{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 font-bold underline inline-flex items-center gap-1"
              >
                <span>Google Ads Settings</span>
                <ExternalLink className="w-3 h-3" />
              </a>{' '}
              or by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 font-bold underline inline-flex items-center gap-1"
              >
                <span>www.aboutads.info</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              .
            </li>
          </ul>
        </div>
      </HUDPanel>

      {/* SECTION 2: FTC AFFILIATE & SPONSORED PARTNER DISCLOSURE */}
      <HUDPanel
        title="2. FTC Affiliate & Sponsored Partner Disclosure"
        badge="FTC Transparency"
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            In compliance with the Federal Trade Commission (FTC) guidelines, please note that some links on this website (including software tools, AI generators, and cloud web hosting links such as Hostinger, Meshy 3D AI, ElevenLabs, and Suno AI) are partner or referral links.
          </p>
          <p>
            If you click on a partner link and register or make a purchase, <strong>Team WhiteHat Dev</strong> may earn a small referral commission at <strong>zero additional cost to you</strong>. These commissions fund our 100% free Virtual Assistant Academy tutorials, open workflow diagrams, and student guides.
          </p>
        </div>
      </HUDPanel>

      {/* SECTION 3: DATA COLLECTION, GDPR & CCPA RIGHTS */}
      <HUDPanel
        title="3. Data Collection, GDPR & CCPA User Privacy Rights"
        badge="User Privacy"
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            We respect your privacy and collect only minimal information necessary to operate our educational platform and respond to voluntary inquiries:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-900" />
                <span>Voluntary Contact Submissions</span>
              </h3>
              <p className="text-xs text-slate-600">
                When you submit an inquiry via our consultation or booking form, your name, email address, and project message are used solely to reply to your request. We never sell or rent user email addresses.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-900" />
                <span>Cookies &amp; Local Storage</span>
              </h3>
              <p className="text-xs text-slate-600">
                Browser local storage and cookies are used to remember your cookie consent preferences, theme settings, and aggregate page performance metrics. You can clear cookies at any time in your browser settings.
              </p>
            </div>
          </div>
        </div>
      </HUDPanel>

      {/* SECTION 4: TERMS OF USE & EDUCATIONAL DISCLAIMER */}
      <HUDPanel
        title="4. Terms of Use & Educational Disclaimer"
        badge="Terms & Conditions"
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
            <span>
              All tutorials, Virtual Assistant career roadmaps, AI workflow blueprints, and software engineering case studies published on <strong>Team WhiteHat Dev</strong> are provided for educational and informational purposes. Individual freelance earnings and client outcomes depend on personal skill, market demand, and execution.
            </span>
          </p>
          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            For any privacy, advertising, or publisher inquiries, please contact Team WhiteHat Dev via our official consultation form or Google Play Developer channels.
          </p>
        </div>
      </HUDPanel>
    </div>
  );
};

export default PrivacyPolicy;
