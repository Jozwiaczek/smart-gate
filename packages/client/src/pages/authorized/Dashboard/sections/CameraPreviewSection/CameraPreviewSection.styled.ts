import styled, { css } from 'styled-components';

import { baseCircleLoaderLabel } from '../../../../../elements/animations/CircleLoader/CircleLoader.styled';

export const Wrapper = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    width: 100%;
    display: flex;

    ${down(breakpoints.sm)} {
      justify-content: center;
    }
  `,
);

export const LoadingContainer = styled.div(
  ({ theme: { palette, sizes, down, breakpoints } }) => css`
    position: relative;
    width: 520px;
    height: 345px;
    border-radius: ${sizes.borderRadius};
    background: ${palette.background.default};
    box-shadow: 5px 5px 15px 10px rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${down(breakpoints.sm)} {
      width: 100%;
      max-width: 520px;
      height: unset;
      aspect-ratio: 3 / 2;
    }
  `,
);

export const LoadingLabel = styled.h5`
  ${baseCircleLoaderLabel};
`;

export const CameraPreview = styled.img<CameraPreviewProps>(
  ({ isLoaded, theme: { sizes, down, breakpoints } }) => css`
    border-radius: ${sizes.borderRadius};
    width: 520px;
    height: 345px;

    ${!isLoaded &&
    css`
      visibility: hidden;
      height: 0 !important;
      width: 0 !important;
    `};

    ${down(breakpoints.sm)} {
      width: 100%;
      height: unset;
    }
  `,
);
