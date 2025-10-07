"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ListItemProps } from "@/types/ui";

const ListItem: React.FC<ListItemProps> = ({
  className,
  children,
  marker,
  ...rest
}) => {
  const baseStyles = cn("text-base leading-relaxed", className);

  if (marker) {
    return (
      <li className={cn(baseStyles, "list-none relative")} {...rest}>
        <span className="absolute left-0 top-0 font-bold text-primary mr-2">
          {marker}
        </span>
        <div className="ml-6">{children}</div>
      </li>
    );
  }

  return (
    <li className={baseStyles} {...rest}>
      {children}
    </li>
  );
};

export default ListItem;
