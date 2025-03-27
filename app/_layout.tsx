import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import useAppInit from './useAppInit';
import { useThemeColors } from '@/hooks/useThemeColors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Sizes from '@/constants/Sizes';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appInited] = useAppInit(); 

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
        header:() => <StackHeader />,
        animation:'ios_from_right'
      }}>
        <Stack.Screen name="(drawers)/index" options={{headerShown:false}}/>
        <Stack.Screen name="(stacks)/restaurantId/index" />
        <Stack.Screen name="(stacks)/hikingId/index" />
        <Stack.Screen name="(stacks)/login/index" />
        <Stack.Screen name="(stacks)/profile" />
        <Stack.Screen name="(stacks)/camera" />
        <Stack.Screen name="(stacks)/textClassify" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style='light'  />
    </>
  );
}

function StackHeader(){
  const router = useRouter();
  const styles = useStyles();
  return (
    <View style={styles.header}>
       <TouchableOpacity 
          onPress={() => router.back() }
        >
          <Ionicons name='chevron-back' size={Sizes.icon} style={styles.icon} />
        </TouchableOpacity>
    </View>
  )
}
function useStyles(){
  const themeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    header:{
      paddingTop:insets.top,
      backgroundColor:themeColors.menuBackground,
      height:(insets.top + Sizes.height.header),
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:Sizes.spacing.horizontal,
    },
    icon:{
      color:themeColors.icon,
    }
  });
  return styles;
}