import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import AppBar from '.';

export default {
  title: 'Elements/AppBar',
  component: AppBar,
} as Meta;

const MockWrapper = styled.div`
  width: 400px;
`;

const Template: Story = (args) => (
  <MockWrapper>
    <AppBar {...args} />
  </MockWrapper>
);

export const defaultView = Template.bind({});
defaultView.parameters = {
  jest: ['AppBar.test.tsx'],
};
