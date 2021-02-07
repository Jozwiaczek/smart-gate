import anime, { AnimeTimelineInstance } from 'animejs';
import React, { MouseEvent, useEffect, useRef } from 'react';

import IconButton from '../../../IconButton';
import { PasswordIconButtonProps } from './PasswordIconButton';
import { StyledPasswordIconButton } from './PasswordIconButton.styled';

const PasswordIconButton = ({ setPasswordMasked }: PasswordIconButtonProps) => {
  const eyeLid = useRef<SVGPathElement>(null);
  const eyeLashes = useRef<SVGGElement>(null);
  const animationRef = useRef<AnimeTimelineInstance>();

  useEffect(() => {
    animationRef.current = anime
      .timeline({
        duration: 300,
        easing: 'cubicBezier(.4, 0, .2, 1)',
        autoplay: false,
      })
      .add(
        {
          targets: eyeLid.current,
          d:
            'M -5,-5 V 37 H 15.6 C 15.6,37 21.35124,23.469343 34.312131,23.469343 47.273022,23.469343 53.4,37 53.4,37 H 77 V -5 Z',
        },
        0,
      )
      .add(
        {
          targets: eyeLashes.current,
          rotateX: ['180deg', '0deg'],
        },
        0,
      );
    animationRef.current.reverse();
    animationRef.current.play();
  }, []);

  const togglePasswordMask = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (animationRef.current) {
      animationRef.current.reverse();
      animationRef.current.play();
      setPasswordMasked((prevState) => !prevState);
    }
  };

  return (
    <StyledPasswordIconButton>
      <IconButton aria-label="Toggle password visibility" onClick={togglePasswordMask}>
        <svg className="eye" width="36" height="36" viewBox="0 0 72 72">
          <path
            className="eye-lower"
            d="M 15.6,37 C 15.6,37 24.309181,49.073101 34.102911,49.166773 43.896641,49.260445 53.4,37 53.4,37"
          />
          <circle r="6" cy="36" cx="34.400002" className="eye-iris" />
          <path
            className="eye-lid"
            ref={eyeLid}
            d="M -5,-5 V 37 H 15.6 C 15.6,37 25.327177,48.715274 34.312131,48.785 43.297085,48.854726 53.4,37 53.4,37 H 77 V -5 Z"
          />
          <g className="eye-lashes" ref={eyeLashes}>
            <path className="eye-lash" d="M 17.45627,17.07484 24.778981,25.652873" />
            <path className="eye-lash" d="M 34.602,12.600574 V 23.601076" />
            <path className="eye-lash" d="M 51.580203,17.07484 44.257492,25.652873" />
          </g>
        </svg>
      </IconButton>
    </StyledPasswordIconButton>
  );
};

export default PasswordIconButton;
