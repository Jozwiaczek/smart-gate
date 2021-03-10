import { useCallback, useEffect, useState } from 'react';

const writeToLocalStorage = <T>(key: string, data: T): void => {
  const stringifyData = JSON.stringify(data);
  window.localStorage.setItem(key, stringifyData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkIfExist = (value: any): boolean =>
  value && typeof value !== 'undefined' && typeof value !== null;

const useLocalStorage = <T>(key: string, defaultValue: T): [T, (val: T) => void, () => void] => {
  const getInitValue = () => {
    const localValue = window.localStorage.getItem(key);
    if (localValue) {
      return JSON.parse(localValue);
    }
    return defaultValue;
  };

  const [data, setData] = useState<T>(getInitValue());

  const set = useCallback(
    (newValue: T) => {
      writeToLocalStorage<T>(key, newValue);
      setData(newValue);
    },
    [key],
  );

  const clear = useCallback((): void => {
    window.localStorage.removeItem(key);
    setData(defaultValue);
  }, [defaultValue, key]);

  useEffect(() => {
    const currentData = window.localStorage.getItem(key);

    if (!checkIfExist(currentData) && defaultValue) {
      set(defaultValue);
    }

    if (checkIfExist(currentData)) {
      const parsedData = JSON.parse(currentData as string);
      if (parsedData) {
        setData(parsedData);
      }
    }
  }, [defaultValue, key, set]);

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
