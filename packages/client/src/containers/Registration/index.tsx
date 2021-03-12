import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { CardLayout, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
import { EmailIcon, UserIcon } from '../../icons';
import { onlyOnDevEnv } from '../../utils';
import { StyledButton } from './Registration.styled';
import { RegistrationInputs } from './Registration.types';

const Registration = () => {
  const { register: registerUser } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();
  const showSnackbar = useSnackbar();
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
  } = useForm<RegistrationInputs>();

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async (values: RegistrationInputs) => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...formValues } = values;
      await registerUser(formValues);
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
      <CardLayout.Title>{t('routes.registration.title')}</CardLayout.Title>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} loading={loading} register={register}>
        <TextField
          name="firstName"
          label={t('user.firstName')}
          autoFocus
          required
          startAdornment={<UserIcon />}
        />
        <TextField
          name="lastName"
          label={t('user.lastName')}
          required
          startAdornment={<UserIcon />}
        />
        <TextField name="email" validationType="email" startAdornment={<EmailIcon />} required />
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
          validation={{
            pattern: {
              value: RegExp(getValues().password),
              message: t('form.validation.repeatPasswordError'),
            },
          }}
          required
        />
        <CardLayout.ActionsContainer>
          <StyledButton
            type="submit"
            fullWidth
            disabled={loading}
            withArrow
            onClick={onBeforeSubmit}
          >
            {t('routes.registration.createAccount')}
          </StyledButton>
          <p>
            {t('routes.registration.alreadyHaveAccount')}&nbsp;
            <Link to={routes.login} colorVariant="colour">
              {t('routes.registration.login')}
            </Link>
          </p>
        </CardLayout.ActionsContainer>
      </Form>
    </CardLayout.Container>
  );
};

export default Registration;
