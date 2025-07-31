import React from "react";

import LogoSvg from "@/assets/icons/svg/logo-icon.svg";

import { IconProps } from "./types";

export const LogoIcon: React.FC<IconProps> = ({ size = 150, ...props }) => {
  return <LogoSvg width={size} {...props} />;
};
