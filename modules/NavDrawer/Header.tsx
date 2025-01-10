import { useThemeColors } from '@/hooks/useThemeColors';
import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Header({children}:{children:ReactNode}){
  const themeColors = useThemeColors();
  const colorStyles = {
    backgroundColor: themeColors.menuBackground,
    borderBottomColor: themeColors.layoutBorder
  }
  return (
    <View style={[styles.container,colorStyles]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height: 50,
    borderWidth:1,
    borderStyle:'solid',
  }
})