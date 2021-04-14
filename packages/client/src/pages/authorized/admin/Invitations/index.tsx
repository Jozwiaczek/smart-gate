import React from 'react';

import {
  Button,
  CardList,
  DateField,
  DetailedList,
  InvitationStatusField,
  TextField,
} from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
import { ThemeType } from '../../../../theme/Theme';
import { CreateButtonContainer, ListContainer, Wrapper } from './Invitations.styled';
import { getRowStyle } from './Invitations.utils';

const Invitations = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  return (
    <Wrapper>
      <CreateButtonContainer>
        <Button colorVariant={ThemeType.dark}>Send invitation</Button>
      </CreateButtonContainer>
      {isMobile ? (
        <CardList resource="invitations">
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <DetailedList resource="invitations" rowStyle={getRowStyle}>
            <TextField source="email" />
            <TextField source="createdBy" label="Inviter" />
            <InvitationStatusField label="Status" />
            <DateField source="createdAt" label="Send date" showTime />
          </DetailedList>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Invitations;
