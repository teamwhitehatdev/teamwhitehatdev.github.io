import React from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Cpu, Code, Users, Rocket, Sparkles, Terminal, Award, CheckCircle2, Globe, Flame, Zap, Compass, Layers, Bot, Atom, Brain, Eye, Activity } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-8 font-mono max-w-7xl mx-auto pb-12">
      
      {/* HERO BANNER & PLATFORM OVERVIEW */}
      <div className="bg-gradient-to-r from-gray-950 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Shield className="w-96 h-96 text-cyan-400" />
        </div>

        <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
          <span>ALL-IN-ONE DIGITAL ECOSYSTEM & PROFESSIONAL PLATFORM</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          TEAM WHITEHAT DEV — <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">
            LEARN. CREATE. DEVELOP. ASSIST. GROW.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 font-sans leading-relaxed max-w-4xl">
          <strong className="text-white">Team WhiteHat Dev</strong> is an all-in-one digital platform for <strong className="text-cyan-300">Virtual Assistants, developers, freelancers, creators, entrepreneurs, and businesses</strong>.
        </p>

        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed max-w-4xl">
          Learn how to become a successful Virtual Assistant, discover valuable digital tools and resources, explore software and web development, build mobile applications, improve your digital skills, and discover opportunities in graphic design, music production, 3D modeling, affiliate marketing, freelancing, and more.
        </p>

        <div className="p-4 bg-black/60 border border-lime-400/40 rounded-2xl text-xs sm:text-sm text-lime-300 font-mono font-bold">
          Your all-in-one hub for Virtual Assistance, Technology, Development, Creativity, and Digital Opportunities.
        </div>
      </div>

      {/* CORE VISION FOR FUTURISTIC SOFTWARE & TAGLINE */}
      <HUDPanel title="🔮 OUR VISION FOR FUTURISTIC SOFTWARE">
        <div className="p-6 sm:p-8 space-y-6 font-sans text-sm">
          
          <div className="p-6 bg-gradient-to-r from-purple-950/80 via-black to-cyan-950/80 border-2 border-purple-500/50 rounded-2xl space-y-3 shadow-xl">
            <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest block">
              FLAGSHIP PHILOSOPHY & FEATURED TAGLINE:
            </span>
            <blockquote className="text-lg sm:text-2xl font-black font-rajdhani text-white italic leading-snug">
              "We don't just build software for today. We explore what software can become tomorrow."
            </blockquote>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              At <strong className="text-white">Team WhiteHat Dev</strong>, we believe software should not simply perform tasks — it should help people work <strong className="text-cyan-300">smarter, faster, and more efficiently</strong>.
            </p>
            <p>
              Our vision is to develop and showcase <strong className="text-lime-300">futuristic, next-generation software</strong> inspired by emerging technologies such as <strong className="text-white">Artificial Intelligence, automation, advanced computing, quantum computing research, intelligent data processing, and spatial user interfaces</strong>.
            </p>
          </div>

          {/* 10 CORE CHARACTERISTICS OF FUTURISTIC SOFTWARE */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold font-mono text-cyan-400 uppercase tracking-wider">
              What We Mean by "Futuristic Software"
            </h3>
            <p className="text-xs text-gray-400">
              Futuristic software refers to next-generation applications designed around intelligent automation, AI-assisted workflows, advanced data processing, emerging computing technologies, and modern spatial interfaces:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              {[
                { icon: Bot, label: 'Automate repetitive workflows' },
                { icon: Brain, label: 'Use Artificial Intelligence to assist users' },
                { icon: Sparkles, label: 'Predict patterns and help anticipate user needs' },
                { icon: Zap, label: 'Process & organize large amounts of info efficiently' },
                { icon: Globe, label: 'Connect different digital systems and services' },
                { icon: Eye, label: 'Provide modern and immersive user interfaces' },
                { icon: Layers, label: 'Explore spatial and interactive computing experiences' },
                { icon: Atom, label: 'Experiment with emerging quantum-computing frameworks' },
                { icon: Activity, label: 'Transform complex information into useful insights' },
                { icon: Rocket, label: 'Create faster, smarter, and intuitive digital experiences' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-black/80 border border-gray-800 p-3 rounded-xl hover:border-cyan-500/40 transition-all">
                  <item.icon className="w-4 h-4 text-lime-400 flex-shrink-0" />
                  <span className="text-gray-200 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-cyan-950/40 border border-cyan-500/30 rounded-xl space-y-2 text-xs font-mono text-cyan-200">
            <strong className="text-white block uppercase">Technology Without Limits:</strong>
            Artificial Intelligence • Software Development • Web Development • Mobile Applications • Automation • Advanced Computing • Spatial Interfaces • Digital Creativity • Data Processing • Emerging Technologies
          </div>

        </div>
      </HUDPanel>

      {/* GATEWAY TO BECOMING A SUCCESSFUL VA & PROFESSIONAL VA SERVICES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* VA CAREER GATEWAY */}
        <HUDPanel title="🎓 GATEWAY TO BECOMING A SUCCESSFUL VA">
          <div className="p-6 space-y-4 font-sans text-xs text-gray-300 leading-relaxed">
            <p>
              Team WhiteHat Dev provides useful information, practical guides, tips, resources, and career advice for people who want to become successful <strong className="text-white">Virtual Assistants</strong>.
            </p>

            <div className="space-y-2 font-mono text-xs">
              {[
                'How to become a Virtual Assistant',
                'Essential Virtual Assistant skills',
                'Recommended tools and software',
                'Productivity and time-management techniques',
                'Working with clients & client communication',
                'Building a professional portfolio',
                'Finding online remote opportunities',
                'Freelancing and remote work strategies',
                'Creating high-converting professional profiles',
                'Growing a sustainable Virtual Assistant career'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-gray-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>

        {/* PROFESSIONAL VA SERVICES */}
        <HUDPanel title="💼 PROFESSIONAL VA SERVICES FOR CLIENTS">
          <div className="p-6 space-y-4 font-sans text-xs text-gray-300 leading-relaxed">
            <p>
              Team WhiteHat Dev also serves as a platform where businesses, entrepreneurs, organizations, and individuals can discover and <strong className="text-white">hire professional Virtual Assistants</strong>.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {[
                { title: 'Administrative Assistance', desc: 'Email triage, calendar scheduling, meeting minutes.' },
                { title: 'Research & Data Entry', desc: 'Market research, CRM updates, lead generation.' },
                { title: 'Content & Social Media Support', desc: 'Social media planning, graphic design, copywriting.' },
                { title: 'E-commerce & Customer Support', desc: 'Store management, ticket support, order processing.' }
              ].map((svc, idx) => (
                <div key={idx} className="bg-black/80 border border-gray-800 p-3 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-cyan-300 uppercase">{svc.title}</h4>
                  <p className="text-[11px] text-gray-400 font-sans">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </HUDPanel>

      </div>

      {/* WEB, SOFTWARE & APPLICATION DEVELOPMENT */}
      <HUDPanel title="💻 WEB, SOFTWARE & APPLICATION DEVELOPMENT">
        <div className="p-6 sm:p-8 space-y-6 font-sans text-xs text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-200">
            Beyond Virtual Assistance, Team WhiteHat Dev provides custom software, website, and mobile application engineering services to transform ideas into functional digital products:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 font-mono text-xs">
            {[
              'Business Websites',
              'Personal Portfolios',
              'Web Applications',
              'Mobile Apps (Android & iOS)',
              'Custom Software',
              'Management Systems',
              'Online Platforms',
              'E-commerce Solutions',
              'Custom Digital Tools',
              'User-Friendly Apps',
              'Cybersecurity Tools',
              'API Integrations'
            ].map((item, idx) => (
              <div key={idx} className="bg-black/90 border border-cyan-500/30 p-3 rounded-xl text-center text-cyan-300 font-bold hover:border-lime-400 transition-all">
                {item}
              </div>
            ))}
          </div>
        </div>
      </HUDPanel>

      {/* TARGET AUDIENCES: MORE THAN JUST A WEBSITE */}
      <HUDPanel title="🌐 MORE THAN JUST A WEBSITE — FOR DIGITAL CREATORS & PROFESSIONALS">
        <div className="p-6 sm:p-8 space-y-6 font-sans text-xs text-gray-300 leading-relaxed">
          <p className="text-sm text-white">
            Team WhiteHat Dev is envisioned as a digital hub where people can learn, discover opportunities, hire professionals, develop ideas, and build their careers. Designed specifically for:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 font-mono text-xs">
            {[
              'Aspiring VAs',
              'Experienced VAs',
              'Freelancers',
              'Business Owners',
              'Entrepreneurs',
              'Developers',
              'Graphic Designers',
              'Musicians & Producers',
              '3D Artists',
              'Digital Creators',
              'Clients Seeking VAs',
              'Software Buyers'
            ].map((audience, idx) => (
              <div key={idx} className="bg-gradient-to-r from-gray-900 to-black border border-purple-500/40 p-3 rounded-xl text-center text-purple-300 font-bold">
                ✓ {audience}
              </div>
            ))}
          </div>

          <div className="p-4 bg-gradient-to-r from-lime-950/60 via-black to-cyan-950/60 border border-lime-400/40 rounded-2xl text-center space-y-2">
            <h4 className="text-base font-black font-rajdhani text-white uppercase">
              OUR VISION FOR AN ALL-IN-ONE DIGITAL ECOSYSTEM
            </h4>
            <p className="text-xs text-gray-200">
              We help people turn their <strong className="text-lime-300">skills into careers, ideas into digital products, and businesses into stronger digital platforms.</strong>
            </p>
          </div>
        </div>
      </HUDPanel>

    </div>
  );
};
export default About;
