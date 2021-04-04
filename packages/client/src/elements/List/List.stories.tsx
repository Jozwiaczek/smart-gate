import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

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

const Template: Story<ListProps> = (args) => (
  <MockWrapper>
    <List {...args} />
  </MockWrapper>
);

export const Default = Template.bind({});
Default.args = {
  resource: 'users',
};
