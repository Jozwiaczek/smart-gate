import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import { BaseApiResource } from '../../interfaces/api.types';
import List from '.';
import { ListProps } from './List.types';

export default {
  title: 'Elements/ApiList',
  component: List,
} as Meta;

const MockWrapper = styled.div`
  padding: 20px;
  width: 70%;
  height: 100%;
`;

interface MockDataRow extends BaseApiResource {
  firstName: string;
  lastName: string;
}

const data = [...Array(30)].map((_, id) => ({
  id: id.toString(),
  firstName: `${id}-First Name`,
  lastName: `${id}-Last Name`,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const headers = [
  {
    key: 'firstName',
    label: 'First name',
  },
  {
    key: 'lastName',
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
