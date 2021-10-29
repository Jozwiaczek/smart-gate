import { Meta, Story } from '@storybook/react';
import React from 'react';

import TextField from './index';
import { TextFieldProps } from './TextField.types';

export default {
  title: 'Elements/fields/TextField',
  component: TextField,
} as Meta;

interface MockRecord {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const Template: Story<TextFieldProps<MockRecord>> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  source: 'email',
  record: {
    id: 'z1s234sd',
    email: 'joe.doe@email.com',
    createdAt: new Date('04.03.2021'),
    updatedAt: new Date('04.03.2021'),
  },
};
