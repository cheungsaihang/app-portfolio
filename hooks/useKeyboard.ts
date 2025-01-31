import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboard(props?:{
  listeners?:{
    onKeyBoardShow?:(keyboardHeight?:number) => any;
    onKeyBoardHide?:(prevHeight?:number) => any;
  }
}){
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow',(e) => {
      const scrollY = e.endCoordinates.height;
      props?.listeners?.onKeyBoardShow && props.listeners.onKeyBoardShow(scrollY);
      setKeyboardHeight(scrollY);
    });
    const keyboardHide = Keyboard.addListener('keyboardDidHide',() => {
      props?.listeners?.onKeyBoardHide && props.listeners.onKeyBoardHide(keyboardHeight);
      setKeyboardHeight(0);
    });
    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  },[]);

  return {
    keyboardHeight
  };
}