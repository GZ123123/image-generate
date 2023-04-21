import { useLayoutEffect, useState } from "react";
import { useDebounce } from "./debounce.hook";

export interface IDimension {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getDimesion = (): IDimension => ({
  x: window.scrollX,
  y: window.scrollY,
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useDimension = () => {
  const [dimension, setDimention] = useState<IDimension>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleResize = useDebounce(() => setDimention(getDimesion()), 200);

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return dimension;
};
