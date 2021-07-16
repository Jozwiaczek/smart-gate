import { AxiosInstance } from 'axios';

import { onlyOnDevEnv } from './index';

const isPushNotificationSupported = () => 'serviceWorker' in navigator && 'PushManager' in window;

const createNotificationSubscription = async (
  serviceWorker: ServiceWorkerRegistration,
): Promise<PushSubscription> => {
  const applicationServerKey = process.env.REACT_APP_PUSH_NOTIFICATION_PUBLIC_VAPID_KEY;
  return serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });
};

const saveSubscription = async (axios: AxiosInstance, subscription: PushSubscription) => {
  await axios.post('/push-notifications', JSON.stringify(subscription));
  onlyOnDevEnv(() => console.log('Web push registered'));
};

const registerWebPush = async (axios: AxiosInstance) => {
  if (!isPushNotificationSupported) {
    onlyOnDevEnv(() => console.log("Push isn't supported on this browser"));
    return;
  }

  const serviceWorker = await navigator.serviceWorker.ready;
  const isAlreadySubscribed = Boolean(await serviceWorker.pushManager.getSubscription());
  if (isAlreadySubscribed) {
    onlyOnDevEnv(() => console.log('Web push already registered'));
    return;
  }

  const subscription = await createNotificationSubscription(serviceWorker);
  await saveSubscription(axios, subscription);
};

export default registerWebPush;
