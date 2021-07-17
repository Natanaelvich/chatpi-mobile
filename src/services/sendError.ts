import * as Sentry from '@sentry/react-native';
import crashlytics from '@react-native-firebase/crashlytics';

export function sendError(error: any): void {
  Sentry.captureException(error);
  crashlytics().recordError(error);
}
