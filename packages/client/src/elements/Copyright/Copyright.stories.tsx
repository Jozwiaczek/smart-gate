import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Copyright from '.';

export default {
  title: 'Elements/Copyright',
  component: Copyright,
} as Meta;

const Template: Story = (args) => <Copyright {...args} />;

export const Default = Template.bind({});
Default.args = {};
