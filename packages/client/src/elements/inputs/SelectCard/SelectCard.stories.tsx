import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import SelectCard, { SelectCardProps } from './index';

export default {
  title: 'Elements/Inputs/Select Card',
  component: SelectCard,
} as Meta;

const Template: Story<SelectCardProps<number>> = (args) => (
  <SelectCard {...args}>
    <option value={5}>5</option>
    <option value={15}>15</option>
    <option value={25}>25</option>
  </SelectCard>
);

export const Default = Template.bind({});
Default.args = {
  value: 5,
};
