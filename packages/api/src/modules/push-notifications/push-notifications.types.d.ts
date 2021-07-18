interface PushNotificationOptions {
  dir?: PushNotificationDirection;
  lang?: string;
  body?: string;
  tag?: string;
  image?: string;
  icon?: string;
  badge?: string;
  sound?: string;
  vibrate?: number | number[];
  timestamp?: number;
  renotify?: boolean;
  silent?: boolean;
  requireInteraction?: boolean;
  actions?: PushNotificationAction[];
}

interface PushNotificationPayload {
  title: string;
  options?: PushNotificationOptions;
}

type PushNotificationDirection = 'auto' | 'ltr' | 'rtl';

interface PushNotificationAction {
  action: string;
  title: string;
  icon?: string;
}
