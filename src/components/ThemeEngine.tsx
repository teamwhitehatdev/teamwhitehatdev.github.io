import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 
  | 'cyberpunk_net'
  | 'hackthebox' 
  | 'cyberpunk' 
  | 'cyberpunk2077_neon' 
  | 'cybernotes' 
  | 'matrix' 
  | 'tron' 
  | 'retrowave' 
  | 'quantum';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  panel: string;
  glow: string;
  bgPattern: string;
  description: string;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  cyberpunk_net: {
    name: 'cyberpunk_net',
    label: 'CYBERPUNK.NET OFFICIAL',
    primary: '#fcee0a',        // Iconic Cyberpunk 2077 Yellow
    secondary: '#00f0ff',      // Night City Electric Cyan
    accent: '#ff0055',         // Arasaka Hot Pink
    bg: '#080a10',             // Deep Night City Darkness
    panel: 'rgba(15, 23, 42, 0.75)', // Glassmorphic Translucent Cyber Card
    glow: 'rgba(252, 238, 10, 0.55)',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(252, 238, 10, 0.08) 0%, rgba(8, 10, 16, 0.95) 70%), linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
    description: 'Official Cyberpunk.net Night City aesthetic with iconic bright yellow, electric cyan, and translucent glass panels.'
  },
  hackthebox: {
    name: 'hackthebox',
    label: 'HACK THE BOX (HTB)',
    primary: '#9fef00',        // Official HTB Toxic Lime Green
    secondary: '#22d3ee',      // Official HTB Cyan
    accent: '#ffaf00',         // HTB Alert Orange
    bg: '#0b1120',             // HTB Deep Space Dark Navy
    panel: 'rgba(17, 24, 39, 0.75)', // Glassmorphic Carbon Panel
    glow: 'rgba(159, 239, 0, 0.5)',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(159, 239, 0, 0.06) 0%, rgba(11, 17, 32, 0.95) 70%), linear-gradient(rgba(159, 239, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(159, 239, 0, 0.04) 1px, transparent 1px)',
    description: 'Authentic Hack The Box official theme with toxic lime green & deep space dark carbon.'
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'CYBERPUNK 2077 HUD',
    primary: '#00f0ff',
    secondary: '#fcee0a',
    accent: '#ff0055',
    bg: '#0d0f18',
    panel: 'rgba(18, 22, 36, 0.75)',
    glow: 'rgba(0, 240, 255, 0.5)',
    bgPattern: 'radial-gradient(circle at 50% 20%, rgba(0, 240, 255, 0.08) 0%, rgba(13, 15, 24, 0.95) 80%), linear-gradient(rgba(252, 238, 10, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(252, 238, 10, 0.04) 1px, transparent 1px)',
    description: 'High contrast yellow, neon cyan and pink dark futuristic theme.'
  },
  cyberpunk2077_neon: {
    name: 'cyberpunk2077_neon',
    label: 'CYBERPUNK NEON GLITCH',
    primary: '#fcee0a',
    secondary: '#ff0055',
    accent: '#00f0ff',
    bg: '#05070f',
    panel: 'rgba(25, 18, 38, 0.8)',
    glow: 'rgba(252, 238, 10, 0.6)',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(255, 0, 85, 0.1) 0%, rgba(5, 7, 15, 0.95) 75%)',
    description: 'Ultra bright Cyberpunk 2077 yellow, electric hot pink and cyan glow.'
  },
  cybernotes: {
    name: 'cybernotes',
    label: 'CYBERNOTES.APK',
    primary: '#00ff66',
    secondary: '#a3ff00',
    accent: '#00f0ff',
    bg: '#090d0b',
    panel: 'rgba(14, 28, 20, 0.75)',
    glow: 'rgba(0, 255, 102, 0.5)',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 102, 0.07) 0%, rgba(9, 13, 11, 0.95) 75%), linear-gradient(rgba(0, 255, 102, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 102, 0.03) 1px, transparent 1px)',
    description: 'Inspired by Cybernotes.apk - Emerald green cyber HUD vectors.'
  },
  matrix: {
    name: 'matrix',
    label: 'MATRIX HACKER',
    primary: '#00ff41',
    secondary: '#003b00',
    accent: '#008f11',
    bg: '#040804',
    panel: 'rgba(10, 25, 12, 0.8)',
    glow: 'rgba(0, 255, 65, 0.5)',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.06) 0%, rgba(4, 8, 4, 0.95) 75%)',
    description: 'Classic green digital rain & pure terminal hacker aesthetic.'
  },
  tron: {
    name: 'tron',
    label: 'TRON LEGACY',
    primary: '#00d8ff',
    secondary: '#ffffff',
    accent: '#ff9900',
    bg: '#050b18',
    panel: 'rgba(12, 24, 48, 0.75)',
    glow: 'rgba(0, 216, 255, 0.6)',
    bgPattern: 'radial-gradient(circle at 50% 30%, rgba(0, 216, 255, 0.1) 0%, rgba(5, 11, 24, 0.95) 80%), linear-gradient(rgba(0, 216, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 216, 255, 0.05) 1px, transparent 1px)',
    description: 'Deep grid electric neon blue and pure white photon lines.'
  },
  retrowave: {
    name: 'retrowave',
    label: 'SYNTHWAVE 80S',
    primary: '#ff007f',
    secondary: '#ffaa00',
    accent: '#9d4edd',
    bg: '#160026',
    panel: 'rgba(40, 10, 70, 0.75)',
    glow: 'rgba(255, 0, 127, 0.5)',
    bgPattern: 'radial-gradient(circle at 50% 80%, rgba(255, 0, 127, 0.15) 0%, rgba(22, 0, 38, 0.95) 75%)',
    description: '80s Synthwave neon purple grid with glowing sunset pink.'
  },
  quantum: {
    name: 'quantum',
    label: 'QUANTUM WHITE HAT',
    primary: '#38bdf8',
    secondary: '#818cf8',
    accent: '#f43f5e',
    bg: '#0f172a',
    panel: 'rgba(30, 41, 59, 0.75)',
    glow: 'rgba(56, 189, 248, 0.5)',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.95) 75%)',
    description: 'High-precision white hat defense security platform.'
  }
};

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    return (localStorage.getItem('whitehat_theme') as ThemeName) || 'cyberpunk_net';
  });

  const setTheme = (theme: ThemeName) => {
    if (THEMES[theme]) {
      setCurrentTheme(theme);
      localStorage.setItem('whitehat_theme', theme);
    }
  };

  const themeConfig = THEMES[currentTheme];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', themeConfig.primary);
    root.style.setProperty('--secondary-color', themeConfig.secondary);
    root.style.setProperty('--accent-color', themeConfig.accent);
    root.style.setProperty('--bg-color', themeConfig.bg);
    root.style.setProperty('--panel-bg', themeConfig.panel);
    root.style.setProperty('--glow-color', themeConfig.glow);
    root.style.setProperty('--bg-pattern', themeConfig.bgPattern);
  }, [currentTheme, themeConfig]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
