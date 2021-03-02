import styled from 'styled-components';

import { CardProps } from './Card.types';

export const Wrapper = styled.div<CardProps>(
  ({ minWidth, theme: { sizes, palette, breakpoints, down } }) => `
  display: flex;
  flex-direction: column;
  background: ${palette.background.paper};
  box-shadow: ${palette.boxShadow};
  border-radius: ${sizes.borderRadius};
  padding: 50px;
  min-width: ${minWidth};
  ${down(breakpoints.xs)} {
    padding: 40px 10px
  }
`,
);
