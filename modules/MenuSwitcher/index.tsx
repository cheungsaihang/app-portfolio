import { TouchableOpacity } from 'react-native';
import { DrawerNavigationState, NavigationHelpers, ParamListBase, DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Sizes from '@/constants/Sizes';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function MenuSwitcher({
  state,
  navigation
}:{
  state: DrawerNavigationState<ParamListBase>
  navigation: NavigationHelpers<ParamListBase, {}>
}){
  const themeColors = useThemeColors();
  const isDrawerOpen = state.history.some((it) => it.type === 'drawer');  
  return (
    <TouchableOpacity 
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      {
        isDrawerOpen ? (
          <Ionicons name='close' size={Sizes.icon} color={themeColors.icon} />
        ) : (
          <Ionicons name='menu' size={Sizes.icon} color={themeColors.icon} />
        )
      }
    </TouchableOpacity>
  )
}