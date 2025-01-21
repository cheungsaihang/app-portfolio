import Sizes from "@/constants/Sizes";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

export default function HikingLayout({children}:{children:ReactNode}){
  const styles = useStyles();
  return (
    <View style={styles.root}>
      {children}
    </View>
  );
}
function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:themeColors.background,
      paddingBottom:Sizes.spacing.vertical
    }
  });
  return styles;
}