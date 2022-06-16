import styled, { css } from 'styled-components';

import { IconButton } from '../../../../buttons';

export const PaginationNumButton = styled(IconButton)`
  padding: 12px;
`;

interface SpaceSymbolContainerProps {
  hidden: boolean;
}

export const SpaceSymbolContainer = styled.p<SpaceSymbolContainerProps>(
  ({ hidden }) => css`
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    width: 8px;
    ${hidden && `color: transparent`};
  `,
);
