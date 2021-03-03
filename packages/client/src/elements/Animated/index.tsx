import anime, { AnimeInstance } from 'animejs';
import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import { useOnScreen } from '../../hooks';
import { AnimatedProps } from './Animated.types';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Animated = ({ children, animateIn, animateOut }: AnimatedProps) => {
  const animatedContainerRef = useRef<HTMLDivElement>(null);
  const isInViewPort = useOnScreen(animatedContainerRef);
  const animateInRef = useRef<AnimeInstance>();
  const animateOutRef = useRef<AnimeInstance>();

  useLayoutEffect(() => {
    // const xMax = 16;
    // animateInRef.current = anime({
    //   targets: animatedContainerRef.current,
    //   easing: 'easeInOutSine',
    //   duration: 550,
    //   translateX: [
    //     {
    //       value: xMax * -1,
    //     },
    //     {
    //       value: xMax,
    //     },
    //     {
    //       value: xMax / -2,
    //     },
    //     {
    //       value: xMax / 2,
    //     },
    //     {
    //       value: 0,
    //     },
    //   ],
    // });
    if (isInViewPort) {
      animateInRef.current = anime({
        targets: animatedContainerRef.current,
        duration: 750,
        opacity: [0, 1],
        easing: 'cubicBezier(.5, .05, .1, .3)',
      });
    }
    if (!isInViewPort) {
      animateOutRef.current = anime({
        targets: animatedContainerRef.current,
        duration: 750,
        opacity: [1, 0],
        easing: 'cubicBezier(.5, .05, .1, .3)',
      });
    }
  }, [isInViewPort]);

  return (
    <Wrapper ref={animatedContainerRef} data-testid="animated">
      {children}
    </Wrapper>
  );
};

Animated.displayName = 'Animated';

export default Animated;
