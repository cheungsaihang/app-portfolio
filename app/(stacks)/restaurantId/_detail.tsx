import { ScrollView, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import WebView from "react-native-webview";
import DuplicateComponent from "@/modules/DuplicateComponent";
import useStyles from "./useStyles";
import ContainerView from "@/modules/ContainerView";
import { API_RestaurantDetail } from "@/types/api/restaurantTypes";
import AutoHeightImage from "@/modules/AutoHeightImage";

const cssIframe = `width:100%;height:100%;border:0;`;

export default function Detail({detail}:{detail:API_RestaurantDetail}){
  const styles = useStyles();
  return (
    <ScrollView style={styles.root}>
      <ContainerView>
        <Text style={styles.title}>{detail.name}</Text>
        <View>
        {
          detail.reviews.map((item, index) => (
            <View key={index}>
              <Text key={`review-${index}`} style={styles.reviewText}>{item.review}</Text>
              {
                item.pic && <AutoHeightImage src={item.pic} style={styles.picture} width={'100%'} />
              }
            </View>
          ))
        }
        </View>
        <View style={styles.flexSide}>
          {
            detail.rate && (
              <>
                <Text style={styles.infoText}>評分</Text>
                <View style={styles.row}>
                  <DuplicateComponent times={detail.rate}>
                    <Ionicons name="star" size={18} color="#FFD700" style={styles.star} />
                  </DuplicateComponent>
                </View>
              </>
            )
          }
          {
            detail.location && (
              <View style={styles.subInfoWrap}>
                <Text style={styles.infoText}>位置</Text>
                <WebView
                  style={styles.webView}
                  bounces={false}
                  scrollEnabled={false}
                  source={{html: `<iframe width="100%" height="100%" style="${cssIframe}" src="${detail.location}" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`}}
                />
              </View>
            )
          }
          {
            detail.tags && (
              <View style={[styles.subInfoWrap, styles.row]}>
                {
                  detail.tags.map((tag,index) => (
                    <View key={`tag-${index}`} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))                    
                }
              </View>
            )
          }
        </View>
      </ContainerView>
    </ScrollView>
  )
}