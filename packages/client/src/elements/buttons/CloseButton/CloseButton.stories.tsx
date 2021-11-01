import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CloseButtonProps } from './CloseButton.types';
import CloseButton from './index';

export default {
  title: 'Elements/buttons/Close Button',
  component: CloseButton,
} as Meta;

const Template: Story<CloseButtonProps> = (args) => <CloseButton {...args} />;

export const Default = Template.bind({});
