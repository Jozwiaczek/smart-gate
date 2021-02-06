import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CheckboxProps } from './Checkbox.types';
import Checkbox from '.';

export default {
  title: 'Elements/Inputs/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox Label',
};
