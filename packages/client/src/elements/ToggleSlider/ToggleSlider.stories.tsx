import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import ToggleSlider from '.';

export default {
  title: 'Elements/ToggleSlider',
  component: ToggleSlider,
} as Meta;

const Template: Story = (args) => <ToggleSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
