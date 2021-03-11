import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { AnimatedLogo, AuthLayout, Checkbox, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
import { EmailIcon } from '../../icons';
import { onlyOnDevEnv } from '../../utils';
import { StyledButton } from './Login.styled';
import { LoginInputs } from './Login.types';

const Login = () => {
  const { login } = useAuth();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { trigger: triggerCardShake, ref: animatedCardRef } = useAnimated<HTMLDivElement>({
    type: 'shake',
    opt: { autoTrigger: false },
  });
  const { register, handleSubmit, errors, reset, trigger } = useForm<LoginInputs>();

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async (values: LoginInputs) => {
    setLoading(true);
    try {
      await login(values);
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
    <AuthLayout.Container ref={animatedCardRef}>
      <AnimatedLogo margin="10px 0" />
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} loading={loading} register={register}>
        <TextField
          autoFocus
          required
          name="email"
          validationType="email"
          startAdornment={<EmailIcon />}
        />
        <TextField
          required
          name="password"
          type="password"
          validationType="password"
          label={t('user.password')}
        />
        <AuthLayout.ActionsContainer direction="row">
          <Checkbox name="keepMeLoggedIn" label={t('routes.login.keepMeLoggedIn')} />
          <StyledButton
            type="submit"
            fullWidth
            disabled={loading}
            withArrow
            onClick={onBeforeSubmit}
          >
            {t('routes.login.login')}
          </StyledButton>
        </AuthLayout.ActionsContainer>
      </Form>
      <AuthLayout.ActionsContainer>
        <Link to="/" colorVariant="grey">
          {t('routes.login.forgotPassword')}
        </Link>
        <Link to="/registration" colorVariant="colour">
          {t('routes.login.register')}
        </Link>
      </AuthLayout.ActionsContainer>
    </AuthLayout.Container>
  );
};

export default Login;
