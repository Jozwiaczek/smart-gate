import React from 'react';

import { SmartGateBackgroundLogo } from '../../icons';
import { BackgroundLogoWrapper } from './BackgroundLogo.styled';

const BackgroundLogo = () => (
  <BackgroundLogoWrapper data-testid="backgroundLogo">
    <SmartGateBackgroundLogo />
  </BackgroundLogoWrapper>
);

BackgroundLogo.displayName = 'BackgroundLogo';

export default BackgroundLogo;
