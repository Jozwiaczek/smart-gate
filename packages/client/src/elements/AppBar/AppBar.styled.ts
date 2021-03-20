import styled from 'styled-components';

import { IconButton } from '../buttons';
import { ItemLabelProps, StyledIconButtonProps } from './AppBar.types';

export const Wrapper = styled.div(
  ({ theme: { palette } }) => `
  display: flex;
  width: 100%;
  height: 90px;
  justify-content: space-around;
  align-items: center; 
  border-radius: 25px 25px 0 0;
  background: ${palette.background.paper};
`,
);

export const StyledIconButton = styled(IconButton)<StyledIconButtonProps>(
  ({ isActive, theme: { palette } }) => `
  color: ${palette.text.secondary};
  ${
    isActive &&
    `
     color: ${palette.primary.main};
  `
  }
`,
);

export const ItemLabel = styled.p<ItemLabelProps>`
  margin-top: 7px;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-weight: 500;
  visibility: hidden;
  font-size: 14px;
  ${({ isActive }) => isActive && 'visibility: visible'};
`;

export const Item = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
`;
