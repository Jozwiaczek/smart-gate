---
to: "<%= types.includes('List') ? `packages/admin/src/models/${h.changeCase.camel(Name)}/List.tsx` : null %>"
---
import React from 'react';
import {
  Datagrid,
  List as RaList,
  ListProps,
  TextField,
  <% if (types.includes('Show')) { %>ShowButton,<% } -%>
  <% if (types.includes('Edit')) { %>EditButton,<% } -%>
} from 'react-admin';

const List = (props: ListProps) => (
  <RaList {...props}>
    <Datagrid>
      <%- fields.map(field =>`<TextField source="${field}" />`).join("\n")%>
      <% if (types.includes('Show')) { %><ShowButton />
      <% } -%>
      <% if (types.includes('Edit')) { %><EditButton />
      <% } -%>
    </Datagrid>
  </RaList>
);

export default List;
