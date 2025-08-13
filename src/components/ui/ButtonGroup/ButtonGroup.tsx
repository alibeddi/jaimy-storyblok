"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ButtonGroupProps } from "@/types/ui";

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  align = "default",
  orientation = "default",
  children,
  ...rest
}) => {
  const alignStyles = {
    default: "",
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const orientationStyles = {
    default: "flex gap-2",
    horizontal: "flex flex-row gap-2",
    vertical: "flex flex-col gap-2",
  };

  const classNames = cn(
    "inline-flex",
    orientationStyles[orientation],
    align !== "default" && alignStyles[align],
    className
  );

  return (
    <div className={classNames} data-banner-content {...rest}>
      {children}
    </div>
  );
};

export default ButtonGroup;
