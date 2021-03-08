import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import LockIcon from '../../../icons/LockIcon';
import IconButton from '.';

export default {
  title: 'Elements/buttons/Icon Button',
  component: IconButton,
} as Meta;

const Template: Story = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <LockIcon />
    </>
  ),
};
