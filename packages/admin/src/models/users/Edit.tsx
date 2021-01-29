import React from 'react';
import { Edit as RaEdit, SimpleForm, TextInput, EditProps } from 'react-admin';

const Edit = (props: EditProps) => (
  <RaEdit {...props}>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
    </SimpleForm>
  </RaEdit>
);

export default Edit;
