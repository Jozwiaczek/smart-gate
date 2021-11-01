import { Meta, Story } from '@storybook/react';
import React from 'react';

import Checkbox from '.';
import { CheckboxProps } from './Checkbox.types';

export default {
  title: 'Elements/inputs/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox Label',
};
