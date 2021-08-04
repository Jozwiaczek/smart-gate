import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { onlyOnDevEnv } from '../utils';
import { useAuth, useAxios, useCurrentUser, useSnackbar } from './index';

const useExternalIntegrations = () => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const axios = useAxios();
  const { logout } = useAuth();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();

  const generateToken = useCallback(async () => {
    try {
      if (!currentUser) {
        await logout();
        return;
      }

      const { data: externalIntegrationsToken } = await axios.post<string>(
        `external-integrations/generate-token`,
      );
      setCurrentUser({ ...currentUser, externalIntegrationsToken });
      showSnackbar({
        message: t('routes.settings.account.integrations.tokenGeneratedAndCopied'),
        severity: 'success',
      });
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    }
  }, [axios, currentUser, logout, setCurrentUser, showSnackbar, t]);

  const deleteToken = useCallback(async () => {
    try {
      if (!currentUser) {
        await logout();
        return;
      }

      await axios.post(`external-integrations/delete-token`);
      setCurrentUser({ ...currentUser, externalIntegrationsToken: undefined });
      showSnackbar({
        message: t('routes.settings.account.integrations.tokenDeleted'),
        severity: 'success',
      });
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    }
  }, [axios, currentUser, logout, setCurrentUser, showSnackbar, t]);

  const token = useMemo(
    () => currentUser?.externalIntegrationsToken,
    [currentUser?.externalIntegrationsToken],
  );

  const isTokenGenerated = Boolean(token);

  return { generateToken, deleteToken, token, isTokenGenerated };
};

export default useExternalIntegrations;
