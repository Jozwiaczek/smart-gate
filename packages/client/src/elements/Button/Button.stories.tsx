import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from '.';
import { ButtonProps } from './Button.types';

export default {
  title: 'Elements/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
  withArrow: true,
};
