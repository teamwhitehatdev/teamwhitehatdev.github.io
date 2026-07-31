import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Star, Truck, Download, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HUDPanel } from '../components/HUDPanel';
import { audioEngine } from '../components/AudioEngine';

export const Shop: React.FC = () => {
  const { products, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'ALL PRODUCTS' },
    { id: 'digital_arts', label: 'DIGITAL ARTS' },
    { id: 'website_templates', label: 'WEB TEMPLATES' },
    { id: 'app_templates', label: 'APP TEMPLATES' },
    { id: '3d_models', label: '3D MODELS' },
    { id: 'hacking_layouts', label: 'HACKING UI' },
    { id: 'hud_packages', label: 'HUD PACKAGES' },
    { id: 'stream_packages', label: 'STREAM PACKAGES' },
    { id: 'merchandise', label: 'MERCH (T-SHIRTS/HOODIES)' },
    { id: 'stickers', label: 'STICKERS' },
    { id: 'automation_systems', label: 'AUTOMATION BOTS' },
    { id: 'game_projects', label: 'GAME PROJECTS' },
    { id: 'python_systems', label: 'PYTHON TOOLS' },
    { id: 'nfts', label: 'NFT COLLECTIBLES' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white">
          CYBERNETICS <span className="neon-text-secondary">MARKETPLACE & MERCH</span>
        </h1>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          Buy high-quality digital assets, Python tools, 3D models, application templates, HUD vector packages, and official Cyber merchandise shipped worldwide in 7-15 days.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/60 border border-gray-800 p-4 rounded-lg">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search digital goods..."
            className="w-full bg-black border border-gray-700 rounded pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
          />
        </div>

        <div className="flex overflow-x-auto w-full sm:w-auto gap-2 py-1 scrollbar-none">
          {categories.slice(0, 6).map(c => (
            <button
              key={c.id}
              onClick={() => {
                audioEngine.playClick();
                setSelectedCategory(c.id);
              }}
              className={`px-3 py-1 rounded text-[11px] whitespace-nowrap border transition-all ${
                selectedCategory === c.id
                  ? 'border-[var(--secondary-color)] bg-yellow-500/20 text-yellow-400 font-bold'
                  : 'border-gray-800 text-gray-400 hover:border-gray-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <HUDPanel key={product.id} className="flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="relative">
                <img src={product.imageUrl} alt={product.title} className="w-full h-44 object-cover rounded border border-gray-800" />
                <span className="absolute top-2 right-2 bg-black/90 border border-cyan-400 text-cyan-400 text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                  {product.deliveryType === 'physical_shipping' ? '🚚 SHIPPING (7-15 DAYS)' : '⚡ INSTANT DOWNLOAD'}
                </span>
              </div>

              <div className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                {product.category.replace('_', ' ')}
              </div>

              <h3 className="font-orbitron font-bold text-white text-base leading-tight">{product.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{product.description}</p>

              <div className="space-y-1">
                {product.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="text-[10px] text-gray-300 flex items-center space-x-1">
                    <span className="text-cyan-400">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-yellow-400 font-bold">★ {product.rating}</div>
                <div className="text-lg font-bold text-[var(--secondary-color)]">${product.price} USD</div>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="px-4 py-2 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_10px_var(--glow-color)] flex items-center space-x-1"
              >
                <ShoppingBag size={14} />
                <span>ADD TO CART</span>
              </button>
            </div>
          </HUDPanel>
        ))}
      </div>
    </div>
  );
};
