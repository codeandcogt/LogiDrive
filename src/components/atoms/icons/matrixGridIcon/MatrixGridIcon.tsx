import { IconDimension } from "@/src/interface";
import React from "react";
import Svg, { Path } from 'react-native-svg';

export const MatrixGridIcon: React.FC<IconDimension> = ({
  height = "30px",
  width = "30px",
  stroke = "#011C26"
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 6.6v1.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6ZM6 12h3M15 12v3M12 18h3M12 12.011l.01-.011M18 12.011l.01-.011M12 15.011l.01-.011M18 15.011l.01-.011M18 18.011l.01-.011M12 9.011 12.01 9M12 6.011 12.01 6M9 15.6v1.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6v-1.8a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6ZM18 6.6v1.8a.6.6 0 0 1-.6.6h-1.8a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6ZM18 3h3v3M18 21h3v-3M6 3H3v3M6 21H3v-3"
      />
    </Svg>
  );
};