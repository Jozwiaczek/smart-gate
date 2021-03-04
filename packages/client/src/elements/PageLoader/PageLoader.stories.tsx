import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import PageLoader from '.';

export default {
  title: 'Elements/Page Loader',
  component: PageLoader,
} as Meta;

const Template: Story = (args) => <PageLoader {...args} />;

export const Default = Template.bind({});
