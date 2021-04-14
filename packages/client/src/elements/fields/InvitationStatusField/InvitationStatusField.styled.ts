import styled from 'styled-components';

import { CancelIcon, QuestionMarkIcon, TickIcon } from '../../../icons';

export const Wrapper = styled.div`
  > * {
    width: 32px;
  }
`;

export const ExpiredIcon = styled(CancelIcon)`
  color: ${({ theme: { palette } }) => palette.colors.red};
  width: 21px;
`;

export const PendingIcon = styled(QuestionMarkIcon)`
  color: ${({ theme: { palette } }) => palette.colors.orange};
`;

export const AcceptedIcon = styled(TickIcon)`
  color: ${({ theme: { palette } }) => palette.primary.light};
  path {
    stroke-width: 1px;
  }
`;
