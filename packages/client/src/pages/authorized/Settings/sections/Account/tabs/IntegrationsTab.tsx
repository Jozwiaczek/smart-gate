import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Dialog, TextInput } from '../../../../../../elements';
import useExternalIntegrations from '../../../../../../hooks/useExternalIntegrations';
import { AppleIcon, KeyIcon, RefreshIcon, TrashIcon } from '../../../../../../icons';
import { ThemeType } from '../../../../../../theme/Theme';
import {
  AccountTabSubtitle,
  AccountTabTitle,
  ConfirmDialogButtonsWrapper,
  GenerateTokenButton,
  IntegrationTemplateLink,
  Note,
  RegenerateTokenButton,
  StyledCancelIcon,
  StyledCopyIcon,
  TokenActionButton,
  TokenActionsButtonsWrapper,
} from '../Account.styled';

const IntegrationsTab = () => {
  const { t } = useTranslation();
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [isConfirmRegenerateDialogOpen, setIsConfirmRegenerateDialogOpen] = useState(false);
  const {
    copyTokenToClipboard,
    generateToken,
    isTokenGenerated,
    token,
    deleteToken,
    appleShortcutsTemplateLink,
  } = useExternalIntegrations();

  const openConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(true);
  };

  const closeConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(false);
  };

  const openConfirmRegenerateDialog = () => {
    setIsConfirmRegenerateDialogOpen(true);
  };

  const closeConfirmRegenerateDialog = () => {
    setIsConfirmRegenerateDialogOpen(false);
  };

  const onDelete = async () => {
    await deleteToken();
    closeConfirmDeleteDialog();
  };

  const onRegenerate = async () => {
    await generateToken();
    closeConfirmRegenerateDialog();
  };

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
        startAdornment={<StyledCopyIcon onClick={copyTokenToClipboard} />}
      />
      <Note>
        <Trans i18nKey="routes.settings.account.integrations.sharingTokenWarning" />
      </Note>
      <TokenActionsButtonsWrapper>
        <TokenActionButton fullWidth colorVariant="red" onClick={openConfirmDeleteDialog}>
          {t('actions.delete')}
          <TrashIcon />
        </TokenActionButton>
        <Dialog
          isOpen={isConfirmDeleteDialogOpen}
          close={closeConfirmDeleteDialog}
          title="routes.settings.account.integrations.deleteToken"
          description="routes.settings.account.integrations.deleteTokenInfo"
        >
          <ConfirmDialogButtonsWrapper>
            <Button colorVariant={ThemeType.dark} fullWidth onClick={closeConfirmDeleteDialog}>
              {t('actions.cancel')}
              <StyledCancelIcon />
            </Button>
            <Button colorVariant="red" fullWidth onClick={onDelete}>
              {t('actions.delete')}
              <TrashIcon />
            </Button>
          </ConfirmDialogButtonsWrapper>
        </Dialog>
        <RegenerateTokenButton fullWidth onClick={openConfirmRegenerateDialog}>
          {t('actions.regenerate')}
          <RefreshIcon />
        </RegenerateTokenButton>
        <Dialog
          isOpen={isConfirmRegenerateDialogOpen}
          close={closeConfirmRegenerateDialog}
          title="routes.settings.account.integrations.regenerateTokenConfirmation"
          description="routes.settings.account.integrations.regenerateTokenConfirmationInfo"
        >
          <ConfirmDialogButtonsWrapper>
            <Button colorVariant={ThemeType.dark} fullWidth onClick={closeConfirmRegenerateDialog}>
              {t('actions.cancel')}
              <StyledCancelIcon />
            </Button>
            <RegenerateTokenButton fullWidth onClick={onRegenerate}>
              {t('actions.regenerate')}
              <RefreshIcon />
            </RegenerateTokenButton>
          </ConfirmDialogButtonsWrapper>
        </Dialog>
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
      <br />
      <br />
      <p>
        <strong>{t('routes.settings.account.integrations.pickToStart')}</strong>
      </p>
      <IntegrationTemplateLink to={appleShortcutsTemplateLink} asOuterLink>
        <AppleIcon />
        {t('routes.settings.account.integrations.shortcutsTemplate')}
      </IntegrationTemplateLink>
    </>
  );
};

export default IntegrationsTab;
