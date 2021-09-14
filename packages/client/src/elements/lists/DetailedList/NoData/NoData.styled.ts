import styled, { css } from 'styled-components';

import { NoDataIcon } from '../../../../icons';
import Card from '../../../Card';

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const StyledNoDataIcon = styled(NoDataIcon)(
  ({ theme: { palette } }) => css`
    color: ${palette.primary.mainInvert};
  `,
);

export const NoDataCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 600px;
  padding: 40px 0;
`;
