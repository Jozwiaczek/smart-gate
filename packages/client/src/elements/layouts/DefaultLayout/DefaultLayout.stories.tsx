import { Meta, Story } from '@storybook/react';
import React from 'react';

import DefaultLayout from './index';

export default {
  title: 'Elements/layouts/Default Layout',
  component: DefaultLayout,
} as Meta;

const Template: Story = (args) => <DefaultLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
