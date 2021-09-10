import * as Sentry from '@sentry/react-native';

export function sendError(error: any): void {
  Sentry.captureException(error);
}
