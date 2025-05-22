import * as React from 'react';
import {StackActions, NavigationContainerRef} from '@react-navigation/native';

export type RootStackParamList = {
  [key: string]: object | undefined;
};


export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

// Add type definitions for the navigation functions
export function navigate(name: string, params?: object): void {
  navigationRef.current?.navigate({name, params});
}

export function pop(n: number): void {
  navigationRef.current?.dispatch(StackActions.pop(n));
}

export function getCurrentRouteName(): string | undefined {
  return navigationRef.current?.getCurrentRoute()?.name;
}

export function replace(name: string, params?: object): void {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export const CustomTransition = (transitionType: string) => ({
  transitionSpec: {
    open: {
      animation: 'spring',
      config: {
        stiffness: 500,      // Sertlik (daha büyük -> daha hızlı ve sert)
        damping: 50,         // Yayın sönümleme oranı
        mass: 10,              // Yayın kütlesi
        overshootClamping: true, // Taşmayı engeller
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
    close: {
      animation: 'spring',
      config: {
        stiffness: 500,
        damping: 50,
        mass: 10,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
  },
  cardStyleInterpolator: ({ current, layouts }: any) => {
    const progress = current.progress;

    let translateX = 0;
    let translateY = 0;

    switch (transitionType) {
      case 'up':
        translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.height, 0],
        });
        break;
      case 'down':
        translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-layouts.screen.height, 0],
        });
        break;
      case 'right':
        translateX = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.width, 0],
        });
        break;
      default:
        break;
    }

    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return {
      cardStyle: {
        opacity,
        transform: [{ translateY }, { translateX }],
      },
    };
  },
});
