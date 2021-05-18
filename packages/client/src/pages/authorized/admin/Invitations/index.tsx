import React from 'react';

import {
  CardList,
  DateField,
  DetailedList,
  InvitationStatusField,
  TextField,
} from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
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
            <TextField source="createdBy" label="invitation.inviter" />
            <InvitationStatusField label="Status" noTranslation />
            <DateField source="createdAt" label="invitation.sendDate" showTime />
          </DetailedList>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Invitations;
