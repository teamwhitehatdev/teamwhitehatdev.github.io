import React from 'react';
import { Shield, Smartphone, Sparkles, ExternalLink, Code, Box, Lock } from 'lucide-react';

const MESHY_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                Team WhiteHat Dev
              </span>
            </div>

            <p className="text-xs font-semibold text-blue-600 tracking-wide uppercase">
              Free Virtual Assistant Academy • AI Automations • Software &amp; Digital Innovation
            </p>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md pt-1">
              Empowering aspiring Virtual Assistants (VAs), freelancers, creators, and modern businesses with 100% free step-by-step tutorials, real AI automation workflow blueprints, and full-stack digital engineering.
            </p>

            {/* Featured Partner Referral Link */}
            <div className="pt-2">
              <a
                href={MESHY_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Box className="w-3.5 h-3.5 text-violet-600" />
                <span>AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Free Resources &amp; Pages</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#/" className="hover:text-blue-600 transition-colors">Home &amp; Free VA Academy</a></li>
              <li><a href="#/ai" className="hover:text-blue-600 transition-colors font-semibold text-slate-800">AI Capabilities &amp; Automation Diagrams</a></li>
              <li><a href="#/affiliate-guide" className="hover:text-blue-600 transition-colors font-semibold text-emerald-700">Free VA &amp; Freelancer Master Guide</a></li>
              <li><a href="#/services" className="hover:text-blue-600 transition-colors">VA Services &amp; Pricing</a></li>
              <li><a href="#/showcase" className="hover:text-blue-600 transition-colors">Portfolio &amp; Showcase</a></li>
              <li><a href="#/web-hosting" className="hover:text-blue-600 transition-colors">Web Hosting Deals</a></li>
              <li><a href="#/about" className="hover:text-blue-600 transition-colors">About Our Team</a></li>
              <li>
                <a href="#/admin" className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors pt-1">
                  <Lock className="w-3 h-3" />
                  <span>Admin CMS Dashboard</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Profile Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Developer Profile</span>
            </h4>

            <div className="space-y-1.5 text-xs">
              <p className="text-slate-600">
                Verified Google Play Store App Developer:
              </p>
              <a
                href="https://play.google.com/store/apps/dev?id=7374638355121114347"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline font-mono text-[11px] block break-all font-semibold"
              >
                ID: 7374638355121114347
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://play.google.com/store/apps/dev?id=7374638355121114347"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Official Google Play Developer Page</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500 leading-relaxed">
          <p className="max-w-5xl mx-auto">
            Team WhiteHat Dev (2016 – 2026) &nbsp;•&nbsp; Empowering aspiring Virtual Assistants, freelancers, and businesses with 100% free tutorials, AI automation guides, and modern web engineering.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
