import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import CloseButton from './index';

export default {
  title: 'Elements/buttons/Close Button',
  component: CloseButton,
} as Meta;

const Template: Story<CloseButtonProps> = (args) => <CloseButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  noLabel: false,
  label: 'Custom close label',
};
