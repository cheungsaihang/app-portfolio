import { ReactNode, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DrawerNavigationState, NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/hooks/useThemeColors';
import MenuSwitcher from '@/modules/MenuSwitcher';
import ThemeSwitcher from '@/modules/ThemeSwitcher';
import AccountIcon from '../AccountIcon';
import { useAuthStore } from '@/hooks/zustand/useAuthStore';
import callApi from '@/utils/callApi';
import ApiPath from '@/constants/ApiPath';
import { API_AccessTokenPayload } from '@/types/api/authTypes';
import { SkeletionView } from '../Skeleton';
import Sizes from '@/constants/Sizes';

export default function DrawerLayout({
  children,
  state,
  navigation
}:{
  children: ReactNode,
  state: DrawerNavigationState<ParamListBase>
  navigation: NavigationHelpers<ParamListBase, {}>
}){  
  const styles = useStyles();
  const authStore = useAuthStore();
  const [isPending, setPending] = useState(true);
  const [decodedData, setdecodeData] = useState<API_AccessTokenPayload | null>(null);

  useEffect(() => {
    if(authStore.sid){
      setPending(true);
      callApi(ApiPath.auth.decode,{
        headers:{
          'Authorization':`Bearer ${authStore.sid}`
        }
      },{
        onSuccess:(res:API_AccessTokenPayload) => setdecodeData(res),
        onError:() => setdecodeData(null),
        onFinally:() => setPending(false)
      });
    }
    else{
      setPending(false);
      setdecodeData(null);
    }
  },[authStore]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={[styles.sideWrap,styles.left]}><MenuSwitcher state={state} navigation={navigation} /></View>
        <View style={styles.logoWrap}><Image source={require('@/assets/images/logo.gif')} style={styles.logo} /></View>
        <View style={[styles.sideWrap,styles.right]}>
          {
            isPending ? (
              <>
                <SkeletionView width={(Sizes.icon -4)} height={(Sizes.icon -4)} rounded />
                <SkeletionView width={(Sizes.icon -4)} height={(Sizes.icon -4)} rounded />
              </>
            ) : (
              <>
                <AccountIcon email={decodedData?.email} />
                <ThemeSwitcher />
              </>
            )
          }
        </View>
      </View>
      {children}
    </View>
  )
}

function useStyles(){
  const themeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    root:{
      flex:1,
      paddingTop: insets.top,
    },
    header: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height: Sizes.height.header,
      backgroundColor: themeColors.menuBackground,
      borderWidth:1,
      borderStyle:'solid',
      borderBottomColor: themeColors.layoutBorder,
    },
    sideWrap:{
      width:65,
    },
    left:{
      flexDirection:'row',
      alignItems:'center'
    },
    right:{
      flexDirection:'row-reverse',
      justifyContent:'space-between',
      alignItems:'center'
    },
    logoWrap:{
      width:40,
      height:40,
      borderRadius:20,
      overflow:'hidden'
    },
    logo:{
      width: '100%',
      height: '100%'
    },
    row:{
      flexDirection:'row'
    }
  });
}