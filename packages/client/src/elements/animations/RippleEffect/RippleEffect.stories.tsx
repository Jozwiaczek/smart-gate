import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import RippleEffect from '.';
import { RippleEffectProps } from './RippleEffect.types';

export default {
  title: 'Elements/animations/Ripple effect',
  component: RippleEffect,
  argTypes: {
    color: { control: 'color' },
  },
} as Meta;

const ExampleContainer = styled.div`
  // Required properties
  position: relative;
  overflow: hidden;

  // Additional styling
  width: 200px;
  height: 50px;
  border: 3px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Template: Story<RippleEffectProps> = (args) => (
  <ExampleContainer>
    Example container
    <RippleEffect {...args} />
  </ExampleContainer>
);

export const Default = Template.bind({});
Default.args = {
  color: '#fff',
  duration: 850,
};
