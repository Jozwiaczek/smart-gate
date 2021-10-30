import styled, { css } from 'styled-components';

import { DetailedKeyIcon } from '../../icons';
import { PulseCircle } from './components/PulsatingCircles/PulsatingCircles.styled';
import {
  hidePulsatingCircles,
  infoBoxZoomInOut,
  verticalKeyIconTick,
} from './ToggleSlider.animations';
import {
  ARROW_UP_BORDER_SIZE,
  COMPLETED_TOGGLING_ANIMATION_DURATION,
  INFO_BOX_TRANSITION_DURATION,
  SLIDER_HEIGHT,
  SLIDER_TARGET_SIZE,
  SLIDER_WIDTH,
} from './ToggleSlider.constants';
import {
  ArrowUpProps,
  BaseSliderStylesProps,
  InfoBoxLabelProps,
  InfoBoxProps,
  SliderThumbProps,
  ThumbCircleProps,
} from './ToggleSlider.types';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  gap: 30px;
`;

export const InfoBox = styled.div<InfoBoxProps>(
  ({ state, theme: { palette, sizes } }) => css`
    background: ${palette.background.paper};
    border-radius: ${sizes.borderRadius};
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background ${INFO_BOX_TRANSITION_DURATION}ms ease-in-out;

    ${state === 'success' &&
    css`
      background: ${palette.primary.main};
      animation: ${infoBoxZoomInOut} ${COMPLETED_TOGGLING_ANIMATION_DURATION}ms 1 linear;
    `}
  `,
);

export const InfoBoxLabel = styled.p<InfoBoxLabelProps>(
  ({ state, theme: { palette } }) => css`
    color: ${palette.text.secondary};
    transition: color ${INFO_BOX_TRANSITION_DURATION}ms ease-in-out;

    ${state === 'success' &&
    css`
      color: ${palette.text.primary};
    `}
  `,
);

export const SliderTarget = styled.div<BaseSliderStylesProps>(
  ({ theme: { palette }, isHorizontal }) => css`
    background: ${palette.background.paperHover};
    border-radius: 100%;
    color: ${palette.background.paper};
    height: ${SLIDER_TARGET_SIZE}px;
    width: ${SLIDER_TARGET_SIZE}px;
    display: flex;
    margin: ${isHorizontal ? '0 10px 0 0' : '10px 0 0 0'};
    justify-content: center;
    align-items: center;
    position: relative;
  `,
);

export const HintArrow = styled.div<ArrowUpProps>(
  ({ isDragging, isHorizontal, theme: { palette } }) => css`
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    position: absolute;
    top: ${isHorizontal ? '26px' : '30px'};
    left: ${isHorizontal ? '20px' : 'none'};
    transform: rotate(${isHorizontal ? '45deg' : '-45deg'});

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      border-width: ${ARROW_UP_BORDER_SIZE}px ${ARROW_UP_BORDER_SIZE}px 0 0;
      border-style: solid;
      border-color: ${palette.background.paper};
      transition: transform 0.2s ease;
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
      border-width: 0 ${ARROW_UP_BORDER_SIZE}px 0 0;
      border-style: solid;
      border-color: ${palette.background.paper};
      transform-origin: 100% 0;
      transition: transform 0.2s ease;
    }

    ${isDragging &&
    css`
      :after {
        transform: rotate(45deg);
        border-color: ${palette.primary.main};
        height: 110%;
        top: -26px;
      }

      :before {
        border-color: ${palette.primary.main};
        transform: scale(0.8);
      }
    `}
  `,
);

export const ThumbCircle = styled.div<ThumbCircleProps>(
  ({ isDragging, rotateDegree, isSnapped, isToggled, theme: { palette } }) => css`
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
    box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.1);

    ${isToggled &&
    css`
      animation: ${verticalKeyIconTick} ${COMPLETED_TOGGLING_ANIMATION_DURATION}ms 1 ease-in-out;
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
        animation: ${hidePulsatingCircles} 500ms 1 linear;
        animation-delay: 0s;
      }
    `}
  `,
);

export const Slider = styled.div<BaseSliderStylesProps>(
  ({ theme: { palette }, isHorizontal }) => css`
    background: ${palette.background.paper};
    width: ${isHorizontal ? SLIDER_HEIGHT : SLIDER_WIDTH}px;
    height: ${isHorizontal ? SLIDER_WIDTH : SLIDER_HEIGHT}px;
    border-radius: ${(isHorizontal ? SLIDER_HEIGHT : SLIDER_WIDTH) / 2}px;
    display: flex;
    flex-direction: ${isHorizontal ? 'row-reverse' : 'column'};
    position: relative;
    align-items: center;
    justify-content: space-between;
    box-shadow: ${palette.boxShadow.default};
  `,
);

export const StyledDetailedKeyIcon = styled(DetailedKeyIcon)<BaseSliderStylesProps>(
  ({ isHorizontal }) =>
    isHorizontal &&
    css`
      transform: scale(-1, 1) rotate(90deg);
    `,
);
