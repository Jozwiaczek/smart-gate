import styled, { css } from 'styled-components';

import { ChevronDownIcon } from '../../icons';
import { ContentProps, StyledChevronDownIconProps } from './ExpandoContainer.types';

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
`;

export const Content = styled.div<ContentProps>(
  ({ open, contentHeight }) => css`
    width: 100%;
    overflow: hidden;
    height: ${open ? `${contentHeight}px` : '0'};
    transition: height 400ms cubic-bezier(0.83, 0, 0.17, 1);
  `,
);

export const StyledChevronDownIcon = styled(ChevronDownIcon)<StyledChevronDownIconProps>(
  ({ open }) => css`
    transition: transform 400ms cubic-bezier(0.83, 0, 0.17, 1);

    ${open &&
    css`
      transform: rotate(180deg);
    `}
  `,
);
