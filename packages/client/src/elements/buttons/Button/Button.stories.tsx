import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ButtonProps } from './Button.types';
import Button from './index';

export default {
  title: 'Elements/buttons/Button',
  component: Button,
  argTypes: {
    colorVariant: {
      options: ['light', 'dark', 'red', 'blue', 'card'],
      control: { type: 'radio' },
    },
    withArrow: {
      control: {
        type: 'boolean',
      },
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};

export const Loading = Template.bind({});
Loading.args = {
  children: <>Lorem Ipsum</>,
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: <>Lorem Ipsum</>,
  disabled: true,
};

export const WithTranslationLabel = Template.bind({});
WithTranslationLabel.args = {
  label: 'routes.login.login',
};
