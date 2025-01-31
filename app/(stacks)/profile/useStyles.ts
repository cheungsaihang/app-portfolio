import Sizes from "@/constants/Sizes";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet } from "react-native";

export default function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    root:{
      paddingVertical:Sizes.spacing.vertical,
      flexDirection:'row',
      justifyContent:'center',
    },
    frame:{
      padding:20,
      borderWidth:1,
      borderColor:themeColors.skeleton,
      borderStyle:'solid',
      borderRadius:10,
    },
    row:{
      flexDirection:'row',
      alignItems:'center',
      paddingTop:10,
      paddingBottom:10,
    },
    label:{
      fontSize:Sizes.fonts.medium,
      color:themeColors.foreground,
      textAlign:'center',
      fontWeight:'bold',
    },
    labelWrap:{
      width:100
    },
    value:{
      fontSize:Sizes.fonts.medium,
      color:themeColors.foreground,
    },
    valueWrap:{
      width:200
    },
    button:{
      backgroundColor:themeColors.skeleton,
      width:100,
      textAlign:'center',
      paddingTop:5,
      paddingBottom:5,
      borderRadius:5,
    },
    buttonText:{
      fontSize:Sizes.fonts.medium,
      color:themeColors.foreground,
      textAlign:'center'
    }
  });
  return styles;
}