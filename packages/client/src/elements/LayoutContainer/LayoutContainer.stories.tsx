import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import LayoutContainer from '.';

export default {
  title: 'Elements/Layout Container',
  component: LayoutContainer,
} as Meta;

const Template: Story = (args) => <LayoutContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
