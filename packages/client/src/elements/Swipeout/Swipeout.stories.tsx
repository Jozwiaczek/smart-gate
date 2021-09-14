import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled, { css } from 'styled-components';

import Swipeout from '.';
import { SwipeoutProps } from './Swipeout.types';

export default {
  title: 'Elements/Swipeout',
  component: Swipeout,
} as Meta;

const MockContainer = styled.div(
  ({ theme: { palette } }) => css`
    width: 320px;
    height: 200px;
    background: ${palette.background.paper};
    display: flex;
    align-items: center;
    overflow: hidden;
  `,
);

const MockRow = styled.div(
  ({ theme: { palette } }) => css`
    width: 320px;
    height: 50px;
    background: ${palette.primary.dark};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${palette.text.light};
  `,
);

const Template: Story<SwipeoutProps> = (args) => (
  <MockContainer>
    <Swipeout {...args}>
      <MockRow>⬅ Swipe left</MockRow>
    </Swipeout>
  </MockContainer>
);

export const Default = Template.bind({});
Default.args = {
  right: [
    {
      order: 1,
      component: 'Edit',
      onPress: () => console.log('Edit button pressed'),
      borderRadius: '12px 0 0 12px',
      background: 'transparent',
      width: 100,
    },
    {
      order: 2,
      component: 'Delete',
      onPress: () => console.log('Delete button pressed'),
      background: 'red',
      color: 'text-light',
    },
  ],
  onOpen: () => console.log('onOpen'),
  onClose: () => console.log('onClose'),
  onSwipeStart: () => console.log('onSwipeStart'),
  onSwipeEnd: () => console.log('onSwipeEnd'),
  autoClose: true,
  disabled: false,
};
