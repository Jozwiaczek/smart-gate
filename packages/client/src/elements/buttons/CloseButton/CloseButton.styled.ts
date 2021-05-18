import styled, { css } from 'styled-components';

const size = '21px';

export const baseLineStyle = css`
  background: ${({ theme: { palette } }) => palette.text.secondary};
  border-radius: 2px;
  height: 3px;
  margin-top: 8px;
  position: absolute;
  transition: all 0.3s ease-in;
  width: ${size};
`;

export const LeftRight = styled.div`
  ${baseLineStyle};
  transform: rotate(45deg);
`;

export const RightLeft = styled.div`
  ${baseLineStyle};
  transform: rotate(-45deg);
`;

export const StyledButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: ${size};
  outline: none;
  position: relative;
  width: ${size};

  :focus-visible {
    box-shadow: 0 0 0 2px ${({ theme: { palette } }) => palette.primary.main};
    transition: box-shadow 150ms ease-in-out;
  }

  &:hover ${LeftRight} {
    background: ${({ theme: { palette } }) => palette.colors.red};
    transform: rotate(-45deg);
  }
  &:hover ${RightLeft} {
    background: ${({ theme: { palette } }) => palette.colors.red};
    transform: rotate(45deg);
  }
`;
