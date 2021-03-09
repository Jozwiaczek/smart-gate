import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { AuthLayoutProps } from './AuthLayout.types';
import { Container } from './index';

export default {
  title: 'Elements/layouts/Auth Layout',
  component: Container,
} as Meta;

const Template: Story<AuthLayoutProps> = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
