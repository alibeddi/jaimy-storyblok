# Performance Optimization Guide

This project has been optimized for React performance using several techniques. Here's a guide to the optimizations implemented and how to use the performance monitoring tools.

## 🚀 Optimizations Implemented

### 1. **Component Memoization**

All major UI components have been wrapped with `React.memo()` to prevent unnecessary re-renders when props haven't changed:

- ✅ BlokImage, Row, CurvedBackground
- ✅ Button, Icon, Heading
- ✅ Image, RichText, Container
- ✅ List, ListItem, Hero
- ✅ Review component (already optimized)

### 2. **Computation Memoization**

Expensive calculations are memoized using `useMemo()`:

- **Style calculations**: Object fit classes, spacing styles, color computations
- **Derived state**: Boolean flags, computed dimensions, filtered data
- **Class name generation**: Complex conditional class strings

### 3. **Static Constants**

Mapping objects moved outside components to prevent recreation on every render:

```typescript
// Before: Created on every render ❌
const sizeStyles = {
  sm: "text-sm",
  md: "text-md",
};

// After: Static constant ✅
const SIZE_STYLES = {
  sm: "text-sm",
  md: "text-md",
} as const;
```

### 4. **Optimized Event Handlers**

Event handlers are memoized with `useCallback()` where appropriate to prevent child re-renders.

## 📊 Performance Monitoring Tools

### Import the utilities:

```typescript
import {
  withRenderTracking,
  useComponentLifecycle,
  useRenderPerformance,
  useExpensiveComputation,
  PerformanceProfiler,
  logPerformanceStats,
} from "@/lib/performance";
```

### 1. **Component Render Tracking**

Track how many times a component renders:

```typescript
const MyOptimizedComponent = withRenderTracking(MyComponent, "MyComponent");
```

### 2. **Lifecycle Monitoring**

Monitor component mount/unmount cycles:

```typescript
function MyComponent() {
  useComponentLifecycle("MyComponent");
  // ... rest of component
}
```

### 3. **Render Performance Monitoring**

Detect fast re-renders that might indicate missing memoization:

```typescript
function MyComponent({ data, filters }) {
  useRenderPerformance("MyComponent", [data, filters]);
  // ... rest of component
}
```

### 4. **Expensive Computation Tracking**

Identify slow computations that should be optimized:

```typescript
function MyComponent({ largeDataSet }) {
  const processedData = useExpensiveComputation(
    () => largeDataSet.map((item) => complexTransform(item)),
    [largeDataSet],
    10 // Warn if computation takes > 10ms
  );
}
```

### 5. **Performance Profiler Wrapper**

Wrap sections of your app to monitor render performance:

```typescript
<PerformanceProfiler
  id="heavy-section"
  onRender={(id, phase, duration) => {
    console.log(`${id} took ${duration}ms during ${phase}`);
  }}
>
  <HeavyComponent />
</PerformanceProfiler>
```

### 6. **Performance Statistics**

View current performance stats in development:

```typescript
// In browser console or component
logPerformanceStats();

// Get raw stats object
const stats = getRenderStats();
```

## 🔍 Development Workflow

### Automatic Monitoring

Performance stats are automatically logged every 30 seconds in development mode.

### Console Warnings

The tools will warn you about:

- **🚨 Excessive renders**: Components rendering > 50 times
- **⚡ Fast re-renders**: Re-renders faster than 16ms (60fps)
- **🐌 Slow computations**: Computations taking > threshold time
- **🔥 Slow renders**: Renders taking > 16ms

### Using React DevTools Profiler

1. Install React DevTools browser extension
2. Open DevTools → Profiler tab
3. Record performance during interactions
4. Look for components with long render times

## 📈 Performance Best Practices

### 1. **Memoization Guidelines**

- Use `React.memo()` for pure components
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for event handlers passed to memoized components

### 2. **Avoid Common Pitfalls**

```typescript
// ❌ Bad: Creates new object every render
<Component style={{ margin: 10 }} />

// ✅ Good: Stable reference
const styles = { margin: 10 };
<Component style={styles} />

// ❌ Bad: Creates new function every render
<Component onClick={() => handleClick(id)} />

// ✅ Good: Memoized handler
const handleClick = useCallback(() => handleClick(id), [id]);
<Component onClick={handleClick} />
```

### 3. **Component Architecture**

- Keep components small and focused
- Move state as close to where it's used as possible
- Use composition over large prop interfaces
- Extract heavy computations to custom hooks

### 4. **Image Optimization**

- Use `priority={true}` for above-the-fold images
- Implement proper `loading="lazy"` for off-screen images
- Use responsive image sizing with `sizes` prop
- Consider WebP format for better compression

## 🛠 Debugging Performance Issues

### 1. **Identify Problem Components**

```typescript
// Check render stats
logPerformanceStats();

// Look for components with high render counts
// Use React DevTools Profiler for detailed analysis
```

### 2. **Find Missing Memoization**

```typescript
// Add render performance tracking
useRenderPerformance("SuspiciousComponent", [prop1, prop2]);

// Look for fast re-render warnings
// Check if props are changing unnecessarily
```

### 3. **Optimize Heavy Operations**

```typescript
// Track expensive computations
const result = useExpensiveComputation(
  () => heavyCalculation(data),
  [data],
  5 // Warn if > 5ms
);

// Consider moving to Web Workers for very heavy tasks
```

## 🎯 Performance Targets

### Render Performance

- **Target**: < 16ms per render (60 FPS)
- **Warning**: > 16ms renders logged automatically
- **Critical**: > 100ms renders need immediate attention

### Component Lifecycle

- **Memoization**: All frequently rendered components
- **Re-renders**: Minimize unnecessary re-renders
- **Memory**: Avoid memory leaks from uncleared timers/subscriptions

### User Experience

- **Time to Interactive**: < 3 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1

## 📝 Additional Resources

- [React Performance Documentation](https://react.dev/learn/render-and-commit)
- [React DevTools Profiler Guide](https://react.dev/reference/react/Profiler)
- [Web Vitals](https://web.dev/vitals/)
- [React Memo vs UseMemo](https://react.dev/reference/react/memo)

The performance monitoring tools are only active in development mode and have zero impact on production builds.
