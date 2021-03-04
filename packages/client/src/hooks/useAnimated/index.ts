import { AnimeInstance } from 'animejs';
import { useLayoutEffect, useRef } from 'react';

import useOnScreen from '../useOnScreen';
import getAnimation from './getAnimation';
import { AnimationType, UseAnimatedProps, UseAnimatedReturnProps } from './useAnimated.typed';

const useAnimated = ({ targets, type, opt = {} }: UseAnimatedProps): UseAnimatedReturnProps => {
  const { root, rootMargin, animationOpt, autoTrigger = true, autoTriggerOnce = false } = opt;
  const isInOut = Array.isArray(type);
  const animateInType = (isInOut ? type[0] : type) as AnimationType;
  const animateOutType = isInOut ? (type[1] as AnimationType) : undefined;

  const animateInRef = useRef<AnimeInstance>();
  const animateOutRef = useRef<AnimeInstance>();
  const containerRefInner = useRef<Element>(null);
  const isInViewPort = useOnScreen(containerRefInner, {
    root,
    rootMargin,
    triggerOnce: autoTriggerOnce,
    disabled: !autoTrigger,
  });

  useLayoutEffect(() => {
    const innerTargets = targets || containerRefInner.current;
    const options = {
      targets: innerTargets,
      ...animationOpt,
    };
    if (!autoTrigger) {
      animateInRef.current = getAnimation(animateInType, options, false);
    }

    if (autoTrigger && isInViewPort) {
      animateInRef.current = getAnimation(animateInType, options);
    }
    if (autoTrigger && !isInViewPort && animateOutType) {
      animateOutRef.current = getAnimation(animateOutType, options);
    }
  }, [animateInType, animateOutType, animationOpt, autoTrigger, isInViewPort, targets]);

  const triggerAnimation = () => {
    animateInRef.current?.play();
  };

  return { triggerAnimation, ref: containerRefInner };
};

export default useAnimated;
