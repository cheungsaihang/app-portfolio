import { useEffect, useState } from 'react';
import { LoadingItem } from './_loading';
import callApi from '@/utils/callApi';
import ApiPath from '@/constants/ApiPath';
import RestaurantDetail from './_detail';
import RestaurantLayout from './_layout';
import RestaurantTags from './_tags';
import { API_RestaurantListResponse } from '@/types/api/restaurantTypes';

export default function RestaurantScreen() {
  const [isPending, setPending] = useState(true);
  const [restaurant, setRestaurant] = useState<API_RestaurantListResponse | null>(null);
  const [apiUrl, setApiUrl] = useState(ApiPath.restaurant);

  const onChangeTag = (index:number, tag:string) => {
    setApiUrl(ApiPath.restaurant + (index > 0 ? `?tags=${tag}` : ''));
  }

  useEffect(() => {
    callApi(
      apiUrl,
      undefined,
      {
        onStart:() => setPending(true),
        onSuccess:(res:API_RestaurantListResponse) => setRestaurant(res),
        onFinally:() => setPending(false)
      }
    );
  },[apiUrl]);

  return (
    <RestaurantLayout>
      <RestaurantTags onChangeTag={onChangeTag}/>
      {
        isPending ? (
          <LoadingItem />
        ) : (
          <RestaurantDetail
            apiUrl={apiUrl}
            records={restaurant?.records || null} 
            isMorePage={restaurant?.pagination?.isMorePage || false} 
          />
        )
      }
    </RestaurantLayout>
  );
}