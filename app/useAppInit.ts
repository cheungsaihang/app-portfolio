import { useEffect, useState } from "react";
import ApiPath from "@/constants/ApiPath";
import { useAuthStore } from "@/hooks/zustand/useAuthStore";
import { API_RefreshTokens } from "@/types/api/authTypes";
import { isErrorResponse } from "@/utils/apiResponse";
import { fetchApi } from "@/utils/callApi";
import { useFonts } from "expo-font";

export default function useAppInit(){
  const [ inited, setInited ] = useState(false);
  const auth = useAuthStore();
  const [fontLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/NotoSansHK-VariableFont_wght.ttf'),
  });
  useEffect(() => {
    if(!fontLoaded){
      return ;
    }
    if(!auth.sid || !auth.rsid){
      setInited(true);
      return ;
    }
    refreshToken(auth.sid,auth.rsid).then(res => {
      const [newAccessToken,newRefreshToken] = res;
      auth.setAccessToken(newAccessToken);
      auth.setRefreshToken(newRefreshToken);
      setInited(true);
    });
  },[fontLoaded]);

  return [inited];
}

async function refreshToken(sid:string,rsid:string){
  const apiUrl = ApiPath.auth.refreshToken + `/${rsid}`;
  const res = await fetchApi(apiUrl,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${sid}`
    },
  });
  if(isErrorResponse(res)){
    return [null, null] as const;
  }
  const tokens = res.result as API_RefreshTokens;
  return [tokens.accessToken, tokens.refreshToken] as const;
}