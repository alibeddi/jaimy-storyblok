"use client";

import React from "react";
import { BannerProps } from "@/types/ui";
import BannerConstrained from "./BannerConstrained";
import BannerFull from "./BannerFull";
import BannerConnector from "./BannerConnector";

const components = {
  simple: BannerConstrained,
  "simple-connector": BannerConnector,
  "constrained-connector": BannerConnector,
  constrained: BannerConstrained,
  "full-background": BannerFull,
};

const Banner: React.FC<BannerProps> = ({
  type = "constrained",
  content = [],
  uspBar = [],
  contentWidth,
  contentWidthTablet,
  ...rest
}) => {
  const BannerComponent = components[type];
  if (!BannerComponent) return null;

  return (
    <BannerComponent
      contentWidth={contentWidth}
      contentWidthTablet={contentWidthTablet}
      content={content}
      uspBar={uspBar}
      {...rest}
    />
  );
};

export default Banner;
