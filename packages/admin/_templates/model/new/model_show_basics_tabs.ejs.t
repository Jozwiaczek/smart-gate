---
to: "<%= types.includes('Show') ? `src/models/${h.changeCase.camel(Name)}/Show/tabs/BasicsTab.tsx` : null %>"
---
import React from 'react';
import { Tab, TextField } from 'react-admin';

const BasicsTab = (props) => (
  <Tab label="basics" {...props}>
    <%- fields.map(field =>`<TextField source="${field}" />`).join("\n")%>
  </Tab>
);

export default BasicsTab;
