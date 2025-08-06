import InAppReviewService from '../services/InAppReviewService';

export interface ReviewTriggerConfig {
  minAppOpens?: number;
  minDaysSinceInstall?: number;
  minPositiveActions?: number;
  maxReviewRequests?: number;
  daysBetweenRequests?: number;
}

export class ReviewTriggers {
  private static instance: ReviewTriggers;
  private appOpenCount: number = 0;
  private positiveActionCount: number = 0;
  private installDate: Date | null = null;
  private lastReviewRequest: Date | null = null;

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): ReviewTriggers {
    if (!ReviewTriggers.instance) {
      ReviewTriggers.instance = new ReviewTriggers();
    }
    return ReviewTriggers.instance;
  }

  /**
   * Track app open and potentially trigger review
   */
  public async trackAppOpen(config?: ReviewTriggerConfig): Promise<boolean> {
    this.appOpenCount++;
    this.saveToStorage();

    return this.shouldTriggerReview(config);
  }

  /**
   * Track positive user action and potentially trigger review
   */
  public async trackPositiveAction(config?: ReviewTriggerConfig): Promise<boolean> {
    this.positiveActionCount++;
    this.saveToStorage();

    return this.shouldTriggerReview(config);
  }

  /**
   * Manually trigger review with custom configuration
   */
  public async triggerReview(config?: ReviewTriggerConfig): Promise<boolean> {
    const shouldTrigger = await this.shouldTriggerReview(config);
    
    if (shouldTrigger) {
      const service = InAppReviewService.getInstance();
      const success = await service.requestReview({
        maxRequestCount: config?.maxReviewRequests || 3,
        minDaysBetweenRequests: config?.daysBetweenRequests || 7,
        showReviewDialog: true,
      });

      if (success) {
        this.lastReviewRequest = new Date();
        this.saveToStorage();
      }

      return success;
    }

    return false;
  }

  /**
   * Check if review should be triggered based on configuration
   */
  private async shouldTriggerReview(config?: ReviewTriggerConfig): Promise<boolean> {
    const service = InAppReviewService.getInstance();

    // Check if in-app review is available
    const isAvailable = await service.isAvailable();
    if (!isAvailable) {
      return false;
    }

    // Check minimum app opens
    if (config?.minAppOpens && this.appOpenCount < config.minAppOpens) {
      return false;
    }

    // Check minimum days since install
    if (config?.minDaysSinceInstall && this.installDate) {
      const daysSinceInstall = this.getDaysBetween(this.installDate, new Date());
      if (daysSinceInstall < config.minDaysSinceInstall) {
        return false;
      }
    }

    // Check minimum positive actions
    if (config?.minPositiveActions && this.positiveActionCount < config.minPositiveActions) {
      return false;
    }

    // Check days between requests
    if (config?.daysBetweenRequests && this.lastReviewRequest) {
      const daysSinceLastRequest = this.getDaysBetween(this.lastReviewRequest, new Date());
      if (daysSinceLastRequest < config.daysBetweenRequests) {
        return false;
      }
    }

    // Check maximum review requests
    const stats = service.getStats();
    if (config?.maxReviewRequests && stats.requestCount >= config.maxReviewRequests) {
      return false;
    }

    return true;
  }

  /**
   * Set install date (call this when app is first installed)
   */
  public setInstallDate(date: Date = new Date()): void {
    this.installDate = date;
    this.saveToStorage();
  }

  /**
   * Reset all tracking data
   */
  public reset(): void {
    this.appOpenCount = 0;
    this.positiveActionCount = 0;
    this.installDate = null;
    this.lastReviewRequest = null;
    this.saveToStorage();
  }

  /**
   * Get current statistics
   */
  public getStats() {
    return {
      appOpenCount: this.appOpenCount,
      positiveActionCount: this.positiveActionCount,
      installDate: this.installDate,
      lastReviewRequest: this.lastReviewRequest,
    };
  }

  /**
   * Calculate days between two dates
   */
  private getDaysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  }

  /**
   * Load data from storage (you can implement this with AsyncStorage)
   */
  private loadFromStorage(): void {
    // TODO: Implement loading from AsyncStorage
    // For now, we'll use default values
  }

  /**
   * Save data to storage (you can implement this with AsyncStorage)
   */
  private saveToStorage(): void {
    // TODO: Implement saving to AsyncStorage
    // For now, we'll just keep data in memory
  }
}

// Predefined configurations for common scenarios
export const ReviewConfigs = {
  // Trigger after 5 app opens and 3 positive actions
  earlyEngagement: {
    minAppOpens: 5,
    minPositiveActions: 3,
    maxReviewRequests: 2,
    daysBetweenRequests: 7,
  },

  // Trigger after 10 app opens and 7 days since install
  establishedUser: {
    minAppOpens: 10,
    minDaysSinceInstall: 7,
    minPositiveActions: 5,
    maxReviewRequests: 3,
    daysBetweenRequests: 14,
  },

  // Trigger after significant engagement
  powerUser: {
    minAppOpens: 20,
    minDaysSinceInstall: 14,
    minPositiveActions: 15,
    maxReviewRequests: 5,
    daysBetweenRequests: 30,
  },
};