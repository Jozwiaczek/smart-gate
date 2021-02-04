import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import TextField from '.';
import { UserIcon } from '../../../icons';
import { TextFieldProps } from './TextField.types';

export default {
  title: 'Elements/Inputs/Text Field',
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Example placeholder',
  name: 'firstName',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  placeholder: 'Example placeholder',
  icon: <UserIcon />,
  name: 'firstName',
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Example placeholder',
  name: 'password',
  required: true,
};
