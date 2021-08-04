import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth, useAxios, useCurrentUser, useSnackbar } from '../../../../../../hooks';
import { KeyIcon } from '../../../../../../icons';
import { onlyOnDevEnv } from '../../../../../../utils';
import { GenerateTokenButton, IntegrationsTitle, WarningNote } from '../Account.styled';

const IntegrationsTab = () => {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const axios = useAxios();
  const { logout } = useAuth();
  const showSnackbar = useSnackbar();

  console.log(currentUser);

  const generateIntegrationsToken = useCallback(async () => {
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

  const isTokenGenerated = useMemo(
    () => Boolean(currentUser?.externalIntegrationsToken),
    [currentUser?.externalIntegrationsToken],
  );

  console.log(isTokenGenerated);

  return (
    <>
      <IntegrationsTitle>
        {t('routes.settings.account.integrations.extendedTitle')}
      </IntegrationsTitle>
      <p>
        Here you can integrate with external services. Thanks to that you will be able for example
        to open doors with <strong>voice assistant</strong>.
      </p>
      <br />
      <p>
        In order to integrate with external services, you have to generate your private token key.
      </p>
      {/* <Link to="https://www.icloud.com/shortcuts/5f754527e564467d8b56322d2fab010b" asOuterLink> */}
      {/*  Apple shortcut EN */}
      {/* </Link> */}
      {/* <br /> */}
      {/* <Link to="https://www.icloud.com/shortcuts/2f72b75a096549bc8352b317f7d7c9fc" asOuterLink> */}
      {/*  Apple shortcut PL */}
      {/* </Link> */}
      <GenerateTokenButton fullWidth onClick={generateIntegrationsToken}>
        {t('routes.settings.account.integrations.generateApiKey')}
        <KeyIcon />
      </GenerateTokenButton>
      <WarningNote>
        <strong>Warning:</strong> Don’t share your token to anyone.
        <br /> Every user should have his own unique token.
      </WarningNote>
    </>
  );
};

export default IntegrationsTab;
