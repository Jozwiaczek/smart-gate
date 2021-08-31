import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import DeleteHoverButton from '.';

export default {
  title: 'Elements/buttons/Delete Hover Button',
  component: DeleteHoverButton,
} as Meta;

const Template: Story = (args) => <DeleteHoverButton {...args} />;

export const Default = Template.bind({});
