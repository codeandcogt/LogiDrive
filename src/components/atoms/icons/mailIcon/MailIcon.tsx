import { IconDimension } from "@/src/interface";
import React from "react";
import Svg, { Path } from 'react-native-svg';

export const MailIcon: React.FC<IconDimension> = ({
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
        d="m7 9 5 3.5L17 9"
      />
      <Path
        stroke={stroke}
        strokeWidth={1.5}
        d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"
      />
    </Svg>
  );
};