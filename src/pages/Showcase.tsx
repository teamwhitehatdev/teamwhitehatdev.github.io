import React, { useState } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { ExternalLink, Terminal, Shield, Sparkles, Laptop, Smartphone, Code, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Showcase: React.FC = () => {
  const { projects } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Computer Applications', 'Web App', 'Mobile App'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-8 font-mono max-w-7xl mx-auto pb-10">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Laptop className="w-4 h-4 text-lime-400 animate-pulse" />
          <span>FEATURED SOFTWARE & COMPUTER APPLICATIONS SHOWCASE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wide">
          OUR SHOWCASE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">SOFTWARE PRODUCTS</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-3xl leading-relaxed">
          Explore our portfolio of computer applications, cybersecurity diagnostic tools, full-stack web applications, and published Google Play Store mobile apps.
        </p>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl uppercase font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-400 to-lime-400 text-black shadow-lg'
                  : 'bg-black/60 border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <HUDPanel title={`🚀 FEATURED PROJECTS (${filteredProjects.length})`}>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => {
              const isGumroadProject = proj.liveUrl.includes('gumroad.com');
              return (
                <div key={proj.id} className="bg-black/90 border-2 border-gray-800 hover:border-cyan-500/60 p-5 rounded-2xl space-y-4 shadow-xl transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    <div className="rounded-xl overflow-hidden border border-gray-700 relative">
                      <img src={proj.image} alt={proj.title} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300" />
                      
                      <span className="absolute top-3 right-3 bg-black/80 text-lime-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-lime-500/40 font-mono uppercase">
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-black font-rajdhani text-white uppercase tracking-wider">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
                      {proj.tags.map((tag, idx) => (
                        <span key={idx} className="bg-cyan-500/10 text-cyan-300 text-[10px] px-2 py-0.5 rounded border border-cyan-500/30">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 ${
                        isGumroadProject
                          ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white'
                          : 'bg-gradient-to-r from-cyan-400 to-lime-400 text-black'
                      } font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2`}
                    >
                      {isGumroadProject ? (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>GET ON GUMROAD SOFTWARE STORE &rarr;</span>
                        </>
                      ) : (
                        <>
                          <span>VIEW LIVE PROJECT DEMO &rarr;</span>
                          <ExternalLink className="w-4 h-4" />
                        </>
                      )}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </HUDPanel>

    </div>
  );
};
export default Showcase;
