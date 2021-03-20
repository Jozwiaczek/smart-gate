import styled from 'styled-components';

import { getCssColor } from '../../../utils';
import hexToRgba from '../../../utils/hexToRgba';
import { RippleEffect } from '../../animations';

export const StyledButton = styled.button(
  ({ color, theme }) => `
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  padding: 12px;
  font-size: 16px;
  background: transparent;
  color: ${getCssColor({ color, theme })};
  text-align: center;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  
  ${RippleEffect} {
    background: ${getCssColor({ color, theme })}
  }

  :focus {
    background: ${hexToRgba('#fff', 0.1)};
  }

  :hover,
  :active {
    background: ${hexToRgba('#fff', 0.2)};
  }
  
  :disabled {
    color: ${theme.palette.text.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
    :hover,
    :active {
      background: none;
    }
  }
`,
);
