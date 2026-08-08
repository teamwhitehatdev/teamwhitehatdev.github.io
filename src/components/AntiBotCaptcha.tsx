import React, { useState } from 'react';
import { ShieldAlert, Check, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { audioEngine } from './AudioEngine';

export const AntiBotCaptcha: React.FC = () => {
  const { isCaptchaOpen, setIsCaptchaOpen, pendingCheckoutAction, setPendingCheckoutAction } = useApp();
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  if (!isCaptchaOpen) return null;

  const handleVerify = () => {
    audioEngine.playClick();
    if (parseInt(answer) === num1 + num2) {
      audioEngine.playSuccess();
      setIsCaptchaOpen?.(false);
      if (pendingCheckoutAction) {
        pendingCheckoutAction();
        setPendingCheckoutAction?.(null);
      }
    } else {
      audioEngine.playGlitch();
      setError(true);
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-[#0d0f18] border-2 border-yellow-500 rounded-lg p-6 max-w-sm w-full shadow-[0_0_30px_rgba(252,238,10,0.5)]">
        <div className="flex items-center space-x-2 text-yellow-400 mb-4 font-orbitron font-bold text-sm">
          <ShieldAlert size={20} />
          <span>CYBER FIREWALL VERIFICATION</span>
        </div>
        <p className="text-xs text-gray-300 mb-4">
          Anti-Bot security check required before high-value PayPal transaction. Solve the formula:
        </p>

        <div className="p-3 bg-black border border-yellow-500/30 rounded text-center text-lg text-white font-bold mb-4 tracking-widest">
          {num1} + {num2} = ?
        </div>

        {error && (
          <div className="text-xs text-red-400 mb-3 text-center">
            Verification Failed! Human verification failed. Try again.
          </div>
        )}

        <input
          type="number"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Enter result..."
          className="w-full bg-black border border-gray-700 rounded p-2 text-center text-white text-sm mb-4 focus:outline-none focus:border-yellow-400"
        />

        <button
          onClick={handleVerify}
          className="w-full py-2 rounded bg-yellow-400 text-black font-orbitron font-bold text-xs hover:bg-yellow-300 transition-colors shadow-[0_0_10px_rgba(252,238,10,0.5)]"
        >
          VERIFY HUMAN USER
        </button>
      </div>
    </div>
  );
};
