import styled, { css } from 'styled-components';

import { Button } from '../../../elements/buttons';
import { ConfirmLockIcon } from '../../../icons';

export const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

export const StyledConfirmLockIcon = styled(ConfirmLockIcon)(
  ({ theme: { palette } }) => css`
    color: ${palette.colors.red};
  `,
);
