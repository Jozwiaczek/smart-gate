import anime, { AnimeInstance } from 'animejs';
import React, { useEffect, useRef } from 'react';

import { SmartGateLogoIcon } from '../../../icons';
import { AnimatedLogoWrapper } from './AnimatedLogo.styled';
import { AnimatedLogoProps } from './AnimatedLogo.types';

const AnimatedLogo = ({ margin = '0', onClick }: AnimatedLogoProps) => {
  const logoRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<AnimeInstance>();

  useEffect(() => {
    animationRef.current = anime({
      targets: logoRef.current,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3000,
      easing: 'cubicBezier(0.650, 0.080, 0.890, 0.575)',
      complete: (anim) => {
        if (anim.direction === 'reverse') {
          anim.reverse();
          anim.play();
        }
      },
    });
  }, []);

  const restartAnimation = () => {
    if (onClick) {
      onClick();
    } else {
      animationRef.current?.reverse();
      animationRef.current?.play();
    }
  };

  return (
    <AnimatedLogoWrapper margin={margin}>
      <SmartGateLogoIcon data-testid="animatedLogo" ref={logoRef} onClick={restartAnimation} />
    </AnimatedLogoWrapper>
  );
};

AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
