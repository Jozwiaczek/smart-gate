import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import { UserIcon } from '../../../icons';
import TextInput from '.';
import { TextInputProps } from './TextInput.types';

export default {
  title: 'Elements/inputs/Text Input',
  component: TextInput,
} as Meta;

const MockWrapper = styled.div`
  width: 300px;
`;

const Template: Story<TextInputProps> = (args) => (
  <MockWrapper>
    <TextInput {...args} />
  </MockWrapper>
);

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

export const PasswordType = Template.bind({});
PasswordType.args = {
  placeholder: 'Example placeholder',
  name: 'Password',
  type: 'password',
};
PasswordType.parameters = {
  jest: ['TextInput.test.tsx'],
};
