import styled from 'styled-components';

import Button from '../Button';

export const StyledButton = styled(Button)`
  width: 40px;
  height: 40px;
  min-width: 0;
  padding: 0;
  transition: width 300ms ease-in-out;

  p {
    display: none;
  }

  svg {
    margin-left: 0;
    transition: margin-left 300ms ease-in-out;
  }

  :hover {
    width: 100px;
    transition: width 300ms ease-in-out;
    p {
      display: block;
    }
    svg {
      margin-left: 12px;
      transform: none;
      transition: margin-left 300ms ease-in-out;
    }
  }
`;
