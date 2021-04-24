import styled from 'styled-components';

export const RippleContainer = styled.div<RippleContainerProps>`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  span {
    animation-duration: ${({ duration }) => duration}ms;
    animation-name: ripple;
    background: ${({ color }) => color};
    border-radius: 100%;
    opacity: ${({ opacity }) => opacity};
    position: absolute;
    transform: scale(0);
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;
