import styled, { keyframes } from 'styled-components';

import { CubeProps, GridProps } from './Spinner.types';

export const CubeGrid = styled.div<GridProps>(
  ({ size, margin }) => `
    width: ${size};
    height: ${size};
    margin: ${margin};
  `,
);

const cubeGridScaleDelay = keyframes`
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  } 35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
`;

export const Cube = styled.div<CubeProps>`
  width: 33%;
  height: 33%;
  background-color: ${({ color, theme: { palette } }) =>
    color !== 'primary' ? palette.secondary.main : palette.primary.main};
  float: left;
  animation: ${cubeGridScaleDelay} 1.3s infinite ease-in-out;
  animation-delay: ${({ animationDelay }) => `${animationDelay}ms`};
`;
