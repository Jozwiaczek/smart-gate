import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { regex } from '../../constants';
import { Button, Card, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import { UserIcon } from '../../icons';
import { ThemeType } from '../../theme/Theme';
import { Container } from './SignUp.styled';
import { SignUpInputs } from './SignUp.types';

export default function Index() {
  const showSnackbar = useSnackbar();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, reset, trigger, getValues } = useForm<SignUpInputs>({
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
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...formValues } = values;
      await auth.register(formValues);
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
        <h1>Sign up</h1>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          loading={loading}
          register={register}
        >
          <TextField name="firstName" autoFocus />
          <TextField name="lastName" />
          <TextField
            name="email"
            validation={{
              pattern: {
                value: regex.matchEmail,
                message: 'Invalid email address.',
              },
            }}
            startAdornment={<UserIcon />}
            required
          />
          <TextField
            name="password"
            type="password"
            validation={{
              minLength: { value: 6, message: 'Password must contain at least 6 characters.' },
            }}
            required
          />
          <TextField
            name="confirmPassword"
            type="password"
            validation={{
              pattern: {
                value: RegExp(getValues().password),
                message: 'The password fields must match.',
              },
            }}
            required
          />
          <Button
            type="submit"
            fullWidth
            colorVariant={ThemeType.light}
            disabled={loading}
            margin="30px 0 30px 0"
          >
            Sign Up
          </Button>
          <Link to="/">Already have an account? Sign in</Link>
        </Form>
      </Card>
    </Container>
  );
}
