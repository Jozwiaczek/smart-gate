import crudProvider from 'ra-data-nestjsx-crud';
import React from 'react';
import { Admin, Resource } from 'react-admin';

import { UserCreate, UserEdit, UserList, UserShow } from './models/users';
import authProvider from './providers';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3000';
const dataProvider = crudProvider(API_URL);

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} create={UserCreate} />
  </Admin>
);

export default App;
