import { useCallback } from "react";
import debounce from "lodash.debounce";

export const useDebounce = (func: (...args: any[]) => void, wait = 500) => {
  return useCallback(debounce(func, wait), [func]);
};
