import styled from 'styled-components';

import { Button } from '../../../../elements';

export const Wrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 999;
`;

export const ListContainer = styled.div`
  height: 100%;
  overflow-x: auto;
  padding-top: 60px;
`;

export const SendInvitationButton = styled(Button)`
  display: flex;
  height: 50px;
  justify-content: center;
  padding-left: 64px;
  padding-right: 64px;
  position: absolute;
  right: 0;
  top: -12px;

  svg {
    height: 26px;
    margin-left: 10px;
    width: 26px;
  }
`;

export const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledSendButton = styled(Button)`
  margin-top: 40px;
`;
