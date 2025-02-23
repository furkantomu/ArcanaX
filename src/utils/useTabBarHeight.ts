import { Platform } from 'react-native';

export const TAB_BAR_HEIGHT = 83;

export const useTabBarHeight = () => {
  return Platform.OS === 'ios' ? TAB_BAR_HEIGHT : TAB_BAR_HEIGHT - 21;
};
