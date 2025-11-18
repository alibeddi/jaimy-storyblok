import React, { useId, useMemo, memo } from "react";

interface CurvedBackgroundProps {
  fillColor?: string;
  backgroundImage?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  opacity?: number;
  useTailwindColor?: boolean;
  shape?: "curved" | "footer";
}

// Memoize the shape paths as constants to avoid recalculation
const SHAPE_PATHS = {
  footer:
    "M2057 -46C2057 10.8853 1570.98 44 964.294 44C357.61 44 -140 10.8853 -140 -46C-140 -102.885 351.815 -149 958.5 -149C1565.18 -149 2057 -102.885 2057 -46Z",
  curved:
    "M3738.98 -2288.67C4569.24 -1285.51 4428.57 206.243 3425.4 1036.51C2422.24 1866.77 930.494 1726.11 100.223 722.942C-53.1902 537.585 -27.2939 262.971 158.063 109.558C343.426 -43.8547 618.04 -17.9585 771.453 167.399C1295.39 800.444 2236.83 889.224 2869.86 365.284C3502.91 -158.656 3591.68 -1100.09 3067.74 -1733.13C2543.81 -2366.17 1602.37 -2454.95 969.333 -1931.01C783.97 -1777.6 509.361 -1803.5 355.949 -1988.85C202.536 -2174.21 228.432 -2448.82 413.789 -2602.24C1416.95 -3432.5 2908.7 -3291.83 3738.98 -2288.67Z",
} as const;

const SHAPE_CONFIGS = {
  footer: {
    viewBox: "0 0 1920 44",
    defaultWidth: "1920",
    defaultHeight: "44",
    position: "top-0 left-0",
    svgClass: "w-full h-11",
  },
  curved: {
    viewBox: "0 0 1531 1146",
    defaultWidth: "1531",
    defaultHeight: "1146",
    position: "bottom-0 right-0",
    svgClass: "",
  },
} as const;

const CurvedBackground = memo(function CurvedBackground({
  fillColor = "black",
  backgroundImage,
  width = "1531",
  height = "1146",
  className = "",
  opacity = 1,
  useTailwindColor = false,
  shape = "curved",
}: CurvedBackgroundProps) {
  const reactId = useId();
  const patternId = useMemo(
    () => `pattern-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId]
  );

  // Memoize shape configuration to avoid recalculation
  const shapeProps = useMemo(() => SHAPE_CONFIGS[shape], [shape]);
  const shapePath = useMemo(() => SHAPE_PATHS[shape], [shape]);

  // Memoize fillColor classification to avoid recalculation
  const isTailwindClass = useMemo(
    () =>
      fillColor &&
      !fillColor.startsWith("#") &&
      !fillColor.startsWith("rgb") &&
      !fillColor.startsWith("hsl") &&
      !fillColor.includes("gradient"),
    [fillColor]
  );

  // Memoize mask properties
  const maskProperties = useMemo(
    () => ({
      position: "bottom right",
      size: "contain",
    }),
    []
  );

  // If using Tailwind classes, we need to CSS masking instead of SVG fill
  // Exception: footer shape always uses SVG path regardless of fillColor
  if ((isTailwindClass || useTailwindColor) && shape !== "footer") {
    return (
      <div
        className={`absolute w-full ${shapeProps.position} ${className}`}
        style={{ opacity }}>
        {/* Background color div with Tailwind classes */}
        <div
          className={`absolute inset-0 ${fillColor ? `bg-${fillColor}` : "bg-black"}`}
          style={{
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg width="${width || shapeProps.defaultWidth}" height="${height || shapeProps.defaultHeight}" viewBox="${shapeProps.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="${shapePath}" fill="white"/>
              </svg>
            `)}")`,
            maskSize: maskProperties.size,
            maskRepeat: "no-repeat",
            maskPosition: maskProperties.position,
            WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg width="${width || shapeProps.defaultWidth}" height="${height || shapeProps.defaultHeight}" viewBox="${shapeProps.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="${shapePath}" fill="white"/>
              </svg>
            `)}")`,
            WebkitMaskSize: maskProperties.size,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: maskProperties.position,
          }}
        />
      </div>
    );
  }

  // Special handling for footer shape to match your exact requirements
  if (shape === "footer") {
    return (
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1920 44"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-11"
          preserveAspectRatio="none">
          <path
            d="M2057 -46C2057 10.8853 1570.98 44 964.294 44C357.61 44 -140 10.8853 -140 -46C-140 -102.885 351.815 -149 958.5 -149C1565.18 -149 2057 -102.885 2057 -46Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }

  // Original SVG approach for curved shape and images
  return (
    <div
      className={`absolute w-full ${shapeProps.position} overflow-hidden leading-none ${className}`}
      style={{ opacity }}>
      <svg
        width={width || shapeProps.defaultWidth}
        height={height || shapeProps.defaultHeight}
        viewBox={shapeProps.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${shapeProps.svgClass} ${shapeProps.position}`}
        preserveAspectRatio="none">
        {backgroundImage && (
          <defs>
            <pattern
              id={patternId}
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
              patternContentUnits="objectBoundingBox">
              <image
                href={backgroundImage}
                x="0"
                y="0.1"
                width="1"
                height="1"
              />
            </pattern>
          </defs>
        )}
        <path
          d={shapePath}
          fill={backgroundImage ? `url(#${patternId})` : fillColor}
        />
      </svg>
    </div>
  );
});

export default CurvedBackground;
