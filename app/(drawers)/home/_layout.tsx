import { ReactNode } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ContainerView from '@/modules/ContainerView';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function HomeLayout({ children }:{ children:ReactNode }) {
  const styles = useStyles();
  return (
    <ScrollView style={styles.root}>
      <ContainerView>
        {children}
      </ContainerView>
    </ScrollView>
  );
}
function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:themeColors.background
    }
  });
  return styles;
}