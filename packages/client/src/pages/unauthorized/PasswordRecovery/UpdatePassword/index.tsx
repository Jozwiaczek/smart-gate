import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { routes } from '../../../../constants';
import { Button, CardLayout, Form, Link, TextInput } from '../../../../elements';
import { useAuth, useEncodedParams, useSnackbar } from '../../../../hooks';
import useAnimated from '../../../../hooks/useAnimated';
import { ShieldLock } from '../../../../icons';
import { onlyOnDevEnv } from '../../../../utils';
import { ShieldIconWrapper, StyledConfirmLockIcon } from './UpdatePassword.styled';

const UpdatePassword = () => {
  const { recoverPassword } = useAuth();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();
  const { email, code } = useEncodedParams<UpdatePasswordParams>();
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { trigger: triggerCardShake, ref: animatedCardRef } = useAnimated<HTMLDivElement>({
    type: 'shake',
    opt: { autoTrigger: false },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<UpdatePasswordInputs>();

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async ({ password }: UpdatePasswordInputs) => {
    setLoading(true);
    try {
      await recoverPassword({ password, email, code });
      reset();
      setIsSent(true);
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const formStep = (
    <>
      <CardLayout.Title>{t('routes.passwordRecovery.updatePassword.title')}</CardLayout.Title>
      <CardLayout.Description>
        <Trans
          i18nKey="routes.passwordRecovery.updatePassword.description"
          values={{ email }}
          components={{ b: <b /> }}
        />
      </CardLayout.Description>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} loading={loading} register={register}>
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
          name={t('form.inputs.confirmPassword')}
          type="password"
          placeholder={t('form.inputs.repeatPassword')}
          startAdornment={<StyledConfirmLockIcon />}
          registerOptions={{
            validate: (value) =>
              value === getValues().password ||
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              (t('form.validation.repeatPasswordError') as string),
          }}
          required
        />
        <CardLayout.ActionsContainer>
          <Button type="submit" fullWidth disabled={loading} withArrow onClick={onBeforeSubmit}>
            {t('routes.passwordRecovery.updatePassword.updatePassword')}
          </Button>
        </CardLayout.ActionsContainer>
      </Form>
      <CardLayout.ActionsContainer>
        <Link to={routes.unauthorized.LOGIN} colorVariant="colour">
          {t('routes.passwordRecovery.iRememberPassword')}
        </Link>
      </CardLayout.ActionsContainer>
    </>
  );

  const infoStep = (
    <>
      <CardLayout.Title>
        {t('routes.passwordRecovery.updatePasswordConfirmation.title')}
      </CardLayout.Title>
      <ShieldIconWrapper>
        <ShieldLock />
      </ShieldIconWrapper>
      <Button
        data-testid="btn-confirm-and-back"
        fullWidth
        withArrow
        to={routes.authorized.appBar.HOME}
      >
        {t('routes.passwordRecovery.updatePasswordConfirmation.back')}
      </Button>
    </>
  );

  return (
    <CardLayout.Container ref={animatedCardRef}>
      {isSent ? infoStep : formStep}
    </CardLayout.Container>
  );
};

export default UpdatePassword;
