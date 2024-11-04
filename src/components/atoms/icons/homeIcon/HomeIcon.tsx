import { IconDimension } from "@/src/interface";
import React from "react";
import Svg, { Path } from 'react-native-svg';

export const HomeIcon: React.FC<IconDimension> = ({
  height = "30px",
  width = "30px",
  fill = "#011C26"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        fill="none"
        d="m2 8 9.732-4.866a.6.6 0 0 1 .536 0L22 8M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"
      />
    </Svg>
  );
};