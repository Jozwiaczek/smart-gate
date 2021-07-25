import styled from 'styled-components';

import { Button, Card } from '../../../../../elements';

export const StyledCard = styled(Card)`
  padding: 0;
  width: 100%;
  overflow: hidden;
`;

export const TabsWrapper = styled.div`
  height: 80px;
  width: 100%;
`;

export const TabPanelWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const StyledButton = styled(Button)`
  margin-top: 16px;

  svg {
    margin-left: 16px;
  }
`;
