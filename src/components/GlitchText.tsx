import React, { useState, useEffect } from 'react';
import { audioEngine } from './AudioEngine';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', speed = 40 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setIsDone(false);
    setDisplayText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(prev => prev + text.charAt(index));
        audioEngine.playTyping();
        index++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`font-mono inline-block relative ${className}`}>
      {displayText}
      {!isDone && <span className="animate-ping text-[var(--primary-color)]">|</span>}
    </span>
  );
};
