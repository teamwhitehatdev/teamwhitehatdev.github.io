import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CookieConsentBanner: React.FC = () => {
  const { adSenseConfig } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem('wh_adsense_cookie_consent_v1');
      if (!savedConsent && adSenseConfig?.cookieConsentEnabled !== false) {
        setVisible(true);
      }
    } catch (e) {
      // ignore
    }
  }, [adSenseConfig?.cookieConsentEnabled]);

  const handleAccept = (mode: 'all' | 'essential') => {
    try {
      localStorage.setItem('wh_adsense_cookie_consent_v1', mode);
    } catch (e) {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-50 white-glass-card border border-slate-300 rounded-2xl p-4 shadow-xl text-xs text-slate-700 space-y-3">
      <div className="flex items-start gap-2.5">
        <div className="p-2 rounded-xl bg-slate-900 text-white shrink-0">
          <Shield className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-extrabold text-slate-900 text-xs">
            Cookie &amp; Ad Personalization Notice
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            We use cookies (including Google AdSense &amp; partner analytics) to personalize content, display relevant ads, and keep our Virtual Assistant Academy 100% free.{' '}
            <Link to="/privacy-policy" className="text-slate-900 font-bold underline">
              Privacy Policy &amp; Ad Disclosure
            </Link>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={() => handleAccept('essential')}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] cursor-pointer"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={() => handleAccept('all')}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer shadow-xs"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Accept All</span>
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
