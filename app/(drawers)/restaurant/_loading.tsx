import { View, ViewStyle } from 'react-native';
import { SkeletionView, SkeletonAnimation } from '@/modules/Skeleton';
import CardView from '@/modules/CardView';
import DuplicateComponent from '@/modules/DuplicateComponent';
import useStyles from './useStyles';

export function LoadingTags(){
  const styles = useStyles();
  return (
    <View style={styles.tagSkeletion}>
      <DuplicateComponent times={2}>
        <SkeletionView width={50} height={20} style={{marginRight:5}} rounded />
      </DuplicateComponent>
    </View>
  )
}

export function LoadingItem({
  style
}:{
  style?:ViewStyle
}){
  const styles = useStyles();
  return ( 
    <SkeletonAnimation style={{...styles.row, ...style}}>
      <DuplicateComponent times={2}>
        <View style={styles.gird}>
          <CardView>
            <View style={styles.imageSkeletion} />
            <View style={styles.titleWrap}>
              <SkeletionView rounded />
            </View>
          </CardView>
        </View>
      </DuplicateComponent>
    </SkeletonAnimation>
  )
}

export default function Loading(){
  return {
    LoadingTags,
    LoadingItem
  }
}