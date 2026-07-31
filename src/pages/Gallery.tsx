import React, { useState } from 'react';
import { Image as ImageIcon, Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HUDPanel } from '../components/HUDPanel';
import { audioEngine } from '../components/AudioEngine';

export const Gallery: React.FC = () => {
  const { gallery } = useApp();
  const [selectedImage, setSelectedImage] = useState<typeof gallery[0] | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white">
          PROJECT & ART <span className="neon-text-primary">LIGHTBOX GALLERY</span>
        </h1>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          View high-resolution screenshots, HUD vector wireframes, 3D renders, and certified project showcases uploaded to the system.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gallery.map(item => (
          <HUDPanel key={item.id} className="cursor-pointer group hover:border-[var(--primary-color)] transition-all">
            <div 
              onClick={() => {
                audioEngine.playClick();
                setSelectedImage(item);
              }}
              className="space-y-3"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-48 object-cover rounded border border-gray-800 group-hover:scale-105 transition-transform" 
              />
              <div className="text-[10px] text-cyan-400 font-bold uppercase">{item.category}</div>
              <h3 className="font-orbitron font-bold text-white text-sm truncate">{item.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
            </div>
          </HUDPanel>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d0f18] border-2 border-[var(--primary-color)] rounded-lg p-6 max-w-3xl w-full shadow-[0_0_30px_var(--glow-color)] relative space-y-4">
            <button 
              onClick={() => {
                audioEngine.playGlitch();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="font-orbitron font-bold text-xl text-white">{selectedImage.title}</h2>
            <img src={selectedImage.imageUrl} alt="" className="w-full max-h-[60vh] object-contain rounded border border-cyan-500/30" />
            <div className="p-3 bg-black border border-gray-800 rounded text-xs text-gray-300">
              <div>Category: <span className="text-cyan-400 font-bold">{selectedImage.category}</span></div>
              <div>Release Date: <span className="text-yellow-400">{selectedImage.date}</span></div>
              <div className="mt-1">{selectedImage.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
