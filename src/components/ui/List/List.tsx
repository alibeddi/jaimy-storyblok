"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ListProps } from "@/types/ui";

const List: React.FC<ListProps> = ({
  className,
  children,
  ordered = false,
  spacing = "default",
  ...rest
}) => {
  const spacingStyles = {
    none: "space-y-0",
    xs: "space-y-1",
    sm: "space-y-2",
    default: "space-y-3",
    md: "space-y-4",
    lg: "space-y-6",
    xl: "space-y-8",
  };

  const baseStyles = cn(
    "list-inside",
    spacingStyles[spacing],
    ordered ? "list-decimal" : "list-disc",
    className
  );

  const Component = ordered ? "ol" : "ul";

  return (
    <Component className={baseStyles} {...rest}>
      {children}
    </Component>
  );
};

export default List;
