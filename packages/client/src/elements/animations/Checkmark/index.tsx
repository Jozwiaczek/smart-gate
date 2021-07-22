import anime, { AnimeInstance } from 'animejs';
import React, { useLayoutEffect, useRef } from 'react';
import { TickIcon } from 'src/icons';

const Checkmark = ({ visible = false }: CheckmarkProps) => {
  const tick = useRef<SVGPathElement>(null);
  const animationRefShow = useRef<AnimeInstance>();
  const animationRefHide = useRef<AnimeInstance>();

  useLayoutEffect(() => {
    // prevents flickering on mount
    anime({
      targets: tick.current,
      opacity: [0, 100],
      delay: 200,
      easing: 'easeInOutExpo',
    });

    const opts = {
      targets: tick.current,
      autoplay: false,
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 300,
        delay: 100,
        easing: 'easeOutQuart',
      },
    };
    animationRefShow.current = anime(opts);
    animationRefHide.current = anime({ ...opts, direction: 'reverse' });
  }, []);

  useLayoutEffect(() => {
    if (visible) {
      animationRefShow.current?.play();
      return;
    }

    if (!visible) {
      animationRefHide.current?.play();
    }
  }, [visible]);

  return <TickIcon ref={tick} />;
};

Checkmark.displayName = 'Checkmark';

export default Checkmark;
