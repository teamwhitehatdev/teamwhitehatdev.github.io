import React, { useState } from 'react';
import { ExternalLink,  Filter, Code, ArrowRight } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { PROJECTS, Project } from '../utils/initialData';

export const Showcase: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-black font-rajdhani uppercase text-white tracking-wider">
          PROJECTS & ARCHITECTURAL CASE STUDIES
        </h1>
        <p className="text-sm text-gray-400 font-mono max-w-2xl mx-auto">
          Explore real-world enterprise applications, mobile ecosystems, cybersecurity tools, and high-frequency automation software built by Senior Architect Team White Hat.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
        {[
          { key: 'all', label: 'ALL PROJECTS' },
          { key: 'web', label: 'WEB APPLICATIONS' },
          { key: 'mobile', label: 'MOBILE APPS' },
          { key: 'security', label: 'CYBERSECURITY' },
          { key: 'automation', label: 'AUTOMATION & AI' }
        ].map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === btn.key
                ? 'bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-black/60 border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <HUDPanel title={`PROJECT PORTFOLIO MATRIX (${filtered.length})`}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-lime-400 border border-lime-500/30">
                    {p.metrics}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white font-rajdhani">{p.title}</h3>
                  <p className="text-xs text-gray-400 font-mono leading-relaxed line-clamp-3">{p.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {p.techStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(p)}
                  className="w-full py-2 bg-gray-900 border border-gray-800 hover:border-cyan-500 text-cyan-400 text-xs font-mono rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>INSPECT ARCHITECTURE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </HUDPanel>

      {/* Project Lightbox Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-gray-900 border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1">
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ {selectedProject.category} ]</span>
              <h2 className="text-2xl font-bold font-rajdhani text-white uppercase">{selectedProject.title}</h2>
            </div>

            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover rounded-xl border border-gray-800" />

            <div className="space-y-4 font-mono text-xs text-gray-300">
              <p className="leading-relaxed">{selectedProject.description}</p>
              
              <div className="p-3 bg-black/60 border border-lime-500/30 rounded-lg text-lime-400">
                PERFORMANCE METRICS: <span className="font-bold text-white">{selectedProject.metrics}</span>
              </div>

              <div>
                <h4 className="text-white font-bold mb-2">TECHNOLOGY STACK USED:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-950 border border-gray-800 rounded text-cyan-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showcase;
