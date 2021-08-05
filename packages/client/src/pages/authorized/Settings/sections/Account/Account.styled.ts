import styled, { css } from 'styled-components';

import { Button, Card, Link } from '../../../../../elements';
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
  margin: 40px 0;
`;

export const Note = styled.p(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
  `,
);

export const AccountTabTitle = styled.h4`
  margin-bottom: 18px;
`;

export const AccountTabSubtitle = styled.h5`
  margin: 16px 0 10px;
`;

export const IntegrationTemplateLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 30px;
`;

export const TokenActionsButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;

export const TokenActionButton = styled(Button)`
  padding: 16px;
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
