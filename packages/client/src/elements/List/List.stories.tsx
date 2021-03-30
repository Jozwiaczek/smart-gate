import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import List from '.';
import { ListProps } from './List.types';

export default {
  title: 'Elements/List',
  component: List,
} as Meta;

const MockWrapper = styled.div`
  padding: 20px;
  width: 70%;
  height: 100%;
`;

type MockDataRow = {
  firstName: string;
  lastName: string;
};

const data = [...Array(30)].map((_, id) => ({
  id,
  row: {
    firstName: `${id}-First Name`,
    lastName: `${id}-Last Name`,
  },
}));

const headers = [
  {
    label: 'First name',
  },
  {
    label: 'Last name',
  },
];

const Template: Story<ListProps<MockDataRow>> = (args) => (
  <MockWrapper>
    <List<MockDataRow> {...args} />
  </MockWrapper>
);

export const Default = Template.bind({});
Default.args = {
  headers,
  data,
  total: data.length,
  pagination: {
    page: 1,
    perPage: 20,
  },
};
