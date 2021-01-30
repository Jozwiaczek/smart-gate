---
to: "<%= types.includes('Edit') ? `src/models/${h.changeCase.camel(Name)}/Edit.tsx` : null %>"
---
import React from 'react';
import { Edit as RaEdit, SimpleForm, TextInput, EditProps } from 'react-admin';

const Edit = (props: EditProps) => (
  <RaEdit {...props}>
    <SimpleForm>
        <%- fields.map(field =>`<TextInput source="${field}" />`).join("\n")%>
    </SimpleForm>
  </RaEdit>
);

export default Edit;
