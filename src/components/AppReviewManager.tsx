import React, { useEffect } from 'react';
import { useAppReviewTracker } from '../hooks/useAppReviewTracker';
import { ReviewConfigs } from '../utils/reviewTriggers';

interface AppReviewManagerProps {
  children: React.ReactNode;
  config?: {
    trackAppOpens?: boolean;
    trackPositiveActions?: boolean;
    autoTriggerReviews?: boolean;
    reviewConfig?: typeof ReviewConfigs.establishedUser;
  };
}

/**
 * AppReviewManager component that handles in-app review functionality
 * This component should be placed at the root level of your app
 */
const AppReviewManager: React.FC<AppReviewManagerProps> = ({ 
  children, 
  config = {} 
}) => {
  const {
    trackPositiveAction,
    getStats,
    resetTracking,
  } = useAppReviewTracker({
    trackAppOpens: config.trackAppOpens ?? true,
    trackPositiveActions: config.trackPositiveActions ?? true,
    autoTriggerReviews: config.autoTriggerReviews ?? true,
    config: config.reviewConfig ?? ReviewConfigs.establishedUser,
  });

  useEffect(() => {
    // Log stats for debugging (remove in production)
    const stats = getStats();
    console.log('App Review Stats:', stats);
  }, [getStats]);

  // Expose the trackPositiveAction function globally for use in other components
  React.useImperativeHandle(React.useRef(), () => ({
    trackPositiveAction,
    getStats,
    resetTracking,
  }));

  return <>{children}</>;
};

export default AppReviewManager;