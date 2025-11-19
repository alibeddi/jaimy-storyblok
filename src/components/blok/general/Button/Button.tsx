/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { storyblokEditable } from "@storyblok/react";
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
  border?: string;
  border_color?: string;
  border_radius?: string;
  shadow?: string;
  cursor?: string;
  no_wrap?: boolean; // Prevent text wrapping
  // Responsive fields
  size?: string;
  size_tablet?: string;
  size_desktop?: string;
  shadow_tablet?: string;
  shadow_desktop?: string;
  border_radius_tablet?: string;
  border_radius_desktop?: string;
  cursor_tablet?: string;
  cursor_desktop?: string;
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

  // Use individual responsive fields directly
  const mobileStyles = {
    size: blok?.size,
    shadow: blok?.shadow,
    border_radius: blok?.border_radius,
    cursor: blok?.cursor,
  };
  const tabletStyles = {
    size: blok?.size_tablet,
    shadow: blok?.shadow_tablet,
    border_radius: blok?.border_radius_tablet,
    cursor: blok?.cursor_tablet,
  };
  const desktopStyles = {
    size: blok?.size_desktop,
    shadow: blok?.shadow_desktop,
    border_radius: blok?.border_radius_desktop,
    cursor: blok?.cursor_desktop,
  };

  return (
    <ButtonUI
      {...storyblokEditable(blok)}
      className={className}
      icon={blok?.icon_variant}
      iconColor={blok?.icon_color}
      iconType={blok?.icon_type}
      iconPosition={blok?.icon_position}
      iconSize={blok?.icon_size}
      iconSpacing={blok?.icon_spacing}
      type={blok?.type}
      variant={blok?.variant || "secondary"}
      size={(mobileStyles?.size as UIButtonProps["size"]) || undefined}
      sizeTablet={(tabletStyles?.size as UIButtonProps["size"]) || undefined}
      sizeDesktop={(desktopStyles?.size as UIButtonProps["size"]) || undefined}
      border={blok?.border}
      borderColor={blok?.border_color}
      borderRadius={
        (mobileStyles?.border_radius as UIButtonProps["borderRadius"]) ||
        undefined
      }
      borderRadiusTablet={
        (tabletStyles?.border_radius as UIButtonProps["borderRadius"]) ||
        undefined
      }
      borderRadiusDesktop={
        (desktopStyles?.border_radius as UIButtonProps["borderRadius"]) ||
        undefined
      }
      shadow={(mobileStyles?.shadow as UIButtonProps["shadow"]) || undefined}
      shadowTablet={
        (tabletStyles?.shadow as UIButtonProps["shadow"]) || undefined
      }
      shadowDesktop={
        (desktopStyles?.shadow as UIButtonProps["shadow"]) || undefined
      }
      cursor={(mobileStyles?.cursor as UIButtonProps["cursor"]) || undefined}
      cursorTablet={
        (tabletStyles?.cursor as UIButtonProps["cursor"]) || undefined
      }
      cursorDesktop={
        (desktopStyles?.cursor as UIButtonProps["cursor"]) || undefined
      }
      noWrap={blok?.no_wrap}
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
