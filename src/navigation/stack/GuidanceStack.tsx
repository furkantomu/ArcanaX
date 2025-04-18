import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GuidanceHome,
  MyTarotAnalysis,
  MyTarotAnalysisDetail,
  MyTarotAnalysisSave,
  MyTarotAnalysisSaveDetail,
  MyTarotReading,
  TarotCardDesription,
  TarotCardDetail,
} from '@/screens';
import {Easing} from 'react-native-reanimated';

// Ekran geçişlerini yönetmek için animasyonlar
const CustomTransition = (transitionType: string) => ({
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 500, // Geçiş süresini biraz daha uzattım
        easing: Easing.inOut(Easing.ease), // Yumuşak geçiş için easing
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 500, // Geçiş süresini biraz daha uzattım
        easing: Easing.inOut(Easing.ease), // Yumuşak geçiş için easing
      },
    },
  },
  cardStyleInterpolator: ({current, layouts}: any) => {
    const progress = current.progress;

    let translateX = 0,
      translateY = 0;

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

    return {
      cardStyle: {
        transform: [{translateY}, {translateX}],
      },
    };
  },
});

export type RouteTypes = {
  name: string;
  component: FC<any>;
  options: object;
};

export const routes: RouteTypes[] = [
  {
    name: 'GuidanceHome',
    component: GuidanceHome,
    options: {
      headerShown: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'TarotCardDetail',
    component: TarotCardDetail,
    options: {
      headerShown: false,
      gestureEnabled: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'TarotCardDetailDescription',
    component: TarotCardDesription,
    options: {
      headerShown: false,
      ...CustomTransition('up'),
    },
  },
  {
    name: 'MyTarotReading',
    component: MyTarotReading,
    options: {
      headerShown: false,
      gestureEnabled: false,
      ...CustomTransition('down'),
    },
  },
  {
    name: 'MyTarotAnalysis',
    component: MyTarotAnalysis,
    options: {
      headerShown: false,
      gestureEnabled: false,
      ...CustomTransition('right'),
    },
  },
  {
    name: 'MyTarotAnalysisDetail',
    component: MyTarotAnalysisDetail,
    options: {
      headerShown: false,
      gestureEnabled: false,
      ...CustomTransition('down'),
    },
  },
  {
    name: 'MyTarotAnalysisSave',
    component: MyTarotAnalysisSave,
    options: {
      headerShown: false,
      gestureEnabled: false,
      ...CustomTransition('down'),
    },
  },
  {
    name: 'MyTarotAnalysisSaveDetail',
    component: MyTarotAnalysisSaveDetail,
    options: {
      headerShown: false,
      gestureEnabled: false,
      ...CustomTransition('right'),
    },
  },
];

const GuidanceStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {routes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default GuidanceStack;
