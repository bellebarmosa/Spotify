import { useAppSelector } from '@/store/hooks';
import { themeColors } from '@/constants/themeColors';

export const useTheme = () => {
  const { isDark } = useAppSelector((state) => state.theme);
  const colors = themeColors[isDark ? 'dark' : 'light'];

  return {
    isDark,
    colors,
    mode: useAppSelector((state) => state.theme.mode),
  };
};

