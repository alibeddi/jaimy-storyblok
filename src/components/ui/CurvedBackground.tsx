import React from 'react';

interface CurvedBackgroundProps {
  fillColor?: string;
  backgroundImage?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  opacity?: number;
  anchorRight?: boolean; // New prop to control right anchoring
}

export default function CurvedBackground({
  fillColor = "black",
  backgroundImage,
  width = "1531",
  height = "1146",
  className = "",
  opacity = 1,
  anchorRight = true // Default to right anchoring
}: CurvedBackgroundProps) {
  const svgId = `curved-bg-${Math.random().toString(36).substr(2, 9)}`;
  const patternId = `pattern-${Math.random().toString(36).substr(2, 9)}`;

  // Calculate positioning for right anchoring
  const containerStyle = anchorRight ? {
    position: 'absolute' as const,
    right: 0,
    top: 0,
    transformOrigin: 'right center',
    opacity
  } : {
    opacity
  };

  return (
    <div 
      className={`${anchorRight ? 'absolute right-0 top-0' : ''} ${className}`}
      style={containerStyle}
    >
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 1531 1146" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={anchorRight ? "xMaxYMid slice" : "xMidYMid meet"}
      >
        {backgroundImage && (
          <defs>
            <pattern 
              id={patternId} 
              patternUnits="userSpaceOnUse" 
              width="100%" 
              height="100%"
            >
              <image 
                href={backgroundImage} 
                x="0" 
                y="0" 
                width="1531" 
                height="1146" 
                preserveAspectRatio="xMaxYMid slice"
              />
            </pattern>
          </defs>
        )}
        <path 
          d="M3738.98 -2288.67C4569.24 -1285.51 4428.57 206.243 3425.4 1036.51C2422.24 1866.77 930.494 1726.11 100.223 722.942C-53.1902 537.585 -27.2939 262.971 158.063 109.558C343.426 -43.8547 618.04 -17.9585 771.453 167.399C1295.39 800.444 2236.83 889.224 2869.86 365.284C3502.91 -158.656 3591.68 -1100.09 3067.74 -1733.13C2543.81 -2366.17 1602.37 -2454.95 969.333 -1931.01C783.97 -1777.6 509.361 -1803.5 355.949 -1988.85C202.536 -2174.21 228.432 -2448.82 413.789 -2602.24C1416.95 -3432.5 2908.7 -3291.83 3738.98 -2288.67Z" 
          fill={backgroundImage ? `url(#${patternId})` : fillColor}
        />
      </svg>
    </div>
  );
}
