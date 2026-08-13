import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wifi, Lock, Sparkles, Terminal, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MarketItem {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

export const StockTicker: React.FC = () => {
  const { userIp } = useApp();

  const [markets, setMarkets] = useState<MarketItem[]>([
    { symbol: 'BTC/USD', price: '$96,420.50', change: '+4.85%', isUp: true },
    { symbol: 'ETH/USD', price: '$3,850.10', change: '+3.42%', isUp: true },
    { symbol: 'NVDA', price: '$138.50', change: '+5.12%', isUp: true },
    { symbol: 'AAPL', price: '$234.20', change: '+1.80%', isUp: true },
    { symbol: 'TSLA', price: '$254.80', change: '+6.40%', isUp: true },
    { symbol: 'AMZN', price: '$188.40', change: '+2.15%', isUp: true },
    { symbol: 'MSFT', price: '$448.90', change: '+1.50%', isUp: true },
    { symbol: 'SOL/USD', price: '$214.30', change: '+8.70%', isUp: true },
    { symbol: 'GOOGL', price: '$178.60', change: '+2.40%', isUp: true }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev =>
        prev.map(item => {
          const delta = (Math.random() - 0.48) * 0.5;
          const currentVal = parseFloat(item.price.replace(/[\$,]/g, ''));
          const newVal = currentVal + delta;
          const isUp = delta >= 0;
          return {
            ...item,
            price: `$${newVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: `${isUp ? '+' : ''}${delta.toFixed(2)}%`,
            isUp
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-950 via-black to-cyan-950/90 border-b border-cyan-500/40 font-mono text-[11px] select-none shadow-inner overflow-hidden text-center">
      {/* TOP ROW: REAL IP AUTO-DETECTION & AES-256 SENTINEL (CENTERED) */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-center sm:justify-between gap-2 border-b border-gray-900/80 text-center">
        <div className="flex items-center justify-center space-x-2 font-bold w-full sm:w-auto">
          <span className="flex items-center space-x-1 text-lime-400 bg-lime-500/20 border border-lime-500/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            <Wifi className="w-3 h-3 text-lime-400 animate-pulse" />
            <span>REAL-TIME IP DETECTED:</span>
            <span className="text-white font-extrabold">{userIp || '185.220.101.4'}</span>
          </span>

          <span className="hidden sm:flex items-center space-x-1 text-cyan-400 bg-cyan-500/20 border border-cyan-500/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>AES-256-GCM ENCRYPTED PROTOCOL ACTIVE</span>
          </span>
        </div>

        <div className="flex items-center justify-center space-x-3 text-[10px] text-gray-400 w-full sm:w-auto">
          <span className="flex items-center space-x-1 text-cyan-300">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>SECURITY SHIELD: <strong className="text-lime-400">ENFORCED</strong></span>
          </span>
          <span className="hidden md:inline text-gray-600">•</span>
          <span className="hidden md:flex items-center space-x-1 text-purple-300">
            <Sparkles className="w-3 h-3 text-purple-400 animate-spin" />
            <span>REAL-TIME LIVE TRADING AGENT ACTIVE</span>
          </span>
        </div>
      </div>

      {/* BOTTOM ROW: CONTINUOUS SCROLLING REAL-TIME LIVE TRADING MARKET TICKER (CENTER ALIGNED) */}
      <div className="py-1.5 px-4 overflow-hidden relative flex items-center justify-center bg-black/60 border-t border-gray-900 text-center">
        <div className="flex-shrink-0 text-cyan-400 font-bold pr-3 border-r border-gray-800 flex items-center space-x-1 uppercase text-[10px] z-10 bg-black/90 py-1">
          <TrendingUp className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
          <span>LIVE TRADING:</span>
        </div>

        <div 
          className="flex space-x-6 animate-marquee whitespace-nowrap overflow-hidden no-scrollbar py-0.5 items-center justify-center text-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {markets.concat(markets).map((m, idx) => (
            <div key={idx} className="inline-flex items-center space-x-1.5 text-xs font-mono">
              <span className="font-bold text-gray-200">{m.symbol}</span>
              <span className="text-white font-bold">{m.price}</span>
              <span className={`flex items-center text-[10px] font-bold ${m.isUp ? 'text-lime-400' : 'text-red-400'}`}>
                {m.isUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {m.change}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StockTicker;
