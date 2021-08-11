import styled, { css, keyframes } from 'styled-components';

import { SLIDER_HEIGHT, SLIDER_TARGET_SIZE, SLIDER_WIDTH } from './ToggleSlider.constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const InfoBox = styled.div(
  ({ theme: { palette, sizes } }) => css`
    background: ${palette.background.paper};
    border-radius: ${sizes.borderRadius};
    padding: 6px 26px;
  `,
);

export const InfoBoxLabel = styled.p(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
  `,
);

export const SliderTarget = styled.div(
  ({ theme: { palette } }) => css`
    background: ${palette.background.paperHover};
    border-radius: 100%;
    color: ${palette.background.paper};
    height: ${SLIDER_TARGET_SIZE}px;
    width: ${SLIDER_TARGET_SIZE}px;
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    position: relative;
  `,
);

export const ArrowUp = styled.div<ArrowUpProps>(
  ({ isDragging, theme: { palette } }) => css`
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    position: absolute;
    top: 30px;
    transform: rotate(-45deg);

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      border-width: 4px 4px 0 0;
      border-style: solid;
      border-color: ${palette.background.paper};
      transition: 0.2s ease;
      display: block;
      transform-origin: 100% 0;
    }

    &:after {
      content: '';
      float: left;
      position: relative;
      top: -100%;
      width: 100%;
      height: 100%;
      border-width: 0 4px 0 0;
      border-style: solid;
      border-color: ${palette.background.paper};
      transform-origin: 100% 0;
      transition: 0.2s ease;
    }

    ${isDragging &&
    css`
      :after {
        transform: rotate(45deg);
        border-color: ${palette.primary.main};
        height: 110%;
        top: -27px;
      }

      :before {
        border-color: ${palette.primary.main};
        transform: scale(0.8);
      }
    `}
  `,
);

export const ThumbCircle = styled.div<ThumbCircleProps>(
  ({ isDragging, rotateDegree, isSnapped, theme: { palette } }) => css`
    z-index: 100;
    border-radius: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${palette.background.paper};
    transition: box-shadow 150ms ease-in-out;
    transform: rotate(${rotateDegree}deg);

    ${isDragging &&
    css`
      box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.1);
      cursor: ${isDragging ? 'grabbing' : 'grab'};
    `}

    ${isSnapped
      ? css`
          :hover {
            cursor: not-allowed;
          }
        `
      : css`
          :hover {
            cursor: ${isDragging ? 'grabbing' : 'grab'};
          }
        `}
  `,
);

const innerPulse = keyframes`
  from {
    transform: scale(1, 1);
    opacity: 0.5;
  }
  to {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
`;

const outerPulse = keyframes`
  from {
    transform: scale(1, 1);
    opacity: 0.3;
  }
  to {
    transform: scale(1.7, 1.7);
    opacity: 0;
  }
`;

const pulseHide = keyframes`
  from {
    transform: scale(1.08, 1.08);
    opacity: 0.8;
  }
  to {
    transform: scale(1, 1);
    opacity: 0;
  }
`;

export const PulseCircle = styled.div<PulseCircleProps>(
  ({ theme: { palette }, animationDelay = 0, asOuter = false }) => css`
    height: ${SLIDER_WIDTH}px;
    width: ${SLIDER_WIDTH}px;
    background: ${palette.primary.main};
    border-radius: 100%;
    position: absolute;
    opacity: 0;
    animation: ${asOuter ? outerPulse : innerPulse} 4s infinite linear;
    animation-delay: ${animationDelay}s;
  `,
);

export const SliderThumb = styled.div<SliderThumbProps>(
  ({ disabledPulsing = false }) => css`
    height: ${SLIDER_WIDTH}px;
    width: ${SLIDER_WIDTH}px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    ${disabledPulsing &&
    css`
      ${PulseCircle} {
        animation: ${pulseHide} 500ms 1 linear;
        animation-delay: 0s;
      }
    `}
  `,
);

export const Slider = styled.div(
  ({ theme: { palette } }) => css`
    background: ${palette.background.paper};
    width: ${SLIDER_WIDTH}px;
    height: ${SLIDER_HEIGHT}px;
    border-radius: ${SLIDER_WIDTH / 2}px;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: space-between;

    ${SliderThumb}:hover ~ ${ArrowUp} {
    }
  `,
);
