import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  List as RaList,
  ListProps,
  ShowButton,
  TextField,
} from 'react-admin';

const List = (props: ListProps) => (
  <RaList {...props}>
    <Datagrid>
      <TextField source="email" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="roles" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </RaList>
);

export default List;
