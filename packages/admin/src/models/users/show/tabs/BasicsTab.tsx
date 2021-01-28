import React from 'react';
import { Tab, TextField } from 'react-admin';

const BasicsTab = (props) => (
  <Tab label="basics" {...props}>
    <TextField source="firstName" />
    <TextField source="lastName" />
  </Tab>
);

export default BasicsTab;
