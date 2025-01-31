import { useEffect, useState } from "react";
import { useAuthStore } from "@/hooks/zustand/useAuthStore";
import ApiPath from "@/constants/ApiPath";
import callApi from "@/utils/callApi";
import Loading from "./_loading";
import ProfileScreenDetail from "./_detail";
import NoDataListing from "@/modules/NoDataComponent";
import { API_UsersDetail } from "@/types/api/usersTypes";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { sid } = useAuthStore();
  const [ isPending, setPending ] = useState(true);
  const [ userProfile, setUserProfile] = useState<API_UsersDetail | null>(null);

  useEffect(() => {
    if(sid){
      callApi(
        ApiPath.user,
        {
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${sid}`
          }, 
        },
        {
          onSuccess:(res:API_UsersDetail) => setUserProfile(res),
          onFinally:() => setPending(false)
        }
      );
    }
    else{
      router.back();
    }
  },[]);

  return ( 
    <>
      {
        isPending ? (
          <Loading />
        ) : (
          <>
            {
              userProfile ? (
                <ProfileScreenDetail profile={userProfile} />
              ) : (
                <NoDataListing />
              )
            }
          </>
        )
      }
    </>
  );
}