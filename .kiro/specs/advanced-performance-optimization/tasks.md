# Implementation Plan

- [x] 1. Review merged code and verify website functionality
  - Review all changes from merged branch to understand new code structure
  - Check for any conflicts or breaking changes in performance-related files
  - Verify the website builds successfully (npm run build)
  - Test the website runs correctly in development mode (npm run dev)
  - Test key pages and functionality to ensure nothing is broken
  - Review existing performance optimizations to avoid duplicating work
  - Document any new components or patterns that need optimization
  - _Requirements: All (prerequisite for all optimizations)_

- [ ] 2. Set up performance monitoring and baseline
  - Create performance baseline script to measure current metrics
  - Install and configure @next/bundle-analyzer for bundle analysis
  - Set up Lighthouse CI configuration with performance assertions
  - Create performance budget configuration file (.performance-budgets.json)
  - Add bundle size check script to enforce budgets
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 3. Optimize bundle size through component registry
  - Remove all static component imports from src/app/[locale]/layout.tsx
  - Update StoryblokProvider to use empty components object
  - Enhance component registry with retry logic and preloading hints
  - Add Suspense boundaries with loading states to prevent CLS
  - Configure webpack code splitting in next.config.ts with framework, storyblok, and lib chunks
  - _Requirements: 1.2, 1.3, 1.5, 7.1, 7.2_

- [ ] 4. Implement static generation with ISR
  - Update page.tsx to use force-static and revalidate: 3600
  - Implement generateStaticParams to pre-generate all published pages for all locales
  - Create getStoryData helper that uses cache for published content
  - Enhance revalidation API to support tag-based invalidation and multi-locale paths
  - Implement draft mode API route for preview functionality
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 5. Enhance image optimization
  - Update OptimizedImage component to support Storyblok image service parameters
  - Add getStoryblokImageUrl utility with format, quality, and fit options
  - Implement blur placeholder generation for all images
  - Add responsive image size configurations (hero, card, thumbnail, full)
  - Update all image components to use priority prop for above-fold images
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 6. Optimize font loading
  - Create font subsetting script (convert-fonts-to-woff2.sh) for Latin characters only
  - Run font subsetting to generate WOFF2 files in belfius-optimized directory
  - Update font configuration to use optimized WOFF2 files with display: swap
  - Add font preload links in layout for critical fonts (Regular and Bold)
  - Remove legacy font formats and CDN references
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 7. Minimize CSS bundle
  - Reduce Tailwind safelist to only CMS-driven dynamic classes
  - Remove duplicate CSS imports from layout files
  - Enable optimizeCss in next.config.ts experimental options
  - Configure JIT mode in Tailwind config
  - Add optimizePackageImports for @storyblok/react and lucide-react
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 8. Implement multi-tier caching system
  - Create LRUCache class with maxSize and TTL-based eviction
  - Enhance getCachedStory with L1 memory cache and L2 Next.js cache
  - Implement request deduplication using pendingRequests Map
  - Add cache warming function to preload top 20 pages on build
  - Enhance invalidateStoryCache to clear both L1 and L2 caches
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 9. Implement advanced code splitting
  - Add lazyWithRetry function to component registry with 3 retry attempts
  - Create preloadHints map for common navigation paths
  - Implement preloadComponents function to trigger related component loads
  - Use dynamic imports for PerformanceMonitor and StoryblokBridge
  - Update analytics components to use Script with afterInteractive strategy
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 10. Optimize third-party scripts
  - Update Anytrack component to use Next.js Script with afterInteractive
  - Load Storyblok bridge only in draft mode with lazyOnload strategy
  - Add web-vitals tracking script with worker strategy
  - Create script performance budget check (max 500ms blocking time)
  - Implement performance impact monitoring for third-party scripts
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 11. Set up Core Web Vitals monitoring
  - Enhance reportWebVitals function to track all metrics (CLS, FID, FCP, LCP, TTFB, INP)
  - Create performance dashboard API endpoint with 75th percentile calculations
  - Implement client-side initPerformanceMonitoring with dynamic web-vitals import
  - Add performance metrics storage and aggregation
  - Create performance dashboard UI at /admin/performance
  - _Requirements: 9.1, 9.2, 9.5_

- [ ] 12. Implement build performance monitoring
  - Create performance-baseline.js script to analyze bundle sizes per route
  - Add build time measurement script (measure-build-time.js)
  - Create .build-history.json to track build performance over time
  - Add budget violation checks and exit with error if exceeded
  - Generate markdown performance report with route breakdown
  - _Requirements: 9.3, 9.4, 10.3, 10.4, 10.5_

- [ ] 13. Optimize build process
  - Enable swcMinify and output: standalone in next.config.ts
  - Configure incremental cache handler for faster rebuilds
  - Implement advanced webpack optimization with moduleIds: deterministic
  - Add runtimeChunk: single and optimized splitChunks configuration
  - Disable productionBrowserSourceMaps and enable compress
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 14. Create build optimization scripts
  - Enhance optimize-build.sh with dependency analysis and performance baseline
  - Create safe-build.js with retry logic and automatic cleanup
  - Add parallel build task support
  - Implement build caching for unchanged dependencies
  - Add build summary with bundle size breakdown
  - _Requirements: 10.1, 10.3, 10.4_

- [ ] 15. Add error handling and fallbacks
  - Implement getCachedStoryWithFallback with stale data fallback
  - Create ComponentErrorBoundary with error reporting to /api/errors
  - Add error logging for cache failures
  - Implement retry logic for component loading failures
  - Add graceful degradation for failed optimizations
  - _Requirements: 1.2, 6.1, 7.1_

- [ ] 16. Write performance tests
- [ ] 16.1 Create bundle size tests to verify JS and CSS budgets
  - Write test to check JavaScript bundle is under 560KB
  - Write test to check CSS bundle is under 112KB
  - _Requirements: 1.4, 5.4_

- [ ] 16.2 Create cache performance tests
  - Write test to verify cache hit is faster than cache miss
  - Write test to verify cache invalidation works correctly
  - Write test to verify >95% cache hit rate
  - _Requirements: 6.1, 6.3_

- [ ] 16.3 Create rendering strategy tests
  - Write test to verify static pages return x-nextjs-cache: HIT
  - Write test to verify ISR pages have correct cache-control headers
  - Write test to verify draft mode uses dynamic rendering
  - _Requirements: 2.1, 2.2, 2.5_

- [ ] 16.4 Create integration tests with Playwright
  - Write test to verify page loads within 3 seconds
  - Write test to verify CLS is under 0.1
  - _Requirements: 9.1_

- [ ] 17. Set up CI/CD performance checks
  - Create GitHub Actions workflow for performance checks
  - Add bundle size check step that fails on budget violations
  - Add Lighthouse CI step with performance score >90 requirement
  - Add performance report artifact upload
  - Configure workflow to run on pull requests
  - _Requirements: 9.3, 9.4_

- [ ] 18. Create monitoring and alerting
  - Define alerting thresholds for LCP, FID, CLS, bundle sizes, cache hit rate
  - Create alerts.yml configuration file
  - Implement real-time metrics tracking
  - Add performance dashboard with historical trends
  - Set up weekly and monthly review procedures
  - _Requirements: 9.1, 9.5_

- [ ] 19. Document optimizations and create maintenance guide
  - Write optimization documentation covering all 10 requirements
  - Create troubleshooting guide for common issues
  - Document monitoring procedures and alerting rules
  - Create performance checklist for releases
  - Write team training materials
  - _Requirements: All_

