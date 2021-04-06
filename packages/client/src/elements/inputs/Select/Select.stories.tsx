import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Select from './index';
import { SelectProps } from './Select.types';

export default {
  title: 'Elements/inputs/Select',
  component: Select,
} as Meta;

const Template: Story<SelectProps<number>> = (args) => (
  <Select {...args}>
    <option value={5}>5</option>
    <option value={15}>15</option>
    <option value={25}>25</option>
  </Select>
);

export const Default = Template.bind({});
Default.args = {
  value: 5,
};
