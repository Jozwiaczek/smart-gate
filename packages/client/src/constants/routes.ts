const routes = {
  authorized: {
    appBar: {
      HOME: '/',
      HISTORY: '/history',
      admin: {
        ADMIN: '/admin',
        DEVICE: '/admin/device',
        USERS: '/admin/users',
        INVITATIONS: '/admin/invitations',
        PRIVILEGES: '/admin/privileges',
        STATISTICS: '/admin/statistics',
      },
      SETTINGS: '/settings',
    },
  },
  unauthorized: {
    LOGIN: '/login',
    REGISTRATION: '/registration/:email/:code',
    PAGE_NOT_FOUND: '/pageNotFound',
    PASSWORD_RECOVERY: '/passwordRecovery',
    PASSWORD_RECOVERY_UPDATE: '/passwordRecovery/magicLink/:email/:code',
  },
};

export default routes;
