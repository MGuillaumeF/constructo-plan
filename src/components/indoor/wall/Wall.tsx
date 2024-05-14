import React from "react";

interface WallProps {
  height: number;
  width: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  ratio?:number
  forreinObjects?: JSX.Element[];
}
function Wall({ forreinObjects, ratio, ...props }: WallProps) {
    const RATIO = ratio ?? 5; // divided by 5 by default
  return (
    <svg
      viewBox={`0 0 ${props.width + (props.strokeWidth ?? 5)} ${props.height + (props.strokeWidth ?? 5)}`}
      width={(props.width + (props.strokeWidth ?? 5)) / RATIO}
      height={(props.height + (props.strokeWidth ?? 5)) / RATIO}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="blue" stroke="red" strokeWidth={5} {...props} />
      {forreinObjects}
    </svg>
  );
}

export default Wall;
