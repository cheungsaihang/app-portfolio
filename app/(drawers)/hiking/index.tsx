import { useEffect, useState } from 'react';
import { LoadingItem } from './_loading';
import callApi from '@/utils/callApi';
import ApiPath from '@/constants/ApiPath';
import HikingDetail from './_detail';
import HikingLayout from './_layout';
import HikingTags from './_tags';
import { API_HikingListResponse } from '@/types/api/hikingTypes';

export default function HikingScreen() {
  const [isPending, setPending] = useState(true);
  const [hiking, setHiking] = useState<API_HikingListResponse | null>(null);
  const [apiUrl, setApiUrl] = useState(ApiPath.hiking);

  const onChangeTag = (index:number, tag:string) => {
    setApiUrl(ApiPath.hiking + (index > 0 ? `?tags=${tag}` : ''));
  }

  useEffect(() => {
    callApi(
      apiUrl,
      undefined,
      {
        onStart:() => setPending(true),
        onSuccess:(res:API_HikingListResponse) => setHiking(res),
        onFinally:() => setPending(false)
      }
    );
  },[apiUrl]);

  return (
    <HikingLayout>
      <HikingTags onChangeTag={onChangeTag}/>
      {
        isPending ? (
          <LoadingItem style={{marginHorizontal:-5}} />
        ) : (
          <HikingDetail
            apiUrl={apiUrl}
            records={hiking?.records || null} 
            isMorePage={hiking?.pagination?.isMorePage || false} 
          />
        )
      }
    </HikingLayout>
  );
}