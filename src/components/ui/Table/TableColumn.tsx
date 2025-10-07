"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TableColumnProps } from "@/types/ui";

interface ExtendedTableColumnProps extends TableColumnProps {
  colSpan?: string | number;
  rowSpan?: string | number;
  verticalAlignment?: "top" | "middle" | "bottom";
}

const TableColumn: React.FC<ExtendedTableColumnProps> = ({
  children,
  className,
  align = "left",
  width,
  colSpan,
  rowSpan,
  verticalAlignment = "middle",
  ...rest
}) => {
  const style: React.CSSProperties = {};

  if (width === "content") {
    style.whiteSpace = "nowrap";
    style.width = "1px";
  } else if (width && width !== "auto") {
    style.width = width;
  }

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const verticalAlignClasses = {
    top: "align-top",
    middle: "align-middle",
    bottom: "align-bottom",
  };

  return (
    <td
      colSpan={colSpan ? Number(colSpan) : undefined}
      rowSpan={rowSpan ? Number(rowSpan) : undefined}
      className={cn(
        "px-6 py-4 text-sm text-gray-900",
        alignClasses[align],
        verticalAlignClasses[verticalAlignment],
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </td>
  );
};

export default TableColumn;
