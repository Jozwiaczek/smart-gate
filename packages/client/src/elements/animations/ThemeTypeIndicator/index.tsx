import { AnimeInstance } from 'animejs';
import React, { memo, useLayoutEffect, useRef } from 'react';

import { ThemeType } from '../../../theme/Theme';
import { getAnimation } from './ThemeTypeIndicator.animation';
import { Wrapper } from './ThemeTypeIndicator.styled';
import { ThemeTypeIndicatorProps } from './ThemeTypeIndicator.types';

const ThemeTypeIndicator = ({ themeType }: ThemeTypeIndicatorProps) => {
  const animationRefLight = useRef<AnimeInstance>();
  const animationRefDark = useRef<AnimeInstance>();

  useLayoutEffect(() => {
    animationRefDark.current = getAnimation('normal');
    animationRefLight.current = getAnimation('reverse');
  }, []);

  useLayoutEffect(() => {
    if (themeType === ThemeType.dark) {
      animationRefDark.current?.play();
      return;
    }
    animationRefLight.current?.play();
  }, [themeType]);

  return (
    <Wrapper className="animate-box">
      <svg className="svg-container" viewBox="-50 -50 200 200">
        <circle cx="50" cy="50" r="40" className="sun-circle" />
        <circle cx="72" cy="34" r="40" className="moon-shadow" />
        <line x1="50" y1="-25" x2="50" y2="-5" className="sun-rays" />
        <line x1="50" y1="125" x2="50" y2="105" className="sun-rays" />
        <line x1="-25" y1="50" x2="-5" y2="50" className="sun-rays" />
        <line x1="125" y1="50" x2="105" y2="50" className="sun-rays" />
        <line x1="-5" y1="-5" x2="10" y2="10" className="sun-rays" />
        <line x1="90" y1="90" x2="105" y2="105" className="sun-rays" />
        <line x1="15" y1="85" x2="-5" y2="105" className="sun-rays" />
        <line x1="105" y1="-5" x2="85" y2="15" className="sun-rays" />
      </svg>
    </Wrapper>
  );
};

ThemeTypeIndicator.displayName = 'ThemeTypeIndicator';

export default memo(ThemeTypeIndicator);
