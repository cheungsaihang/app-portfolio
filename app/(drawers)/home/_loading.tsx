import { StyleSheet, View } from 'react-native';
import DuplicateComponent from '@/modules/DuplicateComponent';
import { SkeletionView, SkeletonAnimation } from '@/modules/Skeleton';
import { useThemeColors } from '@/hooks/useThemeColors';
import Sizes from '@/constants/Sizes';

export default function Loading(){
  const styles = useStyles();
  return (
    <SkeletonAnimation>
      <DuplicateComponent times={2}>
        <SkeletionView width={'90%'} rounded style={styles.spacing} />
      </DuplicateComponent>
      <SkeletionView rounded style={styles.spacing} />
      <View style={styles.prepareSection} />
      <DuplicateComponent times={3}>
        <SkeletionView width={'90%'} rounded style={styles.spacing} />
      </DuplicateComponent>
      <SkeletionView  rounded style={styles.spacing} />
      <SkeletionView width={'100%'} aspectRatio='16 / 9' rounded style={styles.spacing} />
    </SkeletonAnimation>
  );
}

function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    spacing:{
      marginTop:10,
    },
    prepareSection:{
      marginHorizontal:(Sizes.spacing.horizontal * -1),
      backgroundColor: themeColors.skeleton,
      height:180,
      marginVertical:20
    }
  });
  return styles;
}

