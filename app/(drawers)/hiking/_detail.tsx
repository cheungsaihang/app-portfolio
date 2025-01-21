import { View, FlatList, Image, ViewStyle, ImageStyle } from 'react-native';
import CardView from '@/modules/CardView';
import { LoadingItem } from './_loading';
import ThemedText from '@/modules/ThemedText';
import callApi from '@/utils/callApi';
import { useStyles } from './hooks';
import usePagination from '@/hooks/usePagination';
import { API_HikingList, API_HikingListResponse } from '@/types/api/hikingTypes';
import NoDataListing from '@/modules/NoDataComponent';
import { useRouter } from 'expo-router';

export default function HikingDetail({
  apiUrl,
  records,
  isMorePage,
}:{
  apiUrl:string,
  records:API_HikingList[] | null;
  isMorePage:boolean;
}) {
  const router = useRouter();
  const styles = useStyles();
  const pagination = usePagination(apiUrl,{
    page:1,
    list:records || [],
    isMore:isMorePage
  });

  const onPress = (hikingId:string) => {
    router.push({pathname:'/(stacks)/hikingId', params:{ hikingId } });
  }

  const onEndReached = () => {
    if(!pagination.isMore){
      return ;
    }
    const nextApiUrl = pagination.nextUrl();
    callApi(
      nextApiUrl,
      undefined,
      {
        onSuccess:(res:API_HikingListResponse) => {
          pagination.updatePagination(res.records,res.pagination.isMorePage);
        },
        onError:() => pagination.setIsMore(false),
      }
    );
  }

  return (
    <FlatList 
      style={styles.root}
      data={pagination.list} 
      numColumns={2} 
      renderItem={renderItem({onPress, styles})}
      ListFooterComponent={() => pagination.isMore && <LoadingItem />} 
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      ListEmptyComponent={<NoDataListing style={{paddingTop:200}}/>}
    />
  );
}

function renderItem ({
  onPress,
  styles
}:{
  onPress:(id:string) => void;
  styles:{
    gird:ViewStyle,
    imageSkeletion:ViewStyle,
    image:ImageStyle,
    titleWrap:ViewStyle
  }
}){
  return ({ item }:{ item:API_HikingList }) => (
    <View style={styles.gird}>
      <CardView onPress={() => onPress(item.id)}>
        <View style={styles.imageSkeletion}>
          <Image
            style={styles.image}
            source={{
              uri: item.pic,
            }}
          />
        </View>
        <View style={styles.titleWrap}>
          <ThemedText>{item.name}</ThemedText>
        </View>
      </CardView>
    </View>
  );
}