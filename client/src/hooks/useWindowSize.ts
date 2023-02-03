import { useState } from "react";
import { windowSizeObject } from "../types";
import useEffectOnce from "./useEffectOnce";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<windowSizeObject>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffectOnce(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  });

  return windowSize;
}

export default useWindowSize;
