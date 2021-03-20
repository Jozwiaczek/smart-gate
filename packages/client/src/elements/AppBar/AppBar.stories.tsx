import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import AppBar from '.';

export default {
  title: 'Elements/AppBar',
  component: AppBar,
} as Meta;

const Template: Story = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
