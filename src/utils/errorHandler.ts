// src/utils/errorHandler.ts
import * as Sentry from "@sentry/vue";

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const handleError = (error: unknown) => {
  console.error(error);
  // Add notification system or logging service
  // Sentry error handler
  Sentry.captureException(error);
};
