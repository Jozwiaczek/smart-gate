import anime from 'animejs';

import { AnimationType, GetAnimationOptions } from './useAnimated.typed';

const getAnimation = (
  type: AnimationType,
  { targets, duration, delay, maxDebounceSize }: GetAnimationOptions,
  autoplay = true,
) => {
  const baseConfig = {
    targets,
    duration,
    autoplay,
    delay,
  };

  const createAnimation = ({
    duration: baseDuration = 600,
    delay: baseDelay = 0,
    ...rest
  }: anime.AnimeParams) =>
    anime({
      ...baseConfig,
      duration: baseDuration,
      delay: baseDelay,
      ...rest,
    });

  switch (type) {
    case 'shake': {
      const internalMaxDebounceSize = maxDebounceSize || 16;
      return createAnimation({
        easing: 'easeInOutSine',
        translateX: [
          internalMaxDebounceSize * -1,
          internalMaxDebounceSize,
          internalMaxDebounceSize / -2,
          internalMaxDebounceSize / 2,
          0,
        ],
      });
    }
    case 'fadeIn':
      return createAnimation({
        opacity: [0, 1],
        easing: 'cubicBezier(.5, .05, .1, .3)',
      });
    case 'fadeOut':
      return createAnimation({
        opacity: [1, 0],
        easing: 'cubicBezier(.5, .05, .1, .3)',
      });
    case 'slideInUp': {
      return createAnimation({
        translateY: ['100%', 0],
        easing: 'cubicBezier(0.68, -0.6, 0.32, 1.6)',
      });
    }
    case 'slideInOut':
      return createAnimation({
        translateY: [0, '100%'],
        easing: 'cubicBezier(0.68, -0.6, 0.32, 1.6)',
      });
    default:
      return createAnimation({
        opacity: [0, 1],
        easing: 'cubicBezier(.5, .05, .1, .3)',
      });
  }
};

export default getAnimation;
