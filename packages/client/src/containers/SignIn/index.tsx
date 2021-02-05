import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Card, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
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
      console.error('Error: ', error);
      const { message } = error.response.data;
      showSnackbar({ message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card minWidth="500px">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            ref={register({ required: true })}
            required
            maxWidth="100%"
            label="Email Address"
            name="email"
            errors={errors}
            autoComplete="email"
            autoFocus
            disabled={loading}
          />
          <TextField
            ref={register({ required: true })}
            required
            maxWidth="100%"
            errors={errors}
            name="password"
            label="Password"
            type="password"
            disabled={loading}
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth disabled={loading} margin="30px 0 0 0">
            Sign In
          </Button>
          <LinksContainer>
            <Link to="/">Forgot password?</Link>
            <Link to="/registration">Dont have an account? Sign Up</Link>
          </LinksContainer>
        </form>
      </Card>
    </Container>
  );
};

export default SignIn;
