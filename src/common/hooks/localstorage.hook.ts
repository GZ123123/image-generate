import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const getFromStorage = (key: string) => {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

const setToStorage = (key: string, value: any) => {
  const json = JSON.stringify(value);
  if (window.localStorage.getItem(key) !== json) {
    window.localStorage.setItem(key, json);
    window.dispatchEvent(new Event("storage-update"));
  }
};

export const useLocalStorage = <TData>(
  key: string
): [TData | undefined, Dispatch<SetStateAction<TData | undefined>>] => {
  const [storedValue, setStoredValue] = useState<TData>();

  const setValue: Dispatch<SetStateAction<TData | undefined>> = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value;

    setToStorage(key, value);

    setStoredValue(newValue);
  };

  const handleValueUpdate = (e: Event) => {
    const value = getFromStorage(key);

    if (value !== storedValue) {
      setStoredValue(value);
    }
  };

  useLayoutEffect(() => {
    setStoredValue(getFromStorage(key));
  }, []);

  useEffect(() => {
    window.addEventListener("storage-update", handleValueUpdate);
    return () => {
      window.removeEventListener("storage-update", handleValueUpdate);
    };
  }, []);

  return [storedValue, setValue];
};
