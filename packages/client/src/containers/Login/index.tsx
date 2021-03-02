import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import {
  AnimatedLogo,
  BackgroundLogo,
  Button,
  Card,
  Checkbox,
  Form,
  Link,
  TextField,
} from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import { EmailIcon } from '../../icons';
import {
  ActionsContainer,
  CardContainer,
  Container,
  IconWrapper,
  LinksContainer,
  LoginButtonContainer,
} from './Login.styled';
import { LoginInputs } from './Login.types';

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const showSnackbar = useSnackbar();
  const { register, handleSubmit, errors, reset, trigger } = useForm<LoginInputs>({
    mode: 'onBlur',
  });
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const onSubmit = async (values: LoginInputs) => {
    setLoading(true);
    const isValid = await trigger();

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      await auth.login(values);
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

  const emailIcon = (
    <IconWrapper>
      <EmailIcon />
    </IconWrapper>
  );

  return (
    <Container>
      <BackgroundLogo />
      <CardContainer>
        <Card>
          <AnimatedLogo />
          <Form
            onSubmit={handleSubmit(onSubmit)}
            errors={errors}
            register={register}
            loading={loading}
          >
            <TextField
              name="email"
              placeholder="Enter your email"
              required
              autoFocus
              startAdornment={emailIcon}
            />
            <TextField
              required
              name="password"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
            />
            <ActionsContainer>
              <Checkbox name="keepMeLoggedIn" />
              <LoginButtonContainer>
                <Button type="submit" fullWidth disabled={loading} withArrow>
                  Log in
                </Button>
              </LoginButtonContainer>
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
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Login;
