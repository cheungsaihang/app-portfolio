import { useLayoutEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

type PrecentageValue = `${number}%`;

type Props = {
  src: string;
  style?: ViewStyle;
  width : number | PrecentageValue;
};

export default function AutoHeightImage({
  src,
  style,
  width,
}:Props){
  const [height, setHeight] = useState<number | undefined>(undefined); 
  const defaultHeight = 200;

  useLayoutEffect(() => {
    let _width:number;
    if(isPrecentageValue(width)){
      const windowWidth = Dimensions.get('window').width;
      _width = percentToDecimal(width) * windowWidth;
    }
    else{
      _width = width;
    }
    Image.getSize(src, (w, h) => {
      setHeight(Math.round(_width * h / w));
    });
  },[]);

  return (
    <View style={[styles.wrap, style, { width:width, height:height || defaultHeight }]}>
      { height && <Image src={src} style={styles.image}/> }
    </View>
  )
}
const styles = StyleSheet.create({
  wrap:{
    backgroundColor:Colors.default.skeleton,
  },
  image:{
    width:'100%',
    height:'100%',
  }
});

function isPrecentageValue(value:number | PrecentageValue): value is PrecentageValue{
  if(typeof value === 'number'){
    return false;
  }
  if (/^\d+(\.\d+)?%$/.test(value)) {
    return true;
  } else {
    return false;
  }
}

function percentToDecimal(percentStr:string){
  return parseFloat(percentStr) / 100;  
};