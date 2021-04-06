import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import TextButton from '.';
import { TextButtonProps } from './TextButton.types';

export default {
  title: 'Elements/buttons/Text Button',
  component: TextButton,
} as Meta;

const Template: Story<TextButtonProps> = (args) => <TextButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
