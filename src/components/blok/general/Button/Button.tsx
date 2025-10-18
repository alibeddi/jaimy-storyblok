/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ButtonUI from "../../../ui/Button";
import {
  IconColor,
  IconType,
  IconSize,
  IconPosition,
  SpacingVariant,
  ButtonType,
  ButtonVariant,
  ButtonTarget,
  ButtonProps as UIButtonProps,
} from "@/types/ui";

interface LinkBlok {
  url?: string;
  cached_url?: string;
}

export interface ButtonBlok {
  component: string;
  icon_variant?: string;
  icon_color?: IconColor;
  icon_type?: IconType;
  icon_position?: IconPosition;
  icon_size?: IconSize;
  icon_spacing?: SpacingVariant;
  title: string;
  type: ButtonType;
  variant: ButtonVariant;
  size?: "xs" | "sm" | "default" | "md" | "lg" | "xl" | "2xl";
  border?: string;
  border_color?: string;
  border_radius?: string;
  shadow?: string;
  cursor?: string;
  target?: ButtonTarget;
  link: LinkBlok;
  preset?: string;
  relation?: string[];
  disable_nofollow?: boolean;
  [key: string]: any;
}

interface SBButtonProps {
  className?: string;
  blok: ButtonBlok;
}

const Button: React.FC<SBButtonProps> = ({ className, blok }) => {
  const to = blok?.link?.url || "#";
  return (
    <ButtonUI
      className={className}
      icon={blok?.icon_variant}
      iconColor={blok?.icon_color}
      iconType={blok?.icon_type}
      iconPosition={blok?.icon_position}
      iconSize={blok?.icon_size}
      iconSpacing={blok?.icon_spacing}
      type={blok?.type}
      variant={blok?.variant || "secondary"}
      size={blok?.size}
      border={blok?.border}
      borderColor={blok?.border_color}
      borderRadius={
        (blok?.border_radius as UIButtonProps["borderRadius"]) || undefined
      }
      shadow={(blok?.shadow as UIButtonProps["shadow"]) || undefined}
      cursor={(blok?.cursor as UIButtonProps["cursor"]) || undefined}
      to={to}
      target={blok?.target}
      relation={blok?.relation}
      disableNofollow={blok?.disable_nofollow}
    >
      {blok?.title}
    </ButtonUI>
  );
};

export default Button;
