import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import useAppInit from './useAppInit';
import { useThemeColors } from '@/hooks/useThemeColors';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Sizes from '@/constants/Sizes';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appInited] = useAppInit(); 
  const styles = useStyles();

  useEffect(() => {
    if (appInited) {
      SplashScreen.hideAsync();
    }
  }, [appInited]);

  if (!appInited) {
    return null;
  }
  return (
    <>
      <Stack screenOptions={{
        headerStyle:styles.header,
        headerTitle:'',
        headerLeft: () => <BackArrowButton />
      }}>
        <Stack.Screen name="(drawers)/index" options={{headerShown:false}}/>
        <Stack.Screen name="(stacks)/restaurantId/index" />
        <Stack.Screen name="(stacks)/hikingId/index" />
        <Stack.Screen name="(stacks)/login/index" />
        <Stack.Screen name="(stacks)/profile" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style='light'  />
    </>
  );
}

function BackArrowButton(){
  const router = useRouter();
  const styles = useStyles();
  return (
    <TouchableOpacity 
      onPress={() => router.back() }
    >
      <Ionicons name='chevron-back' size={Sizes.icon} style={styles.icon} />
    </TouchableOpacity>
  )
}

function useStyles(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    header:{
      backgroundColor:themeColors.menuBackground,
      paddingLeft:0,
      paddingStart:0
    },
    icon:{
      color:themeColors.icon,
    }
  });
  return styles;
}