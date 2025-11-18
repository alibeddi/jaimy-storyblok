# Implementation Plan

- [x] 1. Set up performance monitoring and baseline metrics
  - Create bundle analyzer configuration in next.config.ts
  - Add performance budget configuration file
  - Set up Lighthouse CI configuration
  - Run baseline performance audit and document current metrics
  - Create performance metrics tracking utilities
  - _Requirements: 1.1, 9.1, 9.2, 9.3_

- [x] 2. Implement dynamic component registry system
  - [x] 2.1 Create component registry with dynamic imports
    - Create src/lib/component-registry.ts with lazy loading map
    - Implement loadComponent function with error handling
    - Add component loading states and fallbacks
    - _Requirements: 1.2, 7.1, 7.2_
  
  - [x] 2.2 Update StoryblokProvider to use dynamic registry
    - Refactor StoryblokProvider to use lazy component loading
    - Add Suspense boundaries for lazy components
    - Implement error boundaries for component loading failures
    - _Requirements: 1.2, 7.1_
  
  - [x] 2.3 Remove static component imports from layout
    - Remove all component imports from src/app/[locale]/layout.tsx
    - Remove duplicate CSS imports (keep only one)
    - Clean up storyblokInit component registration
    - _Requirements: 1.3, 1.5, 5.1_

- [x] 3. Optimize font loading strategy
  - [x] 3.1 Create optimized font configuration
    - Create src/lib/fonts.ts with next/font/local configuration
    - Configure font-display: swap for all fonts
    - Set up font preloading for critical fonts
    - _Requirements: 4.1, 4.2_
  
  - [x] 3.2 Convert fonts to WOFF2 and subset
    - Convert all font files to WOFF2 format only
    - Create language-specific font subsets (latin, latin-ext)
    - Remove legacy font formats and CDN references
    - Update font-face declarations in globals.css
    - _Requirements: 4.3, 4.4, 4.5_
  
  - [x] 3.3 Update layout to use optimized fonts
    - Import and apply font configuration in layout.tsx
    - Remove inline font-face declarations
    - Add font preload links for critical fonts
    - _Requirements: 4.1, 4.2_

- [-] 4. Implement Storyblok caching layer
  - [x] 4.1 Create cache utility functions
    - Create src/lib/storyblok-cache.ts with memory cache
    - Implement getCachedStory function with multi-tier caching
    - Add cache key generation and management
    - Implement cache TTL and expiration logic
    - _Requirements: 6.1, 6.3_
  
  - [x] 4.2 Integrate Next.js unstable_cache
    - Wrap Storyblok API calls with unstable_cache
    - Configure cache tags for invalidation
    - Set appropriate revalidation intervals
    - Implement request deduplication
    - _Requirements: 6.1, 6.4, 6.5_
  
  - [x] 4.3 Create cache invalidation API route
    - Create src/app/api/revalidate/route.ts
    - Implement webhook signature verification
    - Add revalidateTag and revalidatePath calls
    - Implement memory cache clearing
    - _Requirements: 6.2_
  
  - [x] 4.4 Update page data fetching to use cache
    - Refactor fetchStoryblokData in [...slug]/page.tsx
    - Replace direct API calls with getCachedStory
    - Add cache warming for common pages
    - _Requirements: 6.1, 6.3_

- [ ] 5. Implement ISR and static generation strategy
  - [x] 5.1 Configure static generation for pages
    - Change dynamic export from 'force-dynamic' to 'force-static'
    - Add revalidate export with appropriate interval (3600s)
    - Configure generateStaticParams for known routes
    - _Requirements: 2.1, 2.3_
  
  - [x] 5.2 Implement generateStaticParams function
    - Fetch all published stories from Storyblok
    - Generate static params for all locales
    - Filter out draft and folder entries
    - Handle pagination for large sites
    - _Requirements: 2.1_
  
  - [x] 5.3 Add draft mode handling
    - Keep dynamic rendering for draft mode
    - Add conditional rendering logic based on draft mode
    - Ensure preview functionality works correctly
    - _Requirements: 2.5_
  
  - [x] 5.4 Set up Storyblok webhook integration
    - Configure webhook URL in Storyblok dashboard
    - Test webhook triggers on publish/unpublish
    - Verify cache invalidation on content changes
    - _Requirements: 2.4, 6.2_

