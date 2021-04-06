import React from 'react';

import { DateField, FunctionField, List, TextField } from '../../../../elements';
import { Wrapper } from './Users.styled';

const Users = () => (
  <Wrapper>
    <List resource="users">
      <FunctionField
        label="User"
        render={({ firstName, lastName }) => `${firstName} ${lastName}`}
      />
      <TextField source="email" />
      <DateField source="createdAt" showTime />
    </List>
  </Wrapper>
);

export default Users;
