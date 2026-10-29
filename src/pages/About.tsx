import { useApp } from '../context/AppContext';
import React from 'react';
import { Terminal, Shield, Code } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const About: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsAboutItems = getPublicPageCMSItems('about');

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12 bg-transparent text-slate-900">
      {/* HEADER HERO (GLASSMORPHIC MINIMALIST WHITE) */}
      <div className="white-glass-card rounded-3xl p-6 sm:p-10 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4 text-slate-700" />
          <span>About Team WhiteHat Dev</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Who Is Team WhiteHat Dev?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to <strong className="text-slate-900">Team WhiteHat Dev</strong>. We are a
          digital engineering and free education collective focused on ethical cybersecurity,
          full-stack web applications, AI automation workflows, and empowering aspiring Virtual
          Assistants and freelancers worldwide.
        </p>
      </div>

      {/* PURPOSE & MISSION PANEL */}
      <HUDPanel title="Our Purpose &amp; Ethical Mission" badge="Mission">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="bg-slate-50/80 border border-slate-200 p-6 rounded-2xl space-y-3">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-slate-800" />
              <span>Free Education, Transparent Digital Tools &amp; WhiteHat Security Ethics</span>
            </h3>
            <p>
              At <strong className="text-slate-900">Team WhiteHat Dev</strong>, our core purpose is
              to bridge the gap between modern software engineering, AI automation, and practical
              remote career opportunities. All tutorials, workflow diagrams, and proposal templates
              on our public website are 100% free.
            </p>
            <p>
              Whether you are an aspiring Virtual Assistant learning how to land your first
              international client, a freelancer mastering AI automation workflows, or a founder
              exploring modern digital tools, our platform provides clear, authentic, and actionable
              blueprints.
            </p>
          </div>
        </div>
      </HUDPanel>

      {/* CMS-DRIVEN CORE PILLARS & ANNOUNCEMENTS (100% EDITABLE WITH IMAGE/VIDEO IN CMS) */}
      <HUDPanel title="Our Core Pillars &amp; Profile Highlights" badge="CMS Managed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cmsAboutItems.map((item) => {
            const showImg = Boolean(item.mainImage && !item.hideImage);
            const showVid = Boolean(item.videoUrl && !item.hideVideo);

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-slate-400 hover:-translate-y-0.5 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-2xs"
              >
                <div>
                  {showVid && (
                    <div className="w-full bg-slate-50 border-b border-slate-100">
                      {item.videoUrl!.includes('youtube.com') ||
                      item.videoUrl!.includes('youtu.be') ? (
                        <iframe
                          src={
                            item.videoUrl!.includes('watch?v=')
                              ? item.videoUrl!.replace('watch?v=', 'embed/')
                              : item.videoUrl
                          }
                          title={item.title}
                          className="w-full aspect-video border-0"
                          allowFullScreen
                        />
                      ) : (
                        <video src={item.videoUrl} controls className="w-full h-44 object-cover" />
                      )}
                    </div>
                  )}

                  {showImg && (
                    <div className="h-40 w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                      <img
                        src={item.mainImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {item.category || 'CORE PILLAR'}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
                        <Code className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </HUDPanel>

      {/* BRAND MOTTO & VISION (GLASSMORPHIC MINIMALIST WHITE) */}
      <div className="white-glass-card p-6 sm:p-8 rounded-3xl text-center space-y-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
          Our Guiding Vision
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "Learn. Create. Automate. Assist. Grow."
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Empowering aspiring Virtual Assistants, freelancers, and creators with free knowledge and
          practical automation workflows.
        </p>
      </div>
    </div>
  );
};
export default About;
