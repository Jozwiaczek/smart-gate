const routes = {
  HOME: '/',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  HISTORY: '/history',
  LOGIN: '/login',
  REGISTRATION: '/registration/:email/:code',
  PAGE_NOT_FOUND: '/pageNotFound',
  PASSWORD_RECOVERY: '/passwordRecovery',
  PASSWORD_RECOVERY_UPDATE: '/passwordRecovery/magicLink/:email/:code',
};

export default routes;
