import styled, { css } from 'styled-components';

import { KeyIcon } from '../../../../icons';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  ${({ theme: { breakpoints, up } }) => `
      ${up(breakpoints.lg)} {
        overflow-x: auto;
      }
    `};
`;

export const ListContainer = styled.div`
  height: 100%;
  overflow-x: auto;
  padding-top: 60px;
`;

export const AdminAccessIcon = styled(KeyIcon)(
  ({ theme: { palette } }) => css`
    color: ${palette.colors.orange};
  `,
);

export const UserAccessIcon = styled(KeyIcon)(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
  `,
);
