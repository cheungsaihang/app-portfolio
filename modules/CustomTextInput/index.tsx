import { useState, useImperativeHandle, MutableRefObject, useRef, useLayoutEffect } from "react";
import { TextInput, TextInputProps } from "react-native";

export type CustomTextInputRef = {
  getValue: () => string;
} | null;

type Props = {
  inputRef: MutableRefObject<CustomTextInputRef>;
} & TextInputProps

// type InputLayout = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

export default function CustomTextInput({
  inputRef,
  style,
  secureTextEntry,
  autoCapitalize,
  ...rest
}:Props){
  const [text, setText] = useState('');
  const ref = useRef<TextInput>(null);

  // useLayoutEffect(() => {
  //   ref.current?.measureInWindow((x, y, width, height) => {
  //     setLayout({
  //       x:Math.round(x),
  //       y:Math.round(y),
  //       width:Math.round(width),
  //       height:Math.round(height)
  //     });
  //   });
  // },[]);

  useImperativeHandle(inputRef, () => {
    return {
      getValue: () => text,
    };
  }, [text]);

  return (
    <TextInput
      ref={ref}
      style={style} 
      onChangeText={(text) => setText(text)}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      {...rest}
    />
  )
}