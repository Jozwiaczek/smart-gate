import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import { emailRegex } from '../../utils/constants';
import { Container } from './SignUp.styled';
import { SignUpInputs } from './SignUp.types';

export default function Index() {
  const showSnackbar = useSnackbar();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, reset, trigger } = useForm<SignUpInputs>({
    mode: 'onBlur',
  });
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const onSubmit = async (values: SignUpInputs) => {
    setLoading(true);
    const isValid = await trigger();

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      await auth.register(values);
      reset();
      history.push('/dashboard');
    } catch ({ message }) {
      showSnackbar({ message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card minWidth="500px">
        <h1>Sign up</h1>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          loading={loading}
          register={register}
        >
          <TextField
            autoComplete="fname"
            name="firstName"
            maxWidth="100%"
            label="First Name"
            autoFocus
          />
          <TextField maxWidth="100%" label="Last Name" name="lastName" autoComplete="lname" />
          <TextField
            validation={{
              pattern: {
                value: emailRegex,
                message: 'Invalid email address.',
              },
            }}
            maxWidth="100%"
            required
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            validation={{
              minLength: { value: 6, message: 'Password must contain at least 6 characters.' },
            }}
            maxWidth="100%"
            required
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth color="primary" disabled={loading} margin="30px 0 30px 0">
            Sign Up
          </Button>
          <Link to="/">Already have an account? Sign in</Link>
        </Form>
      </Card>
    </Container>
  );
}
