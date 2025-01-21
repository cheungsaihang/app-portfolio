"use client"
import { Fragment, useRef } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import WebView from "react-native-webview";
import DuplicateComponent from "@/modules/DuplicateComponent";
import PopupWrapper, { usePopupWrapper } from "@/modules/PopupWrapper";
import Gallery from "@/modules/Gallery";
import { useStyles } from "./hooks";
import { API_HikingDetail } from "@/types/api/hikingTypes";
import ContainerView from "@/modules/ContainerView";

const cssIframe = `width:100%;height:100%;border:0;`;

export default function Detail({detail}:{detail:API_HikingDetail}){
  const styles = useStyles();
  const picsCount = detail.pics.length;
  const pics = picsCount > 4 ? detail.pics.slice(0,4) : detail.pics;
  const zoomPic = useRef<number>(0);
  const wrapperControl = usePopupWrapper();
  const popupZoom = (picIndex:number) => {
    zoomPic.current = picIndex;
    wrapperControl.setShowWrapper(true);
  }

  return (
    <Fragment>
      <ScrollView style={styles.root}>
        <ContainerView>
          <Text style={styles.title}>{detail.name}</Text>
          {
            detail.difficult && (
              <View style={styles.difficult}>
                <Text style={styles.difficultText}>難度：</Text>
                <DuplicateComponent times={detail.difficult}>
                  <Ionicons name="star" style={styles.star} />
                </DuplicateComponent>
              </View>
            )
          }
          <View>
            {
              detail.reviews.map((review, index) => (
                <Text key={`review-${index}`} style={styles.reviewText}>{review}</Text>
              ))
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
          <View style={styles.flexSide}>
            <View style={styles.pictureGrid}>
              {
                pics.map((pic,index) => (
                  <TouchableOpacity 
                    key={`picture-${index}`} 
                    style={styles.pictureWrap}
                    onPress={() => popupZoom(index)}
                  >
                    <Image src={pic} alt={detail.name} style={styles.picture} />
                    {
                      (picsCount > 4 && index == 3) && (
                        <View style={styles.shadowMore}>
                          <Text style={styles.shadowMoreText}>+{(picsCount - 4)}</Text>
                        </View>
                      )
                    }
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
          {
            detail?.map && (
              <View style={styles.subInfoWrap}>
                <Text style={styles.infoText}>路線</Text>
                <WebView
                  style={styles.webView}
                  bounces={false}
                  scrollEnabled={false}
                  source={{html: `<iframe width="100%" height="100%" style="${cssIframe}" src="${detail.map}" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`}}
                />
              </View>
            )
          }
        </ContainerView>
      </ScrollView>
      <PopupWrapper control={wrapperControl}>
        <Gallery index={zoomPic.current} pics={detail.pics} />
      </PopupWrapper>
    </Fragment>
  )
}