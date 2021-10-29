import { Meta, Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import RippleEffect from '.';

export default {
  title: 'Elements/animations/Ripple effect',
  component: RippleEffect,
  argTypes: {
    color: { control: 'color' },
  },
} as Meta;

const ExampleContainer = styled.div`
  align-items: center;
  border: 3px solid #000;

  color: #fff;
  display: flex;
  height: 50px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 200px;
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
