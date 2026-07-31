import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'cyberpunk' | 'cyberpunk2077_neon' | 'hackthebox' | 'cybernotes' | 'matrix' | 'tron' | 'retrowave' | 'quantum';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  panel: string;
  glow: string;
  description: string;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  cyberpunk: {
    name: 'cyberpunk',
    label: 'CYBERPUNK 2077',
    primary: '#00f0ff',
    secondary: '#fcee0a',
    accent: '#ff0055',
    bg: '#0d0f18',
    panel: 'rgba(18, 22, 36, 0.75)',
    glow: 'rgba(0, 240, 255, 0.5)',
    description: 'High contrast yellow, neon cyan and pink dark futuristic theme.'
  },
  cyberpunk2077_neon: {
    name: 'cyberpunk2077_neon',
    label: 'CYBERPUNK NEON GLITCH',
    primary: '#fcee0a',
    secondary: '#ff0055',
    accent: '#00f0ff',
    bg: '#05070f',
    panel: 'rgba(20, 15, 30, 0.85)',
    glow: 'rgba(252, 238, 10, 0.6)',
    description: 'Ultra bright Cyberpunk 2077 yellow, electric hot pink and cyan glow.'
  },
  hackthebox: {
    name: 'hackthebox',
    label: 'HACK THE BOX (HTB)',
    primary: '#9feaf9',
    secondary: '#a2e048',
    accent: '#ffaf00',
    bg: '#111927',
    panel: 'rgba(20, 29, 43, 0.85)',
    glow: 'rgba(159, 234, 249, 0.5)',
    description: 'Official HackTheBox hacker theme with neon green & dark hex panels.'
  },
  cybernotes: {
    name: 'cybernotes',
    label: 'CYBERNOTES.APK',
    primary: '#00ff66',
    secondary: '#a3ff00',
    accent: '#00f0ff',
    bg: '#090d0b',
    panel: 'rgba(14, 24, 18, 0.8)',
    glow: 'rgba(0, 255, 102, 0.5)',
    description: 'Inspired by Cybernotes.apk - Emerald green cyber HUD vectors.'
  },
  matrix: {
    name: 'matrix',
    label: 'MATRIX HACKER',
    primary: '#00ff41',
    secondary: '#003b00',
    accent: '#008f11',
    bg: '#050505',
    panel: 'rgba(10, 20, 10, 0.85)',
    glow: 'rgba(0, 255, 65, 0.5)',
    description: 'Classic green digital rain & pure terminal hacker aesthetic.'
  },
  tron: {
    name: 'tron',
    label: 'TRON LEGACY',
    primary: '#00d8ff',
    secondary: '#ffffff',
    accent: '#ff9900',
    bg: '#060b19',
    panel: 'rgba(10, 20, 45, 0.8)',
    glow: 'rgba(0, 216, 255, 0.6)',
    description: 'Deep grid electric neon blue and pure white photon lines.'
  },
  retrowave: {
    name: 'retrowave',
    label: 'SYNTHWAVE 80S',
    primary: '#ff007f',
    secondary: '#ffaa00',
    accent: '#9d4edd',
    bg: '#18002a',
    panel: 'rgba(36, 0, 70, 0.8)',
    glow: 'rgba(255, 0, 127, 0.5)',
    description: '80s Synthwave neon purple grid with glowing sunset pink.'
  },
  quantum: {
    name: 'quantum',
    label: 'QUANTUM WHITE HAT',
    primary: '#38bdf8',
    secondary: '#818cf8',
    accent: '#f43f5e',
    bg: '#0f172a',
    panel: 'rgba(30, 41, 59, 0.85)',
    glow: 'rgba(56, 189, 248, 0.5)',
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
    return (localStorage.getItem('whitehat_theme') as ThemeName) || 'cyberpunk';
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
