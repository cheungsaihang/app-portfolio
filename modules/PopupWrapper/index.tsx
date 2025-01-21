import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import Ionicons  from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Sizes from "@/constants/Sizes";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type WrapperHooks = {
  showWrapper:boolean,
  setShowWrapper:Dispatch<SetStateAction<boolean>>,
}

export function usePopupWrapper():WrapperHooks{
  const [showWrapper, setShowWrapper] = useState(false); 
  return {
    showWrapper: showWrapper,
    setShowWrapper: setShowWrapper
  };
}

export default function PopupWrapper({children, control}:{children:ReactNode, control: WrapperHooks}){
  const closePopup = () => control.setShowWrapper(false);
  const themeColors = useThemeColors();
  const inset = useSafeAreaInsets();
  return(
    <>
    {
      control.showWrapper ? (
        <Modal
          animationType='none'
          transparent={true}
          visible={control.showWrapper}
          onRequestClose={closePopup}
        >
          <GestureHandlerRootView>
            <View style={[styles.wrapper, { paddingTop:inset.top, paddingBottom:inset.bottom }]}>
              <View style={styles.header}>
                <TouchableOpacity onPress={closePopup}>
                  <Ionicons name='close' size={Sizes.icon} color={themeColors.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>{children}</View>
            </View>
          </GestureHandlerRootView>
        </Modal>
      ) : null
    }
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  header:{
    flexDirection:'row-reverse',
    paddingHorizontal:Sizes.spacing.horizontal
  },
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});