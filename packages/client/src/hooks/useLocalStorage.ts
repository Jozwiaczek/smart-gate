import { useCallback, useEffect, useState } from 'react';

const writeToLocalStorage = <T>(key: string, data: T): void => {
  const stringifyData = JSON.stringify(data);
  window.localStorage.setItem(key, stringifyData);
};

const clearLocalStorageByKey = (key: string): void => {
  window.localStorage.removeItem(key);
};

const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [T | undefined, (val: T) => void, () => void] => {
  const [data, setData] = useState<T | undefined>(undefined);
  const set = useCallback((localStorageData: T) => writeToLocalStorage<T>(key, localStorageData), [
    key,
  ]);
  const remove = useCallback(() => clearLocalStorageByKey(key), [key]);

  useEffect(() => {
    const currentData = window.localStorage.getItem(key);

    if (
      (!currentData || typeof currentData === 'undefined' || typeof currentData === null) &&
      defaultValue
    ) {
      set(defaultValue);
    }

    if (currentData && typeof currentData !== 'undefined' && typeof currentData !== null) {
      const parsedData = JSON.parse(currentData);
      if (parsedData) {
        setData(parsedData);
      }
    }
  }, [defaultValue, key, set]);

  const checkLocalStorage = useCallback(
    (e: StorageEvent) => {
      if (e.storageArea === window.localStorage) {
        if (key === e.key && e.newValue) {
          setData(JSON.parse(e.newValue));
        }
      }
    },
    [key],
  );

  useEffect(() => {
    window.addEventListener('storage', checkLocalStorage);
    return () => window.removeEventListener('storage', checkLocalStorage);
  }, [checkLocalStorage, key]);

  return [data, set, remove];
};

export default useLocalStorage;
