import base64url from 'base64url';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { routes } from '../../../constants';
import { Button, CardLayout, Form, Link, TextField } from '../../../elements';
import { useAuth, useSnackbar } from '../../../hooks';
import useAnimated from '../../../hooks/useAnimated';
import { ConfirmLockIcon, ShieldLock } from '../../../icons';
import { onlyOnDevEnv } from '../../../utils';
import { ShieldIconWrapper } from './UpdatePassword.styled';

const UpdatePassword = () => {
  const { updatePassword } = useAuth();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();
  const { email: emailBase64, code: codeBase64 } = useParams<UpdatePasswordParams>();
  const email = base64url.decode(emailBase64);
  const code = base64url.decode(codeBase64);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { trigger: triggerCardShake, ref: animatedCardRef } = useAnimated<HTMLDivElement>({
    type: 'shake',
    opt: { autoTrigger: false },
  });
  const {
    register,
    handleSubmit,
    errors,
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
      await updatePassword({ password, email, code });
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
        <TextField
          name="password"
          label={t('user.password')}
          type="password"
          validationType="password"
          required
        />
        <TextField
          name={t('form.inputs.confirmPassword')}
          type="password"
          placeholder={t('form.inputs.repeatPassword')}
          startAdornment={<ConfirmLockIcon />}
          validation={{
            pattern: {
              value: RegExp(getValues().password),
              message: t('form.validation.repeatPasswordError'),
            },
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
        <Link to={routes.LOGIN} colorVariant="colour">
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
      <Button fullWidth withArrow to={routes.HOME}>
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
