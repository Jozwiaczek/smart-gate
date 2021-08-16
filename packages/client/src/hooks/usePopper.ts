import { createPopper, Options } from '@popperjs/core';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

const defaultConfig: Partial<Options> = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 14],
      },
    },
  ],
};

const usePopper = <T extends HTMLElement, U extends HTMLElement = HTMLDivElement>(
  config?: Partial<Options>,
) => {
  const [isShown, setIsShown] = useState(false);
  const popupRef = useRef<U>(null);
  const targetRef = useRef<T>(null);

  useLayoutEffect(() => {
    if (targetRef.current && popupRef.current) {
      const popper = createPopper(targetRef.current, popupRef.current, {
        ...defaultConfig,
        ...config,
      });

      return () => {
        popper.destroy();
      };
    }
  }, [config]);

  const toggle = useCallback(() => setIsShown((shown) => !shown), []);

  return useMemo(
    () => ({
      target: targetRef,
      toggle,
      ref: popupRef,
      isShown,
    }),
    [isShown, toggle],
  );
};

export default usePopper;
