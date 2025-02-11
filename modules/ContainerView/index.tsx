import Sizes from "@/constants/Sizes";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ContainerView({
  style,
  children
}:{
  style?:ViewStyle,
  children:ReactNode
}){
  const styles = useStyles();
  return (
    <View style={[styles.container,style]}>
      {children}
    </View>
  )
}

function useStyles(){
  const insets = useSafeAreaInsets();
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop:Sizes.spacing.vertical,
      paddingBottom:(insets.bottom + Sizes.spacing.vertical),
      paddingHorizontal:Sizes.spacing.horizontal,
      backgroundColor:themeColors.background
    }
  });
  return styles;
}
 