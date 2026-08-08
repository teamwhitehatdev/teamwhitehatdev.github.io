import React from 'react';
import { Code, Smartphone, Shield, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { SERVICES } from '../utils/initialData';

export const Services: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black font-rajdhani uppercase text-white tracking-wider">
          SERVICES & TECHNICAL STACK MATRIX
        </h1>
        <p className="text-sm text-gray-400 font-mono max-w-2xl mx-auto">
          High-performance full-stack web applications, native & cross-platform mobile apps, cybersecurity audits, and high-frequency automation.
        </p>
      </div>

      {/* Services Grid */}
      <HUDPanel title="ENGINEERING SERVICES">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map(s => (
            <div key={s.id} className="bg-black/50 p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-all space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-rajdhani">{s.title}</h3>
                  <span className="text-xs text-lime-400 font-mono">{s.category}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-mono leading-relaxed">{s.description}</p>

              <div className="space-y-2 pt-2 border-t border-gray-800">
                <h4 className="text-xs font-bold text-gray-300 font-mono">KEY ARCHITECTURAL FEATURES:</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-400">
                  {s.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-1 text-cyan-400">
                      <CheckCircle2 className="w-3 h-3 text-lime-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </HUDPanel>

      {/* Tech Stack Icons Grid */}
      <HUDPanel title="TECHNOLOGY STACK HARDWARE & SOFTWARE MATRIX">
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 font-mono text-center text-xs">
          {['React 19', 'Next.js 15', 'TypeScript', 'TailwindCSS', 'Node.js', 'Python', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'].map((tech, idx) => (
            <div key={idx} className="p-4 bg-black/60 border border-gray-800 rounded-xl hover:border-lime-400/50 transition-all space-y-2">
              <Code className="w-6 h-6 text-lime-400 mx-auto" />
              <span className="block text-white font-bold">{tech}</span>
            </div>
          ))}
        </div>
      </HUDPanel>
    </div>
  );
};

export default Services;
