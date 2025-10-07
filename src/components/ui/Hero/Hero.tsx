"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ExtendedHeroProps } from "@/types/ui";

interface ConnectedProps {
  color?: string;
  imagePosition?: "left" | "right";
  flipContentMobile?: boolean;
  contentWidth?: string;
  disabled?: boolean;
  children: React.ReactNode;
  largeColumnDesktop?: "left" | "right";
  largeColumnMobile?: "left" | "right";
}

const Connected: React.FC<ConnectedProps> = ({
  color,
  imagePosition,
  flipContentMobile = false,
  contentWidth,
  disabled = false,
  children,
  largeColumnDesktop = "left",
  largeColumnMobile = "left",
}) => {
  const filteredChildren = React.Children.toArray(children).filter(Boolean);

  if (
    disabled ||
    !Array.isArray(filteredChildren) ||
    filteredChildren.length !== 2 ||
    !imagePosition
  ) {
    return <>{filteredChildren}</>;
  }

  const className = cn("flex flex-col md:flex-row items-center gap-8", {
    "flex-col-reverse": flipContentMobile,
  });

  const connectorClass = cn("hidden md:block w-px h-full bg-current", {
    "text-primary": color === "primary",
    "text-gray-500": color === "gray" || !color,
    "text-white": color === "white",
    "text-black": color === "black",
  });

  const containerClass = (location: "left" | "right") =>
    cn("flex-1", {
      "order-1": imagePosition === location,
      "md:max-w-md":
        imagePosition !== location && largeColumnDesktop !== location,
      "max-w-sm": imagePosition !== location && largeColumnMobile !== location,
    });

  const containerStyle = (location: "left" | "right"): React.CSSProperties => ({
    maxWidth: imagePosition !== location ? contentWidth : undefined,
  });

  return (
    <div className={className}>
      <div className={containerClass("left")} style={containerStyle("left")}>
        {filteredChildren[0]}
      </div>

      <div className={connectorClass} />

      <div className={containerClass("right")} style={containerStyle("right")}>
        {filteredChildren[1]}
      </div>
    </div>
  );
};

const Hero: React.FC<ExtendedHeroProps> = ({
  className,
  children,
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  overlay = false,
  overlayOpacity = 0.5,
  textAlign = "center",
  minHeight = "500px",
  ...rest
}) => {
  const heroClasses = cn(
    "relative flex items-center justify-center",
    `text-${textAlign}`,
    overlay && "text-white",
    className
  );

  const heroStyle: React.CSSProperties = {
    minHeight,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section className={heroClasses} style={heroStyle} {...rest}>
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
        )}
        {subtitle && <h2 className="text-xl md:text-2xl mb-6">{subtitle}</h2>}
        {description && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default Hero;
export { Connected as HeroConnected };
