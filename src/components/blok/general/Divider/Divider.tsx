/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { storyblokEditable } from "@storyblok/react";
import DividerUI from "../../../ui/Divider";
import { SpacingVariant } from "@/types/ui";

interface DividerBlok {
  component: string;
  _uid: string;
  variant?: "solid" | "dashed" | "dotted" | "double" | "gradient";
  thickness?: "thin" | "medium" | "thick";
  color?: string;
  width?: "full" | "75" | "50" | "25";
  alignment?: "left" | "center" | "right";
  margin_top?: SpacingVariant;
  margin_bottom?: SpacingVariant;
  [key: string]: any;
}

interface DividerProps {
  blok: DividerBlok;
}

const Divider: React.FC<DividerProps> = ({ blok }) => {
  return (
    <DividerUI
      {...storyblokEditable(blok)}
      variant={blok.variant}
      thickness={blok.thickness}
      color={blok.color}
      width={blok.width}
      alignment={blok.alignment}
      marginTop={blok.margin_top}
      marginBottom={blok.margin_bottom}
    />
  );
};

export default Divider;
