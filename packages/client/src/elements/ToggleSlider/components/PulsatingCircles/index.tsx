import React from 'react';

import { PulseCircle } from '../../ToggleSlider.styled';

const PulsatingCircles = () => (
  <>
    <PulseCircle />
    <PulseCircle animationDelay={2} />
    <PulseCircle asOuter />
    <PulseCircle animationDelay={2} asOuter />
  </>
);

export default PulsatingCircles;
