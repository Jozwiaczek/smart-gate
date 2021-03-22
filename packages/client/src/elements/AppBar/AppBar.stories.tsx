import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import AppBar from '.';

export default {
  title: 'Elements/AppBar',
  component: AppBar,
} as Meta;

const MockWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Template: Story = (args) => (
  <MockWrapper>
    <AppBar {...args} />
  </MockWrapper>
);

export const DefaultView = Template.bind({});
DefaultView.parameters = {
  jest: ['AppBar.test.tsx'],
};
