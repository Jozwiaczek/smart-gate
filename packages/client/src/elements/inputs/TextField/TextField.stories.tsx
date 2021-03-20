import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { UserIcon } from '../../../icons';
import TextField from '.';
import { TextFieldProps } from './TextField.types';

export default {
  title: 'Elements/inputs/Text Field',
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
  startAdornment: <UserIcon />,
  name: 'firstName',
};
