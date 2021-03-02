import anime, { AnimeInstance } from 'animejs';
import React, { useEffect, useRef } from 'react';

import { SmartGateLogo } from '../../icons';
import { Wrapper } from './AnimatedLogo.styled';

const AnimatedLogo = () => {
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
    <Wrapper data-testid="animatedLogo">
      <SmartGateLogo ref={logoRef} />
    </Wrapper>
  );
};

AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
