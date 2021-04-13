import React from 'react';

import { CardList, DateField, DetailedList, TextField } from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
import { ListContainer, Wrapper } from './Invitations.styled';

const Invitations = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  return (
    <Wrapper>
      {isMobile ? (
        <CardList resource="invitations">
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <DetailedList resource="invitations">
            <TextField source="email" />
            <DateField source="createdAt" showTime />
          </DetailedList>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Invitations;
