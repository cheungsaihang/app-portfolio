import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {TextClassification, TextClassificationResult} from '@/modules/text-classification';
import { useRef, useState } from 'react';
import Sizes from '@/constants/Sizes';
import CustomTextInput, { CustomTextInputRef } from '@/modules/CustomTextInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TextClassifyScreen(){
  const styles = useStyles();
  const inputRef = useRef<CustomTextInputRef | null>(null);
  const [result, setResult] = useState<TextClassificationResult[]>([]);
  
  const handleClick = () => {
    const text = inputRef.current?.getValue();
    if(text && text != ''){
      inputRef.current?.setValue('');
      TextClassification.classify(text).then((result?:TextClassificationResult[]) => {
        if(result){
          setResult(result);
        }
      });
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <CustomTextInput inputRef={inputRef} style={styles.input} />
        <TouchableOpacity onPress={handleClick} style={styles.button}>
          <Text style={styles.buttonText}>Classify</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.result}>
        {
          !result || result.length <= 0 ? (
            <View style={styles.resultRow}>
              <Text style={styles.resultValue}>--</Text>
              <Text style={styles.resultValue}>--</Text>
            </View>
          ) : result.map((result, index) => (
            <View key={index} style={styles.resultRow}>
              <Text style={styles.resultValue}>{result.label}</Text>
              <Text style={styles.resultValue}>{Math.round(result.score * 100) / 100}</Text>
            </View>
          ))
        }
      </View>
    </View>
  );
}

function useStyles(){
  const themeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:10,
      backgroundColor: themeColors.background,
      paddingBottom:insets.bottom + 15
    },
    inputRow:{
      flexDirection:'row',
      height:50,
      padding:5,
      borderColor:themeColors.layoutBorder,
      borderWidth:1,
      borderRadius:5,
      marginBottom:10
    },
    input:{
      flex:1,
      height:'100%',
      marginRight:5
    },
    button:{
      width:100,
      height:'100%',
      backgroundColor:themeColors.button,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5
    },
    buttonText:{
      fontSize:Sizes.fonts.medium,
      color:'#ffffff'
    },
    result:{
      flex:1,
      borderColor:themeColors.layoutBorder,
      borderWidth:1,
      borderRadius:5,
      padding:5,
    },
    resultRow:{
      flexDirection:'row',
      paddingVertical:10,
    },
    resultValue: {
      flex:1,
      fontSize: Sizes.fonts.medium + 2,
      color:themeColors.foreground,
      textAlign:'center'
    }
  });
  return styles;
}

