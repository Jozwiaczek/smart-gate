import React from 'react';

import {
  CardList,
  DateField,
  DetailedList,
  FunctionField,
  InvitationStatusField,
  TextField,
} from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
import { ApiInvitation } from '../../../../interfaces/api.types';
import { getLabelFromSource } from '../../../../utils';
import { ListContainer, Wrapper } from './Invitations.styled';
import { getRowStyle } from './Invitations.utils';
import SendInvitationButtonWithDialog from './SendInvitationButtonWithDialog';

const Invitations = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  return (
    <Wrapper>
      {isMobile ? (
        <CardList resource="invitations" actionButton={<SendInvitationButtonWithDialog />}>
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <SendInvitationButtonWithDialog />
          <DetailedList resource="invitations" rowStyle={getRowStyle}>
            <TextField source="email" />
            <FunctionField<ApiInvitation>
              label="invitation.inviter"
              render={({ createdBy }) => (createdBy ? createdBy.email : '-')}
            />
            <InvitationStatusField label="Status" noTranslation />
            <DateField source="createdAt" label="invitation.sendDate" showTime />
            <FunctionField<ApiInvitation>
              label="user.role"
              render={({ roles }) =>
                roles?.toString() ? getLabelFromSource(roles.toString()) : 'User'
              }
            />
          </DetailedList>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Invitations;
