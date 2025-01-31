import { useState } from "react";
import { Zod_LoginValidationSchema } from "@/schemas/auth.schema";
import callApi from "@/utils/callApi";
import ApiPath from "@/constants/ApiPath";
import { API_Error } from "@/types/api/defaultTypes";
import { API_LoginResult } from "@/types/api/authTypes";
import { useAuthStore } from "@/hooks/zustand/useAuthStore";

type LoginState = {
  isPending:boolean;
  success?:boolean;
  error?:LoginError;
}

type LoginError = {
  email?:string | string[],
  password?:string | string[],
  formSubmit?:string | string[]
}

export default function useLoginAction(){
  const authStore = useAuthStore();
  const [state, setState] = useState<LoginState>({
    isPending:false,
  });

  const loginAction = async (credential:{
    email:string,
    password:string
  }) =>{
    //Validation
    const validation = Zod_LoginValidationSchema.safeParse(credential);
    if(!validation.success){
      setState(ErrorState(validation.error.flatten().fieldErrors));
      return; 
    }
    console.log("start");
    //Call Login Api
    callApi(
      ApiPath.auth.login,{
        method: 'POST',
        body: JSON.stringify(credential),
      },{
        onStart:()=> setState(PendingState()),
        onSuccess: (res:API_LoginResult) => {
          authStore.setAccessToken(res.token.accessToken);
          authStore.setRefreshToken(res.token.refreshToken);
          setState(SuccessState());
        },
        onError: (res:API_Error)=>{
          const errMsg = getSubmitErrorMessage(res.error.short);
          setState(ErrorState({formSubmit:errMsg}));
        }
      }
    );
  }
  return [state, loginAction] as const;
}

function getSubmitErrorMessage(short:string){
  switch (short){
    case "user_not_found":
      return '沒有用戶記錄';
    case "password_not_match":
      return '密碼錯誤';
  }
  return '系統錯誤';
}

function PendingState(){
  return {
    isPending:true
  };
}
function SuccessState(){
  return {
    isPending:false,
    success:true
  };
}
function ErrorState(error:LoginError){
  const defaultError = { email: undefined, password: undefined, formSubmit:undefined };
  return {
    isPending:false,
    success:false,
    error:{
      ...defaultError,
      ...error
    }
  };
}