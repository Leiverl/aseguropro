export const theme = {
  bg: '#050510',
  bgCard: 'rgba(15, 15, 30, 0.85)',
  bgElevated: 'rgba(20, 20, 45, 0.9)',
  bgInput: 'rgba(30, 30, 60, 0.9)',
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryGlow: 'rgba(99, 102, 241, 0.2)',
  secondary: '#06b6d4',
  accent: '#f59e0b',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#475569',
  border: 'rgba(255, 255, 255, 0.06)',
  borderLight: 'rgba(255, 255, 255, 0.1)',
  success: '#10b981',
  error: '#ef4444',
  radius: 20,
  radiusSm: 12,
};

export const shadows = {
  primary: {
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
  },
};
