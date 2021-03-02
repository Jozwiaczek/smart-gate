import styled from 'styled-components';

import { CardProps } from './Card.types';

const Card = styled.div<CardProps>(
  ({ theme: { sizes, palette, breakpoints, down } }) => `
  background: ${palette.background.paper};
  box-shadow: ${palette.boxShadow};
  border-radius: ${sizes.borderRadius};
  padding: 50px;
  ${down(breakpoints.sm)} {
    padding: 40px 20px
  }
`,
);

export default Card;
