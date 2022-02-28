import { useEffect, useRef } from "react";

import { drawCircleGraph } from "../../animations";
import { SVGProps } from "./SpaceMission";

interface CircleGraphProps extends SVGProps {
  value: number;
  runAction: boolean;
}

export const CircleGraph: React.FC<CircleGraphProps> = ({
  width,
  height,
  className,
  value,
  runAction,
}) => {
  const valuePathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const valuePath = valuePathRef.current;
    const duration = 2;

    if (valuePath && runAction) {
      drawCircleGraph(valuePath, value, duration, false);
    }

    return () => {
      if (valuePath) {
        drawCircleGraph(valuePath, value, duration, true);
      }
    };
  }, [runAction === true, value]);

  return (
    <svg
      style={{ transform: "rotate(-90deg)" }}
      viewBox="0 0 389 391"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="1.5"
    >
      <path
        id="circle-graph-container"
        fill="none"
        d="M0 0h388.749v390.781H0z"
      />
      <circle
        id="background"
        cx="194.254"
        cy="195.105"
        r="162.476"
        fill="none"
        stroke="#000"
        strokeWidth="58.33"
      />
      <path
        ref={valuePathRef}
        style={{
          strokeDashoffset: 1,
          strokeDasharray: 1,
          visibility: "hidden",
        }}
        id="value-path"
        d="M356.73 195.104c.002.273.001-.205 0 0-.331 89.391-73.008 162.476-162.476 162.476-89.673 0-162.476-72.803-162.476-162.476S104.581 32.628 194.254 32.628c89.4 0 162.035 73.179 162.476 162.476Z"
        fill="none"
        stroke={`url(#missionCompletePercent)`}
        strokeWidth="58.33"
        pathLength="1"
      />
      <defs>
        <linearGradient
          id="missionCompletePercent"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 80.813 113.44) scale(324.953)"
        >
          <stop offset="0" stopColor="#B983FF" />
          <stop offset=".45" stopColor="#94B3FD" />
          <stop offset=".83" stopColor="#94DAFF" />
          <stop offset="1" stopColor="#99FEFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
