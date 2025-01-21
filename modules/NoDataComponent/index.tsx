import { View, StyleSheet, ViewStyle } from "react-native";
import ThemedText from "@/modules/ThemedText";
import Sizes from "@/constants/Sizes";

export default function NoDataListing({
  style,
}:{
  style?:ViewStyle
}){
  return (
    <View style={[styles.root,style]}>
      <ThemedText style={styles.text}>未有相關資料</ThemedText>
    </View>
  );
}
const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    fontSize:Sizes.fonts.large
  }
})