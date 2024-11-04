import { IconDimension } from "@/src/interface";
import React from "react";
import Svg, { Path } from 'react-native-svg';

export const DocumentEditIcon: React.FC<IconDimension> = ({
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
        fill={fill}
        fillRule="evenodd"
        d="M4.75 2.75v18.5H11a.75.75 0 0 1 0 1.5H4.6a1.35 1.35 0 0 1-1.35-1.35V2.6c0-.746.604-1.35 1.35-1.35h11.652c.358 0 .7.142.954.395l3.149 3.149c.253.253.395.596.395.955V12a.75.75 0 0 1-1.5 0V5.81l-3.06-3.06H4.75Z"
        clipRule="evenodd"
      />
      <Path
        fill={fill}
        fillRule="evenodd"
        d="M7.25 6A.75.75 0 0 1 8 5.25h4a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 6Zm0 4A.75.75 0 0 1 8 9.25h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75ZM21.07 18.055a1.871 1.871 0 1 0-2.646-2.646L14.433 19.4a1.75 1.75 0 0 0-.492.968l-.243 1.556a.75.75 0 0 0 .857.857l1.556-.243a1.75 1.75 0 0 0 .968-.491l3.991-3.992Zm-1.06-1.585a.371.371 0 0 1 0 .525l-.47.47-.525-.526.47-.47a.371.371 0 0 1 .525 0ZM17.954 18l.525.525-2.46 2.461a.25.25 0 0 1-.139.07l-.541.085.084-.542a.25.25 0 0 1 .07-.138L17.954 18ZM16 1.25a.75.75 0 0 1 .75.75v3.25H20a.75.75 0 0 1 0 1.5h-3.4a1.35 1.35 0 0 1-1.35-1.35V2a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};