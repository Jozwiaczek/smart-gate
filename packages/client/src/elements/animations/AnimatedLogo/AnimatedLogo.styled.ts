import styled from 'styled-components';

import { AnimatedLogoProps } from './AnimatedLogo.types';

export const AnimatedLogoWrapper = styled.div<AnimatedLogoProps>`
  cursor: pointer;
  margin: ${({ margin }) => margin};
`;
