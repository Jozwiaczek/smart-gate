import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import Hell from '.';

export default {
  title: 'Elements/animations/Hell',
  component: Hell,
} as Meta;

const Wrapper = styled.div`
  width: 500px;
`;

const Template: Story = (args) => (
  <Wrapper>
    <Hell {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
