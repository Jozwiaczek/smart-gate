import styled from 'styled-components';

import { TabsOrientation } from '../layouts/TabbedLayout/Tabs/Tabs.types';

export const Wrapper = styled.div<{ orientation: TabsOrientation }>(
  ({ orientation }) => `
  width: 100%;
  height: 100vh;
  overflow: hidden;
  ${orientation === 'vertical' ? 'display: flex' : ''};
`,
);

export const TabsWrapper = styled.div<{ orientation?: TabsOrientation }>`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 25px 25px 0 0;
  bottom: 0;
  box-shadow: ${({ theme }) => theme.palette.boxShadow.big};
  height: 90px;
  overflow: hidden;
  position: fixed;
  width: 100%;
  ${({ orientation }) =>
    orientation === 'vertical'
      ? `
        height: 100%;
        width: 130px;
        border-radius: 0;
      `
      : `
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
    `
      padding-bottom: 0;
      padding-left: 130px;
  `};
`;

export const AppBarPageWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => `
  height: 100%;
  padding: 40px;
  overflow: auto;
  ${down(breakpoints.md)} {
    padding: 40px 20px;
  }
`,
);
