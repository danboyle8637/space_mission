import { useState } from "react";

export const useIsHovering = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const toggleIsHovering = () => setIsHovering((prevValue) => !prevValue);

  const setHoveringTrue = () => {
    setIsHovering(true);
  };

  const setHoveringFalse = () => {
    setIsHovering(false);
  };

  return {
    isHovering,
    toggleIsHovering,
    setHoveringTrue,
    setHoveringFalse,
  };
};
