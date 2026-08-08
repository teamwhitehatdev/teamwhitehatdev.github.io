import React, { useState } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { useApp } from '../context/AppContext';

export const Gallery: React.FC = () => {
  const { gallery } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? (gallery || []) : (gallery || []).filter((item: any) => item.category === filter);

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black font-rajdhani uppercase text-white tracking-wider">
          CYBER GALLERY & CONCEPT SHOWCASE
        </h1>
        <p className="text-sm text-gray-400 font-mono max-w-2xl mx-auto">
          High-resolution 3D renders, vector HUD layouts, and futuristic user interface concepts built for modern digital brands.
        </p>
      </div>

      <HUDPanel title="GALLERY ASSETS">
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((item: any) => (
            <div key={item.id} className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all space-y-3 p-4">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg border border-gray-800" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase">{item.category}</span>
                <h3 className="text-base font-bold text-white font-rajdhani">{item.title}</h3>
                <p className="text-xs text-gray-400 font-mono">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </HUDPanel>
    </div>
  );
};

export default Gallery;
