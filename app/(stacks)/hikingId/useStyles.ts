import Sizes from '@/constants/Sizes';
import { useThemeColors } from '@/hooks/useThemeColors';
import { StyleSheet } from 'react-native';

export default function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:themeColors.background,
    },
    row:{
      flexDirection:'row',
      flexWrap:'wrap',
    },
    tag:{
      paddingVertical:4,
      paddingHorizontal:15,
      borderRadius:15,
      backgroundColor:themeColors.skeleton,
      marginRight:3,
      marginBottom:3,
    },
    tagText:{
      color:'#333333',
      fontSize:Sizes.fonts.medium
    },
    difficult:{
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:1,
      marginTop:5
    },
    difficultText:{
      fontSize:Sizes.fonts.medium,
      color:themeColors.foreground,
      marginRight:5,
    },
    infoText:{
      fontSize:Sizes.fonts.medium,
      color:themeColors.foreground,
      fontWeight:'bold'
    },
    subInfoWrap:{
      marginTop:20,
    },
    shadowMore:{
      position:'absolute',
      top:0,
      left:0,
      width:'100%',
      height:'100%',
      backgroundColor:'rgba(0,0,0,.6)',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
    },
    shadowMoreText:{
      color:'#FAFAFA',
      fontSize:Sizes.fonts.medium
    },
    pictureGrid:{
      flexDirection:'row',
      flexWrap:'wrap',
      width:304,
      marginLeft:-2
    },
    pictureWrap:{
      width:150,
      height:150,
      position:'relative',
      marginTop:2,
      marginLeft:2,
      backgroundColor:themeColors.skeleton,
    },
    picture:{
      width:'100%',
      height:'100%',
      resizeMode:'cover'
    },
    reviewText:{
      fontSize:Sizes.fonts.medium,
      color:themeColors.foreground,
      marginTop:20,
    },
    title:{
      fontSize:Sizes.fonts.large,
      color:themeColors.foreground,
      fontWeight:'bold',
    },
    spacing:{
      marginBottom:10
    },
    flexSide:{
      marginTop:20
    },
    star:{
      marginLeft:-1,
      marginRight:5,
      fontSize:Sizes.fonts.medium,
      color:themeColors.star,
    },
    webView:{
      width:'100%',
      maxWidth:600,
      height:300,
      borderWidth:1,
      borderStyle:'solid',
      borderColor:'#eeeeee',
      borderRadius:5,
      overflow:'hidden'
    }
  });
  return styles;
}