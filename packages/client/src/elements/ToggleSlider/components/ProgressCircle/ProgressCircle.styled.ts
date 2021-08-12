import styled, { css, keyframes } from 'styled-components';

import { COMPLETED_TOGGLING_ANIMATION_DURATION } from '../../ToggleSlider.constants';
import { STROKE_WIDTH } from './ProgressCircle.constants';

const completedScaleUp = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

export const ProgressCircleWrapper = styled.div<{ isCompleted: boolean }>(
  ({ theme: { palette }, isCompleted }) => css`
    position: absolute;
    top: -${STROKE_WIDTH / 2}px;
    color: ${palette.primary.main};

    ${isCompleted &&
    css`
      animation: ${completedScaleUp} ${COMPLETED_TOGGLING_ANIMATION_DURATION}ms 1 ease-in-out;
      opacity: 0;
    `}
  `,
);
