import styled, { css } from 'styled-components';

import { Button, Card } from '../../../../../elements';
import { CancelIcon } from '../../../../../icons';

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
  margin-top: 20px;
`;

export const GenerateTokenButton = styled(Button)`
  margin: 50px 0;
`;

export const WarningNote = styled.p(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
    text-align: center;
  `,
);

export const AccountTabTitle = styled.h4`
  margin-bottom: 30px;
`;

export const AccountTabSubtitle = styled.h5`
  margin: 26px 0 18px;
`;

export const TokenActionsButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

export const ConfirmDialogButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  align-items: center;
  gap: 20px;
`;

export const StyledCancelIcon = styled(CancelIcon)`
  height: 16px;
  width: 16px;
`;
