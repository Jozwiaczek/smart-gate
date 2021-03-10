import styled from 'styled-components';

import { AnimatedLogoProps } from './AnimatedLogo.types';

export const AnimatedLogoWrapper = styled.div<AnimatedLogoProps>`
  margin: ${({ margin }) => margin};
  cursor: pointer;
`;
