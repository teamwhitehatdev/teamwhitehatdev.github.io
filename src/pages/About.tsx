import { useApp } from '../context/AppContext';
import React from 'react';
import { Terminal, Shield, Code, Users, Smartphone } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const About: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsAboutItems = getPublicPageCMSItems('about');

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12 bg-white text-slate-900">
      {/* HEADER HERO (MINIMALIST WHITE) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xs">
        <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4 text-slate-700" />
          <span>About Team WhiteHat Dev</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Who Is Team WhiteHat Dev?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to <strong className="text-slate-900">Team WhiteHat Dev</strong>. We are a digital engineering and free education collective focused on ethical cybersecurity, full-stack web applications, AI automation workflows, and empowering aspiring Virtual Assistants and freelancers worldwide.
        </p>
      </div>

      {/* DYNAMIC CMS ANNOUNCEMENTS */}
      {cmsAboutItems.length > 0 && (
        <HUDPanel title="Published Announcements &amp; Profile Updates" badge="CMS Live">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsAboutItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200 p-5 rounded-2xl space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
                  <span>{item.category?.toUpperCase() || 'PROFILE'}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </HUDPanel>
      )}

      {/* PURPOSE & MISSION PANEL */}
      <HUDPanel title="Our Purpose &amp; Ethical Mission" badge="Mission">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="bg-slate-50/70 border border-slate-200 p-6 rounded-2xl space-y-3">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-slate-800" />
              <span>Free Education, Transparent Digital Tools &amp; WhiteHat Security Ethics</span>
            </h3>
            <p>
              At <strong className="text-slate-900">Team WhiteHat Dev</strong>, our core purpose is to bridge the gap between modern software engineering, AI automation, and practical remote career opportunities. All tutorials, workflow diagrams, and proposal templates on our public website are 100% free.
            </p>
            <p>
              Whether you are an aspiring Virtual Assistant learning how to land your first international client, a freelancer mastering AI automation workflows, or a founder exploring modern digital tools, our platform provides clear, authentic, and actionable blueprints.
            </p>
          </div>
        </div>
      </HUDPanel>

      {/* 4 CORE PILLARS PANEL */}
      <HUDPanel title="Our 4 Core Pillars" badge="Capabilities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2.5 hover:border-slate-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                1. Full-Stack Web Engineering
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We architect fast, responsive minimalist web applications using React, TypeScript, Vite, and Tailwind CSS.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2.5 hover:border-slate-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                2. Mobile &amp; Desktop Utilities
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our engineering team builds cross-platform Android, iOS, and Python desktop diagnostic applications.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2.5 hover:border-slate-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                3. Cybersecurity &amp; Data Protection
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We implement strict credential hygiene, client-side XSS/SQLi sanitization, and IP firewall controls to keep digital assets safe.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2.5 hover:border-slate-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                4. Free VA &amp; AI Automation Academy
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We publish free step-by-step career guides, visual AI automation diagrams, and templates for Virtual Assistants and freelancers.
            </p>
          </div>
        </div>
      </HUDPanel>

      {/* BRAND MOTTO & VISION (MINIMALIST WHITE) */}
      <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-xs">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
          Our Guiding Vision
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "Learn. Create. Automate. Assist. Grow."
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Empowering aspiring Virtual Assistants, freelancers, and creators with free knowledge and practical automation workflows.
        </p>
      </div>
    </div>
  );
};
export default About;
