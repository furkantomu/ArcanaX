import { useCallback, useState } from 'react';
import InAppReviewService from '../services/InAppReviewService';
import type { InAppReviewConfig } from '../services/InAppReviewService';

export interface UseInAppReviewReturn {
  isAvailable: boolean;
  isLoading: boolean;
  requestReview: (config?: InAppReviewConfig) => Promise<boolean>;
  requestReviewAfterPositiveAction: () => Promise<boolean>;
  requestReviewAfterMilestone: (milestone: string) => Promise<boolean>;
  checkAvailability: () => Promise<void>;
  reset: () => void;
  stats: {
    requestCount: number;
    lastRequestDate: Date | null;
  };
}

export const useInAppReview = (): UseInAppReviewReturn => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const service = InAppReviewService.getInstance();

  const checkAvailability = useCallback(async () => {
    try {
      setIsLoading(true);
      const available = await service.isAvailable();
      setIsAvailable(available);
    } catch (error) {
      console.error('Error checking in-app review availability:', error);
      setIsAvailable(false);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const requestReview = useCallback(
    async (config?: InAppReviewConfig): Promise<boolean> => {
      try {
        setIsLoading(true);
        const result = await service.requestReview(config);
        return result;
      } catch (error) {
        console.error('Error requesting in-app review:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [service]
  );

  const requestReviewAfterPositiveAction = useCallback(async (): Promise<boolean> => {
    return requestReview();
  }, [requestReview]);

  const requestReviewAfterMilestone = useCallback(
    async (milestone: string): Promise<boolean> => {
      try {
        setIsLoading(true);
        const result = await service.requestReviewAfterMilestone(milestone);
        return result;
      } catch (error) {
        console.error('Error requesting in-app review after milestone:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [service]
  );

  const reset = useCallback(() => {
    service.reset();
  }, [service]);

  const stats = service.getStats();

  return {
    isAvailable,
    isLoading,
    requestReview,
    requestReviewAfterPositiveAction,
    requestReviewAfterMilestone,
    checkAvailability,
    reset,
    stats,
  };
};