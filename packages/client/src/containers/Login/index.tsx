import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { regex } from '../../constants';
import {
  AnimatedLogo,
  BackgroundSideLogo,
  Checkbox,
  Form,
  LayoutContainer,
  Link,
  TextField,
} from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
import {
  ActionsContainer,
  LinksContainer,
  StyledButton,
  StyledCard,
  StyledEmailIcon,
} from './Login.styled';
import { LoginInputs } from './Login.types';

const Login = () => {
  const auth = useAuth();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const animatedCard = useAnimated<HTMLDivElement>({ type: 'fadeIn' });
  const { trigger: triggerCardShake } = useAnimated({
    type: 'shake',
    targets: animatedCard.ref.current,
    opt: { autoTrigger: false },
  });
  const { register, handleSubmit, errors, reset } = useForm<LoginInputs>();

  if (!auth) {
    return null; // TODO: add page loader
  }

  const onSubmit = async (values: LoginInputs) => {
    setLoading(true);

    try {
      await auth.login(values);
      reset();
      history.push('/dashboard');
    } catch (error) {
      triggerCardShake();
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
    <LayoutContainer>
      <BackgroundSideLogo />
      <StyledCard ref={animatedCard.ref}>
        <AnimatedLogo />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          register={register}
          loading={loading}
        >
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
            startAdornment={<StyledEmailIcon />}
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
          <ActionsContainer>
            <Checkbox name="keepMeLoggedIn" />
            <StyledButton type="submit" fullWidth disabled={loading} withArrow>
              Log in
            </StyledButton>
          </ActionsContainer>
          <LinksContainer>
            <Link to="/" colorVariant="grey">
              Forgot password?
            </Link>
            <Link to="/registration" colorVariant="colour">
              I don’t have an account
            </Link>
          </LinksContainer>
        </Form>
      </StyledCard>
    </LayoutContainer>
  );
};

export default Login;
