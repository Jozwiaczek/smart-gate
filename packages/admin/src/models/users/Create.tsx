import React from 'react';
import { Create as RaCreate, SimpleForm, TextInput, CreateProps } from 'react-admin';

const Create = (props: CreateProps) => (
  <RaCreate {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
    </SimpleForm>
  </RaCreate>
);

export default Create;
