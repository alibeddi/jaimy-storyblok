"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ExtendedTableProps } from "@/types/ui";

const Table: React.FC<ExtendedTableProps> = ({
  children,
  className,
  striped = false,
  bordered = false,
  hover = false,
  responsive = false,
  data,
  columns,
  ...rest
}) => {
  const tableClasses = cn(
    "border-collapse w-full",
    {
      "divide-y divide-gray-200": !bordered,
      "border border-gray-300": bordered,
      "table-auto": !responsive,
    },
    className
  );

  const wrapperClasses = cn({
    "overflow-x-auto w-full": responsive,
  });

  // If data and columns are provided, render a data table
  if (data && columns) {
    return (
      <div className={wrapperClasses}>
        <table className={tableClasses} {...rest}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right"
                  )}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={cn("bg-white divide-y divide-gray-200", {
              "divide-y-0": !striped,
            })}
          >
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn({
                  "bg-gray-50": striped && rowIndex % 2 === 1,
                  "hover:bg-gray-100": hover,
                })}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${column.key || colIndex}`}
                    className={cn(
                      "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right"
                    )}
                  >
                    {String(row[column.key] || "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Otherwise render a regular table with children
  return (
    <div className={wrapperClasses}>
      <table className={tableClasses} {...rest}>
        {children}
      </table>
    </div>
  );
};

export default Table;
