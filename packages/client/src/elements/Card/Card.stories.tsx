import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Card from '.';
import { CardProps } from './Card.types';

export default {
  title: 'Elements/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
