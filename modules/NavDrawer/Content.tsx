import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';

export default function DrawerContent(props:DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={style.contentContainerStyle}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const style = StyleSheet.create({
  contentContainerStyle:{
    paddingTop:0, 
    paddingStart:0, 
    paddingEnd:0
  }
});