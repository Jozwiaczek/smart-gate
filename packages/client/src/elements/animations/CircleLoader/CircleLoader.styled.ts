import styled, { css, keyframes } from 'styled-components';

import { CircleLoaderBackgroundIcon, CircleLoaderIndicatorIcon, ThunderIcon } from '../../../icons';

export const BackgroundCircle = styled(CircleLoaderBackgroundIcon)<BaseCircleLoaderStyledProps>(
  ({ size }) => css`
    position: absolute;
    right: 0;
    width: ${size}px;
    height: ${size}px;
  `,
);

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Indicator = styled(CircleLoaderIndicatorIcon)<BaseCircleLoaderStyledProps>(
  ({ size }) => css`
    position: absolute;
    right: 0;
    transform-origin: bottom left;
    animation: ${spinAnimation} 3s cubic-bezier(0.65, 0.47, 0.32, 0.44) infinite;
    width: ${size / 2}px;
    height: ${size / 2}px;
  `,
);

export const Wrapper = styled.div<BaseCircleLoaderStyledProps>(
  ({ size }) => css`
    position: relative;
    width: ${size}px;
    height: ${size}px;
  `,
);

export const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

export const Thunder = styled(ThunderIcon)<ThunderProps>(
  ({ isLarge }) => css`
    width: ${isLarge ? 106 : 52}px;
    height: ${isLarge ? 64 : 32}px;
  `,
);

const linearAnimation = keyframes`
  0% {
    background-position: 10% 0
  }
  50% {
    background-position: 90% 100%
  }
  100% {
    background-position: 10% 0
  }
`;

export const baseCircleLoaderLabel = css`
  animation: ${linearAnimation} 3s cubic-bezier(0.65, 0.47, 0.32, 0.44) infinite;
  background: linear-gradient(90deg, #257d69 15%, #40df9f 60%);
  background-size: 250% 250%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 12px;
`;

export const Label = styled.h4`
  ${baseCircleLoaderLabel};
`;
