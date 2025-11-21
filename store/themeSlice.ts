import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'custom';

export interface CustomThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  customColors: CustomThemeColors;
}

const THEME_KEY = '@spotify:theme_mode';
const CUSTOM_COLORS_KEY = '@spotify:custom_colors';

// Default custom colors
const defaultCustomColors: CustomThemeColors = {
  primary: '#1DB954',
  secondary: '#FFFFFF',
  accent: '#1DB954',
};

// Load theme from storage
const loadTheme = async (): Promise<ThemeMode> => {
  try {
    const savedTheme = await AsyncStorage.getItem(THEME_KEY);
    if (savedTheme && ['light', 'dark', 'custom'].includes(savedTheme)) {
      return savedTheme as ThemeMode;
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
  return 'dark'; // Default to dark
};

// Load custom colors from storage
export const loadCustomColors = async (): Promise<CustomThemeColors> => {
  try {
    const savedColors = await AsyncStorage.getItem(CUSTOM_COLORS_KEY);
    if (savedColors) {
      return JSON.parse(savedColors);
    }
  } catch (error) {
    console.error('Error loading custom colors:', error);
  }
  return defaultCustomColors;
};

// Initialize with default, will be updated by middleware
const initialState: ThemeState = {
  mode: 'dark',
  isDark: true,
  customColors: defaultCustomColors,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (action.payload === 'custom') {
        // Custom theme uses dark base
        state.isDark = true;
      } else {
        state.isDark = action.payload === 'dark';
      }
      // Save to AsyncStorage
      AsyncStorage.setItem(THEME_KEY, action.payload).catch((error) => {
        console.error('Error saving theme:', error);
      });
    },
    setCustomColors: (state, action: PayloadAction<CustomThemeColors>) => {
      state.customColors = action.payload;
      // Save to AsyncStorage
      AsyncStorage.setItem(CUSTOM_COLORS_KEY, JSON.stringify(action.payload)).catch((error) => {
        console.error('Error saving custom colors:', error);
      });
    },
    toggleTheme: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        state.isDark = true;
      } else if (state.mode === 'dark') {
        state.mode = 'custom';
        state.isDark = true;
      } else {
        // If custom, toggle to light
        state.mode = 'light';
        state.isDark = false;
      }
      // Save to AsyncStorage
      AsyncStorage.setItem(THEME_KEY, state.mode).catch((error) => {
        console.error('Error saving theme:', error);
      });
    },
    initializeTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (action.payload === 'custom') {
        state.isDark = true;
      } else {
        state.isDark = action.payload === 'dark';
      }
    },
    initializeCustomColors: (state, action: PayloadAction<CustomThemeColors>) => {
      state.customColors = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, initializeTheme, setCustomColors, initializeCustomColors } = themeSlice.actions;
export { loadTheme, loadCustomColors };
export default themeSlice.reducer;

