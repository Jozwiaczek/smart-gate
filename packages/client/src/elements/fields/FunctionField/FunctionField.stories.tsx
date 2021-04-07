import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { FunctionFieldProps } from './FunctionField.types';
import FunctionField from './index';

export default {
  title: 'Elements/fields/FunctionField',
  component: FunctionField,
} as Meta;

interface MockRecord {
  id: string;
  firstName: 'Joe';
  lastName: 'Doe';
  createdAt: Date;
  updatedAt: Date;
}

const Template: Story<FunctionFieldProps<MockRecord>> = (args) => <FunctionField {...args} />;

export const Default = Template.bind({});
Default.args = {
  record: {
    id: 'z1s234sd',
    firstName: 'Joe',
    lastName: 'Doe',
    createdAt: new Date('04.03.2021'),
    updatedAt: new Date('04.03.2021'),
  },
  render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
};
