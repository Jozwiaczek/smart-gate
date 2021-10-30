import { Meta, Story } from '@storybook/react';
import React from 'react';

import ToggleSlider from '.';
import { ToggleSliderProps } from './ToggleSlider.types';

export default {
  title: 'Elements/Toggle Slider',
  component: ToggleSlider,
} as Meta;

const Template: Story<ToggleSliderProps> = (args) => {
  return <ToggleSlider {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  orientation: 'horizontal',
  onToggle: () => console.log('toggled'),
};
