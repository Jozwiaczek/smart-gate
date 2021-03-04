import { RefObject, useLayoutEffect, useState } from 'react';

interface UseOnScreenOptions {
  root?: Element | null;
  rootMargin?: string;
  disabled?: boolean;
  triggerOnce?: boolean;
}

const useOnScreen = (ref: RefObject<Element>, opt?: UseOnScreenOptions) => {
  const [isIntersecting, setIntersecting] = useState(true);
  const [triggeredOnce, setTriggeredOnce] = useState(false);

  useLayoutEffect(() => {
    if (opt?.disabled) {
      return;
    }

    if (!ref && !window && !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!triggeredOnce) {
          setIntersecting(entry.isIntersecting);
          if (opt?.triggerOnce) {
            setTriggeredOnce(true);
          }
        }
      },
      {
        root: opt?.root,
        rootMargin: opt?.rootMargin,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [opt, ref, triggeredOnce]);

  return opt?.disabled ? false : isIntersecting;
};

export default useOnScreen;
