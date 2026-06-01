import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const darkColors = {
  bg: '#0f1724',
  bgCard: '#1a2332',
  bgElevated: '#1e293b',
  bgInput: '#1e293b',
  text: '#e2e8f0',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.12)',
};

const lightColors = {
  bg: '#f8f9fc',
  bgCard: '#ffffff',
  bgElevated: '#f1f4f9',
  bgInput: '#ffffff',
  text: '#1e293b',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  border: 'rgba(0, 0, 0, 0.08)',
  borderLight: 'rgba(0, 0, 0, 0.14)',
};

const shared = {
  primary: '#1e40af',
  primaryLight: '#3b82f6',
  accent: '#0d9488',
  accentLight: '#14b8a6',
  success: '#059669',
  error: '#dc2626',
  radius: 8,
  radiusSm: 6,
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
