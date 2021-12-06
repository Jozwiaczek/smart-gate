import copy from 'copy-to-clipboard';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CopyIcon } from '../../icons';
import { getApiUrl, onlyOnDevEnv } from '../../utils';
import getPublicUrl from '../../utils/getPublicUrl';
import { useAuth, useAxios, useCurrentUser, useSnackbar } from '../index';

const useExternalIntegrations = () => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const axios = useAxios();
  const { logout } = useAuth();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();

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

  const openGateTemplateShortcut = 'Open Gate.shortcut';
  const publicUrl = getPublicUrl();
  const appleShortcutsTemplateLink = `${publicUrl}/${openGateTemplateShortcut}`;
  const externalIntegrationsEndpoint = 'external-integrations';
  const apiUrl: string = getApiUrl();
  const externalIntegrationsUrl = `${apiUrl}/${externalIntegrationsEndpoint}`;

  const copyExternalIntegrationsUrl = useCallback(() => {
    copy(externalIntegrationsUrl);
  }, [externalIntegrationsUrl]);

  const generateToken = useCallback(async () => {
    try {
      if (!currentUser) {
        await logout();
        return;
      }

      const { data: externalIntegrationsToken } = await axios.post<string>(
        `${externalIntegrationsEndpoint}/generate-token`,
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
    copyExternalIntegrationsUrl,
    externalIntegrationsUrl,
  };
};

export default useExternalIntegrations;
