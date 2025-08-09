import  { RefObject, useEffect } from "react";

const useClickOutside = (item: RefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    const windowClick = (e: MouseEvent) => {
      
      if (item.current && !item.current.contains(e.target as Node)) {
        callback();
      }
    };
    window.addEventListener("click", windowClick);

    return () => {
      window.removeEventListener("click", windowClick);
    };
  }, [item, callback]);
};

export default useClickOutside;
