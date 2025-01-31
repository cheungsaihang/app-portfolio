import { useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAuthStore } from "@/hooks/zustand/useAuthStore";
import  useLoginAction from "./useLoginAction";
import CustomTextInput, { CustomTextInputRef } from "@/modules/CustomTextInput";
import Sizes from "@/constants/Sizes";
import useKeyboard from "@/hooks/useKeyboard";

export default function LoginScreen(){
  const auth = useAuthStore();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const emailRef = useRef<CustomTextInputRef>(null);
  const passwordRef = useRef<CustomTextInputRef>(null);
  const styles = useStyles();
  const [state, loginAction]  = useLoginAction();
  const { keyboardHeight } = useKeyboard({
    listeners:{
      onKeyBoardShow:() => {
        scrollRef.current?.scrollTo({
          y: 99,
          animated:true
        });
      },
      onKeyBoardHide:() => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated:true
        });
      }
    }
  });

  const submit = () => {
    if(emailRef.current && passwordRef.current){
      loginAction({
        email:emailRef.current.getValue(),
        password:passwordRef.current.getValue()
      });
    }
  }

  useEffect(()=>{
    if(auth.sid){
      router.back();
    }
  },[auth])

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.root}
      contentContainerStyle={[styles.container,{paddingBottom:keyboardHeight}]}
    >
      <View style={styles.frame}>
        <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>電郵</Text>
              <View style={styles.inputWrap}><CustomTextInput inputRef={emailRef} style={styles.input} autoCapitalize='none' /></View>
              <View style={styles.errorWrap}>
                {
                  state?.error?.email && (
                    <Text style={styles.error}>{state.error.email}</Text>
                  )
                }
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>密碼</Text>
              <View style={styles.inputWrap}><CustomTextInput inputRef={passwordRef} style={styles.input} autoCapitalize='none' secureTextEntry={true} /></View>
              <View style={styles.errorWrap}>
                {
                  state?.error?.password && (
                    <Text style={styles.error}>{state.error.password}</Text>
                  )
                }
              </View>
            </View>
            <View style={styles.buttonWrap}>
              <TouchableOpacity 
                activeOpacity={1}
                onPress={submit}
                style={[styles.button, state.isPending && styles.buttonBlur]}
                disabled={state.isPending}
              >
                <Text style={styles.buttonText}>
                  {
                    state.isPending ? '登入中...' : '登入'
                  }
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.errorWrap}>
              {
                state?.error?.formSubmit && (
                  <Text style={[styles.error,styles.textCenter]}>{state.error.formSubmit}</Text>
                )
              }
            </View>
        </View>
      </View>
    </ScrollView>
  )
}

export function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:themeColors.background,
    },
    container:{
      alignItems:'center',
    },
    frame:{
      marginTop:100,
      borderWidth:1,
      borderColor:'#cccccc',
      borderStyle:'solid',
      borderRadius:10,
      padding:10,
      maxWidth:480,
      width:'80%',
    },
    form:{
      padding:10,
      paddingTop:25,
    },
    field:{
      marginBottom:15
    },
    label:{
      fontSize:Sizes.fonts.medium,
      marginBottom:5,
      color:themeColors.foreground
    },
    inputWrap:{
      justifyContent:'center',
      padding:3,
      borderWidth:1,
      borderColor:'#cccccc',
      borderStyle:'solid',
      borderRadius:5,
    },
    input:{
      fontSize:Sizes.fonts.medium,
      borderWidth:0,
      width:'100%',
      backgroundColor:themeColors.background,
      color:themeColors.foreground
    },
    errorWrap:{
      height:20,
      justifyContent:'center'
    },
    error:{
      fontSize:Sizes.fonts.small,
      color:themeColors.errorText,
    },
    buttonWrap:{
      flexDirection:'row',
      justifyContent:'center',
    },
    button:{
      backgroundColor:themeColors.button,
      borderWidth:0,
      borderRadius:5,
      width:100,
      paddingTop:5,
      paddingBottom:5,
    },
    buttonBlur:{
      backgroundColor: themeColors.buttonBlur,
    },
    buttonText:{
      fontSize:Sizes.fonts.medium,
      color:'#FFFFFF',
      textAlign:'center',
    },
    textCenter:{
      textAlign:'center',
    }
  });
  return styles;
}