import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const darkColors = {
  bg: '#050510',
  bgCard: 'rgba(15, 15, 30, 0.85)',
  bgElevated: 'rgba(20, 20, 45, 0.9)',
  bgInput: 'rgba(30, 30, 60, 0.9)',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#475569',
  border: 'rgba(255, 255, 255, 0.06)',
  borderLight: 'rgba(255, 255, 255, 0.1)',
};

const lightColors = {
  bg: '#f8fafc',
  bgCard: 'rgba(255, 255, 255, 0.9)',
  bgElevated: 'rgba(241, 245, 249, 0.95)',
  bgInput: 'rgba(226, 232, 240, 0.9)',
  text: '#0f172a',
  textMuted: '#64748b',
  textDim: '#94a3b8',
  border: 'rgba(0, 0, 0, 0.06)',
  borderLight: 'rgba(0, 0, 0, 0.1)',
};

const shared = {
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryGlow: 'rgba(99, 102, 241, 0.2)',
  secondary: '#06b6d4',
  accent: '#f59e0b',
  success: '#10b981',
  error: '#ef4444',
  radius: 20,
  radiusSm: 12,
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('theme');
        if (saved === 'light') setIsDark(false);
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    try { await AsyncStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
  };

  const colors = { ...shared, ...(isDark ? darkColors : lightColors), isDark };

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme, loaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
