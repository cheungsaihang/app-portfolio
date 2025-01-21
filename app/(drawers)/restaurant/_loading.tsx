import { View } from 'react-native';
import { SkeletionView, SkeletonAnimation } from '@/modules/Skeleton';
import CardView from '@/modules/CardView';
import DuplicateComponent from '@/modules/DuplicateComponent';
import { useStyles } from './hooks';

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

export function LoadingItem(){
  const styles = useStyles();
  return ( 
    <SkeletonAnimation style={styles.row}>
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