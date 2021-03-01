import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Card, Checkbox, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import { UserIcon } from '../../icons';
import { Container, LinksContainer } from './SignIn.styled';
import { SignInInputs } from './SignIn.types';

const SignIn = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const showSnackbar = useSnackbar();
  const { register, handleSubmit, errors, reset, trigger } = useForm<SignInInputs>({
    mode: 'onBlur',
  });
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const onSubmit = async (values: SignInInputs) => {
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

  return (
    <Container>
      <Card minWidth="500px">
        <h1>Sign in</h1>
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
            startAdornment={<UserIcon />}
          />
          <TextField
            required
            name="password"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth disabled={loading} margin="30px 0" withArrow>
            Sign In
          </Button>
          <Checkbox name="keepMeLoggedIn" />
          <LinksContainer>
            <Link to="/">Forgot password?</Link>
            <Link to="/registration">Dont have an account? Sign Up</Link>
          </LinksContainer>
        </Form>
      </Card>
    </Container>
  );
};

export default SignIn;
