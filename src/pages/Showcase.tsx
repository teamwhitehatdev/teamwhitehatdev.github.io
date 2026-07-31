import React, { useState } from 'react';
import { Smartphone, Globe, Shield, Star, ExternalLink, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HUDPanel } from '../components/HUDPanel';
import { audioEngine } from '../components/AudioEngine';

export const Showcase: React.FC = () => {
  const { apps } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<typeof apps[0] | null>(null);

  const filteredApps = filter === 'all' ? apps : apps.filter(a => a.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white">
          PUBLISHED <span className="neon-text-primary">APPS & WEB PLATFORMS</span>
        </h1>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          Explore mobile applications published on Google Play Store, iOS App Store, enterprise web suites, and custom software systems developed by WHITE HAT DEV.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 text-xs">
        {['all', 'playstore', 'webapp', 'enterprise'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              audioEngine.playClick();
              setFilter(cat);
            }}
            className={`px-4 py-2 rounded uppercase border transition-all ${
              filter === cat
                ? 'border-[var(--primary-color)] bg-cyan-500/20 text-cyan-400 font-bold shadow-[0_0_10px_var(--glow-color)]'
                : 'border-gray-800 text-gray-400 hover:border-gray-700'
            }`}
          >
            {cat === 'all' ? 'ALL PROJECTS' : cat}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.map(app => (
          <HUDPanel key={app.id} badge={app.category.toUpperCase()}>
            <div className="space-y-4">
              <img src={app.imageUrl} alt={app.title} className="w-full h-48 object-cover rounded border border-cyan-500/30" />
              <div>
                <h3 className="font-orbitron font-bold text-white text-lg">{app.title}</h3>
                <p className="text-xs text-gray-300 mt-1">{app.description}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {app.techStack.map((t, idx) => (
                  <span key={idx} className="bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
                <span className="text-yellow-400 font-bold flex items-center">
                  <Star size={14} className="fill-yellow-400 mr-1" /> {app.rating} ({app.downloads})
                </span>
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setSelectedApp(app);
                  }}
                  className="px-3 py-1.5 rounded bg-[var(--primary-color)] text-black font-bold hover:bg-yellow-400 transition-colors"
                >
                  VIEW SPECS & DEMO
                </button>
              </div>
            </div>
          </HUDPanel>
        ))}
      </div>

      {/* Modal Detail View */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0f18] border-2 border-[var(--primary-color)] rounded-lg p-6 max-w-2xl w-full shadow-[0_0_30px_var(--glow-color)] relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                audioEngine.playGlitch();
                setSelectedApp(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="font-orbitron font-bold text-xl text-white">{selectedApp.title}</h2>
            <img src={selectedApp.imageUrl} alt="" className="w-full h-56 object-cover rounded border border-cyan-500/30" />
            <p className="text-xs text-gray-300">{selectedApp.longDescription}</p>

            <div className="p-3 bg-black/60 border border-gray-800 rounded space-y-1 text-xs">
              <div>Category: <span className="text-cyan-400 font-bold">{selectedApp.category.toUpperCase()}</span></div>
              <div>Downloads / Reach: <span className="text-yellow-400 font-bold">{selectedApp.downloads}</span></div>
              <div>Rating: <span className="text-yellow-400">★ {selectedApp.rating} / 5.0</span></div>
            </div>

            <div className="flex gap-3 pt-2">
              {selectedApp.playStoreUrl && (
                <a
                  href={selectedApp.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded bg-green-600 text-white font-bold text-center text-xs hover:bg-green-500 transition-colors"
                >
                  GOOGLE PLAY STORE PAGE
                </a>
              )}
              {selectedApp.liveUrl && (
                <a
                  href={selectedApp.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded bg-[var(--primary-color)] text-black font-bold text-center text-xs hover:bg-yellow-400 transition-colors"
                >
                  LIVE WEB DEMO
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
