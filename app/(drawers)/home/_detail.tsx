import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Article_Home } from '@/types/api/homeTypes';
import Sizes from '@/constants/Sizes';
import { useThemeColors } from '@/hooks/useThemeColors';
import ThemedText from '@/modules/ThemedText';

export default function HomeDetail({article}:{article:Article_Home}) {
  const styles = useStyles();
  return (
    <>
      <View style={styles.intro}>
        <ThemedText>{article.intro}</ThemedText>
      </View>
      <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.prepareWrap}>
        <View style={styles.prepareContent}>
          <Text style={[styles.title,styles.prepareColor]}>{article.preparation.title}</Text>
          {
            article.preparation.data.map((item, index) => (
              <Text key={`p-${index}`} style={[styles.prepareText, styles.prepareColor]}>{item}</Text>
            ))
          }
          <Text style={[styles.prepareNote, styles.prepareColor]}>{article.preparation.note}</Text>
        </View>
      </ImageBackground>
      {
        article.journey.map((item,index) => (
          <View key={`j-${index}`} style={styles.JourneyWrap}>
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            {
              item.data.map((itemData, itemIndex) => (
                <View key={`j-${index}-${itemIndex}`}>
                  <ThemedText style={styles.subTitle}>{itemData.subTitle}</ThemedText>
                  <ThemedText>{itemData.content}</ThemedText>
                </View>
              ))
            }
          </View>
        ))
      }
      <ThemedText style={styles.outrro}>{article.outtro}</ThemedText>
    </>
  );
}

function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    intro:{
      paddingHorizontal:20,
    },
    title:{
      fontWeight:'bold',
      textAlign:'center',
      fontSize:Sizes.fonts.large,
      marginBottom:10
    },
    subTitle:{
      fontWeight:'bold',
      fontSize:(Sizes.fonts.medium + 2),
      marginTop:20,
      marginBottom:1
    },
    prepareWrap:{
      marginTop:20,
      backgroundRepeat:'no-repeat',
      marginHorizontal:(Sizes.spacing.horizontal * -1),
      backgroundSize:'100% 100%',
    },
    prepareContent:{
      paddingVertical: 20,
      paddingHorizontal: 30,
      backgroundColor:'rgba(0,0,0,.5)',
    },
    prepareText:{
      fontSize:Sizes.fonts.medium,
    },
    prepareNote:{
      marginTop:15,
      fontSize:Sizes.fonts.small,
    },
    prepareColor:{
      color:'#fcfcfc',
    },
    JourneyWrap:{
      marginTop:20,
      backgroundColor:themeColors.journeySection,
      padding:20,
      borderRadius:10,
    },
    outrro:{
      textAlign:'center',
      marginTop:20,
      fontSize:Sizes.fonts.small
    }
  });
  return styles;
}