import { AxiosInstance } from 'axios';

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

const saveSubscription = async (axios: AxiosInstance, subscription: PushSubscription) =>
  axios.post('/push-notifications', JSON.stringify(subscription));

const registerWebPush = async (axios: AxiosInstance) => {
  if (!isPushNotificationSupported) {
    return;
  }

  const serviceWorker = await navigator.serviceWorker.ready;
  const isAlreadySubscribed = Boolean(await serviceWorker.pushManager.getSubscription());
  if (isAlreadySubscribed) {
    return;
  }

  const subscription = await createNotificationSubscription(serviceWorker);
  await saveSubscription(axios, subscription);
};

export default registerWebPush;
