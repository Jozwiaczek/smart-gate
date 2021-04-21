import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import {
  CardList,
  Checkbox,
  DateField,
  DetailedList,
  Dialog,
  InvitationStatusField,
  TextField,
  TextInput,
} from '../../../../elements';
import { Role } from '../../../../enums/role.enum';
import { useAxios, useMediaQuery, useSnackbar } from '../../../../hooks';
import { SendEmailIcon } from '../../../../icons';
import { ThemeType } from '../../../../theme/Theme';
import {
  DialogContent,
  ListContainer,
  SendInvitationButton,
  StyledSendButton,
  Wrapper,
} from './Invitations.styled';
import { getRowStyle } from './Invitations.utils';

const Invitations = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  const { t } = useTranslation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const axios = useAxios();
  const showSnackbar = useSnackbar();
  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const sendInvitationMutation = useMutation(async () => {
    try {
      await axios.post(`/invitations`, { email: 'xyz@gmail.com', roles: [Role.Admin] });
    } catch (error) {
      showSnackbar({ message: 'Send invitation err TODO: trans', severity: 'error' });
      throw error;
    } finally {
      closeCreateDialog();
    }
  });

  return (
    <Wrapper>
      {isMobile ? (
        <CardList resource="invitations">
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <SendInvitationButton colorVariant={ThemeType.dark} onClick={openCreateDialog}>
            {t('routes.invitations.sendInvitation')}
            <SendEmailIcon />
          </SendInvitationButton>
          <DetailedList resource="invitations" rowStyle={getRowStyle}>
            <TextField source="email" />
            <TextField source="createdBy" label="invitation.inviter" />
            <InvitationStatusField label="Status" noTranslation />
            <DateField source="createdAt" label="invitation.sendDate" showTime />
          </DetailedList>
        </ListContainer>
      )}
      <Dialog
        isOpen={isCreateDialogOpen}
        close={closeCreateDialog}
        title="Invite New Member"
        description="Invite new members by email to join your Smart Gate. After sent, you will still be able to cancel invitation."
      >
        <DialogContent>
          <TextInput autoFocus name="email" required />
          <Checkbox name="isAdmin" label="Add as admin" />
          <StyledSendButton onClick={() => sendInvitationMutation.mutate()} withArrow>
            Send invite
          </StyledSendButton>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

export default Invitations;
