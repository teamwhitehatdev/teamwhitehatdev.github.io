import React, { useState } from 'react';
import { UserCheck, Globe, Smartphone, ShieldCheck, BookOpen, Check, Calculator, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HUDPanel } from '../components/HUDPanel';
import { audioEngine } from '../components/AudioEngine';

export const Services: React.FC = () => {
  const { services, courses } = useApp();
  const [selectedTab, setSelectedTab] = useState<'services' | 'courses' | 'quote'>('services');

  // Interactive Quote Calculator State
  const [appType, setAppType] = useState<'web' | 'mobile' | 'both'>('web');
  const [hasAdmin, setHasAdmin] = useState(true);
  const [hasPaypal, setHasPaypal] = useState(true);
  const [isVaRetainer, setIsVaRetainer] = useState(false);

  const calculatedCost = 
    (appType === 'web' ? 1499 : appType === 'mobile' ? 2499 : 3499) +
    (hasAdmin ? 300 : 0) +
    (hasPaypal ? 200 : 0) +
    (isVaRetainer ? 499 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl text-white">
          SERVICES, <span className="neon-text-primary">VA SUPPORT & COURSES</span>
        </h1>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto">
          Hire WHITE HAT DEV as your dedicated technical Virtual Assistant, order custom full-stack Web & Mobile app engineering, or enroll in professional developer masterclasses.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 border-b border-gray-800 pb-4 text-xs font-orbitron font-bold">
        <button
          onClick={() => {
            audioEngine.playClick();
            setSelectedTab('services');
          }}
          className={`pb-2 px-4 border-b-2 transition-all ${
            selectedTab === 'services' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500'
          }`}
        >
          DEVELOPER SERVICES & VA RETAINERS
        </button>
        <button
          onClick={() => {
            audioEngine.playClick();
            setSelectedTab('courses');
          }}
          className={`pb-2 px-4 border-b-2 transition-all ${
            selectedTab === 'courses' ? 'border-[var(--secondary-color)] text-[var(--secondary-color)]' : 'border-transparent text-gray-500'
          }`}
        >
          MASTERCLASS COURSES & TUTORIALS
        </button>
        <button
          onClick={() => {
            audioEngine.playClick();
            setSelectedTab('quote');
          }}
          className={`pb-2 px-4 border-b-2 transition-all ${
            selectedTab === 'quote' ? 'border-[var(--accent-color)] text-[var(--accent-color)]' : 'border-transparent text-gray-500'
          }`}
        >
          INTERACTIVE FEE CALCULATOR
        </button>
      </div>

      {/* Services Tab */}
      {selectedTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(srv => (
            <HUDPanel key={srv.id} badge={srv.priceType.toUpperCase()}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded bg-cyan-950 border border-cyan-500/30 text-[var(--primary-color)]">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-white text-lg">{srv.title}</h3>
                    <div className="text-xs text-yellow-400">{srv.tagline}</div>
                  </div>
                </div>

                <p className="text-xs text-gray-300">{srv.description}</p>

                <div className="space-y-2 border-t border-b border-gray-800 py-3">
                  {srv.features.map((feat, idx) => (
                    <div key={idx} className="text-xs text-gray-300 flex items-center space-x-2">
                      <span className="text-[var(--primary-color)]">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xl font-orbitron font-bold text-[var(--secondary-color)]">
                    ${srv.price} USD <span className="text-xs text-gray-500 font-mono font-normal">/ {srv.priceType}</span>
                  </div>
                  <a
                    href="/contact"
                    onClick={() => audioEngine.playClick()}
                    className="px-4 py-2 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_10px_var(--glow-color)]"
                  >
                    BOOK SERVICE
                  </a>
                </div>
              </div>
            </HUDPanel>
          ))}
        </div>
      )}

      {/* Courses Tab */}
      {selectedTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <HUDPanel key={course.id} badge={course.level.toUpperCase()}>
              <div className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <img src={course.imageUrl} alt="" className="w-full h-40 object-cover rounded border border-gray-800" />
                  <h3 className="font-orbitron font-bold text-white text-base">{course.title}</h3>
                  <p className="text-xs text-gray-400">{course.description}</p>
                  <div className="text-xs text-cyan-400">Duration: {course.duration}</div>

                  <div className="space-y-1 pt-2 border-t border-gray-800">
                    <div className="text-[10px] text-gray-400 font-bold">INCLUDED MODULES:</div>
                    {course.modules.map((m, idx) => (
                      <div key={idx} className="text-[10px] text-gray-300 truncate">• {m}</div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <div className="text-lg font-bold text-yellow-400">${course.price} USD</div>
                  <a
                    href="/shop"
                    onClick={() => audioEngine.playClick()}
                    className="px-3 py-1.5 rounded bg-[var(--secondary-color)] text-black font-bold text-xs hover:bg-white transition-colors"
                  >
                    ENROLL NOW
                  </a>
                </div>
              </div>
            </HUDPanel>
          ))}
        </div>
      )}

      {/* Interactive Fee Calculator */}
      {selectedTab === 'quote' && (
        <HUDPanel className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center space-x-2 text-[var(--accent-color)] border-b border-gray-800 pb-3">
            <Calculator size={24} />
            <h2 className="font-orbitron font-bold text-xl text-white">INTERACTIVE PROJECT QUOTE BUILDER</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-gray-400 block mb-2 font-bold">1. TARGET PLATFORM TYPE:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAppType('web')}
                  className={`p-2 rounded border ${appType === 'web' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400' : 'border-gray-800 text-gray-400'}`}
                >
                  Full-Stack Web App ($1,499)
                </button>
                <button
                  onClick={() => setAppType('mobile')}
                  className={`p-2 rounded border ${appType === 'mobile' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400' : 'border-gray-800 text-gray-400'}`}
                >
                  Android & iOS App ($2,499)
                </button>
                <button
                  onClick={() => setAppType('both')}
                  className={`p-2 rounded border ${appType === 'both' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400' : 'border-gray-800 text-gray-400'}`}
                >
                  Web + Mobile Suite ($3,499)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 block font-bold">2. ADD-ON MODULES & INTEGRATIONS:</label>
              <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                <input type="checkbox" checked={hasAdmin} onChange={e => setHasAdmin(e.target.checked)} />
                <span>Include Cyber Admin Backend & Order Manager (+$300)</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                <input type="checkbox" checked={hasPaypal} onChange={e => setHasPaypal(e.target.checked)} />
                <span>Include PayPal / Credit Card E-Commerce Checkout (+$200)</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                <input type="checkbox" checked={isVaRetainer} onChange={e => setIsVaRetainer(e.target.checked)} />
                <span>Add 1 Month Virtual Assistant Retainer & Maintenance (+$499)</span>
              </label>
            </div>

            <div className="p-4 bg-black border border-cyan-500/40 rounded flex items-center justify-between">
              <div>
                <div className="text-gray-400">ESTIMATED TOTAL FEE:</div>
                <div className="text-2xl font-orbitron font-bold text-[var(--secondary-color)]">${calculatedCost} USD</div>
              </div>
              <a
                href="/contact"
                onClick={() => audioEngine.playClick()}
                className="px-4 py-2.5 rounded bg-[var(--primary-color)] text-black font-orbitron font-bold text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_10px_var(--glow-color)]"
              >
                REQUEST OFFICIAL QUOTE
              </a>
            </div>
          </div>
        </HUDPanel>
      )}
    </div>
  );
};
