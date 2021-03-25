import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import PageLoader from './index';

export default {
  title: 'Elements/animations/Page Loader',
  component: PageLoader,
} as Meta;

const Template: Story = (args) => <PageLoader {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  chromatic: { disable: true },
};
