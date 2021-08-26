import styled, { css } from 'styled-components';

import { innerCirclePulse, outerCirclePulse } from '../../ToggleSlider.animations';
import { SLIDER_WIDTH } from '../../ToggleSlider.constants';

export const PulseCircle = styled.div<PulseCircleProps>(
  ({ theme: { palette }, animationDelay = 0, asOuter = false }) => css`
    height: ${SLIDER_WIDTH}px;
    width: ${SLIDER_WIDTH}px;
    background: ${palette.primary.main};
    border-radius: 100%;
    position: absolute;
    opacity: 0;
    animation: ${asOuter ? outerCirclePulse : innerCirclePulse} 4s infinite linear;
    animation-delay: ${animationDelay}s;
  `,
);
