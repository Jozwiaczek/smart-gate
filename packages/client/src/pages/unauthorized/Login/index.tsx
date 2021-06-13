import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { routes } from '../../../constants';
import { AnimatedLogo, CardLayout, Checkbox, Form, Link, TextInput } from '../../../elements';
import { useAuth, useSnackbar } from '../../../hooks';
import useAnimated from '../../../hooks/useAnimated';
import { onlyOnDevEnv } from '../../../utils';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<LoginInputs>();

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
      history.push(routes.authorized.appBar.HOME);
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
      setLoading(false);
    }
  };

  return (
    <CardLayout.Container ref={animatedCardRef}>
      <AnimatedLogo margin="10px 0" />
      <Form
        data-testid="form-login"
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        loading={loading}
        register={register}
      >
        <TextInput
          data-testid="input-email"
          autoFocus
          required
          name="email"
          validationType="email"
        />
        <TextInput
          data-testid="input-password"
          required
          name="password"
          type="password"
          validationType="password"
          label={t('user.password')}
        />
        <CardLayout.ActionsContainer direction="row">
          <Checkbox name="keepMeLoggedIn" label="routes.login.keepMeLoggedIn" />
          <StyledButton
            data-testid="btn-login"
            type="submit"
            fullWidth
            loading={loading}
            withArrow
            onClick={onBeforeSubmit}
          >
            {t('routes.login.login')}
          </StyledButton>
        </CardLayout.ActionsContainer>
      </Form>
      <CardLayout.ActionsContainer>
        <Link
          data-testid="link-forgotPassword"
          to={routes.unauthorized.PASSWORD_RECOVERY}
          colorVariant="grey"
        >
          {t('routes.login.forgotPassword')}
        </Link>
      </CardLayout.ActionsContainer>
    </CardLayout.Container>
  );
};

export default Login;
