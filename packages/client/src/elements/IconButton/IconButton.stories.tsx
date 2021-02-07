import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import LockIcon from '../../icons/LockIcon';
import IconButton from '.';
import { IconButtonProps } from './IconButton.types';

export default {
  title: 'Elements/IconButton',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <LockIcon />
    </>
  ),
  color: 'primary',
};
