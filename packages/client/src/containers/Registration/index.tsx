import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { AuthLayout, Button, Form, Link, TextField } from '../../elements';
import { useAuth, useSnackbar } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
import { EmailIcon, UserIcon } from '../../icons';
import { StyledButton, Title } from './Registration.styled';
import { RegistrationInputs } from './Registration.types';

const Registration = () => {
  const { register: registerUser } = useAuth();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const animatedCard = useAnimated<HTMLDivElement>({ type: 'fadeIn' });
  const { trigger: triggerCardShake } = useAnimated({
    type: 'shake',
    targets: animatedCard.ref.current,
    opt: { autoTrigger: false },
  });
  const {
    register,
    handleSubmit,
    errors,
    reset,
    trigger,
    getValues,
  } = useForm<RegistrationInputs>();

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async (values: RegistrationInputs) => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...formValues } = values;
      await registerUser(formValues);
      reset();
      history.push(routes.home);
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
      <Title>Registration</Title>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} loading={loading} register={register}>
        <TextField name="firstName" autoFocus required startAdornment={<UserIcon />} />
        <TextField name="lastName" required startAdornment={<UserIcon />} />
        <TextField name="email" validationType="email" startAdornment={<EmailIcon />} required />
        <TextField name="password" type="password" validationType="password" required />
        <TextField
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          validation={{
            pattern: {
              value: RegExp(getValues().password),
              message: 'The password fields must match.',
            },
          }}
          required
        />
        <AuthLayout.ActionsContainer>
          <StyledButton
            type="submit"
            fullWidth
            disabled={loading}
            withArrow
            onClick={onBeforeSubmit}
          >
            Create my account
          </StyledButton>
          <p>
            Already have an account?&nbsp;
            <Link to={routes.login} colorVariant="colour">
              Log in
            </Link>
          </p>
        </AuthLayout.ActionsContainer>
      </Form>
    </AuthLayout.Container>
  );
};

export default Registration;
