import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Search, Filter, Grid, List, Star, Eye, ShoppingCart, 
  Check, ShieldCheck, Download, Code, Sparkles, Tag, ArrowRight, X, Lock
} from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { GlitchText } from '../components/GlitchText';
import { useApp } from '../context/AppContext';
import { audioEngine } from '../components/AudioEngine';
import { ShopProduct } from '../utils/initialData';

const CATEGORY_LABELS: Record<string, string> = {
  digital_art: 'DIGITAL ARTS',
  website_template: 'WEBSITE TEMPLATES',
  app_template: 'APPLICATION TEMPLATES',
  model_3d: '3D MODELS',
  hacking_interface: 'HACKING LAYOUTS',
  hud_package: 'HUD PACKAGES',
  stream_layout: 'STREAMING PACKAGES',
  tshirt_hoodie: 'T-SHIRTS & HOODIES',
  sticker: 'STICKERS & MERCH',
  automation_system: 'AUTOMATION SYSTEMS',
  android_game: 'ANDROID READY GAMES',
  python_tool: 'PYTHON TOOLS',
  nft: 'CYBER NFTS'
};

export const Shop: React.FC = () => {
  const { products, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);

  // Category Counts Calculation
  const categoriesList = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleAddToCart = (e: React.MouseEvent, product: ShopProduct) => {
    e.stopPropagation();
    audioEngine.playClick();
    addToCart(product);
    setAddedProductIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedProductIds(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  const handleOpenDetails = (product: ShopProduct) => {
    audioEngine.playClick();
    setSelectedProduct(product);
  };

  return (
    <div className="space-y-8 pb-16 font-mono">
      {/* Top Header */}
      <div className="border-b border-cyan-500/20 pb-4">
        <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full text-xs text-[var(--secondary-color)] mb-2">
          <Sparkles size={14} />
          <span>CYBER MARKETPLACE • DIGITAL GOODS & MERCH STORE</span>
        </div>
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white tracking-wider">
          <GlitchText text="CYBERNETIC MARKETPLACE & SHOP" speed={40} />
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl">
          Browse, inspect, and purchase source code, 3D assets, streaming packages, app projects, and physical merch directly via PayPal merchant checkout.
        </p>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="space-y-4">
        {/* Search & View Switcher Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-black/60 border border-cyan-500/30 p-3 rounded-lg backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="SEARCH ASSETS, TEMPLATES, TOOLS..."
              className="w-full bg-black/80 border border-cyan-500/40 rounded pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
            />
          </div>

          {/* Grid vs List View Toggle */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden sm:inline">VIEW:</span>
            <button
              onClick={() => { audioEngine.playClick(); setViewMode('grid'); }}
              className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-[var(--primary-color)] text-black' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => { audioEngine.playClick(); setViewMode('list'); }}
              className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-[var(--primary-color)] text-black' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 overflow-x-auto pb-2">
          <button
            onClick={() => { audioEngine.playClick(); setSelectedCategory('all'); }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[var(--primary-color)] text-black shadow-[0_0_10px_var(--glow-color)]'
                : 'bg-black/60 border border-gray-800 text-gray-300 hover:border-cyan-500/40'
            }`}
          >
            ALL ITEMS ({categoriesList.all || 0})
          </button>
          {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => {
            const count = categoriesList[catKey] || 0;
            return (
              <button
                key={catKey}
                onClick={() => { audioEngine.playClick(); setSelectedCategory(catKey); }}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === catKey
                    ? 'bg-[var(--primary-color)] text-black shadow-[0_0_10px_var(--glow-color)]'
                    : 'bg-black/60 border border-gray-800 text-gray-300 hover:border-cyan-500/40'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Display List / Grid */}
      {filteredProducts.length === 0 ? (
        <HUDPanel className="text-center py-12 space-y-3">
          <ShoppingBag size={48} className="mx-auto text-gray-600 animate-pulse" />
          <div className="text-lg font-bold text-white">NO MARKETPLACE ITEMS FOUND</div>
          <p className="text-xs text-gray-400">Try clearing your search query or choosing another category.</p>
        </HUDPanel>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW LAYOUT */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(p => {
            const isAdded = addedProductIds.includes(p.id);
            return (
              <HUDPanel 
                key={p.id} 
                className="flex flex-col justify-between group hover:border-[var(--primary-color)] cursor-pointer"
              >
                <div onClick={() => handleOpenDetails(p)} className="space-y-3">
                  <div className="relative overflow-hidden rounded border border-gray-800 h-44 bg-black">
                    <img 
                      src={p.imageUrl} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-bold uppercase bg-black/80 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded backdrop-blur-sm">
                      {CATEGORY_LABELS[p.category] || p.category}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpenDetails(p); }}
                      className="absolute bottom-2 right-2 p-1.5 bg-black/80 border border-cyan-500/50 text-cyan-300 hover:text-white rounded text-xs flex items-center space-x-1"
                    >
                      <Eye size={12} />
                      <span className="text-[10px]">DETAILS</span>
                    </button>
                  </div>

                  <div>
                    <h3 className="font-orbitron font-bold text-white text-sm line-clamp-1 group-hover:text-[var(--primary-color)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{p.description}</p>
                  </div>

                  {/* Rating & Stock */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-yellow-400 flex items-center">
                      <Star size={12} className="fill-yellow-400 mr-1" /> {p.rating}
                    </span>
                    <span className="text-[10px] text-green-400 bg-green-950/60 border border-green-500/30 px-1.5 py-0.5 rounded">
                      INSTANT DELIVERY
                    </span>
                  </div>
                </div>

                {/* Footer Action Price Bar */}
                <div className="pt-3 mt-3 border-t border-gray-800 flex items-center justify-between">
                  <div className="text-base font-bold text-[var(--secondary-color)]">${p.price} USD</div>
                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    className={`px-3 py-1.5 rounded font-bold text-xs flex items-center space-x-1 transition-all ${
                      isAdded 
                        ? 'bg-green-500 text-black' 
                        : 'bg-[var(--primary-color)] text-black hover:bg-yellow-400 shadow-[0_0_10px_var(--glow-color)]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>ADDED</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={14} />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>
                </div>
              </HUDPanel>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW LAYOUT */
        <div className="space-y-4">
          {filteredProducts.map(p => {
            const isAdded = addedProductIds.includes(p.id);
            return (
              <HUDPanel key={p.id} className="group hover:border-[var(--primary-color)] cursor-pointer">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div onClick={() => handleOpenDetails(p)} className="flex items-center space-x-4 w-full md:w-auto">
                    <img src={p.imageUrl} alt={p.title} className="w-24 h-24 object-cover rounded border border-gray-800" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase bg-black/80 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded">
                        {CATEGORY_LABELS[p.category] || p.category}
                      </span>
                      <h3 className="font-orbitron font-bold text-white text-base group-hover:text-[var(--primary-color)]">
                        {p.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-1">{p.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-800">
                    <div className="text-lg font-bold text-[var(--secondary-color)]">${p.price} USD</div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenDetails(p)}
                        className="px-3 py-1.5 bg-gray-900 border border-cyan-500/40 text-cyan-300 hover:text-white rounded text-xs flex items-center space-x-1"
                      >
                        <Eye size={14} />
                        <span>INSPECT</span>
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className={`px-4 py-1.5 rounded font-bold text-xs flex items-center space-x-1 ${
                          isAdded ? 'bg-green-500 text-black' : 'bg-[var(--primary-color)] text-black hover:bg-yellow-400'
                        }`}
                      >
                        {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
                        <span>{isAdded ? 'ADDED' : 'BUY NOW'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </HUDPanel>
            );
          })}
        </div>
      )}

      {/* PRODUCT FULL DETAILS LIGHTBOX INSPECTION MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-lg">
          <div className="bg-gray-900 border-2 border-[var(--primary-color)] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 font-mono text-white relative shadow-[0_0_50px_rgba(0,240,255,0.3)]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 border border-gray-800 text-gray-400 hover:text-white rounded-full"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-3 border-b border-cyan-500/30 pb-4">
              <span className="text-xs font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded">
                {CATEGORY_LABELS[selectedProduct.category] || selectedProduct.category}
              </span>
              <h2 className="font-orbitron font-bold text-xl text-white">{selectedProduct.title}</h2>
            </div>

            {/* Product High-Res Preview Image */}
            <div className="relative rounded overflow-hidden border border-cyan-500/30 h-64 bg-black">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 bg-black/80 border border-yellow-400/40 text-yellow-400 px-3 py-1 rounded text-xs font-bold flex items-center space-x-1">
                <Star size={14} className="fill-yellow-400" />
                <span>{selectedProduct.rating} Rating (Verified Asset)</span>
              </div>
            </div>

            {/* Full Product Specifications & Features */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[var(--primary-color)] uppercase tracking-wider mb-1">ASSET DESCRIPTION & OVERVIEW</h4>
                <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div>
                  <h4 className="font-bold text-[var(--secondary-color)] uppercase tracking-wider mb-2">INCLUDED SPECIFICATIONS & FEATURES</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.features.map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 bg-black/50 border border-gray-800 p-2 rounded text-gray-300">
                        <Check size={14} className="text-green-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Guarantee */}
              <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded flex items-center space-x-3 text-cyan-300">
                <ShieldCheck size={24} className="flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">INSTANT DIGITAL DOWNLOAD & SOURCE CODE ACCESS</div>
                  <div className="text-[10px]">Purchases include full source code, lifetime updates, and 24/7 technical support.</div>
                </div>
              </div>
            </div>

            {/* Action Checkout Bar */}
            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-gray-400">TOTAL PRICE</div>
                <div className="text-2xl font-bold text-[var(--secondary-color)]">${selectedProduct.price} USD</div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={(e) => {
                    handleAddToCart(e, selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-3 bg-[var(--primary-color)] text-black font-orbitron font-bold rounded text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_15px_var(--glow-color)] flex items-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>ADD TO CART & CHECKOUT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
