import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CardLayoutProps } from './CardLayout.types';
import { Container } from './index';

export default {
  title: 'Elements/layouts/Auth Layout',
  component: Container,
} as Meta;

const Template: Story<CardLayoutProps> = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
