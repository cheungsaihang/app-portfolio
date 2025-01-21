import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import Sizes from '@/constants/Sizes';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const styles = useStyles();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/NotoSansHK-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(drawers)/index" options={{ 
          headerShown:false,
        }} />
        <Stack.Screen name="(stacks)/restaurantId/index" options={{
          headerTitle:'',
          headerStyle: styles.header,
          headerLeft: () => <BackArrowButton />
        }} />
        <Stack.Screen name="(stacks)/hikingId/index" options={{
          headerTitle:'',
          headerStyle: styles.header,
          headerLeft: () => <BackArrowButton />
        }} />
        <Stack.Screen name="(stacks)/login/index" options={{
          headerTitle:'',
          headerStyle: styles.header,
          headerLeft: () => <BackArrowButton />
        }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
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