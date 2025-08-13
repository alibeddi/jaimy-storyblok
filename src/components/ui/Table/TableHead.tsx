"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BaseUIProps } from "@/types/ui";

const TableHead: React.FC<BaseUIProps> = ({ children, className, ...rest }) => {
  return (
    <thead className={cn("bg-gray-50 w-full", className)} {...rest}>
      {children}
    </thead>
  );
};

export default TableHead;
