"use client";

import React from "react";

/**
 * Performance monitoring utilities for React components
 */

// Component render counter for development debugging
const renderCounts = new Map<string, number>();

/**
 * Higher-order component to track render counts in development
 */
export function withRenderTracking<P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
) {
  const WrappedComponent = React.forwardRef<unknown, P>((props, ref) => {
    if (process.env.NODE_ENV === "development") {
      const componentName =
        displayName || Component.displayName || Component.name;
      const count = renderCounts.get(componentName) || 0;
      renderCounts.set(componentName, count + 1);

      // Log excessive renders
      if (count > 50 && count % 25 === 0) {
        console.warn(
          `🚨 Component "${componentName}" has rendered ${count} times. Consider optimization.`
        );
      }
    }

    return React.createElement(Component, { ...props, ref } as P & {
      ref?: unknown;
    });
  });

  WrappedComponent.displayName = `withRenderTracking(${displayName || Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Hook to track component mount/unmount cycles
 */
export function useComponentLifecycle(componentName: string) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`🟢 Component "${componentName}" mounted`);

      return () => {
        console.log(`🔴 Component "${componentName}" unmounted`);
      };
    }
  }, [componentName]);
}

/**
 * Hook to measure and log render performance
 */
export function useRenderPerformance(
  componentName: string,
  dependencies?: React.DependencyList
) {
  const renderCount = React.useRef(0);
  const lastRenderTime = React.useRef(0);

  React.useEffect(
    () => {
      if (process.env.NODE_ENV === "development") {
        renderCount.current += 1;
        const currentTime = performance.now();

        if (lastRenderTime.current > 0) {
          const timeSinceLastRender = currentTime - lastRenderTime.current;

          if (timeSinceLastRender < 16) {
            // Less than one frame (60fps)
            console.warn(
              `⚡ Fast re-render detected for "${componentName}" (${timeSinceLastRender.toFixed(2)}ms). ` +
                `Render #${renderCount.current}. Consider memoization.`
            );
          }
        }

        lastRenderTime.current = currentTime;
      }
       
    },
    dependencies ? [componentName, ...dependencies] : [componentName]
  );
}

/**
 * Hook to identify expensive computations
 */
export function useExpensiveComputation<T>(
  computation: () => T,
  dependencies: React.DependencyList,
  thresholdMs: number = 5
): T {
  return React.useMemo(() => {
    if (process.env.NODE_ENV === "development") {
      const startTime = performance.now();
      const result = computation();
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (duration > thresholdMs) {
        console.warn(
          `🐌 Expensive computation detected (${duration.toFixed(2)}ms). ` +
            `Consider optimization or splitting into smaller chunks.`
        );
      }

      return result;
    }

    return computation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

/**
 * Performance profiler component to wrap sections of your app
 */
interface PerformanceProfilerProps {
  id: string;
  children: React.ReactNode;
  onRender?: (
    id: string,
    phase: "mount" | "update",
    actualDuration: number
  ) => void;
}

export const PerformanceProfiler: React.FC<PerformanceProfilerProps> = ({
  id,
  children,
  onRender,
}) => {
  const handleRender = React.useCallback(
    (
      profileId: string,
      phase: "mount" | "update" | "nested-update",
      actualDuration: number,
      ...args: number[]
    ) => {
      // Unused parameters: baseDuration, startTime, commitTime
      void args;
      if (process.env.NODE_ENV === "development") {
        if (actualDuration > 16) {
          // More than one frame
          console.warn(
            `🔥 Slow render in "${profileId}" (${actualDuration.toFixed(2)}ms) during ${phase} phase`
          );
        }

        // Only call onRender with the phases our interface supports
        if (phase === "mount" || phase === "update") {
          onRender?.(profileId, phase, actualDuration);
        }
      }
    },
    [onRender]
  );

  return React.createElement(
    React.Profiler,
    { id, onRender: handleRender },
    children
  );
};

/**
 * Get current render count statistics
 */
export function getRenderStats(): Record<string, number> {
  if (process.env.NODE_ENV === "development") {
    return Object.fromEntries(renderCounts.entries());
  }
  return {};
}

/**
 * Clear render count statistics
 */
export function clearRenderStats(): void {
  if (process.env.NODE_ENV === "development") {
    renderCounts.clear();
  }
}

/**
 * Log current performance statistics to console
 */
export function logPerformanceStats(): void {
  if (process.env.NODE_ENV === "development") {
    const stats = getRenderStats();
    const sortedStats = Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10); // Top 10 most rendered components

    console.group("🚀 Component Performance Stats (Top 10)");
    sortedStats.forEach(([component, count]) => {
      const emoji = count > 100 ? "🚨" : count > 50 ? "⚠️" : "✅";
      console.log(`${emoji} ${component}: ${count} renders`);
    });
    console.groupEnd();
  }
}

// Auto-log performance stats every 30 seconds in development
if (process.env.NODE_ENV === "development") {
  setInterval(logPerformanceStats, 30000);
}
