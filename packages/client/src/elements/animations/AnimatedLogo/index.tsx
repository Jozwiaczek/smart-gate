import anime, { AnimeInstance } from 'animejs';
import React, { useEffect, useRef } from 'react';

import { SmartGateLogoIcon } from '../../../icons';
import { AnimatedLogoWrapper } from './AnimatedLogo.styled';
import { AnimatedLogoProps } from './AnimatedLogo.types';

const AnimatedLogo = ({ margin = '0' }: AnimatedLogoProps) => {
  const logoRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<AnimeInstance>();

  useEffect(() => {
    animationRef.current = anime({
      targets: logoRef.current,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3500,
      easing: 'cubicBezier(0.650, 0.080, 0.890, 0.575)',
    });
  }, []);

  return (
    <AnimatedLogoWrapper margin={margin}>
      <SmartGateLogoIcon data-testid="animatedLogo" ref={logoRef} />
    </AnimatedLogoWrapper>
  );
};

AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
