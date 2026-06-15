import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { ReviewTriggers, ReviewConfigs } from '../utils/reviewTriggers';
import { useInAppReview } from './useInAppReview';

export interface AppReviewTrackerConfig {
  trackAppOpens?: boolean;
  trackPositiveActions?: boolean;
  autoTriggerReviews?: boolean;
  config?: typeof ReviewConfigs.establishedUser;
}

export const useAppReviewTracker = (config: AppReviewTrackerConfig = {}) => {
  const {
    trackAppOpens = true,
    trackPositiveActions = true,
    autoTriggerReviews = true,
    config: reviewConfig = ReviewConfigs.establishedUser,
  } = config;

  const appState = useRef(AppState.currentState);
  const triggers = useRef(ReviewTriggers.getInstance());
  const { requestReviewAfterPositiveAction } = useInAppReview();

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App came to foreground
        if (trackAppOpens) {
          const shouldTrigger = await triggers.current.trackAppOpen(reviewConfig);
          if (shouldTrigger && autoTriggerReviews) {
            await triggers.current.triggerReview(reviewConfig);
          }
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [trackAppOpens, autoTriggerReviews, reviewConfig]);

  const trackPositiveAction = async () => {
    if (!trackPositiveActions) return false;

    const shouldTrigger = await triggers.current.trackPositiveAction(reviewConfig);
    
    if (shouldTrigger && autoTriggerReviews) {
      return await requestReviewAfterPositiveAction();
    }
    
    return false;
  };

  const getStats = () => {
    return triggers.current.getStats();
  };

  const resetTracking = () => {
    triggers.current.reset();
  };

  return {
    trackPositiveAction,
    getStats,
    resetTracking,
  };
};