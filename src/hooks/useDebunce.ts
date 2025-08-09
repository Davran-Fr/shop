// hooks/useDebounce.ts
import { useState, useEffect } from "react";

export function useDebounce<T >(skeleton: T, value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    setDebounced(skeleton);
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}
