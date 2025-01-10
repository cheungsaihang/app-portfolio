import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerLayout from '@/modules/NavDrawer/Layout';
import DrawerContent from '@/modules/NavDrawer/Content';
import { useThemeColors } from '@/hooks/useThemeColors';
import Sizes from '@/constants/Sizes';

type DrawerScreen = {
  name: string;
  title: string;
  component: () => ReactNode
}

const Drawer = createDrawerNavigator();

export default function NavDrawer({routes}:{routes:DrawerScreen[]}) {
  const styles = useStyle();

  return (
    <GestureHandlerRootView style={styles.root}>
      <Drawer.Navigator 
        layout={DrawerLayout}
        drawerContent={DrawerContent}
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          drawerType: 'front',
          drawerStyle: styles.drawerStyle,
          drawerLabelStyle: styles.drawerLabelStyle,
          drawerItemStyle:styles.drawerItemStyle,
          drawerActiveBackgroundColor: 'transparent',
        }}
      >
        {
          routes.map((route) => (
            <Drawer.Screen
              key={route.name}
              name={route.name}
              options={{
                title: route.title,
              }}
              component={route.component}
            />
          ))
        }        
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}

function useStyle(){
  const themeColors = useThemeColors();
  const styles = StyleSheet.create({
    root:{
      flex:1,
      backgroundColor:themeColors.menuBackground
    },
    drawerStyle:{
      backgroundColor:themeColors.menuBackground,
      width: 250,
      borderTopRightRadius:0,
      borderBottomRightRadius:0,
      padding:0,
      paddingLeft:0,      
    },
    drawerLabelStyle:{
      color:themeColors.drawerLink,
      fontSize:Sizes.fonts.medium,
    },
    drawerItemStyle: {
      borderRadius: 0,
      marginBottom: 1,
    },
  })
  return styles;
}