import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { routes } from '../../constants';
import { Button, CardLayout, Form, Link, PaperPlane, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
import { EmailIcon } from '../../icons';
import { onlyOnDevEnv } from '../../utils';
import { PaperPlaneWrapper } from './PasswordRecovery.styled';
import { PasswordRecoveryInputs } from './PasswordRecovery.types';

const PasswordRecovery = () => {
  const { sendPasswordRecoveryEmail } = useAuth();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { trigger: triggerCardShake, ref: animatedCardRef } = useAnimated<HTMLDivElement>({
    type: 'shake',
    opt: { autoTrigger: false },
  });
  const { register, handleSubmit, errors, trigger } = useForm<PasswordRecoveryInputs>();
  const [emailSentAddress, setEmailSentAddress] = useState<undefined | string>(undefined);

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async ({ email }: PasswordRecoveryInputs) => {
    setLoading(true);
    try {
      await sendPasswordRecoveryEmail(email);
      setEmailSentAddress(email);
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const formStep = (
    <>
      <CardLayout.Title>{t('routes.forgotPassword.title')}</CardLayout.Title>
      <CardLayout.Description>{t('routes.forgotPassword.description')}</CardLayout.Description>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} loading={loading} register={register}>
        <TextField
          autoFocus
          required
          name="email"
          validationType="email"
          startAdornment={<EmailIcon />}
        />
        <CardLayout.ActionsContainer direction="row">
          <Button type="submit" fullWidth disabled={loading} withArrow onClick={onBeforeSubmit}>
            {t('routes.forgotPassword.sendRecoveryEmail')}
          </Button>
        </CardLayout.ActionsContainer>
      </Form>
    </>
  );

  const infoStep = (
    <>
      <CardLayout.Title>{t('routes.forgotPassword.titleSent')}</CardLayout.Title>
      <PaperPlaneWrapper>
        <PaperPlane />
      </PaperPlaneWrapper>
      <CardLayout.Description>
        <Trans
          i18nKey="routes.forgotPassword.descriptionSent"
          values={{ email: emailSentAddress }}
          components={{ b: <b /> }}
        />
      </CardLayout.Description>
      <Link to={routes.passwordRecovery} onClick={() => setEmailSentAddress(undefined)}>
        {t('routes.forgotPassword.resendEmail')}
      </Link>
    </>
  );

  return (
    <CardLayout.Container ref={animatedCardRef}>
      {emailSentAddress ? infoStep : formStep}
      <CardLayout.ActionsContainer>
        <Link to={routes.login} colorVariant="colour">
          {t('routes.forgotPassword.iRememberPassword')}
        </Link>
      </CardLayout.ActionsContainer>
    </CardLayout.Container>
  );
};

export default PasswordRecovery;
