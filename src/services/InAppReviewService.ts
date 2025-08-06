import { Platform } from 'react-native';
import InAppReview from 'react-native-in-app-review';

export interface InAppReviewConfig {
  maxRequestCount?: number;
  minDaysBetweenRequests?: number;
  showReviewDialog?: boolean;
}

class InAppReviewService {
  private static instance: InAppReviewService;
  private requestCount: number = 0;
  private lastRequestDate: Date | null = null;

  private constructor() {}

  public static getInstance(): InAppReviewService {
    if (!InAppReviewService.instance) {
      InAppReviewService.instance = new InAppReviewService();
    }
    return InAppReviewService.instance;
  }

  /**
   * Check if in-app review is available on the current device
   */
  public async isAvailable(): Promise<boolean> {
    try {
      return await InAppReview.isAvailable();
    } catch (error) {
      console.error('Error checking in-app review availability:', error);
      return false;
    }
  }

  /**
   * Request in-app review with optional configuration
   */
  public async requestReview(config?: InAppReviewConfig): Promise<boolean> {
    try {
      // Check if in-app review is available
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        console.log('In-app review is not available on this device');
        return false;
      }

      // Check if we should show the review dialog
      if (config?.showReviewDialog === false) {
        return false;
      }

      // Check request count limit
      if (config?.maxRequestCount && this.requestCount >= config.maxRequestCount) {
        console.log('Maximum review request count reached');
        return false;
      }

      // Check time between requests
      if (config?.minDaysBetweenRequests && this.lastRequestDate) {
        const daysSinceLastRequest = this.getDaysBetween(this.lastRequestDate, new Date());
        if (daysSinceLastRequest < config.minDaysBetweenRequests) {
          console.log('Minimum days between review requests not met');
          return false;
        }
      }

      // Request the review
      const result = await InAppReview.RequestInAppReview();
      
      // Update tracking
      this.requestCount++;
      this.lastRequestDate = new Date();

      console.log('In-app review requested successfully');
      return result;
    } catch (error) {
      console.error('Error requesting in-app review:', error);
      return false;
    }
  }

  /**
   * Request review after a positive user action (recommended approach)
   */
  public async requestReviewAfterPositiveAction(): Promise<boolean> {
    return this.requestReview({
      maxRequestCount: 3,
      minDaysBetweenRequests: 7,
      showReviewDialog: true,
    });
  }

  /**
   * Request review after app usage milestone
   */
  public async requestReviewAfterMilestone(milestone: string): Promise<boolean> {
    console.log(`Requesting review after milestone: ${milestone}`);
    return this.requestReview({
      maxRequestCount: 5,
      minDaysBetweenRequests: 14,
      showReviewDialog: true,
    });
  }

  /**
   * Reset the service state (useful for testing or app updates)
   */
  public reset(): void {
    this.requestCount = 0;
    this.lastRequestDate = null;
  }

  /**
   * Get current request statistics
   */
  public getStats(): { requestCount: number; lastRequestDate: Date | null } {
    return {
      requestCount: this.requestCount,
      lastRequestDate: this.lastRequestDate,
    };
  }

  /**
   * Calculate days between two dates
   */
  private getDaysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  }

  /**
   * Check if the app is available on the store
   */
  public async isAvailableOnStore(): Promise<boolean> {
    try {
      if (Platform.OS === 'ios') {
        return await InAppReview.isAvailableOnStore();
      }
      return true; // Android doesn't have this method
    } catch (error) {
      console.error('Error checking store availability:', error);
      return false;
    }
  }
}

export default InAppReviewService;