import React from 'react';

import { CardList, DateField, FunctionField, List, TextField } from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
import { ListContainer, Wrapper } from './Users.styled';

const Users = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));

  return (
    <Wrapper>
      {isMobile ? (
        <CardList resource="users">
          <FunctionField
            label="User"
            asTitle
            render={({ firstName, lastName }) => `${firstName} ${lastName}`}
          />
          <TextField source="email" />
          <DateField source="createdAt" showTime />
        </CardList>
      ) : (
        <ListContainer>
          <List resource="users">
            <FunctionField
              label="User"
              render={({ firstName, lastName }) => `${firstName} ${lastName}`}
            />
            <TextField source="email" />
            <DateField source="createdAt" showTime />
          </List>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Users;
