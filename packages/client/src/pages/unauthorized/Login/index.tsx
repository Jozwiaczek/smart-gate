import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { routes } from '../../../constants';
import { AnimatedLogo, CardLayout, Checkbox, Form, Link, TextInput } from '../../../elements';
import { useAuth, useSnackbar } from '../../../hooks';
import useAnimated from '../../../hooks/useAnimated';
import { EmailIcon } from '../../../icons';
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
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} loading={loading} register={register}>
        <TextInput
          autoFocus
          required
          name="email"
          validationType="email"
          startAdornment={<EmailIcon />}
        />
        <TextInput
          required
          name="password"
          type="password"
          validationType="password"
          label={t('user.password')}
        />
        <CardLayout.ActionsContainer direction="row">
          <Checkbox name="keepMeLoggedIn" label={t('routes.login.keepMeLoggedIn')} />
          <StyledButton
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
        <Link to={routes.unauthorized.PASSWORD_RECOVERY} colorVariant="grey">
          {t('routes.login.forgotPassword')}
        </Link>
      </CardLayout.ActionsContainer>
    </CardLayout.Container>
  );
};

export default Login;
