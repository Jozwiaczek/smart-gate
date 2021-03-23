import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ButtonProps } from './Button.types';
import Button from './index';

export default {
  title: 'Elements/buttons/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
  withArrow: true,
  disabled: false,
};
