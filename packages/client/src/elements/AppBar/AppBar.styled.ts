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
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.palette.boxShadow.big};
  overflow: hidden;
  border-radius: 25px 25px 0 0;
  ${({ orientation }) =>
    orientation === 'vertical' &&
    `
      height: 100%;
      width: 130px;
      border-radius: 0;
  `};
`;

export const TabPageWrapper = styled.div<{ orientation?: TabsOrientation }>`
  width: 100%;
  height: 100%;
  margin-bottom: 90px;
  ${({ orientation }) =>
    orientation === 'vertical' &&
    `
      margin-left: 160px;
  `};
`;

export const AppBarPageWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => `
  height: 100%;
  padding: 40px;
  ${down(breakpoints.md)} {
    padding: 40px 20px;
  }
`,
);
