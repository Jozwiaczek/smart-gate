import styled, { css, keyframes } from 'styled-components';

export const ToggleSliderWrapper = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    margin: 80px 0 20px;
    display: inline-block;
    ${down(breakpoints.sm)} {
      display: flex;
      justify-content: center;
    }
  `,
);

export const DisconnectedContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const wiresAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.015);
  }
  100% {
    transform: scaleX(1);
  }
`;

export const DisconnectedWiredWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    width: 300px;
    margin-bottom: 60px;
    overflow: hidden;
    svg {
      animation: ${wiresAnimation} 1500ms infinite ease-in-out;
    }

    ${down(breakpoints.sm)} {
      width: 100vw;
    }
  `,
);

export const DisconnectedTitle = styled.h3(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
  `,
);

export const DisconnectedBody = styled.p(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
    text-align: center;
    margin-top: 30px;
  `,
);

export const DisconnectedIcons = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    gap: 50px;
    color: ${palette.text.secondary};
  `,
);
