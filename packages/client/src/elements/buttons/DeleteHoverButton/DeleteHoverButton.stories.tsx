import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import DeleteHoverButton from '.';
import { DeleteHoverButtonProps } from './DeleteHoverButton.types';

export default {
  title: 'Elements/buttons/Delete Hover Button',
  component: DeleteHoverButton,
} as Meta;

const Template: Story<DeleteHoverButtonProps> = (args) => <DeleteHoverButton {...args} />;

export const Default = Template.bind({});
