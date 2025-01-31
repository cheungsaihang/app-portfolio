import { SkeletonAnimation, SkeletionView } from '@/modules/Skeleton';
import DuplicateComponent from "@/modules/DuplicateComponent";
import useStyles from './useStyles';
import { View } from 'react-native';

export default function Loading() {
  const styles = useStyles();
  return (
    <SkeletonAnimation>
      <View style={styles.root}>
        <View style={styles.frame}>
          <DuplicateComponent>
            <View style={styles.root}>
              <View style={styles.labelWrap}><SkeletionView rounded /></View>
              <View style={styles.valueWrap}><SkeletionView rounded /></View>
            </View>
          </DuplicateComponent>
        </View>
      </View>
    </SkeletonAnimation>
  )
}
