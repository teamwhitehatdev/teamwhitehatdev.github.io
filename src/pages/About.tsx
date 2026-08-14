import React from 'react';
import { Link } from 'react-router-dom';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Sparkles, Award, Globe, Server, Smartphone, Users, CheckCircle2, Rocket, ExternalLink, Terminal, Lock, Star } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

export const About: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10 select-none">
      
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-lime-400 animate-pulse" />
          <span>ESTABLISHED 2010 • GLOBAL DIGITAL AGENCY & VA ACCELERATOR</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">TEAM WHITEHAT DEV</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Team WhiteHat Dev is a premier global software engineering firm, digital marketing agency, and Virtual Assistant training accelerator. Founded with a vision to empower freelancers, Virtual Assistants, developers, and online business owners, we provide enterprise-grade web development, mobile app publishing, cybersecurity audit, and elite VA placement services.
        </p>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-rajdhani text-lime-400">500+</span>
            <span className="text-xs text-gray-400 uppercase block font-sans">CLIENT PROJECTS COMPLETED</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-rajdhani text-cyan-400">1,200+</span>
            <span className="text-xs text-gray-400 uppercase block font-sans">TRAINED VAs & FREELANCERS</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-rajdhani text-purple-400">99.99%</span>
            <span className="text-xs text-gray-400 uppercase block font-sans">SYSTEM UPTIME DEPLOYED</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-rajdhani text-amber-400">4.9/5.0</span>
            <span className="text-xs text-gray-400 uppercase block font-sans">VERIFIED CLIENT RATING</span>
          </div>
        </div>
      </div>

      {/* 10 CORE PILLARS OF TEAM WHITEHAT DEV */}
      <HUDPanel title="🏛️ THE 10 CORE PILLARS OF TEAM WHITEHAT DEV">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
            {[
              { num: '01', title: 'Elite Executive Virtual Assistance', desc: 'Training and deploying top 1% Virtual Assistants proficient in executive calendar scheduling, email triage, CRM data entry, and client communication.' },
              { num: '02', title: 'Full-Stack Software Architecture', desc: 'Custom responsive web applications engineered using React, TypeScript, Next.js, TailWind CSS, Node.js, and high-performance cloud infrastructure.' },
              { num: '03', title: 'Mobile App Engineering & Play Store', desc: 'Cross-platform Android & iOS mobile applications designed, compiled, and published directly to Google Play Store and Apple App Store.' },
              { num: '04', title: 'Hostinger Cloud Web Hosting Infrastructure', desc: 'Official recommendation of ultra-fast NVMe web hosting on Hostinger (Code: DPDCABINCEHM) for VAs and developers to build high-converting client sites.' },
              { num: '05', title: 'AES-256 Cybersecurity & IP Sentinel Firewall', desc: 'Proactive vulnerability assessments, data encryption, anti-bot captcha verification, and real-time IP banning sentinel firewalls.' },
              { num: '06', title: 'AI Automation & Voiceover Integration', desc: 'Empowering freelancers with cutting-edge AI voice generators like ElevenLabs to produce broadcast-quality podcast audio and video voiceovers.' },
              { num: '07', title: 'Gumroad Digital Product Marketplace', desc: 'Providing verified client proposal kits, contract templates, cold outreach scripts, and ebook guides for instant downloading.' },
              { num: '08', title: 'Transparent Pricing & Retainer Guarantee', desc: 'Upfront competitive hourly rates ($15/hr) and fixed-price project quotes ($499+) with 100% satisfaction guarantees.' },
              { num: '09', title: '24/7 Global Client Support & Assistance', desc: 'Round-the-clock dedicated customer assistance across US, UK, Canada, Australia, and European time zones.' },
              { num: '10', title: 'Continuous VA Mentorship & Career Accelerator', desc: 'Free masterclass guides, tutorials, rate calculators, and career mentorship helping aspiring VAs reach $3,000+/month income.' }
            ].map((pillar) => (
              <div key={pillar.num} className="bg-black/80 border border-gray-800 p-5 rounded-2xl space-y-2 hover:border-cyan-500/50 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold px-2.5 py-0.5 rounded border border-cyan-500/40">
                      PILLAR {pillar.num}
                    </span>
                    <h4 className="text-sm font-extrabold text-white font-rajdhani uppercase">{pillar.title}</h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HUDPanel>

      {/* CALL TO ACTION ROW */}
      <div className="bg-gradient-to-r from-lime-950/80 via-black to-cyan-950/80 border-2 border-lime-400/60 p-6 sm:p-8 rounded-3xl flex flex-wrap items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
            <Rocket className="w-4 h-4 text-lime-400" />
            <span>READY TO HIRE OR BECOME A TOP-EARNING VA?</span>
          </span>
          <h3 className="text-2xl font-black font-rajdhani text-white uppercase">
            JOIN OVER 1,200+ SUCCESSFUL FREELANCERS & VAs TODAY
          </h3>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Get started with our free masterclasses or hire an executive Virtual Assistant with our 20% discount package.
          </p>
        </div>

        <a
          href={HOSTINGER_LINK}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="px-8 py-4 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl hover:opacity-95 transition-all shadow-xl flex items-center space-x-2"
        >
          <span>GET HOSTINGER HOSTING (75% OFF)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
export default About;
