"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TableRowProps } from "@/types/ui";

const TableRow: React.FC<TableRowProps> = ({
  className,
  children,
  selected = false,
  onClick,
  ...rest
}) => {
  return (
    <tr
      className={cn(
        "hover:bg-gray-50 transition-colors",
        {
          "bg-blue-50": selected,
          "cursor-pointer": onClick,
        },
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </tr>
  );
};

export default TableRow;
