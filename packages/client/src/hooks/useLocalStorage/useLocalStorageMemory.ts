import { localStorageKey } from './useLocalStorage.types';

const useLocalStorageMemory = <T>(
  key: localStorageKey,
): [get: () => T | undefined, set: (data: T | undefined) => void] => {
  const get = () => {
    const stringifyData = window.localStorage.getItem(key);
    if (!stringifyData) {
      return undefined;
    }
    try {
      return JSON.parse(stringifyData);
    } catch (e) {
      return undefined;
    }
  };

  const set = (data: T | undefined) => {
    if (data) {
      const stringifyData = JSON.stringify(data);
      window.localStorage.setItem(key, stringifyData);
    } else {
      window.localStorage.removeItem(key);
    }
  };

  return [get, set];
};

export default useLocalStorageMemory;
