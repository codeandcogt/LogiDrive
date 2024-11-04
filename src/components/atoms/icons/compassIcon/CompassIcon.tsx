import { IconDimension } from "@/src/interface";
import React from "react";
import Svg, { Path } from 'react-native-svg';

export const CompassIcon: React.FC<IconDimension> = ({
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
        d="M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12Z"
        clipRule="evenodd"
      />
      <Path
        fill={fill}
        fillRule="evenodd"
        d="M14.639 18.114c-.555 1.603-2.823 1.602-3.376-.002l-1.51-4.378-4.264-1.813c-1.56-.664-1.404-2.926.234-3.368l10.231-2.761c1.384-.374 2.622.954 2.153 2.309L14.64 18.114Zm-1.958-.49a.286.286 0 0 0 .54 0L16.69 7.61a.286.286 0 0 0-.345-.37L6.114 10.001a.286.286 0 0 0-.038.54l4.877 2.073 1.728 5.01Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};