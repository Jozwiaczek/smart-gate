import styled, { keyframes } from 'styled-components';

import { ThemeType } from '../../../theme/Theme';
import { CubeProps, GridProps } from './Spinner.types';

export const CubeGrid = styled.div<GridProps>(
  ({ size, margin }) => `
    width: ${size ?? '18px'};
    height: ${size ?? '18px'};
    ${margin ? `margin: ${margin}` : ''};
  `,
);

const cubeGridScaleDelay = keyframes`
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
      transform: scale3D(0, 0, 1);
  }
`;

export const Cube = styled.div<CubeProps>`
  animation: ${cubeGridScaleDelay} 1.3s infinite ease-in-out;
  animation-delay: ${({ animationDelay }) => `${animationDelay}ms`};
  background-color: ${({ color, theme: { palette } }) =>
    color === ThemeType.light ? palette.primary.light : palette.primary.dark};
  float: left;
  height: 33%;
  width: 33%;
`;
