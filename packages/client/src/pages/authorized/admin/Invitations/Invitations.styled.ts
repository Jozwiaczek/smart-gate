import styled from 'styled-components';

import { Button } from '../../../../elements';

export const Wrapper = styled.div`
  position: relative;
  z-index: 999;
  height: 100%;
  width: 100%;
`;

export const ListContainer = styled.div`
  padding-top: 60px;
  height: 100%;
  overflow-x: auto;
`;

export const SendInvitationButton = styled(Button)`
  position: absolute;
  right: 0;
  top: -12px;
  height: 50px;
  display: flex;
  justify-content: center;
  padding-left: 64px;
  padding-right: 64px;

  svg {
    margin-left: 10px;
    height: 26px;
    width: 26px;
  }
`;

export const DialogContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledSendButton = styled(Button)`
  margin-top: 40px;
`;
