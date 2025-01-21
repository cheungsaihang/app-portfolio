import { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DrawerNavigationState, NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/hooks/useThemeColors';
import MenuSwitcher from '@/modules/MenuSwitcher';
import ThemeSwitcher from '@/modules/ThemeSwitcher';

export default function DrawerLayout({
  children,
  state,
  navigation
}:{
  children: ReactNode,
  state: DrawerNavigationState<ParamListBase>
  navigation: NavigationHelpers<ParamListBase, {}>
}){  
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={[styles.sideWrap,styles.left]}><MenuSwitcher state={state} navigation={navigation} /></View>
        <View style={styles.logoWrap}><Image source={require('@/assets/images/logo.gif')} style={styles.logo} /></View>
        <View style={[styles.sideWrap,styles.right]}><ThemeSwitcher /></View>
      </View>
      {children}
    </View>
  )
}

function useStyles(){
  const themeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    root:{
      flex:1,
      paddingTop: insets.top,
    },
    header: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height: 50,
      backgroundColor: themeColors.menuBackground,
      borderWidth:1,
      borderStyle:'solid',
      borderBottomColor: themeColors.layoutBorder,
    },
    sideWrap:{
      width:100,
    },
    left:{
      flexDirection:'row',
      alignItems:'center'
    },
    right:{
      flexDirection:'row-reverse',
      alignItems:'center'
    },
    logoWrap:{
      width:40,
      height:40,
      borderRadius:20,
      overflow:'hidden'
    },
    logo:{
      width: '100%',
      height: '100%'
    }
  });
}