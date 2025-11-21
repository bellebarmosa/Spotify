export const themeColors = {
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#11181C',
    textSecondary: '#687076',
    primary: '#1DB954',
    secondary: '#0a7ea4',
    border: '#E0E0E0',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
    error: '#E22134',
    success: '#1DB954',
    card: '#FFFFFF',
    input: '#F5F5F5',
  },
  dark: {
    background: '#121212',
    surface: '#1a1a1a',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    primary: '#1DB954',
    secondary: '#FFFFFF',
    border: '#333333',
    icon: '#B3B3B3',
    tabIconDefault: '#B3B3B3',
    tabIconSelected: '#FFFFFF',
    error: '#E22134',
    success: '#1DB954',
    card: '#1a1a1a',
    input: '#1a1a1a',
  },
};

export type ThemeColors = typeof themeColors.dark;

