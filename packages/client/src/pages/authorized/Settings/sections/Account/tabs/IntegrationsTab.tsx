import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, ExpandoContainer, TextInput } from '../../../../../../elements';
import { useConfirmDialog } from '../../../../../../hooks';
import useExternalIntegrations from '../../../../../../hooks/useExternalIntegrations';
import { AppleIcon, CopyIcon, KeyIcon, RefreshIcon, TrashIcon } from '../../../../../../icons';
import {
  AccountTabSubtitle,
  AccountTabTitle,
  GenerateTokenButton,
  IntegrationTemplateLink,
  Note,
  RegenerateTokenButton,
  StyledCopyIcon,
  TokenActionsButtonsWrapper,
} from '../Account.styled';

const IntegrationsTab = () => {
  const { t } = useTranslation();
  const {
    copyTokenToClipboard,
    copyExternalIntegrationsUrl,
    generateToken,
    isTokenGenerated,
    token,
    deleteToken,
    appleShortcutsTemplateLink,
    externalIntegrationsUrl,
  } = useExternalIntegrations();

  const confirmDelete = useConfirmDialog({
    onConfirm: deleteToken,
    title: 'routes.settings.account.integrations.deleteToken',
    description: 'routes.settings.account.integrations.deleteTokenInfo',
  });

  const confirmRegenerate = useConfirmDialog({
    onConfirm: generateToken,
    title: 'routes.settings.account.integrations.regenerateTokenConfirmation',
    description: 'routes.settings.account.integrations.regenerateTokenConfirmationInfo',
    confirmButton: (
      <RegenerateTokenButton fullWidth>
        {t('actions.regenerate')}
        <RefreshIcon />
      </RegenerateTokenButton>
    ),
  });

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

      <ExpandoContainer
        header={
          <AccountTabSubtitle>
            {t('routes.settings.account.integrations.tokenManagement')}
          </AccountTabSubtitle>
        }
      >
        <TextInput
          name="externalIntegrationsToken"
          value={token}
          label={t('routes.settings.account.integrations.externalIntegrationsToken')}
          readOnly
          type="password"
          startAdornment={<StyledCopyIcon onClick={copyTokenToClipboard} />}
          disabled
        />
        <Note>
          <Trans i18nKey="routes.settings.account.integrations.sharingTokenWarning" />
        </Note>
        <TokenActionsButtonsWrapper>
          <Button fullWidth colorVariant="red" onClick={confirmDelete}>
            {t('actions.delete')}
            <TrashIcon />
          </Button>
          <RegenerateTokenButton fullWidth onClick={confirmRegenerate}>
            {t('actions.regenerate')}
            <RefreshIcon />
          </RegenerateTokenButton>
        </TokenActionsButtonsWrapper>
      </ExpandoContainer>

      <ExpandoContainer
        header={
          <AccountTabSubtitle>
            {t('routes.settings.account.integrations.externalIntegrationsUrl')}
          </AccountTabSubtitle>
        }
      >
        <TextInput
          name="externalIntegrationsUrl"
          value={externalIntegrationsUrl}
          label={t('routes.settings.account.integrations.externalIntegrationsUrl')}
          readOnly
          disabled
        />

        <TokenActionsButtonsWrapper>
          <Button fullWidth onClick={copyExternalIntegrationsUrl}>
            {t('routes.settings.account.integrations.copyExternalIntegrationsUrl')}
            <CopyIcon />
          </Button>
        </TokenActionsButtonsWrapper>
      </ExpandoContainer>

      <ExpandoContainer
        header={
          <AccountTabSubtitle>
            {t('routes.settings.account.integrations.integrationsTemplates')}
          </AccountTabSubtitle>
        }
      >
        <p>
          <Trans i18nKey="routes.settings.account.integrations.templatesDescription" />
        </p>
        <br />
        <Note>
          <Trans i18nKey="routes.settings.account.integrations.templatesNote" />
        </Note>
        <br />
        <br />
        <p>
          <strong>{t('routes.settings.account.integrations.pickToStart')}</strong>
        </p>
        <IntegrationTemplateLink to={appleShortcutsTemplateLink} asOuterLink>
          <AppleIcon />
          {t('routes.settings.account.integrations.shortcutsTemplate')}
        </IntegrationTemplateLink>
      </ExpandoContainer>
    </>
  );
};

export default IntegrationsTab;
