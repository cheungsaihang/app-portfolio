import { Colors } from '@/constants/Colors';
import { useThemeStore } from './zustand/useThemeStore';

export function useThemeColors() {
  const theme = useThemeStore(state => state.theme);

  if(theme == 'dark'){
    return {...Colors.default, ...Colors.dark};
  }
  return Colors.default;
}
