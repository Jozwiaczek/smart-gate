import anime, { DirectionOptions } from 'animejs';

import { colors } from '../../../theme/Theme';

const moonBgColor = colors.dark;
const moonColor = colors.white;

export const getAnimation = (direction: DirectionOptions) =>
  anime
    .timeline({
      easing: 'easeInOutExpo',
      autoplay: false,
      direction,
    })
    .add({ targets: '.sun-circle', fill: moonColor }, 0)
    .add({ targets: '.sun-rays', stroke: moonBgColor }, 0)
    .add(
      {
        targets: '.animate-box ',
        background: moonBgColor,
        borderRadius: ['10%', '50%'],
      },
      0,
    )
    .add({ targets: '.sun-circle', fill: moonColor }, 0)
    .add({ targets: '.sun-rays', stroke: moonBgColor }, 0)
    .add(
      {
        targets: '.moon-shadow',
        fill: moonBgColor,
        translateX: [108, 0],
        translateY: [-8, 0],
        scale: [0, 1],
      },
      0,
    )
    .add({ targets: '.svg-container', rotate: [80, 0] }, 0);
