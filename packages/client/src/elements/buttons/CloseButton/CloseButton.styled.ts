import styled, { css } from 'styled-components';

const size = '21px';

export const baseLineStyle = css`
  height: 3px;
  width: ${size};
  margin-top: 8px;
  position: absolute;
  background: ${({ theme: { palette } }) => palette.text.secondary};
  border-radius: 2px;
  transition: all 0.3s ease-in;
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
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: ${size};
  height: ${size};
  cursor: pointer;
  outline: none;

  :focus-visible {
    transition: box-shadow 150ms ease-in-out;
    box-shadow: 0 0 0 2px ${({ theme: { palette } }) => palette.primary.main};
  }

  &:hover ${LeftRight} {
    transform: rotate(-45deg);
    background: ${({ theme: { palette } }) => palette.colors.red};
  }
  &:hover ${RightLeft} {
    transform: rotate(45deg);
    background: ${({ theme: { palette } }) => palette.colors.red};
  }
`;
