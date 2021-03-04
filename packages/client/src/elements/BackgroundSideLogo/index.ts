import styled from 'styled-components';

import { SmartGateBackgroundLogoIcon } from '../../icons';

const BackgroundSideLogo = styled(SmartGateBackgroundLogoIcon)(
  ({ theme: { breakpoints, up, palette } }) => `
  display: none;
  ${up(breakpoints.lg)} {
      position: fixed;
      z-index: -999;
      top: -2%;
      right: -15%;
      left: 40%;
      bottom: -2%;
      display: flex;
      justify-content: center;
      align-items: stretch;
      color: ${palette.divider.default};
  }
  `,
);

export default BackgroundSideLogo;
