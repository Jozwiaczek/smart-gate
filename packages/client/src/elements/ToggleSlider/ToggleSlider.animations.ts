import { keyframes } from 'styled-components';

export const infoBoxZoomInOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const verticalKeyIconTick = keyframes`
  0% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(75deg);
  }
  100% {
    transform: rotate(90deg);
  }
`;

export const innerCirclePulse = keyframes`
  from {
    transform: scale(1, 1);
    opacity: 0.5;
  }
  to {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
`;

export const outerCirclePulse = keyframes`
  from {
    transform: scale(1, 1);
    opacity: 0.3;
  }
  to {
    transform: scale(1.7, 1.7);
    opacity: 0;
  }
`;

export const hidePulsatingCircles = keyframes`
  from {
    transform: scale(1.08, 1.08);
    opacity: 0.8;
  }
  to {
    transform: scale(1, 1);
    opacity: 0;
  }
`;
