import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ApiPath from "@/constants/ApiPath";
import Loading from "./_loading";
import Detail from "./_detail";
import NoDataListing from "@/modules/NoDataComponent";
import callApi from "@/utils/callApi";
import { API_HikingDetail } from "@/types/api/hikingTypes";

export default function HikingDetailScreen(){
  const { hikingId } = useLocalSearchParams(); 
  const [ isPending, setPending ] = useState(true);
  const [ hiking, setHiking ] = useState<API_HikingDetail | null>(null);

  useEffect(() => {
    if(hikingId){
      const apiUrl = ApiPath.hiking + '/' + hikingId;
      callApi(
        apiUrl,
        undefined,
        {
          onSuccess:(res:API_HikingDetail) => setHiking(res),
          onFinally:() => setPending(false)
        }
      );
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
              hiking ? (
                <Detail detail={hiking} />
              ) : (
                <NoDataListing />
              )
            }
          </>
        )
      }
    </>
  )
}