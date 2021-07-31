import { LocalStorageKey } from './useLocalStorage.types';

const useLocalStorageMemory = <T>(
  key: LocalStorageKey,
): [get: () => T | undefined, set: (data: T | undefined) => void] => {
  const get = (): T | undefined => {
    const stringifyData = window.localStorage.getItem(key);
    if (!stringifyData) {
      return undefined;
    }
    try {
      return JSON.parse(stringifyData) as T;
    } catch (e) {
      return undefined;
    }
  };

  const set = (data: T | undefined): void => {
    if (typeof data !== 'undefined') {
      const stringifyData = JSON.stringify(data);
      window.localStorage.setItem(key, stringifyData);
    } else {
      window.localStorage.removeItem(key);
    }
  };

  return [get, set];
};

export default useLocalStorageMemory;
