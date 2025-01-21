import Loading from "./_loading";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import ApiPath from "@/constants/ApiPath";
import callApi from "@/utils/callApi";
import Detail from "./_detail";
import { API_RestaurantDetail } from "@/types/api/restaurantTypes";
import NoDataListing from "@/modules/NoDataComponent";

export default function RestaurantDetailScreen(){
  const { restaurantId } = useLocalSearchParams(); 
  const [ isPending, setPending ] = useState(true);
  const [ restaurant, setRestaurant ] = useState<API_RestaurantDetail | null>(null);

  useEffect(() => {
    if(restaurantId){
      const apiUrl = ApiPath.restaurant + '/' + restaurantId;
      callApi(
        apiUrl,
        undefined,
        {
          onSuccess:(res:API_RestaurantDetail) => setRestaurant(res),
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
              restaurant ? (
                <Detail detail={restaurant} />
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