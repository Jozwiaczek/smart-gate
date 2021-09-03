import styled, { css } from 'styled-components';

import { TabsOrientation } from '../layouts/TabbedLayout/Tabs/Tabs.types';

export const Wrapper = styled.div<{ orientation: TabsOrientation }>(
  ({ orientation }) => css`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    ${orientation === 'vertical' &&
    css`
      display: flex;
    `};
  `,
);

export const TabsWrapper = styled.div<{ orientation?: TabsOrientation }>`
  background: ${({ theme }) => theme.palette.background.paper};
  transition: background 200ms ease-in-out;
  bottom: 0;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  height: 90px;
  overflow: hidden;
  position: fixed;
  width: 100%;
  ${({ orientation }) =>
    orientation === 'vertical'
      ? css`
          height: 100%;
          width: 130px;
          border-radius: 0;
        `
      : css`
          button {
            padding-bottom: 10px;
          }
        `};
`;

export const TabPageWrapper = styled.div<{ orientation?: TabsOrientation }>`
  height: 100%;
  padding-bottom: 90px;
  width: 100%;
  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      padding-bottom: 0;
      padding-left: 130px;
    `};
`;

export const AppBarPageWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    height: 100%;
    padding: 40px;
    overflow: auto;
    ${down(breakpoints.md)} {
      padding: 40px 20px;
    }
  `,
);
