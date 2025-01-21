import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useEffect, ReactNode } from 'react';
import {Animated, useAnimatedValue, ViewStyle, View} from 'react-native';

export function SkeletonAnimation({style, children}:{style?:ViewStyle,children:ReactNode}){
  const opacity = useAnimatedValue(1);
  const options = {
    duration: 1000,
    useNativeDriver: true
  };
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, ...options }),
        Animated.timing(opacity, { toValue: 1, ...options })
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...style,
        opacity:opacity
      }}
    >{children}</Animated.View>
  );
}

export function SkeletionView({
  width,
  height,
  rounded,
  aspectRatio,
  style,
}:{
  width?:number | string;
  height?:number | string;
  rounded?:boolean;
  aspectRatio?:'1 / 1' | '4 / 3' | '3 / 4' | '16 / 9' | '9 / 16';
  style?:ViewStyle
}){
  const themeColors = useThemeColors();
  const _width = width ? width : '75%';
  const _height = height ? height : 14;
  const _style = {
    ...style,
    backgroundColor:themeColors.skeleton,
    aspectRatio: aspectRatio ? aspectRatio : undefined,
    width: _width,
    height: aspectRatio ? undefined : _height,
    borderRadius: rounded ? 20 : undefined,
  } as ViewStyle;
  return (
    <View style={_style}/>
  );
}
