import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type FeedbackType = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' |  'success' | 'warning' | 'error';

const options = {
  enableVibrateFallback: true, // Cihaz titreşim desteklemiyorsa, geri dönüş yapar
  ignoreAndroidSystemSettings: false, // Kullanıcı ayarlarına bağlı kalır
};

export const useHaptic = (feedbackType: FeedbackType = 'medium') => {
  const createHapticHandler = useCallback((type: any) => {
    return Platform.OS === 'web' ? undefined : () => ReactNativeHapticFeedback.trigger(type, options);
  }, []);

  const hapticHandlers = useMemo(
    () => ({
      light: createHapticHandler('impactLight'),
      medium: createHapticHandler('impactMedium'),
      rigid: createHapticHandler('rigid'),
      soft: createHapticHandler('soft'),
      heavy: createHapticHandler('impactHeavy'),
      success: createHapticHandler('notificationSuccess'),
      warning: createHapticHandler('notificationWarning'),
      error: createHapticHandler('notificationError'),
    }),
    [createHapticHandler],
  );

  return hapticHandlers[feedbackType];
};
