import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import BackgroundLogo from '.';

export default {
  title: 'Elements/BackgroundLogo',
  component: BackgroundLogo,
} as Meta;

const Template: Story = (args) => <BackgroundLogo {...args} />;

export const Default = Template.bind({});
