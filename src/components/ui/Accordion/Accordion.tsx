"use client";

import React, { createContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  AccordionProps,
  AccordionContextType,
  AccordionItemProps,
} from "@/types/ui";

export const AccordionContext = createContext<AccordionContextType>({
  dark: false,
  addRef: () => {},
  openState: [],
  toggleOpen: () => {},
});

const Accordion: React.FC<AccordionProps> = ({
  className,
  dark = false,
  multiple = false,
  children,
}) => {
  const childCount = React.Children.count(children);
  const [openState, setOpenState] = useState<boolean[]>(
    new Array(childCount).fill(false)
  );
  const [refs, setRefs] = useState<Record<number, HTMLElement | null>>({});

  const scroll = (element: HTMLElement | null) => {
    if (!element) return;
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const top = window.pageYOffset + rect.top - 20;
      if (window.scrollY > top) {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 0);
  };

  const toggleOpen = useCallback(
    (index: number) => {
      setOpenState((prevState) => {
        const newState = multiple
          ? [...prevState]
          : new Array(childCount).fill(false);

        newState[index] = !prevState[index];

        if (newState[index] && refs[index]) {
          scroll(refs[index]);
        }

        return newState;
      });
    },
    [multiple, childCount, refs]
  );

  const addRef = useCallback(
    (index: number, ref: HTMLElement | null) => {
      if (ref && refs[index] !== ref) {
        setRefs((prev) => ({ ...prev, [index]: ref }));
      }
    },
    [refs]
  );

  const rootClasses = cn("space-y-4", className);

  const contextValue: AccordionContextType = {
    dark,
    addRef,
    openState,
    toggleOpen,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={rootClasses}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<AccordionItemProps>,
                { index }
              )
            : child
        )}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;
