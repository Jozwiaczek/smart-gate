import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import PaperPlane from '.';

export default {
  title: 'Elements/animations/Paper plane',
  component: PaperPlane,
} as Meta;

const Wrapper = styled.div`
  width: 500px;
`;

const Template: Story = (args) => (
  <Wrapper>
    <PaperPlane {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.parameters = {
  chromatic: { disable: true },
};