- [x] 6. Optimize image loading and delivery
  - [x] 6.1 Create optimized image component
    - Create src/lib/image-utils.ts with helper functions
    - Implement getImageDimensions function
    - Implement getOptimizedUrl for Storyblok image service
    - Create OptimizedImage wrapper component
    - _Requirements: 3.1, 3.4_
  
  - [x] 6.2 Update BlokImage component
    - Integrate OptimizedImage into BlokImage
    - Add proper width/height attributes
    - Implement responsive sizes attribute
    - Add blur placeholder generation
    - _Requirements: 3.1, 3.4, 3.5_
  
  - [x] 6.3 Implement lazy loading strategy
    - Add priority prop for above-fold images
    - Configure lazy loading for below-fold images
    - Update Header and Hero components with priority images
    - _Requirements: 3.2, 3.3_

- [-] 7. Optimize CSS and reduce bundle size
  - [x] 7.1 Reduce Tailwind safelist
    - Audit current safelist usage in tailwind.config.ts
    - Remove unnecessary safelist patterns
    - Keep only truly dynamic CMS-driven classes
    - _Requirements: 5.2_
  
  - [x] 7.2 Remove duplicate CSS imports
    - Fix triple CSS import in layout.tsx
    - Verify no other duplicate imports exist
    - _Requirements: 5.1_
  
  - [x] 7.3 Enable CSS optimization
    - Add optimizeCss experimental flag to next.config.ts
    - Configure CSS minification
    - Test CSS output for correctness
    - _Requirements: 5.3, 5.5_

- [x] 8. Optimize third-party scripts
  - [x] 8.1 Update analytics script loading
    - Convert Anytrack script to use Next.js Script component
    - Set appropriate loading strategy (afterInteractive)
    - Add script loading priority configuration
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [x] 8.2 Optimize Storyblok bridge loading
    - Load bridge script only in preview mode
    - Use dynamic import for bridge initialization
    - Add lazy loading for bridge dependencies
    - _Requirements: 8.4_

- [x] 9. Implement route-based code splitting
  - [x] 9.1 Split service components
    - Convert large service components to use dynamic imports
    - Add loading states for split components
    - Implement shared chunk optimization
    - _Requirements: 7.3, 7.5_
  
  - [x] 9.2 Optimize component bundle grouping
    - Configure webpack splitChunks in next.config.ts
    - Create shared chunks for common components
    - Optimize chunk loading strategy
    - _Requirements: 7.5_

- [x] 10. Set up CI/CD performance checks
  - [x] 10.1 Configure Lighthouse CI
    - Create lighthouserc.json configuration
    - Add Lighthouse CI to GitHub Actions workflow
    - Set performance thresholds
    - _Requirements: 9.1, 9.4_
  
  - [x] 10.2 Add bundle size tracking
    - Install and configure @next/bundle-analyzer
    - Add bundle size comparison in CI
    - Set up bundle size alerts
    - _Requirements: 9.3, 9.4_
  
  - [x] 10.3 Create performance budget enforcement
    - Define performance budgets in configuration
    - Add budget checks to build process
    - Configure build failure on budget violations
    - _Requirements: 9.4_

- [x] 11. Implement build process optimizations
  - [x] 11.1 Enable SWC optimizations
    - Verify SWC compiler is enabled
    - Configure SWC minification options
    - Test build output for correctness
    - _Requirements: 10.2_
  
  - [x] 11.2 Configure build caching
    - Enable Next.js build cache
    - Configure cache directory
    - Test incremental builds
    - _Requirements: 10.1, 10.4_
  
  - [x] 11.3 Optimize build parallelization
    - Configure worker threads for parallel builds
    - Optimize static generation concurrency
    - Test build performance improvements
    - _Requirements: 10.3_

- [x] 12. Create performance monitoring dashboard
  - [x] 12.1 Implement Core Web Vitals tracking
    - Add web-vitals library
    - Create performance tracking utility
    - Send metrics to analytics endpoint
    - _Requirements: 9.1_
  
  - [x] 12.2 Set up performance metrics collection
    - Create metrics collection API route
    - Implement metrics storage/aggregation
    - Add performance metrics visualization
    - _Requirements: 9.5_

- [x] 13. Testing and validation
  - [x] 13.1 Write performance tests
    - Create cache performance tests
    - Add bundle size regression tests
    - Implement rendering strategy tests
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [x] 13.2 Run comprehensive performance audit
    - Run Lighthouse audits on all key pages
    - Measure and document performance improvements
    - Verify all performance targets are met
    - Create performance comparison report
    - _Requirements: 9.1, 9.2_

- [x] 14. Documentation and cleanup
  - Create performance optimization guide
  - Document caching strategy and invalidation
  - Update README with performance metrics
  - Document monitoring and alerting setup
  - Clean up unused code and dependencies
  - _Requirements: All_
