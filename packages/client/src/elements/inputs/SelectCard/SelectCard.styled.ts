import styled, { css } from 'styled-components';

import { TickIcon } from '../../../icons';
import Card from '../../Card';

export const CardItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
`;

export const StyledCard = styled(Card)(
  ({ theme: { palette } }) => css`
    padding: 0 20px;

    ${CardItem}:not(:last-child) {
      border-bottom: 1px solid ${palette.background.default};
    }
  `,
);

export const StyledTickIcon = styled(TickIcon)(
  ({ theme: { palette } }) => css`
    width: 18px;
    path {
      stroke: ${palette.colors.greenLight};
    }
  `,
);
