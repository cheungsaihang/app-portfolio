import { useEffect, useState } from 'react';
import ApiPath from '@/constants/ApiPath';
import callApi from '@/utils/callApi';
import { Article_Home } from '@/types/api/homeTypes';
import ThemedText from '@/modules/ThemedText';
import Layout from './_layout';
import Detail from './_detail';
import Loading from './_loading';

export default function HomeScreen() {
  const [isPending, setPending] = useState(true);
  const [article, setArticle] = useState<Article_Home | null>(null);

  useEffect(() => {
    callApi(
      ApiPath.home, 
      undefined,
      {
        onSuccess: (_article:Article_Home) => setArticle(_article),
        onFinally: () => setPending(false)
      }
    );
  },[]);

  return (
    <Layout>
      {
        isPending ? (
          <Loading />
        ) : (
          <>
            {
              article ? (
                <Detail article={article} />
              ) : (
                <ThemedText>Something went wrong</ThemedText>
              )
            }
          </>
        )
      }
    </Layout>
  );
}