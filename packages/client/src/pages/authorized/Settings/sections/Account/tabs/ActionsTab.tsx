import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Form, TextInput } from '../../../../../../elements';
import { useSnackbar } from '../../../../../../hooks';
import { ConfirmLockIcon, KeyIcon, TrashIcon } from '../../../../../../icons';
import { onlyOnDevEnv } from '../../../../../../utils';
import { StyledButton, UpdatePasswordSection } from '../Account.styled';

const ActionsTab = () => {
  const showSnackbar = useSnackbar();
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
      showSnackbar({ message: 'Update successful', severity: 'success' });
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    }
  };

  const isUpdatePasswordBtnDisabled = !dirtyFields?.password || !dirtyFields?.confirmPassword;

  return (
    <>
      <UpdatePasswordSection>
        <h4>Change password</h4>
        <Form
          onSubmit={handleSubmit(onSubmitChangePassword)}
          errors={errors}
          loading={isSubmitting}
          register={register}
        >
          <TextInput
            data-testid="input-password"
            name="password"
            label={t('user.password')}
            type="password"
            validationType="password"
            required
          />
          <TextInput
            data-testid="input-confirm-password"
            name="confirmPassword"
            label={t('form.inputs.confirmPassword')}
            type="password"
            placeholder={t('form.inputs.repeatPassword')}
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
          <StyledButton fullWidth disabled={isUpdatePasswordBtnDisabled}>
            Update password
            <KeyIcon />
          </StyledButton>
        </Form>
      </UpdatePasswordSection>

      <h4>Delete my account</h4>
      <StyledButton fullWidth colorVariant="red">
        Delete account <TrashIcon />
      </StyledButton>
    </>
  );
};

export default ActionsTab;
