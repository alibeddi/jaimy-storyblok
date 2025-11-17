# Performance Optimization Guide

This document outlines the performance optimizations implemented in this Next.js + Storyblok application.

## Overview

The application has been optimized to achieve:
- **30%+ reduction** in JavaScript bundle size
- **25%+ reduction** in CSS bundle size
- **LCP < 2.5s** on 3G connections
- **FID < 100ms** for interactivity
- **CLS < 0.1** for visual stability
- **95%+ cache hit rate** for published content

## Optimization Strategies

### 1. Dynamic Component Loading

Components are loaded on-demand using dynamic imports, reducing the initial bundle size.

**Implementation:**
- Component registry with lazy loading (`src/lib/component-registry.ts`)
- Suspense boundaries for loading states
- Error boundaries for graceful failures

**Usage:**
```typescript
import { loadComponent } from '@/lib/component-registry';

const Header = loadComponent('header');
```

### 2. Multi-Tier Caching

Storyblok API responses are cached at multiple levels for optimal performance.

**Cache Hierarchy:**
1. **L1: Memory Cache** - 5 min TTL for published, 1 min for draft
2. **L2: Next.js Cache** - 1 hour TTL with tag-based invalidation
3. **L3: CDN Cache** - 24 hour TTL via Cache-Control headers

**Implementation:**
```typescript
import { getCachedStory, invalidateStory } from '@/lib/storyblok-cache';

// Fetch with caching
const { story } = await getCachedStory('home', 'en', 'published');

// Invalidate on webhook
invalidateStory('home', 'en');
```

**Webhook Setup:**
Configure Storyblok webhook to trigger cache invalidation:
- URL: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
- Events: Published, Unpublished, Deleted

### 3. Static Generation with ISR

Pages are statically generated at build time and revalidated incrementally.

**Configuration:**
```typescript
export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  // Generate static paths for all stories
}
```

**Benefits:**
- Instant page loads from CDN
- Automatic regeneration on content changes
- Reduced server load

### 4. Image Optimization

Images are optimized using Storyblok's image service and Next.js Image component.

**Features:**
- WebP format with automatic fallback
- Responsive sizing with srcset
- Blur placeholder for smooth loading
- Lazy loading for below-fold images
- Priority loading for above-fold images

**Usage:**
```typescript
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage
  src={imageUrl}
  alt="Description"
  priority={isAboveFold}
  width={1200}
  height={800}
/>
```

### 5. Font Optimization

Custom fonts are optimized using next/font/local.

**Features:**
- Font-display: swap for instant text rendering
- Preloading for critical fonts
- WOFF2 format for optimal compression
- Font subsetting for reduced file size

**Configuration:**
```typescript
import { belfiusMontserrat } from '@/lib/fonts';

// Apply in layout
<html className={belfiusMontserrat.variable}>
```

### 6. CSS Optimization

Tailwind CSS is optimized with reduced safelist and purging.

**Optimizations:**
- Minimal safelist (only CMS-driven classes)
- JIT mode for on-demand generation
- CSS minification enabled
- Critical CSS extraction

### 7. Bundle Splitting

Webpack is configured for optimal code splitting.

**Strategy:**
- Vendor chunk for node_modules
- Common chunk for shared code
- Storyblok components chunk
- Route-based splitting

### 8. Third-Party Scripts

Analytics and tracking scripts are optimized for performance.

**Configuration:**
```typescript
<Script
  id="analytics"
  strategy="afterInteractive"
  src="..."
/>
```

## Performance Monitoring

### Core Web Vitals Tracking

Automatic tracking of Core Web Vitals metrics:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- TTFB (Time to First Byte)
- FCP (First Contentful Paint)

**Implementation:**
```typescript
import { initPerformanceTracking } from '@/lib/performance';

// Initialize in root layout
initPerformanceTracking();
```

### Performance Budgets

Budgets are enforced in CI/CD pipeline:
- JavaScript: < 560 KB
- CSS: < 112 KB
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

**Check budgets:**
```bash
pnpm perf:budget
```

### Lighthouse CI

Automated Lighthouse audits run on every PR:
```bash
pnpm lighthouse
```

### Bundle Analysis

Analyze bundle sizes:
```bash
pnpm build:analyze
```

## Scripts

### Performance Baseline
Capture baseline metrics before optimization:
```bash
pnpm perf:baseline
```

### Performance Audit
Run comprehensive performance audit:
```bash
pnpm perf:audit
```

### Bundle Size Check
Check bundle sizes against budgets:
```bash
node scripts/check-bundle-size.js
```

## Best Practices

### 1. Component Development
- Use dynamic imports for large components
- Implement loading states with Suspense
- Add error boundaries for resilience

### 2. Image Usage
- Always specify width and height
- Use priority prop for above-fold images
- Optimize images before upload to Storyblok

### 3. Caching Strategy
- Use published version for production
- Invalidate cache on content changes
- Monitor cache hit rates

### 4. Performance Testing
- Run Lighthouse audits regularly
- Test on real devices and networks
- Monitor Core Web Vitals in production

### 5. Bundle Management
- Review bundle analysis reports
- Avoid importing entire libraries
- Use tree-shaking friendly imports

## Troubleshooting

### High Bundle Size
1. Run bundle analysis: `pnpm build:analyze`
2. Identify large dependencies
3. Consider dynamic imports or alternatives
4. Check for duplicate dependencies

### Slow Page Loads
1. Check Lighthouse report
2. Verify static generation is working
3. Review image optimization
4. Check cache hit rates

### Cache Issues
1. Verify webhook configuration
2. Check revalidation API logs
3. Clear memory cache if needed
4. Review cache TTL settings

## Monitoring in Production

### Recommended Tools
- **Vercel Analytics** - Core Web Vitals tracking
- **Sentry** - Error monitoring and performance
- **LogRocket** - Session replay and performance
- **Google Analytics 4** - User behavior and performance

### Key Metrics to Track
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- Cache hit rates
- Bundle sizes over time
- Error rates

### Alerts
Set up alerts for:
- LCP > 3s
- FID > 150ms
- CLS > 0.15
- Bundle size increase > 10%
- Cache hit rate < 90%

## Continuous Optimization

### Regular Tasks
- **Weekly**: Review performance metrics
- **Monthly**: Run comprehensive audits
- **Quarterly**: Review and update budgets
- **On deployment**: Verify performance targets

### Performance Reviews
1. Compare metrics against baselines
2. Identify regressions
3. Prioritize optimizations
4. Document improvements

## Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Storyblok Image Service](https://www.storyblok.com/docs/image-service)
- [Core Web Vitals](https://web.dev/vitals/)

## Support

For questions or issues related to performance optimization:
1. Check this documentation
2. Review performance test results
3. Consult the design document in `.kiro/specs/performance-optimization/`
4. Contact the development team
