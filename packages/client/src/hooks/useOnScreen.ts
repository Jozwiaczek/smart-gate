import { RefObject, useLayoutEffect, useState } from 'react';

const useOnScreen = (ref: RefObject<Element>, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(true);

  useLayoutEffect(() => {
    if (!ref && !window && !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
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
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useOnScreen;
