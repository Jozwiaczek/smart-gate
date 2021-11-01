import { Meta, Story } from '@storybook/react';
import React from 'react';

import Tooltip from '.';
import { TooltipProps } from './Tooltip.types';

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
      ],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hover me',
  label: 'Hello from tooltip.',
  placement: 'top',
};
