import { Meta, Story } from '@storybook/react';
import React from 'react';

import BackButton from '.';

export default {
  title: 'Elements/buttons/Back Button',
  component: BackButton,
} as Meta;

const Template: Story = (args) => <BackButton {...args} />;

export const Default = Template.bind({});
