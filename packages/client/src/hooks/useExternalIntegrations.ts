import copy from 'copy-to-clipboard';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SGLocale } from '../i18n';
import { CopyIcon } from '../icons';
import { onlyOnDevEnv } from '../utils';
import { useAuth, useAxios, useCurrentUser, useSnackbar } from './index';

const useExternalIntegrations = () => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const axios = useAxios();
  const { logout } = useAuth();
  const showSnackbar = useSnackbar();
  const { t, i18n } = useTranslation();

  const token = useMemo(
    () => currentUser?.externalIntegrationsToken,
    [currentUser?.externalIntegrationsToken],
  );

  const isTokenGenerated = Boolean(token);

  const copyTokenToClipboard = useCallback(() => {
    if (!token) {
      return;
    }
    copy(token);
    showSnackbar({
      message: t('routes.settings.account.integrations.tokenCopied'),
      leftAdornment: CopyIcon,
    });
  }, [showSnackbar, t, token]);

  const appleShortcutsTemplateLink = useMemo(() => {
    const enUrl = 'https://www.icloud.com/shortcuts/3648757aeaf541e58752307b915c14d2';
    const plUrl = 'https://www.icloud.com/shortcuts/4fcd6357afc4481484412164999e4106';

    switch (i18n.language as SGLocale) {
      case SGLocale.en:
        return enUrl;
      case SGLocale.pl:
        return plUrl;
      default:
        return enUrl;
    }
  }, [i18n.language]);

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
      copy(externalIntegrationsToken);
      showSnackbar({
        message: t('routes.settings.account.integrations.tokenCopied'),
        leftAdornment: CopyIcon,
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

  return {
    generateToken,
    deleteToken,
    token,
    isTokenGenerated,
    appleShortcutsTemplateLink,
    copyTokenToClipboard,
  };
};

export default useExternalIntegrations;
