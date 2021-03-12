import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { routes } from '../../constants';
import { Button, CardLayout, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
import { EmailIcon } from '../../icons';
import { onlyOnDevEnv } from '../../utils';
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
  const { register, handleSubmit, errors, reset, trigger } = useForm<PasswordRecoveryInputs>();

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async (values: PasswordRecoveryInputs) => {
    setLoading(true);
    try {
      console.log('L:36 | values: ', values);
      await sendPasswordRecoveryEmail();
      reset();
      // history.push(routes.home);
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardLayout.Container ref={animatedCardRef}>
      <CardLayout.Title>{t('routes.passwordRecovery.title1')}</CardLayout.Title>
      <CardLayout.Description>{t('routes.passwordRecovery.description1')}</CardLayout.Description>
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
            {t('routes.passwordRecovery.sendRecoveryEmail')}
          </Button>
        </CardLayout.ActionsContainer>
      </Form>
      <CardLayout.ActionsContainer>
        <Link to={routes.login} colorVariant="colour">
          {t('routes.passwordRecovery.iRememberPassword')}
        </Link>
      </CardLayout.ActionsContainer>
    </CardLayout.Container>
  );
};

export default PasswordRecovery;
