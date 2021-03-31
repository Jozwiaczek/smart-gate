import React from 'react';
import { useQuery } from 'react-query';

import { List } from '../../../../elements';
import { ApiList, ApiUser } from '../../../../interfaces/api.types';
import { Wrapper } from './Users.styled';

interface UserHeader {
  key: keyof ApiUser;
}

const Users = () => {
  const { data } = useQuery<ApiList<ApiUser>>('/users');

  if (data) {
    const { data: users, total } = data;
    const headers: Array<UserHeader> = [
      {
        key: 'email',
      },
      {
        key: 'firstName',
      },
      {
        key: 'lastName',
      },
      {
        key: 'createdAt',
      },
      {
        key: 'updatedAt',
      },
    ];

    return (
      <Wrapper>
        <List<ApiUser> total={total} data={users} headers={headers} pagination={{ page: 1 }} />
      </Wrapper>
    );
  }

  return <p>loading</p>;
};

export default Users;
