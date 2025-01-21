import { SkeletonAnimation, SkeletionView } from '@/modules/Skeleton';
import DuplicateComponent from '@/modules/DuplicateComponent';
import { View } from 'react-native';
import { useStyles } from './hooks';
import ContainerView from '@/modules/ContainerView';

export default function Loading() {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <ContainerView>
        <SkeletonAnimation>
          <SkeletionView width={100} rounded style={styles.spacing} />
          <View>
            <DuplicateComponent times={3}>
              <DuplicateComponent times={2}>
                <SkeletionView rounded style={styles.spacing} />
              </DuplicateComponent>
              <SkeletionView width={'100%'} height={200} style={styles.spacing} />
              <View style={styles.spacing} />
            </DuplicateComponent>
          </View>
        </SkeletonAnimation>
      </ContainerView>
    </View>
  );
}