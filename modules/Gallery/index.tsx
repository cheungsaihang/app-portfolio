"use client"
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColors } from "@/hooks/useThemeColors";
import Sizes from "@/constants/Sizes";

export default function Gallery({
  index,
  pics,
} : {
  index:number; 
  pics:string[]; 
}){
  const themeColors = useThemeColors();
  const [isPending, setPending] = useState(true);
  const [imgIndex, setImgIndex] = useState<number>(index);
  const picCount = pics.length;

  useEffect(() => {
    if(isPending){      
      Image.prefetch(pics[imgIndex]).finally(() => {
        setPending(false);
      });
    }
  },[isPending]);

  const handleImageChange = (index:number) => {
    setImgIndex((thisIndex) => {
      const newIndex = thisIndex + index;
      if(newIndex >= picCount){
        return 0;
      }
      if(newIndex < 0){
        return (picCount - 1);
      }
      return newIndex;
    });
    setPending(true);
  }
  return(
    <View style={styles.root}>
      <TouchableOpacity onPress={() => handleImageChange(-1)}>
        <Ionicons name='chevron-back' color={themeColors.icon} size={Sizes.icon} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        { !isPending && <ImageZoom uri={pics[imgIndex]} style={styles.image} /> }
      </View>
      <TouchableOpacity onPress={() => handleImageChange(1)}>
        <Ionicons name='chevron-forward' color={themeColors.icon} size={Sizes.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  image:{
    width:'100%',
  }
});