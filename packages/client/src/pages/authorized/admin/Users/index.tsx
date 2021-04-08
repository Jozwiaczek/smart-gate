import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardList, DateField, DetailedList, FunctionField, TextField } from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
import { ListContainer, Wrapper } from './Users.styled';

const Users = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  const { t } = useTranslation();

  return (
    <Wrapper>
      {isMobile ? (
        <CardList resource="users">
          <FunctionField
            label={t('user.user')}
            asTitle
            render={({ firstName, lastName }) => `${firstName} ${lastName}`}
          />
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <DetailedList resource="users">
            <FunctionField
              label={t('user.user')}
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
