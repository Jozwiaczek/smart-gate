import { Meta, Story } from '@storybook/react';
import React from 'react';

import LoadingCircle from '.';

export default {
  title: 'Elements/animations/Circle loader',
  component: LoadingCircle,
} as Meta;

const Template: Story<CircleLoaderProps> = (args) => <LoadingCircle {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 250,
  label: 'Loading...',
};
