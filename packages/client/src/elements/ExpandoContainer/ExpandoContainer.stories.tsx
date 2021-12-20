import { Meta, Story } from '@storybook/react';
import React from 'react';
import styled, { css } from 'styled-components';

import ExpandoContainer from '.';
import { ExpandoContainerProps } from './ExpandoContainer.types';

export default {
  title: 'Elements/Expando Container',
  component: ExpandoContainer,
} as Meta;

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Content = styled.div(
  ({ theme: { palette } }) => css`
    background: ${palette.primary.main};
  `,
);

const Template: Story<ExpandoContainerProps> = (args) => (
  <Wrapper>
    <ExpandoContainer {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <Content>
      <p>Lorem Ipsum1</p>
      <p>Lorem Ipsum2</p>
    </Content>
  ),
  header: <h3>Header</h3>,
};
