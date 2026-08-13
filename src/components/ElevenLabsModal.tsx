import React from 'react';
import { ExternalLink, Sparkles, X, Mic } from 'lucide-react';

export const ElevenLabsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-gradient-to-b from-gray-900 via-black to-purple-950/80 border-2 border-purple-500/60 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-[0_0_50px_rgba(168,85,247,0.25)] relative overflow-hidden text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400">
          <Mic className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="text-xl font-black font-rajdhani text-white uppercase">
          GENERATE HYPER-REALISTIC AI VOICE OVERS WITH ELEVENLABS
        </h3>

        <p className="text-xs text-gray-300 font-sans">
          Create human-like AI voiceovers for podcasting, content creation, client videos, and virtual assistant tasks in 29+ languages.
        </p>

        <a
          href="https://try.elevenlabs.io/e5xwigkl9igv"
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={onClose}
          className="block w-full py-3.5 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-black font-rajdhani text-sm uppercase rounded-xl shadow-xl hover:opacity-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>TRY ELEVENLABS FREE</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
export default ElevenLabsModal;
