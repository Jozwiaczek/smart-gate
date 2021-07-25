import styled from 'styled-components';

import { Button } from '../../../../../elements';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledButton = styled(Button)`
  justify-content: flex-start;
  text-align: left;
  padding: 20px;
  svg {
    margin-right: 20px;
  }
`;
