import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Spinner from '.';
import { SpinnerProps } from './Spinner.types';

export default {
  title: 'Elements/Spinner',
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
  size: '20px',
  margin: '0',
};
