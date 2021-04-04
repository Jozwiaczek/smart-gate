import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { DateFieldProps } from './DateField.types';
import DateField from './index';

export default {
  title: 'Elements/fields/DateField',
  component: DateField,
} as Meta;

interface MockRecord {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const Template: Story<DateFieldProps<MockRecord>> = (args) => <DateField {...args} />;

export const Default = Template.bind({});
Default.args = {
  source: 'createdAt',
  record: {
    id: 'z1s234sd',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
