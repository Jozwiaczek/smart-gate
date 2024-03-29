import { Meta, Story } from '@storybook/react';
import React from 'react';

import BackgroundSideLogo from '.';

export default {
  title: 'Elements/Background Side Logo',
  component: BackgroundSideLogo,
} as Meta;

const Template: Story = (args) => <BackgroundSideLogo {...args} />;

export const Default = Template.bind({});
