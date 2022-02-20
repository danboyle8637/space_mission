import { useEffect, useRef } from "react";

import { checkmarkOn, checkmarkOff } from "../../animations";
import { SVGProps } from "./SpaceMission";

interface CheckmarkIconProps extends SVGProps {
  isTextInput: boolean;
  isTrackingCheck: boolean;
  runAction: boolean;
}

export const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({
  width,
  height,
  className,
  isTextInput,
  isTrackingCheck,
  runAction,
}) => {
  const checkRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const check = checkRef.current;

    return () => {
      if (check) {
        checkmarkOn(check, true);
        checkmarkOff(check, true);
      }
    };
  }, [isTextInput]);

  useEffect(() => {
    const check = checkRef.current;

    if (check && isTextInput && runAction) {
      checkmarkOn(check);
    }

    if (check && isTextInput && !runAction) {
      checkmarkOff(check);
    }
  }, [runAction, isTextInput]);

  useEffect(() => {
    const check = checkRef.current;

    if (check && isTrackingCheck && runAction) {
      checkmarkOn(check);
    }

    if (check && isTrackingCheck && !runAction) {
      checkmarkOff(check);
    }
  }, [runAction, isTrackingCheck]);

  return (
    <svg
      id="form-check"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 164.85 127.53"
    >
      <path
        style={{
          stroke: isTextInput
            ? "hsla(149, 83%, 48%, 1)"
            : "hsla(237, 100%, 96%, 1)",
          visibility: "hidden",
        }}
        ref={checkRef}
        id="check"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="34"
        strokeDashoffset="1"
        strokeDasharray="1"
        pathLength="1"
        d="M147.85 17l-93.52 93.53L17 73.2"
      />
    </svg>
  );
};
