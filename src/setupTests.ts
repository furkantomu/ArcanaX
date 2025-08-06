import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-firebase
jest.mock('@react-native-firebase/crashlytics', () => ({
  __esModule: true,
  default: () => ({
    recordError: jest.fn(),
    log: jest.fn(),
    setAttributes: jest.fn(),
  }),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Silence the warning https://github.com/facebook/react-native/issues/11094
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');