import styled, { css } from 'styled-components';

import { ConfirmLockIcon } from '../../../../icons';

export const ShieldIconWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 30px 0 60px;
  width: 100%;
`;

export const StyledConfirmLockIcon = styled(ConfirmLockIcon)(
  ({ theme: { palette } }) => css`
    color: ${palette.colors.red};
  `,
);
