import styled, { css } from 'styled-components';

export const LoadingContainer = styled.div(
  ({ theme: { palette, sizes, down, breakpoints } }) => css`
    position: relative;
    width: 520px;
    height: 345px;
    border-radius: ${sizes.borderRadius};
    background: ${palette.background.paper};

    ${down(breakpoints.sm)} {
      width: 100%;
      padding-bottom: 66.66%;
    }
  `,
);

export const LoadingContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const CameraPreview = styled.img<CameraPreviewProps>(
  ({ isLoaded, theme: { sizes, down, breakpoints } }) => css`
    border-radius: ${sizes.borderRadius};
    width: 520px;
    height: 345px;

    ${!isLoaded &&
    css`
      visibility: hidden;
    `};

    ${down(breakpoints.sm)} {
      width: 100%;
      height: unset;
    }
  `,
);
