export class AppError extends Error {
  public code?: string;
  public statusCode?: number;
  public originalError?: any;

  constructor(
    message: string,
    originalError?: any,
    code?: string,
    statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.originalError = originalError;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  static fromError(error: any, message?: string): AppError {
    if (error.response) {
      return new AppError(
        message || error.response.data?.message || 'API Error',
        error,
        error.response.data?.code,
        error.response.status
      );
    }

    if (error.request) {
      return new AppError(
        message || 'Network Error',
        error,
        'NETWORK_ERROR'
      );
    }

    return new AppError(
      message || error.message || 'Unknown Error',
      error
    );
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      stack: this.stack,
    };
  }
}