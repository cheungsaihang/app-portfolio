import { View } from 'react-native';
import { SkeletonAnimation, SkeletionView } from '@/modules/Skeleton';
import DuplicateComponent from '@/modules/DuplicateComponent';
import useStyles from './useStyles';
import ContainerView from '@/modules/ContainerView';

export default function Loading() {
  const styles = useStyles();

  return (
    <ContainerView>
      <SkeletonAnimation>
        <SkeletionView width={100} rounded style={styles.spacing} />
        <View>
          <DuplicateComponent times={3}>
            <SkeletionView rounded style={styles.spacing} />
          </DuplicateComponent>
        </View>
        <View style={styles.flexSide}>
          <View style={styles.pictureGrid}>
            <DuplicateComponent times={4}>
              <View style={styles.pictureWrap}><SkeletionView width={'100%'} height={'100%'} /></View>
            </DuplicateComponent>
          </View>
        </View>
      </SkeletonAnimation>
    </ContainerView>
  );
}