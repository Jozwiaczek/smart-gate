import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';

import { Checkbox, Dialog, TextInput } from '../../../../elements';
import { Role } from '../../../../enums/role.enum';
import { useAxios, useMediaQuery, useSnackbar } from '../../../../hooks';
import { SendEmailIcon } from '../../../../icons';
import { ApiInvitation } from '../../../../interfaces/api.types';
import { ThemeType } from '../../../../theme/Theme';
import { DialogForm, SendButton, SendInvitationButton } from './Invitations.styled';

interface CreateInvitationValues {
  email: string;
  isAdmin: boolean;
}

const SendInvitationButtonWithDialog = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  const { t } = useTranslation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const axios = useAxios();
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<CreateInvitationValues>();

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const onBeforeSubmit = async () => {
    await trigger();
  };

  const queryClient = useQueryClient();
  const invitationsQueryKey = '/invitations';
  const sendInvitationMutation = useMutation(
    async (values: CreateInvitationValues) => {
      setLoading(true);
      try {
        const { email, isAdmin } = values;
        const roles = isAdmin ? [Role.Admin] : [];
        await axios.post(`/invitations`, { email, roles });
        reset();
        closeCreateDialog();
        showSnackbar({
          message: t('routes.invitations.createDialog.invitationsSentSuccessfully'),
          severity: 'success',
        });
      } catch (error) {
        showSnackbar({ message: t('form.errors.onSubmitError'), severity: 'error' });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    {
      onMutate: async (sentInvitation) => {
        await queryClient.cancelQueries(invitationsQueryKey);

        const previousInvitations = queryClient.getQueryData(invitationsQueryKey);

        queryClient.setQueryData(
          invitationsQueryKey,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ({ data, total }: { data: Array<ApiInvitation>; total: number }) => ({
            data: [...data, sentInvitation],
            total: total + 1,
          }),
        );

        return { previousInvitations };
      },
      onError: (err, newTodo, context) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        queryClient.setQueryData(invitationsQueryKey, context.previousInvitations),
      onSettled: async () => queryClient.invalidateQueries(invitationsQueryKey),
    },
  );

  return (
    <>
      <SendInvitationButton colorVariant={ThemeType.dark} onClick={openCreateDialog}>
        {!isMobile && t('routes.invitations.sendInvitation')}
        <SendEmailIcon />
      </SendInvitationButton>
      <Dialog
        isOpen={isCreateDialogOpen}
        close={closeCreateDialog}
        title="routes.invitations.createDialog.title"
        description="routes.invitations.createDialog.description"
      >
        <DialogForm
          onSubmit={handleSubmit((values) => sendInvitationMutation.mutateAsync(values))}
          errors={errors}
          loading={loading}
          register={register}
        >
          <TextInput autoFocus name="email" required validationType="email" />
          <Checkbox name="isAdmin" label="routes.invitations.createDialog.addAsAdmin" />
          <SendButton type="submit" onClick={onBeforeSubmit}>
            {t('routes.invitations.createDialog.send')}
            <SendEmailIcon />
          </SendButton>
        </DialogForm>
      </Dialog>
    </>
  );
};

export default SendInvitationButtonWithDialog;
