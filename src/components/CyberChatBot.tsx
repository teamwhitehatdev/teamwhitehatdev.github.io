import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Youtube, CheckCircle2, ShoppingCart } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { useApp } from '../context/AppContext';

export const CyberChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { subscribeNewsletter, setIsCartOpen } = useApp();

  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; action?: string }>>([
    {
      sender: 'bot',
      text: 'GREETINGS, HUMAN. I am WHITE_HAT_AI - your cyber assistant. Ask me about custom Web & App Dev, Virtual Assistant retainers, Python security tools, or digital products!'
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    audioEngine.playClick();
    const userMsg = input.trim();
    setInput('');

    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      audioEngine.playBeep();
      let reply = "Affirmative. I can assist you with web application engineering, Google Play Store app publishing, Python automation tools, or custom Virtual Assistant services. Would you like to view our Marketplace or calculate a custom project fee?";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('fee')) {
        reply = "Our Web Application packages start at $1,499. Android & iOS Mobile Apps (published to Google Play Store & Apple App Store) start at $2,499. Virtual Assistant retainers are $499/mo ($35/hr). Check the SERVICES tab for full details!";
      } else if (lower.includes('course') || lower.includes('tutorial') || lower.includes('learn')) {
        reply = "We offer 3 Masterclass courses covering Cyberpunk Web Dev, Mobile App Dev (like Cybernotes.apk), and Python Security Tools. Enrolling grants instant lifetime video access and code downloads!";
      } else if (lower.includes('python') || lower.includes('tool') || lower.includes('script')) {
        reply = "We specialize in Python 3.10+ async security tools, web scraping bots, and system automation scripts. Browse our Python Systems category in the Shop!";
      } else if (lower.includes('subscribe') || lower.includes('youtube') || lower.includes('discount')) {
        reply = "Subscribe to our YouTube channel or weekly newsletter to receive coupon code 'WHITEHAT10' for 10% off your entire shop purchase!";
      } else if (lower.includes('deliver') || lower.includes('ship') || lower.includes('time')) {
        reply = "Digital products and courses are delivered INSTANTLY via digital download / email. Physical merchandise (T-Shirts & Hoodies) is shipped worldwide via tracked courier in 7-15 days!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {!isOpen ? (
        <button
          onClick={() => {
            audioEngine.playClick();
            setIsOpen(true);
          }}
          className="p-4 rounded-full bg-black/90 border-2 border-[var(--primary-color)] text-[var(--primary-color)] shadow-[0_0_20px_var(--glow-color)] hover:scale-110 transition-transform flex items-center space-x-2 group"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="hidden group-hover:inline text-xs font-bold tracking-wider">CYBER_BOT_AI</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-black/95 border-2 border-[var(--primary-color)] rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col h-[450px]">
          {/* Header */}
          <div className="bg-cyan-950/80 p-3 border-b border-[var(--primary-color)] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-[var(--primary-color)]" />
              <div>
                <div className="text-white font-orbitron font-bold text-xs">CYBER_ASSISTANT_v4.2</div>
                <div className="text-[10px] text-green-400">AI Traffic & Sales Converter Active</div>
              </div>
            </div>
            <button 
              onClick={() => {
                audioEngine.playGlitch();
                setIsOpen(false);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`p-2.5 rounded max-w-[85%] ${
                  m.sender === 'user'
                    ? 'ml-auto bg-[var(--primary-color)]/20 text-white border border-[var(--primary-color)]'
                    : 'mr-auto bg-gray-900 text-gray-300 border border-gray-800'
                }`}
              >
                <div className="text-[9px] text-gray-400 mb-1">{m.sender === 'user' ? 'CLIENT' : 'WHITE_HAT_AI'}</div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-2 bg-gray-950 border-t border-gray-800 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI assistant..."
              className="flex-1 bg-black border border-gray-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[var(--primary-color)]"
            />
            <button
              onClick={handleSend}
              className="p-1.5 rounded bg-[var(--primary-color)] text-black font-bold hover:bg-yellow-400 transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
