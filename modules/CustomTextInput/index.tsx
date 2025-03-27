import { useState, useImperativeHandle, MutableRefObject, useRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export type CustomTextInputRef = {
  isFocused: () => boolean | undefined;
  setValue: (text:string) => void;
  getValue: () => string;
} | null;

type Props = {
  inputRef: MutableRefObject<CustomTextInputRef>;
} & TextInputProps

export default function CustomTextInput({
  inputRef,
  style,
  secureTextEntry,
  autoCapitalize,
  ...rest
}:Props){
  const ref = useRef<TextInput>(null);
  const [text, setText] = useState('');

  useImperativeHandle(inputRef, () => {
    return {
      isFocused: () => ref.current?.isFocused(),
      setValue: (text:string) => setText(text),
      getValue: () => text,
    };
  }, [text]);

  return (
    <TextInput
      ref={ref}
      style={style}
      value={text} 
      onChangeText={(text) => setText(text)}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      {...rest}
    />
  )
}