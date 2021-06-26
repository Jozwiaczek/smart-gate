import { BaseSyntheticEvent, RefObject, useEffect } from 'react';

type Handler = (e: BaseSyntheticEvent) => void;

/**
 * Fire handler when user click outside referenced element
 *
 * cc: https://usehooks.com/useOnClickOutside/
 *
 * @param ref - element reference
 * @param handler - function perform on click outside element
 */
const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: Handler) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
