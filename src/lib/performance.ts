/**
 * Performance monitoring utilities for tracking Core Web Vitals and custom metrics
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

export interface PerformanceMetrics {
  route: string;
  metrics: {
    lcp?: number;
    fid?: number;
    cls?: number;
    ttfb?: number;
    fcp?: number;
  };
  timestamp: number;
  userAgent: string;
}

/**
 * Send performance metrics to analytics endpoint
 */
function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    route: window.location.pathname,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
  });

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/performance', body);
  } else {
    fetch('/api/performance', {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  }
}

/**
 * Initialize Core Web Vitals tracking
 */
export function initPerformanceTracking() {
  if (typeof window === 'undefined') return;

  onCLS(sendToAnalytics);
  onINP(sendToAnalytics); // INP replaced FID in web-vitals v3
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

/**
 * Track custom performance marks
 */
export function trackPerformanceMark(name: string) {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    performance.mark(name);
  } catch (error) {
    console.error('Error tracking performance mark:', error);
  }
}

/**
 * Measure performance between two marks
 */
export function measurePerformance(
  name: string,
  startMark: string,
  endMark: string
) {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];
    
    if (measure) {
      sendToAnalytics({
        name,
        value: measure.duration,
        rating: 'good',
        delta: measure.duration,
        id: `${name}-${Date.now()}`,
        navigationType: 'navigate',
      } as Metric);
    }
  } catch (error) {
    console.error('Error measuring performance:', error);
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics | null {
  if (typeof window === 'undefined' || !window.performance) return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    route: window.location.pathname,
    metrics: {
      ttfb: navigation?.responseStart - navigation?.requestStart,
      fcp: paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime,
    },
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
  };
}
