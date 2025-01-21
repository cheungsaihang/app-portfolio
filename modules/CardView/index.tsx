import { ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function CardView({
  onPress,
  children
}:{
  onPress?:() => void;
  children:ReactNode;
}){
  return (
    <View style={styles.wrap}>
      {
        onPress 
        ? <TouchableOpacity onPress={onPress} style={styles.content}>{children}</TouchableOpacity>
        : <View style={styles.content}>{children}</View>
      }
    </View>
  );
} 

const styles = StyleSheet.create({
  wrap:{
    borderRadius:10,
    overflow:'hidden',
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'rgba(0, 0, 0, .1)',
    borderBottomWidth:2,
    borderBottomColor:'rgba(0,0,0,.2)',
    marginBottom:15
  },
  content:{
    position:'relative',
    width:'100%',
    height:'auto',
    display:'flex'
  }
});
