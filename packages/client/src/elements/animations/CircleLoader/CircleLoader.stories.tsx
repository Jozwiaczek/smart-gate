import { Meta, Story } from '@storybook/react';
import React from 'react';

import LoadingCircle from '.';

export default {
  title: 'Elements/animations/Circle loader',
  component: LoadingCircle,
  argTypes: {
    variant: {
      options: ['large', 'small'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<CircleLoaderProps> = (args) => <LoadingCircle {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'large',
  label: 'Loading...',
};
