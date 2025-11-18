"use client";

import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ListProps } from "@/types/ui";

// Move static mapping outside component to prevent recreation
const SPACING_STYLES = {
  none: "space-y-0",
  xs: "space-y-1",
  sm: "space-y-2",
  default: "space-y-3",
  md: "space-y-4",
  lg: "space-y-6",
  xl: "space-y-8",
} as const;

const List: React.FC<ListProps> = memo(
  ({ className, children, ordered = false, spacing = "default", ...rest }) => {
    // Memoize component type and base styles
    const Component = useMemo(() => (ordered ? "ol" : "ul"), [ordered]);

    const baseStyles = useMemo(
      () =>
        cn(
          "list-inside",
          SPACING_STYLES[spacing as keyof typeof SPACING_STYLES],
          ordered ? "list-decimal" : "list-disc",
          className
        ),
      [spacing, ordered, className]
    );

    return (
      <Component className={baseStyles} {...rest}>
        {children}
      </Component>
    );
  }
);

List.displayName = "List";

export default List;
