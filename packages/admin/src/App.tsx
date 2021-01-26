import crudProvider from 'ra-data-nestjsx-crud';
import React from 'react';
import { Admin, EditGuesser, Resource, ShowGuesser } from 'react-admin';
import authProvider from './providers';
import { UserCreate, UserList } from './models/users';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3000';
const dataProvider = crudProvider(API_URL);

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      edit={EditGuesser}
      create={UserCreate}
    />
  </Admin>
);

export default App;
