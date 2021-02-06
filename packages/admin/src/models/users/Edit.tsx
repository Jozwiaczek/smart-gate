import React from 'react';
import { Edit as RaEdit, EditProps, SimpleForm, TextInput } from 'react-admin';

const Edit = (props: EditProps) => (
  <RaEdit {...props}>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
    </SimpleForm>
  </RaEdit>
);

export default Edit;
