import styled from 'styled-components';

import { CardProps } from './Card.types';

export const Wrapper = styled.div<CardProps>(
  ({ minWidth, theme: { sizes, palette } }) => `
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: ${palette.boxShadow};
  border-radius: ${sizes.borderRadius};
  padding: 50px;
  min-width: ${minWidth};
`,
);
