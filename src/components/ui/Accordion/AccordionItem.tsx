"use client";

import React, { useContext, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccordionItemProps } from "@/types/ui";
import { AccordionContext } from "./Accordion";

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  index = 0,
  className,
  ...rest
}) => {
  const root = useRef<HTMLDivElement>(null);
  const { dark, addRef, openState, toggleOpen } = useContext(AccordionContext);

  useEffect(() => {
    if (root.current) {
      addRef(index, root.current);
    }
  }, [addRef, index]);

  const open = openState[index];

  const handleToggle = () => {
    toggleOpen(index);
  };

  const rootClasses = cn(
    "rounded-lg border border-gray-200 shadow-sm bg-white transition-shadow",
    {
      "shadow-lg": open,
      "hover:shadow-md": !open,
      "bg-gray-800 border-gray-700": dark && !open,
    },
    className
  );

  const headerClasses = cn(
    "flex justify-between items-center w-full p-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
  );

  const titleClasses = cn(
    "flex-1 p-4 text-left text-sm font-semibold text-gray-800",
    {
      "text-white": dark && !open,
    }
  );

  const iconWrapperClasses = cn(
    "p-4 bg-gray-50 rounded-r-lg border-l border-gray-200",
    {
      "bg-gray-700 border-gray-600": dark && !open,
    }
  );

  const iconClasses = cn(
    "w-5 h-5 text-primary transition-transform duration-200",
    {
      "text-gray-600 transform rotate-180": open,
      "text-gray-300": dark && !open,
    }
  );

  const contentClasses = cn(
    "overflow-hidden transition-all duration-200 ease-in-out",
    {
      "max-h-96 opacity-100": open,
      "max-h-0 opacity-0": !open,
    }
  );

  return (
    <div className={rootClasses} ref={root} {...rest}>
      <button
        className={headerClasses}
        onClick={handleToggle}
        aria-expanded={open}
        type="button"
      >
        <span className={titleClasses}>{title}</span>
        <div className={iconWrapperClasses}>
          <ChevronDown className={iconClasses} />
        </div>
      </button>

      <div className={contentClasses}>
        <div className="p-4 border-t border-gray-200">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
