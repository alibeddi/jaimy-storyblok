"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BaseUIProps } from "@/types/ui";

const TableBody: React.FC<BaseUIProps> = ({ children, className, ...rest }) => {
  return (
    <tbody
      className={cn("bg-white divide-y divide-gray-200", className)}
      {...rest}
    >
      {children}
    </tbody>
  );
};

export default TableBody;
