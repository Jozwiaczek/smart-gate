import React from 'react';

import { CardList, DateField, DetailedList, FunctionField, TextField } from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
import { ApiUser } from '../../../../interfaces/api.types';
import { ListContainer, Wrapper } from './Users.styled';

const Users = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));

  return (
    <Wrapper>
      {isMobile ? (
        <CardList resource="users">
          <FunctionField<ApiUser>
            label="user.name"
            asTitle
            render={({ firstName, lastName }) => `${firstName} ${lastName}`}
          />
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <DetailedList resource="users">
            <FunctionField<ApiUser>
              label="user.name"
              render={({ firstName, lastName }) => `${firstName} ${lastName}`}
            />
            <TextField source="email" />
            <DateField source="createdAt" showTime />
          </DetailedList>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Users;
