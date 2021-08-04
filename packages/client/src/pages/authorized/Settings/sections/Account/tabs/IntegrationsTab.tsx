import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Link } from '../../../../../../elements';
import useExternalIntegrations from '../../../../../../hooks/useExternalIntegrations';
import { KeyIcon, TrashIcon } from '../../../../../../icons';
import {
  AccountTabSubtitle,
  AccountTabTitle,
  GenerateTokenButton,
  TokenActionsButtonsWrapper,
  WarningNote,
} from '../Account.styled';

const IntegrationsTab = () => {
  const { t } = useTranslation();
  const { generateToken, isTokenGenerated, token, deleteToken } = useExternalIntegrations();

  if (!isTokenGenerated) {
    return (
      <>
        <AccountTabTitle>{t('routes.settings.account.integrations.extendedTitle')}</AccountTabTitle>
        <p>
          <Trans i18nKey="routes.settings.account.integrations.description" />
        </p>
        <br />
        <p>{t('routes.settings.account.integrations.generateTokenToIntegrate')}</p>
        <GenerateTokenButton fullWidth onClick={generateToken}>
          {t('routes.settings.account.integrations.generateApiKey')}
          <KeyIcon />
        </GenerateTokenButton>
        <WarningNote>
          <Trans i18nKey="routes.settings.account.integrations.sharingTokenWarning" />
        </WarningNote>
      </>
    );
  }

  return (
    <>
      <AccountTabTitle>{t('routes.settings.account.integrations.extendedTitle')}</AccountTabTitle>
      <p>
        <Trans i18nKey="routes.settings.account.integrations.description" />
      </p>

      <AccountTabSubtitle>Token management</AccountTabSubtitle>
      <p>Integrations token: {token}</p>
      <TokenActionsButtonsWrapper>
        <Button fullWidth colorVariant="red" onClick={deleteToken}>
          Delete token
          <TrashIcon />
        </Button>
        <Button fullWidth onClick={generateToken}>
          Regenerate token
        </Button>
      </TokenActionsButtonsWrapper>
      <WarningNote>
        <Trans i18nKey="routes.settings.account.integrations.sharingTokenWarning" />
      </WarningNote>

      <AccountTabSubtitle>Integrations templates</AccountTabSubtitle>
      <Link to="https://www.icloud.com/shortcuts/5f754527e564467d8b56322d2fab010b" asOuterLink>
        Apple shortcut EN
      </Link>
      <br />
      <Link to="https://www.icloud.com/shortcuts/2f72b75a096549bc8352b317f7d7c9fc" asOuterLink>
        Apple shortcut PL
      </Link>
    </>
  );
};

export default IntegrationsTab;
