import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { TextInput } from '../../../../../../elements';
import useExternalIntegrations from '../../../../../../hooks/useExternalIntegrations';
import { AppleIcon, CopyIcon, KeyIcon, RefreshIcon, TrashIcon } from '../../../../../../icons';
import {
  AccountTabSubtitle,
  AccountTabTitle,
  GenerateTokenButton,
  IntegrationTemplateLink,
  Note,
  TokenActionButton,
  TokenActionsButtonsWrapper,
} from '../Account.styled';

const IntegrationsTab = () => {
  const { t } = useTranslation();
  const { generateToken, isTokenGenerated, token, deleteToken, appleShortcutsTemplateLink } =
    useExternalIntegrations();

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
        <Note>
          <Trans i18nKey="routes.settings.account.integrations.sharingTokenWarning" />
        </Note>
      </>
    );
  }

  return (
    <>
      <AccountTabTitle>{t('routes.settings.account.integrations.extendedTitle')}</AccountTabTitle>
      <p>
        <Trans i18nKey="routes.settings.account.integrations.description" />
      </p>
      <AccountTabSubtitle>
        {t('routes.settings.account.integrations.tokenManagement')}
      </AccountTabSubtitle>
      <TextInput
        name="externalIntegrationsToken"
        value={token}
        label={t('routes.settings.account.integrations.externalIntegrationsToken')}
        readOnly
        type="password"
        startAdornment={<CopyIcon />}
      />
      <Note>
        <Trans i18nKey="routes.settings.account.integrations.sharingTokenWarning" />
      </Note>
      <TokenActionsButtonsWrapper>
        <TokenActionButton fullWidth colorVariant="red" onClick={deleteToken}>
          {t('actions.delete')}
          <TrashIcon />
        </TokenActionButton>
        <TokenActionButton fullWidth onClick={generateToken}>
          {t('actions.regenerate')}
          <RefreshIcon />
        </TokenActionButton>
      </TokenActionsButtonsWrapper>
      <AccountTabSubtitle>
        {t('routes.settings.account.integrations.integrationsTemplates')}
      </AccountTabSubtitle>
      <p>
        <Trans i18nKey="routes.settings.account.integrations.templatesDescription" />
      </p>
      <br />
      <Note>
        <Trans i18nKey="routes.settings.account.integrations.templatesNote" />
      </Note>
      <IntegrationTemplateLink to={appleShortcutsTemplateLink} asOuterLink>
        <AppleIcon />
        {t('routes.settings.account.integrations.getShortcutTemplate')}
      </IntegrationTemplateLink>
    </>
  );
};

export default IntegrationsTab;
