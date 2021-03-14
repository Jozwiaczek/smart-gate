import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { routes } from '../../../constants';
import { Button, CardLayout, Form, Link, TextField } from '../../../elements';
import { useAuth, useSnackbar } from '../../../hooks';
import useAnimated from '../../../hooks/useAnimated';
import { ConfirmLockIcon } from '../../../icons';
import { onlyOnDevEnv } from '../../../utils';
import { LoginInputs } from '../../Login/Login.types';

const UpdatePassword = () => {
  const { updatePassword } = useAuth();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { trigger: triggerCardShake, ref: animatedCardRef } = useAnimated<HTMLDivElement>({
    type: 'shake',
    opt: { autoTrigger: false },
  });
  const { register, handleSubmit, errors, reset, trigger, getValues } = useForm<LoginInputs>();

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async (values: LoginInputs) => {
    setLoading(true);
    try {
      await updatePassword(values);
      reset();
      history.push(routes.home);
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardLayout.Container ref={animatedCardRef}>
      <CardLayout.Title>{t('routes.passwordRecovery.updatePassword.title')}</CardLayout.Title>
      <CardLayout.Description>
        <Trans
          i18nKey="routes.passwordRecovery.updatePassword.description"
          values={{ email: 'EMAIL_HERE' }}
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
        <Link to={routes.login} colorVariant="colour">
          {t('routes.passwordRecovery.iRememberPassword')}
        </Link>
      </CardLayout.ActionsContainer>
    </CardLayout.Container>
  );
};

export default UpdatePassword;
