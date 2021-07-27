import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { Button, Form, TextField, TextInput } from '../../../../../../elements';
import { useAxios, useCurrentUser, useSnackbar } from '../../../../../../hooks';
import { UserIcon } from '../../../../../../icons';
import { ApiUser } from '../../../../../../interfaces/api.types';
import { onlyOnDevEnv } from '../../../../../../utils';

interface UserBasicsInputs {
  firstName: string;
  lastName: string;
}

const BasicsTab = () => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const { t } = useTranslation();
  const showSnackbar = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserBasicsInputs>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
    },
  });
  const axios = useAxios();
  const firstNameFieldValue = watch('firstName');
  const lastNameFieldValue = watch('lastName');

  const isDataModified = useMemo(() => {
    return (
      firstNameFieldValue !== currentUser?.firstName || lastNameFieldValue !== currentUser?.lastName
    );
  }, [currentUser?.firstName, currentUser?.lastName, firstNameFieldValue, lastNameFieldValue]);

  const mutation = useMutation((formData: UserBasicsInputs) => {
    if (!currentUser) {
      throw Error('No current user');
    }
    return axios.patch<ApiUser>(`/users/${currentUser.id}`, formData);
  });

  const onSubmit = async (values: UserBasicsInputs) => {
    try {
      const updatedUser = await mutation.mutateAsync(values);
      setCurrentUser(updatedUser.data);
      showSnackbar({ message: t('form.success.update'), severity: 'success' });
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
    }
  };

  return (
    <>
      <TextField record={currentUser} source="email" label="baseApiFields.email" />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        loading={isSubmitting}
        register={register}
      >
        <TextInput
          data-testid="input-firstName"
          name="firstName"
          label={t('user.firstName')}
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
        <Button fullWidth margin="20px 0 0 0" disabled={!isDataModified} withArrow>
          {t('actions.save')}
        </Button>
      </Form>
    </>
  );
};

export default BasicsTab;
