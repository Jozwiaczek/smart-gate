import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, Form, TextInput } from '../../../../../../elements';
import { useAuth, useAxios, useCurrentUser, useSnackbar } from '../../../../../../hooks';
import { ConfirmLockIcon, KeyIcon, TrashIcon } from '../../../../../../icons';
import { ThemeType } from '../../../../../../theme/Theme';
import { onlyOnDevEnv } from '../../../../../../utils';
import {
  ConfirmDialogButtonsWrapper,
  StyledButton,
  StyledCancelIcon,
  UpdatePasswordSection,
} from '../Account.styled';

const ActionsTab = () => {
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const showSnackbar = useSnackbar();
  const { logout } = useAuth();
  const axios = useAxios();
  const [currentUser] = useCurrentUser();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    getValues,
  } = useForm<UpdatePasswordInputs>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitChangePassword = (values: UpdatePasswordInputs) => {
    try {
      console.log(values);
      showSnackbar({ message: t('form.success.update'), severity: 'success' });
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    }
  };

  const isUpdatePasswordFormDirty = !dirtyFields?.password || !dirtyFields?.confirmPassword;

  const openConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(true);
  };

  const closeConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(false);
  };

  const deleteAccount = useCallback(async () => {
    if (!currentUser?.id) {
      await logout();
      return;
    }

    try {
      await axios.delete(`/users/${currentUser.id}`);
      await logout();
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
  }, [axios, currentUser?.id, logout, showSnackbar, t]);

  return (
    <>
      <UpdatePasswordSection>
        <h4>{t('routes.settings.account.actions.changePassword')}</h4>
        <Form
          onSubmit={handleSubmit(onSubmitChangePassword)}
          errors={errors}
          loading={isSubmitting}
          register={register}
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
              validate: (value) => {
                return (
                  value === getValues().password ||
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                  (t('form.validation.repeatPasswordError') as string)
                );
              },
            }}
            required
          />
          <StyledButton fullWidth disabled={isUpdatePasswordFormDirty}>
            {t('routes.settings.account.actions.changePassword')}
            <KeyIcon />
          </StyledButton>
        </Form>
      </UpdatePasswordSection>

      <h4>{t('routes.settings.account.actions.deleteAccount')}</h4>
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
