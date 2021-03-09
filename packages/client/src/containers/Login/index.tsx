import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { regex } from '../../constants';
import { AnimatedLogo, AuthLayout, Checkbox, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
import { EmailIcon } from '../../icons';
import { StyledButton } from './Login.styled';
import { LoginInputs } from './Login.types';

const Login = () => {
  const { login } = useAuth();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const animatedCard = useAnimated<HTMLDivElement>({ type: 'fadeIn' });
  const { trigger: triggerCardShake } = useAnimated({
    type: 'shake',
    targets: animatedCard.ref.current,
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
      history.push('/dashboard');
    } catch (error) {
      if (!error.response) {
        showSnackbar({ message: error.message, severity: 'error' });
      } else {
        const { message } = error.response.data;
        showSnackbar({ message, severity: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout.Container ref={animatedCard.ref}>
      <AnimatedLogo margin="10px 0" />
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} register={register} loading={loading}>
        <TextField
          autoFocus
          required
          name="email"
          placeholder="Enter your email"
          validation={{
            pattern: {
              value: regex.matchEmail,
              message: 'Invalid email address.',
            },
          }}
          startAdornment={<EmailIcon />}
        />
        <TextField
          required
          name="password"
          type="password"
          validation={{
            minLength: { value: 6, message: 'Password must contain at least 6 characters.' },
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        <AuthLayout.ActionsContainer direction="row">
          <Checkbox name="keepMeLoggedIn" />
          <StyledButton
            type="submit"
            fullWidth
            disabled={loading}
            withArrow
            onClick={onBeforeSubmit}
          >
            Log in
          </StyledButton>
        </AuthLayout.ActionsContainer>
      </Form>
      <AuthLayout.ActionsContainer>
        <Link to="/" colorVariant="grey">
          Forgot password?
        </Link>
        <Link to="/registration" colorVariant="colour">
          I don’t have an account
        </Link>
      </AuthLayout.ActionsContainer>
    </AuthLayout.Container>
  );
};

export default Login;
