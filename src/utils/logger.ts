import crashlytics from '@react-native-firebase/crashlytics';

interface LogData {
  [key: string]: any;
}

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string, data?: LogData): void {
    if (__DEV__) {
      console.log(`[LOG] ${message}`, data);
    }
  }

  info(message: string, data?: LogData): void {
    if (__DEV__) {
      console.info(`[INFO] ${message}`, data);
    }
  }

  warn(message: string, data?: LogData): void {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, data);
    }
    // Could also send to analytics in production
  }

  error(message: string, error?: any, data?: LogData): void {
    if (__DEV__) {
      console.error(`[ERROR] ${message}`, error, data);
    }
    
    // Always report errors to crashlytics in production
    try {
      if (error instanceof Error) {
        crashlytics().recordError(error);
      } else {
        crashlytics().recordError(new Error(message));
      }
      
      if (data) {
        crashlytics().setAttributes(data);
      }
    } catch (e) {
      // Fail silently if crashlytics is not available
      if (__DEV__) {
        console.error('Failed to log to Crashlytics:', e);
      }
    }
  }

  debug(message: string, data?: LogData): void {
    if (__DEV__) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }
}

export const logger = Logger.getInstance();