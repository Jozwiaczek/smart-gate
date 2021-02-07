import styled from 'styled-components';

export const StyledIconButton = styled.button(
  ({ color, theme: { palette } }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  font-size: 16px;
  color: ${color !== 'primary' ? palette.secondary.main : palette.primary.main};
  text-align: center;
  border: none;
  cursor: pointer;
  transition: opacity 150ms;
  overflow: hidden;
  
  &:disabled {
    background-color: ${palette.action.disabledBackground};
    color: ${palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;

    &:hover,
    &:active {
      background-color: ${palette.action.disabledBackground};
    }
  }

  &:hover,
  &:active {
    opacity: 0.6;
  }
`,
);
