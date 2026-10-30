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

const LIGHT_MINIMAL_THEME: Omit<ThemeConfig, 'name' | 'label' | 'description'> = {
  primary: '#2563eb',        // Professional Royal Blue
  secondary: '#059669',      // Crisp Emerald Green
  accent: '#7c3aed',         // Modern Violet Accent
  bg: '#f8fafc',             // Clean Alabaster / Slate-50 Light Background
  panel: '#ffffff',          // Pure White Minimalist Card Surface
  glow: 'rgba(37, 99, 235, 0.08)',
  bgPattern: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.04) 0%, rgba(248, 250, 252, 1) 75%)'
};

export const THEMES: Record<ThemeName, ThemeConfig> = {
  cyberpunk_net: {
    name: 'cyberpunk_net',
    label: 'PROFESSIONAL LIGHT (DEFAULT)',
    ...LIGHT_MINIMAL_THEME,
    description: 'Clean, modern minimalistic light portfolio theme designed for maximum readability and zero eye strain.'
  },
  hackthebox: {
    name: 'hackthebox',
    label: 'EMERALD STUDIO LIGHT',
    ...LIGHT_MINIMAL_THEME,
    primary: '#059669',
    secondary: '#2563eb',
    description: 'Minimalist white studio aesthetic with emerald and royal blue accents.'
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'ROYAL BLUE PORTFOLIO',
    ...LIGHT_MINIMAL_THEME,
    description: 'Crisp executive light theme for Virtual Assistants, Freelancers, and AI Architects.'
  },
  cyberpunk2077_neon: {
    name: 'cyberpunk2077_neon',
    label: 'INDIGO MINIMAL LIGHT',
    ...LIGHT_MINIMAL_THEME,
    primary: '#4f46e5',
    description: 'Modern SaaS documentation and minimalist portfolio light theme.'
  },
  cybernotes: {
    name: 'cybernotes',
    label: 'PORTAL CLEAN LIGHT',
    ...LIGHT_MINIMAL_THEME,
    description: 'High-contrast editorial light theme built for reading free tutorials and guides.'
  },
  matrix: {
    name: 'matrix',
    label: 'CLEAN TECH LIGHT',
    ...LIGHT_MINIMAL_THEME,
    description: 'Minimalistic developer & VA portal light theme.'
  },
  tron: {
    name: 'tron',
    label: 'ARCHITECT WHITE',
    ...LIGHT_MINIMAL_THEME,
    description: 'Pure white architectural grid with subtle slate borders.'
  },
  retrowave: {
    name: 'retrowave',
    label: 'CREATIVE STUDIO LIGHT',
    ...LIGHT_MINIMAL_THEME,
    primary: '#7c3aed',
    description: 'Clean creative studio theme in light mode.'
  },
  quantum: {
    name: 'quantum',
    label: 'EXECUTIVE SLATE LIGHT',
    ...LIGHT_MINIMAL_THEME,
    description: 'High-precision minimalist portfolio & educational hub.'
  }
};

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('cyberpunk_net');

  const setTheme = (theme: ThemeName) => {
    if (THEMES[theme]) {
      setCurrentTheme(theme);
      localStorage.setItem('whitehat_theme', theme);
    }
  };

  const themeConfig = THEMES[currentTheme] || THEMES.cyberpunk_net;

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

export default ThemeProvider;
