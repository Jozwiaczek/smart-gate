import styled, { css } from 'styled-components';

import { Button, Form } from '../../../../elements';

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

export const SendInvitationButton = styled(Button)(
  ({ theme: { breakpoints, down } }) => css`
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

    ${down(breakpoints.lg)} {
      height: 55px;
      min-width: 0;
      padding: 10px;
      position: relative;
      top: 0;
      width: 55px;

      svg {
        height: 32px;
        margin-left: 0;
        width: 32px;
      }
    }
  `,
);

export const DialogForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const SendButton = styled(Button)`
  margin-top: 40px;
`;
