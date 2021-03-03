import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Animated from '.';
import { AnimatedProps } from './Animated.types';

export default {
  title: 'Elements/Animated',
  component: Animated,
} as Meta;

const Template: Story<AnimatedProps> = (args) => <Animated {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
