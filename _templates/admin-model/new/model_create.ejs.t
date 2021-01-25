---
to: "<%= types.includes('Create') ? `packages/admin/src/models/${h.changeCase.camel(Name)}/Create.tsx` : null %>"
---
import React from 'react';
import { Create as RaCreate, SimpleForm, TextInput, CreateProps } from 'react-admin';

const Create = (props: CreateProps) => (
  <RaCreate {...props}>
    <SimpleForm>
        <%- fields.map(field =>`<TextInput source="${field}" />`).join("\n")%>
    </SimpleForm>
  </RaCreate>
);

export default Create;
