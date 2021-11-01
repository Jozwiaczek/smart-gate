import { Meta, Story } from '@storybook/react';
import React from 'react';

import Link from '.';
import { LinkProps } from './Link.types';

export default {
  title: 'Elements/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
  to: 'https://github.com/Jozwiaczek/smart-gate',
  asOuterLink: true,
  colorVariant: 'default',
};
