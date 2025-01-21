import Sizes from "@/constants/Sizes";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export default function ContainerView({children}:{children:ReactNode}){
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingVertical:Sizes.spacing.vertical,
    paddingHorizontal:Sizes.spacing.horizontal,
  }
});
 