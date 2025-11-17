"use client";

import { useEffect } from 'react';
import { initPerformanceTracking } from '@/lib/performance';

/**
 * Client component to initialize performance tracking
 * Should be included in the root layout
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Initialize Core Web Vitals tracking
    initPerformanceTracking();
  }, []);

  return null;
}
