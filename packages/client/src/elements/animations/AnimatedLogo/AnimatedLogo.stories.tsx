import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import AnimatedLogo from '.';

export default {
  title: 'Elements/animations/Animated Logo',
  component: AnimatedLogo,
} as Meta;

const Template: Story = (args) => <AnimatedLogo {...args} />;

export const Default = Template.bind({});
