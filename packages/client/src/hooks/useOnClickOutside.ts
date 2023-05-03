import type { RefObject } from 'react';
import { useEffect } from 'react';

type Handler = (e: Event) => void;

/**
 * Fire handler when user click outside referenced element
 * https://usehooks.com/useOnClickOutside/
 *
 * @param ref - element reference
 * @param handler - function perform on click outside element
 */
const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: Handler) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      // @ts-ignore
      if (!ref.current || ref.current.contains(event?.target)) {
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
