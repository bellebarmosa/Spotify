import { useAppSelector } from '@/store/hooks';
import { themeColors } from '@/constants/themeColors';

export const useTheme = () => {
  const theme = useAppSelector((state) => state.theme);
  const { isDark, mode, customColors } = theme;
  
  // Get base colors
  const baseColors = themeColors[isDark ? 'dark' : 'light'];
  
  // If custom mode, merge custom colors with base colors
  const colors = mode === 'custom' 
    ? {
        ...baseColors,
        primary: customColors.primary,
        secondary: customColors.secondary,
        tabIconSelected: customColors.accent,
        success: customColors.primary,
      }
    : baseColors;

  return {
    isDark,
    colors,
    mode,
    customColors: mode === 'custom' ? customColors : null,
  };
};

