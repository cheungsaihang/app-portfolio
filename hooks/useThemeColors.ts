import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/contexts/GlobalContext';

export function useThemeColors() {
  const GlobalContext = useGlobalContext();
  const theme = GlobalContext.theme;
  if(theme == 'dark'){
    return {...Colors.default, ...Colors.dark};
  }
  return Colors.default;
}
