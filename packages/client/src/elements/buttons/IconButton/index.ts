import styled from 'styled-components';

import { getCssColor } from '../../../utils';

const IconButton = styled.button(
  ({ color, theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  font-size: 16px;
  background: transparent;
  color: ${getCssColor({ color, theme })};
  text-align: center;
  border: none;
  cursor: pointer;
  outline: none;
  transition: opacity 150ms;
  overflow: hidden;
  
  &:disabled {
    background-color: ${theme.palette.background.disabled};
    color: ${theme.palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
  }

  &:hover,
  &:active {
    opacity: 0.75;
  }
  
  &:focus {
    box-shadow: 0 0 0 1px ${theme.palette.text.primary};
  }
`,
);

export default IconButton;
