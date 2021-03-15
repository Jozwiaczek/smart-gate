import { useCallback, useEffect, useState } from 'react';

import { localStorageKey } from './useLocalStorage.types';
import useLocalStorageMemory from './useLocalStorageMemory';

const useLocalStorage = <T>(
  key: localStorageKey,
  defaultValue: T,
): [T, (val: T) => void, () => void] => {
  const [getLocalStorageMemory, setLocalStorageMemory] = useLocalStorageMemory<T>(key);
  const getInitValue = () => {
    const localValue = getLocalStorageMemory();
    if (localValue === undefined) {
      return defaultValue;
    }
    return localValue;
  };

  const [data, setData] = useState<T>(getInitValue());

  const set = useCallback(
    (newValue: T) => {
      setLocalStorageMemory(newValue);
      setData(newValue);
    },
    [setLocalStorageMemory],
  );

  const clear = useCallback((): void => {
    setLocalStorageMemory(undefined);
    setData(defaultValue);
  }, [defaultValue, setLocalStorageMemory]);

  useEffect(() => {
    const currentData = getLocalStorageMemory();

    if (currentData === undefined) {
      set(defaultValue);
    } else {
      setData(currentData);
    }
  }, [defaultValue, getLocalStorageMemory, key, set]);

  const remove = useCallback(() => clear(), [clear]);

  const checkLocalStorage = useCallback(
    ({ storageArea, newValue, key: storageKey }: StorageEvent) => {
      if (storageArea === window.localStorage) {
        if (key === storageKey && newValue) {
          setData(JSON.parse(newValue));
          return;
        }
        setData(defaultValue);
      }
    },
    [defaultValue, key],
  );

  useEffect(() => {
    window.addEventListener('storage', checkLocalStorage);
    return () => window.removeEventListener('storage', checkLocalStorage);
  }, [checkLocalStorage, key]);

  return [data, set, remove];
};

export default useLocalStorage;
