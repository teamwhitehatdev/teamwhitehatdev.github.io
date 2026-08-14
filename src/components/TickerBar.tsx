import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Flame } from 'lucide-react';

interface StockTick {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export const TickerBar: React.FC = () => {
  const [stocks, setStocks] = useState<StockTick[]>([
    { symbol: 'AAPL', name: 'Apple Inc', price: 231.50, change: 3.25, changePercent: 1.42 },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 254.10, change: -4.15, changePercent: -1.61 },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 128.80, change: 5.40, changePercent: 4.37 },
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 68450.00, change: 1250.00, changePercent: 1.86 },
    { symbol: 'ETH/USD', name: 'Ethereum', price: 3510.50, change: -42.20, changePercent: -1.19 },
    { symbol: 'SOL/USD', name: 'Solana', price: 178.30, change: 8.90, changePercent: 5.25 },
    { symbol: 'SPY', name: 'S&P 500 ETF', price: 562.40, change: 2.10, changePercent: 0.37 },
    { symbol: 'QQQ', name: 'Nasdaq 100', price: 485.60, change: 4.80, changePercent: 1.00 },
    { symbol: 'AMZN', name: 'Amazon.com', price: 186.20, change: 1.75, changePercent: 0.95 },
    { symbol: 'MSFT', name: 'Microsoft', price: 448.90, change: -2.30, changePercent: -0.51 },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 176.40, change: 0.90, changePercent: 0.51 }
  ]);

  // Simulate real-time stock price fluctuations every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const delta = (Math.random() - 0.48) * (stock.price * 0.004);
          const newPrice = Math.max(1, stock.price + delta);
          const newChange = stock.change + delta;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(newChange.toFixed(2)),
            changePercent: Number(newChangePercent.toFixed(2))
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/95 border-b border-cyan-500/30 text-xs font-mono py-2 overflow-hidden select-none relative z-30 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* FIXED LEFT LABEL */}
        <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-950 to-black px-3 py-1 border-r border-cyan-500/40 text-cyan-300 font-extrabold z-20 flex-shrink-0">
          <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
          <span className="hidden sm:inline uppercase tracking-widest text-[11px]">REAL-TIME TRADING TICKER:</span>
          <span className="sm:hidden text-[10px]">LIVE:</span>
        </div>

        {/* SLOW RIGHT-TO-LEFT MARQUEE CONTAINER */}
        <div className="overflow-hidden flex-grow relative">
          <div className="flex space-x-8 animate-marqueeSlow whitespace-nowrap hover:[animation-play-state:paused]">
            {/* DUPLICATE STOCK TAPE TO ENSURE SEAMLESS INFINITE LOOPING */}
            {stocks.concat(stocks).map((stock, idx) => {
              const isPositive = stock.change >= 0;
              return (
                <div
                  key={`${stock.symbol}_${idx}`}
                  className="inline-flex items-center space-x-2 bg-gray-900/80 border border-gray-800 hover:border-cyan-500/50 px-3 py-1 rounded-lg flex-shrink-0 transition-all"
                >
                  <span className="font-extrabold text-white font-rajdhani">{stock.symbol}</span>
                  <span className="text-gray-300 font-mono">${stock.price.toLocaleString()}</span>
                  
                  <span className={`inline-flex items-center space-x-0.5 text-[11px] font-bold ${isPositive ? 'text-lime-400' : 'text-red-400'}`}>
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 text-lime-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span>{isPositive ? `+${stock.change}` : stock.change}</span>
                    <span>({isPositive ? `+${stock.changePercent}%` : `${stock.changePercent}%`})</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
export default TickerBar;
