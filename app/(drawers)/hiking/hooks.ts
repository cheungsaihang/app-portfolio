import { StyleSheet } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import Sizes from '@/constants/Sizes';

export function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    root:{
      flex:1,
      paddingHorizontal:(Sizes.spacing.horizontal - 5),
    },
    row:{
      flexDirection:'row',
    },
    tagSkeletion:{
      flexDirection:'row',
      paddingVertical:10,
      paddingHorizontal:Sizes.spacing.horizontal,
    },
    tag:{
      paddingVertical:4,
      paddingHorizontal:10,
      borderRadius:5,
      borderWidth:0,
      marginRight:5,
      backgroundColor:themeColors.menuTag,
    },
    tagText:{
      color: themeColors.foreground,
      fontSize:Sizes.fonts.medium,
      fontWeight:'bold'
    },
    gird:{
      width:'50%',
      padding:5
    },
    imageSkeletion:{
      width:'100%',
      aspectRatio:'4/3',
      backgroundColor:themeColors.skeleton
    },
    image:{
      width:'100%',
      height:'100%',
      objectFit:'cover'
    },
    titleWrap:{
      height:40,
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }
  });
  return styles;
}