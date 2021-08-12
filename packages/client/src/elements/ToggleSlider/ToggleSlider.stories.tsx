import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import ToggleSlider from '.';

export default {
  title: 'Elements/Toggle Slider',
  component: ToggleSlider,
} as Meta;

const Template: Story = () => {
  const toggleGate = () => console.log('toggled');
  return <ToggleSlider onToggle={toggleGate} />;
};

export const Default = Template.bind({});
