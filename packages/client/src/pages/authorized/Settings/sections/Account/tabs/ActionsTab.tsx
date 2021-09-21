import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Form, TextInput } from '../../../../../../elements';
import { useAuth, useConfirmDialog, useSnackbar } from '../../../../../../hooks';
import { KeyIcon, TrashIcon } from '../../../../../../icons';
import { onlyOnDevEnv } from '../../../../../../utils';
import { AccountTabSubtitle, StyledButton, StyledConfirmLockIcon } from '../Account.styled';

const ActionsTab = () => {
  const { updatePassword, deleteCurrentUser } = useAuth();
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
    }
  }, [deleteCurrentUser, showSnackbar, t]);

  const confirmDelete = useConfirmDialog({
    onConfirm: deleteAccount,
    title: 'routes.settings.account.actions.deleteAccount',
    description: 'routes.settings.account.actions.deleteAccountInfo',
  });

  return (
    <>
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
          startAdornment={<StyledConfirmLockIcon />}
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
      <StyledButton fullWidth colorVariant="red" onClick={confirmDelete}>
        {t('routes.settings.account.actions.deleteAccount')}
        <TrashIcon />
      </StyledButton>
    </>
  );
};

export default ActionsTab;
