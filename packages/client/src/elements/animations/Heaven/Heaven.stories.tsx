import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import Heaven from '.';

export default {
  title: 'Elements/animations/Heaven',
  component: Heaven,
} as Meta;

const Wrapper = styled.div`
  width: 500px;
`;

const Template: Story = (args) => (
  <Wrapper>
    <Heaven {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.parameters = {
  chromatic: { disable: true },
};
