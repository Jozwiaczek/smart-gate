import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ThemeType } from '../../../theme/Theme';
import Spinner from './index';
import { SpinnerProps } from './Spinner.types';

export default {
  title: 'Elements/animations/Spinner',
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: ThemeType.dark,
  size: '20px',
  margin: '0',
};
Default.parameters = {
  chromatic: { disable: true },
};
