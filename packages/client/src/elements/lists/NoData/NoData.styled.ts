import styled, { css } from 'styled-components';

import { NoDataIcon } from '../../../icons';
import Card from '../../Card';

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const StyledNoDataIcon = styled(NoDataIcon)(
  ({ theme: { palette, down, breakpoints } }) => css`
    color: ${palette.primary.mainInvert};

    ${down(breakpoints.md)} {
      width: 73px;
      height: 90px;
    }
  `,
);

export const NoDataCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 40px;
  width: 600px;
  padding: 40px 0;
`;
