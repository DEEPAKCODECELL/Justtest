import React from "react";
import Svg, { Path } from "react-native-svg";

const WalletSVG = ({ width = 24, height = 24, color = "black" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7C3 5.34 4.34 4 6 4H18C19.66 4 21 5.34 21 7V9H6C4.34 9 3 7.66 3 6V7Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 7V18C3 19.66 4.34 21 6 21H18C19.66 21 21 19.66 21 18V7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 15.5C17.17 15.5 16.5 14.83 16.5 14C16.5 13.17 17.17 12.5 18 12.5C18.83 12.5 19.5 13.17 19.5 14C19.5 14.83 18.83 15.5 18 15.5Z"
        fill={color}
      />
    </Svg>
  );
};

export default WalletSVG;
