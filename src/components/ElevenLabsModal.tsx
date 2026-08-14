import React, { useEffect, useState } from 'react';
import { Mic, ExternalLink, Sparkles, X, Clock } from 'lucide-react';

interface ElevenLabsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ElevenLabsModal: React.FC<ElevenLabsModalProps> = ({ isOpen, onClose }) => {
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-gradient-to-b from-gray-900 via-black to-purple-950/90 border-2 border-purple-500/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        
        {/* TOP AUTO-CLOSE NOTICE BAR */}
        <div className="flex items-center justify-between text-xs text-purple-300 bg-purple-500/20 border border-purple-500/40 p-2.5 rounded-xl font-bold">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>SPECIAL OFFER FOR VIRTUAL ASSISTANTS</span>
          </span>
          <span className="flex items-center space-x-1 text-gray-300">
            <Clock className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>AUTO-CLOSING IN {timeLeft}S</span>
          </span>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/60 p-1.5 rounded-full border border-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400">
            <Mic className="w-8 h-8 animate-bounce" />
          </div>

          <h3 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
            ELEVENLABS AI VOICE STUDIO
          </h3>

          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Offer high-paying AI voiceover narration, podcast editing, and video voiceovers for international clients in 29+ languages.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={ELEVENLABS_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-lime-400 text-white font-extrabold font-rajdhani text-sm uppercase rounded-xl text-center shadow-xl hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>TRY ELEVENLABS FREE NOW</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 bg-black/60 text-gray-400 hover:text-white font-bold text-xs uppercase rounded-xl border border-gray-800 transition-all"
          >
            PROCEED TO MAIN HOMEPAGE &rarr;
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-gray-800">
          <div
            className="bg-gradient-to-r from-purple-400 to-cyan-400 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 4) * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
};
export default ElevenLabsModal;
