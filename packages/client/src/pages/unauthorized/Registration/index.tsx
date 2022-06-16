import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { routes } from '../../../constants';
import { CardLayout, Form, Link, TextInput } from '../../../elements';
import { useAuth, useEncodedParams, useSnackbar } from '../../../hooks';
import useAnimated from '../../../hooks/useAnimated';
import { UserIcon } from '../../../icons';
import { RegistrationData } from '../../../providers/api/AuthProvider/AuthProvider.types';
import { onlyOnDevEnv } from '../../../utils';
import { StyledButton, StyledConfirmLockIcon } from './Registration.styled';
import { RegistrationInputs, RegistrationParams } from './Registration.types';

const Registration = () => {
  const { register: registerUser } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { code, email } = useEncodedParams<RegistrationParams>();
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
    getValues,
  } = useForm<RegistrationInputs>();

  const onBeforeSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      triggerCardShake();
    }
  };

  const onSubmit = async ({ firstName, lastName, password }: RegistrationInputs) => {
    setLoading(true);
    try {
      const registrationDate: RegistrationData = {
        code,
        email,
        firstName,
        lastName,
        password,
      };

      await registerUser(registrationDate);
      reset();
      history.push(routes.authorized.appBar.HOME);
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardLayout.Container ref={animatedCardRef}>
      <CardLayout.Title>{t('routes.registration.title')}</CardLayout.Title>
      <CardLayout.Description>
        <Trans
          i18nKey="routes.registration.description"
          values={{ email }}
          components={{ b: <b /> }}
        />
      </CardLayout.Description>
      <Form
        data-testid="form-registration"
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        loading={loading}
        register={register}
      >
        <TextInput
          data-testid="input-firstName"
          name="firstName"
          label={t('user.firstName')}
          autoFocus
          required
          startAdornment={<UserIcon />}
        />
        <TextInput
          data-testid="input-lastName"
          name="lastName"
          label={t('user.lastName')}
          required
          startAdornment={<UserIcon />}
        />
        <TextInput
          data-testid="input-password"
          name="password"
          label={t('user.password')}
          type="password"
          validationType="password"
          required
        />
        <TextInput
          data-testid="input-confirm-password"
          name={t('form.inputs.confirmPassword')}
          type="password"
          placeholder={t('form.inputs.repeatPassword')}
          startAdornment={<StyledConfirmLockIcon />}
          registerOptions={{
            validate: (value) =>
              value === getValues().password ||
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              (t('form.validation.repeatPasswordError') as string),
          }}
          required
        />
        <CardLayout.ActionsContainer>
          <StyledButton
            type="submit"
            fullWidth
            loading={loading}
            withArrow
            onClick={onBeforeSubmit}
          >
            {t('routes.registration.createAccount')}
          </StyledButton>
          <p>
            {t('routes.registration.alreadyHaveAccount')}&nbsp;
            <Link to={routes.unauthorized.LOGIN} colorVariant="colour">
              {t('routes.registration.login')}
            </Link>
          </p>
        </CardLayout.ActionsContainer>
      </Form>
    </CardLayout.Container>
  );
};

export default Registration;
