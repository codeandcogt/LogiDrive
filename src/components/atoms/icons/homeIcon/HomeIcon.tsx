import { IconDimension } from "@/src/interface";
import React from "react";
import Svg, { Path } from 'react-native-svg';

export const HomeIcon: React.FC<IconDimension> = ({
  height = "50px",
  width = "50px",
  fill = "#011C26"
}) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 50 50" 
      fill="none" 
    >
      <Path
        fill={fill}
        d="m8.333 23.815-.652.616a2.083 2.083 0 0 1-2.861-3.029L20.709 6.396a6.25 6.25 0 0 1 8.582 0l15.89 15.006a2.083 2.083 0 1 1-2.861 3.03l-.653-.617v15.768A4.167 4.167 0 0 1 37.5 43.75h-7.292a1.042 1.042 0 0 1-1.041-1.042V31.25a4.167 4.167 0 0 0-8.334 0v11.458c0 .576-.466 1.042-1.041 1.042H12.5a4.167 4.167 0 0 1-4.167-4.167V23.815Z"
      />
    </Svg>
  );
};