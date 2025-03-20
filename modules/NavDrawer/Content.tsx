import Sizes from '@/constants/Sizes';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function DrawerContent(props:DrawerContentComponentProps) {
  const router = useRouter();
  
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.contentContainerStyle}>
      <DrawerItemList {...props} />
      <View style={styles.tools}>
        <TouchableOpacity 
          style={styles.toolsButton}
          onPress={() => router.push({pathname:'/(stacks)/camera'})}
        >
          <Text style={styles.toolsButtonText}>智慧相機</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle:{
    flex:1,
    paddingTop:0, 
    paddingStart:0, 
    paddingEnd:0
  },
  tools:{
    flex:1,
    flexDirection:'column-reverse'
  },
  toolsButton:{
    padding:15,
  },
  toolsButtonText:{
    fontSize:Sizes.fonts.medium,
    color:"#FFFFFF"
  }
});