import React, { useState } from 'react';
import { Lock, Download, Database, Plus, Trash2, ShieldCheck, User, ShoppingBag, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HUDPanel } from '../components/HUDPanel';
import { audioEngine } from '../components/AudioEngine';

export const Admin: React.FC = () => {
  const { 
    isAdmin, loginAdmin, logoutAdmin, orders, subscribers, gallery, products,
    addGalleryItem, deleteGalleryItem, addProduct, deleteProduct, exportDatabaseJSON 
  } = useApp();

  const [passInput, setPassInput] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'gallery' | 'products' | 'subscribers'>('orders');

  // Form states for new gallery
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState('Mobile Apps');
  const [newGalImage, setNewGalImage] = useState('');
  const [newGalDesc, setNewGalDesc] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(passInput);
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle || !newGalImage) return;
    addGalleryItem({
      title: newGalTitle,
      category: newGalCategory,
      imageUrl: newGalImage,
      date: new Date().toISOString().substring(0, 10),
      description: newGalDesc
    });
    setNewGalTitle('');
    setNewGalImage('');
    setNewGalDesc('');
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 font-mono">
        <HUDPanel title="CYBER ADMIN AUTHENTICATION">
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div className="flex items-center space-x-2 text-yellow-400 mb-2">
              <Lock size={18} />
              <span>Enter Admin Passcode (Default: whitehat2026)</span>
            </div>
            <input
              type="password"
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              placeholder="ENTER PASSCODE..."
              className="w-full bg-black border border-gray-700 rounded p-2 text-center text-white text-sm focus:outline-none focus:border-[var(--primary-color)]"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_10px_var(--glow-color)]"
            >
              AUTHENTICATE ADMIN PORTAL
            </button>
          </form>
        </HUDPanel>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-yellow-500/30 pb-4">
        <div>
          <h1 className="font-orbitron font-black text-2xl text-white flex items-center space-x-2">
            <span className="text-yellow-400">CYBER BACKEND</span> ADMIN DASHBOARD
          </h1>
          <p className="text-xs text-gray-400">Full control panel for client database, orders, products & gallery uploads</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={exportDatabaseJSON}
            className="px-3 py-1.5 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-400 text-xs font-bold hover:bg-cyan-900 transition-colors flex items-center space-x-1"
          >
            <Download size={14} />
            <span>EXPORT CONFIG JSON</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded bg-red-950 border border-red-500/50 text-red-400 text-xs font-bold hover:bg-red-900 transition-colors"
          >
            LOGOUT ADMIN
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex space-x-2 border-b border-gray-800 pb-2 text-xs font-orbitron">
        {['orders', 'gallery', 'products', 'subscribers'].map(t => (
          <button
            key={t}
            onClick={() => {
              audioEngine.playClick();
              setActiveTab(t as any);
            }}
            className={`px-4 py-1.5 rounded uppercase border ${
              activeTab === t
                ? 'border-yellow-400 bg-yellow-500/20 text-yellow-400 font-bold'
                : 'border-gray-800 text-gray-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <HUDPanel title="CUSTOMER ORDERS & TRANSACTION DATABASE">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-black text-yellow-400 border-b border-gray-800 uppercase font-mono">
                <tr>
                  <th className="p-2">Order ID</th>
                  <th className="p-2">Client Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Delivery</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {orders.map(ord => (
                  <tr key={ord.id} className="hover:bg-gray-900/50">
                    <td className="p-2 text-cyan-400 font-bold">{ord.id}</td>
                    <td className="p-2 text-white">{ord.userName}</td>
                    <td className="p-2 text-gray-400">{ord.userEmail}</td>
                    <td className="p-2 text-yellow-400 font-bold">${ord.totalPrice}</td>
                    <td className="p-2 text-gray-300">{ord.deliveryType}</td>
                    <td className="p-2 text-green-400 font-bold">{ord.status}</td>
                    <td className="p-2 text-gray-500">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </HUDPanel>
      )}

      {/* Gallery Uploader Tab */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <HUDPanel title="UPLOAD NEW ITEM TO FRONT-END GALLERY">
            <form onSubmit={handleAddGallery} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newGalTitle}
                  onChange={e => setNewGalTitle(e.target.value)}
                  placeholder="Project Title..."
                  className="bg-black border border-gray-700 rounded p-2 text-white"
                />
                <select
                  value={newGalCategory}
                  onChange={e => setNewGalCategory(e.target.value)}
                  className="bg-black border border-gray-700 rounded p-2 text-white"
                >
                  <option value="Mobile Apps">Mobile Apps</option>
                  <option value="Web Applications">Web Applications</option>
                  <option value="HUD Layouts">HUD Layouts</option>
                  <option value="3D & Digital Arts">3D & Digital Arts</option>
                </select>
              </div>
              <input
                type="text"
                required
                value={newGalImage}
                onChange={e => setNewGalImage(e.target.value)}
                placeholder="Image URL (or Base64 data)..."
                className="w-full bg-black border border-gray-700 rounded p-2 text-white"
              />
              <textarea
                value={newGalDesc}
                onChange={e => setNewGalDesc(e.target.value)}
                placeholder="Short description..."
                className="w-full bg-black border border-gray-700 rounded p-2 text-white h-16"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-yellow-400 text-black font-bold hover:bg-yellow-300"
              >
                PUBLISH TO FRONT-END GALLERY
              </button>
            </form>
          </HUDPanel>

          <HUDPanel title="CURRENT GALLERY ITEMS">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {gallery.map(item => (
                <div key={item.id} className="p-2 bg-black border border-gray-800 rounded space-y-2">
                  <img src={item.imageUrl} alt="" className="w-full h-32 object-cover rounded" />
                  <div className="font-bold text-white truncate">{item.title}</div>
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="w-full py-1 bg-red-950 text-red-400 rounded hover:bg-red-900"
                  >
                    DELETE ITEM
                  </button>
                </div>
              ))}
            </div>
          </HUDPanel>
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <HUDPanel title="NEWSLETTER & WEEKLY UPDATE SUBSCRIBERS">
          <div className="space-y-2 text-xs">
            {subscribers.map((sub, idx) => (
              <div key={idx} className="p-2 bg-black border border-gray-800 rounded text-cyan-400 font-mono">
                {sub}
              </div>
            ))}
          </div>
        </HUDPanel>
      )}
    </div>
  );
};
