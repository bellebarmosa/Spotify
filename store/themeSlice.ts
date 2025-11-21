import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}

const THEME_KEY = '@spotify:theme_mode';

// Load theme from storage
const loadTheme = async (): Promise<ThemeMode> => {
  try {
    const savedTheme = await AsyncStorage.getItem(THEME_KEY);
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      return savedTheme as ThemeMode;
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
  return 'dark'; // Default to dark
};

// Initialize with default, will be updated by middleware
const initialState: ThemeState = {
  mode: 'dark',
  isDark: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // For 'auto', you could check system preference here
      // For now, we'll just set isDark based on mode
      if (action.payload === 'auto') {
        // In a real app, you'd check the system preference
        state.isDark = true; // Default to dark for auto
      } else {
        state.isDark = action.payload === 'dark';
      }
      // Save to AsyncStorage
      AsyncStorage.setItem(THEME_KEY, action.payload).catch((error) => {
        console.error('Error saving theme:', error);
      });
    },
    toggleTheme: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        state.isDark = true;
      } else if (state.mode === 'dark') {
        state.mode = 'light';
        state.isDark = false;
      } else {
        // If auto, toggle to dark
        state.mode = 'dark';
        state.isDark = true;
      }
      // Save to AsyncStorage
      AsyncStorage.setItem(THEME_KEY, state.mode).catch((error) => {
        console.error('Error saving theme:', error);
      });
    },
    initializeTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (action.payload === 'auto') {
        state.isDark = true;
      } else {
        state.isDark = action.payload === 'dark';
      }
    },
  },
});

export const { setTheme, toggleTheme, initializeTheme } = themeSlice.actions;
export { loadTheme };
export default themeSlice.reducer;

