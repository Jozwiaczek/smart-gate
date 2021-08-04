import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, Form, TextInput } from '../../../../../../elements';
import { useAuth, useSnackbar } from '../../../../../../hooks';
import { ConfirmLockIcon, KeyIcon, TrashIcon } from '../../../../../../icons';
import { ThemeType } from '../../../../../../theme/Theme';
import { onlyOnDevEnv } from '../../../../../../utils';
import {
  AccountTabSubtitle,
  AccountTabTitle,
  ConfirmDialogButtonsWrapper,
  StyledButton,
  StyledCancelIcon,
} from '../Account.styled';

const ActionsTab = () => {
  const { updatePassword, deleteCurrentUser } = useAuth();
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    getValues,
  } = useForm<UpdatePasswordInputs>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitChangePassword = useCallback(
    async (values: UpdatePasswordInputs) => {
      setLoading(true);
      try {
        await updatePassword(values);
        showSnackbar({
          message: t('routes.settings.account.actions.passwordChanged'),
          severity: 'success',
        });
      } catch (error) {
        onlyOnDevEnv(() => console.error(error));
        showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar, t, updatePassword],
  );

  const isUpdatePasswordFormDirty = !dirtyFields?.password || !dirtyFields?.confirmPassword;

  const openConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(true);
  };

  const closeConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(false);
  };

  const deleteAccount = useCallback(async () => {
    try {
      await deleteCurrentUser();
      showSnackbar({
        message: t('routes.settings.account.actions.accountDeleted'),
        severity: 'success',
      });
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    } finally {
      closeConfirmDeleteDialog();
    }
  }, [deleteCurrentUser, showSnackbar, t]);

  return (
    <>
      <AccountTabTitle>{t('routes.settings.account.actions.title')}</AccountTabTitle>
      <AccountTabSubtitle>{t('routes.settings.account.actions.changePassword')}</AccountTabSubtitle>
      <Form
        onSubmit={handleSubmit(onSubmitChangePassword)}
        errors={errors}
        register={register}
        loading={loading}
      >
        <TextInput
          data-testid="input-password"
          name="password"
          label={t('form.inputs.newPassword')}
          type="password"
          validationType="password"
          required
        />
        <TextInput
          data-testid="input-confirm-password"
          name="confirmPassword"
          label={t('form.inputs.repeatNewPassword')}
          type="password"
          placeholder={t('form.inputs.repeatNewPassword')}
          startAdornment={<ConfirmLockIcon />}
          registerOptions={{
            validate: (value) =>
              value === getValues().password ||
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              (t('form.validation.repeatPasswordError') as string),
          }}
          required
        />
        <StyledButton type="submit" fullWidth disabled={loading || isUpdatePasswordFormDirty}>
          {t('routes.settings.account.actions.changePassword')}
          <KeyIcon />
        </StyledButton>
      </Form>

      <AccountTabSubtitle>{t('routes.settings.account.actions.deleteAccount')}</AccountTabSubtitle>
      <StyledButton fullWidth colorVariant="red" onClick={openConfirmDeleteDialog}>
        {t('routes.settings.account.actions.deleteAccount')}
        <TrashIcon />
      </StyledButton>
      <Dialog
        isOpen={isConfirmDeleteDialogOpen}
        close={closeConfirmDeleteDialog}
        title="routes.settings.account.actions.deleteAccount"
        description="routes.settings.account.actions.deleteAccountInfo"
      >
        <ConfirmDialogButtonsWrapper>
          <Button colorVariant={ThemeType.dark} fullWidth onClick={closeConfirmDeleteDialog}>
            {t('actions.cancel')}
            <StyledCancelIcon />
          </Button>
          <Button colorVariant="red" fullWidth onClick={deleteAccount}>
            {t('actions.delete')}
            <TrashIcon />
          </Button>
        </ConfirmDialogButtonsWrapper>
      </Dialog>
    </>
  );
};

export default ActionsTab;
