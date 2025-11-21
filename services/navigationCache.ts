import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationState } from '@/types';

const NAVIGATION_CACHE_KEY = '@spotify:navigation_cache';

export const saveNavigationState = async (screenName: string): Promise<void> => {
  try {
    const state: NavigationState = {
      lastScreen: screenName,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(NAVIGATION_CACHE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving navigation state:', error);
  }
};

export const getNavigationState = async (): Promise<string | null> => {
  try {
    const cached = await AsyncStorage.getItem(NAVIGATION_CACHE_KEY);
    if (cached) {
      const state: NavigationState = JSON.parse(cached);
      // Return the last screen if cache is less than 24 hours old
      const hoursSinceCache = (Date.now() - state.timestamp) / (1000 * 60 * 60);
      if (hoursSinceCache < 24) {
        return state.lastScreen;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting navigation state:', error);
    return null;
  }
};

export const clearNavigationState = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(NAVIGATION_CACHE_KEY);
  } catch (error) {
    console.error('Error clearing navigation state:', error);
  }
};

