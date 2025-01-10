import { useGlobalContext } from '@/contexts/GlobalContext';
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
import Sizes from '@/constants/Sizes';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function ThemeSwitcher(){
  const themeColors = useThemeColors();
  const {theme, setTheme} = useGlobalContext();

  return (
    <TouchableOpacity
      onPress={() => setTheme(theme == 'light' ? 'dark' : 'light')}
    >
    {
      theme == 'dark' ? (
        <Ionicons name='sunny' size={(Sizes.icon - 4)} color={themeColors.icon} />
      ) : (
        <Ionicons name='moon' size={(Sizes.icon - 8)} color={themeColors.icon} />
      )  
    }
    </TouchableOpacity>
  );
}