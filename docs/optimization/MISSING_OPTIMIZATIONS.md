# Missing Next.js 15 Optimizations

Based on the advanced optimization checklist, here are the optimizations **NOT YET IMPLEMENTED** in your project:

## 🔴 High Priority - Missing

### 1. SWR / React Query for Data Fetching
**Status:** ❌ Not implemented
- No client-side caching library detected
- Would benefit API calls and reduce redundant requests
- **Action:** Install and configure SWR or TanStack Query

```bash
npm install swr
# or
npm install @tanstack/react-query
```

### 2. API Route Caching Headers
**Status:** ❌ Not implemented
- API routes lack cache-control headers
- No edge caching configured
- **Files to update:**
  - `src/app/api/performance/route.ts`
  - `src/app/api/draft/route.ts`

```typescript
// Example for performance API
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
  return response;
}
```

### 3. Link Prefetching Strategy
**Status:** ❌ Not configured
- No explicit prefetch configuration on Link components
- Missing strategic prefetching for important routes
- **Action:** Add prefetch to critical navigation links

```tsx
<Link href="/important-page" prefetch={true}>
  Important Page
</Link>
```

### 4. Batch API Requests
**Status:** ⚠️ Needs review
- Multiple Storyblok API calls could potentially be batched
- Consider implementing a batch endpoint for related data

### 5. GraphQL Optimization
**Status:** N/A (not using GraphQL)
- Currently using REST API
- Could consider Storyblok's GraphQL API for more efficient queries

## 🟡 Medium Priority - Partially Implemented

### 6. React Performance Optimizations
**Status:** ✅ Partially implemented
- ✅ `React.memo` used in many components
- ✅ `useMemo` extensively used
- ✅ `useCallback` used in several places
- ⚠️ **Missing:** Systematic audit of all components
- **Action:** Review components without memoization:
  - Check `src/components/blok/general/Blog/BlogSmall.tsx`
  - Review form components
  - Audit context providers

### 7. Third-Party Script Optimization
**Status:** ✅ Partially implemented
- ✅ Using `next/script` with `afterInteractive` strategy
- ✅ AnyTrack loaded conditionally
- ⚠️ **Could improve:** Consider `lazyOnload` for non-critical scripts

### 8. Font Loading
**Status:** ✅ Well implemented
- ✅ Using `next/font/local`
- ✅ Font display: optional (prevents CLS)
- ✅ Preload configured
- ✅ Fallback fonts defined
- ✅ Font subsetting via CSS variables

## 🟢 Low Priority - Consider Later

### 9. Edge Runtime for API Routes
**Status:** ❌ Not implemented
- API routes use Node.js runtime
- Could migrate to Edge runtime for faster response times

```typescript
export const runtime = 'edge';
```

### 10. HTTP/2 Server Push
**Status:** ⚠️ Depends on hosting
- Vercel/hosting platform handles this automatically
- No action needed if deployed on modern platform

### 11. Parallel Builds with Turbo/NX
**Status:** ⚠️ Using Turbopack for dev
- ✅ Dev mode uses `--turbopack`
- ❌ Not using Turborepo or NX for monorepo builds
- **Action:** Only needed if project grows to monorepo

### 12. Build Caching
**Status:** ⚠️ Needs verification
- Next.js has built-in caching
- **Action:** Verify `.next/cache` is preserved in CI/CD

### 13. Lightweight State Management
**Status:** ✅ Good
- Using React Context (AnalyticsProvider)
- No heavy state management library
- Appropriate for current needs

## ✅ Already Implemented

### Build & Bundle
- ✅ SWC Minification (Next.js 15 default)
- ✅ Bundle Analyzer configured
- ✅ Tree shaking (lodash imports optimized)
- ✅ Webpack optimization with code splitting
- ✅ Source maps disabled in production

### Rendering
- ✅ Static Generation with ISR (`revalidate: 3600`)
- ✅ `generateStaticParams` for build-time generation
- ✅ Dynamic imports for components (component-registry)
- ✅ Force static export configured

### Images & Assets
- ✅ Next/Image with WebP/AVIF
- ✅ Image optimization configured
- ✅ Quality settings optimized
- ✅ Responsive image sizes

### CSS & Fonts
- ✅ Tailwind JIT with content paths
- ✅ CSS Modules approach
- ✅ Font optimization with next/font
- ✅ Reduced safelist for smaller CSS

### Caching & CDN
- ✅ Storyblok caching layer implemented
- ✅ Memory cache + Next.js cache
- ✅ Revalidation API endpoint
- ✅ Cache tags for granular invalidation

### Monitoring
- ✅ Performance monitoring component
- ✅ Web Vitals tracking
- ✅ Lighthouse CI configured
- ✅ Performance budgets defined

## 📋 Recommended Action Plan

### Phase 1: Quick Wins (1-2 hours)
1. Add cache headers to API routes
2. Add prefetch to critical Link components
3. Review and add React.memo to unmemoized components

### Phase 2: Data Fetching (2-4 hours)
4. Install and configure SWR
5. Implement client-side caching for repeated requests
6. Add loading states and error boundaries

### Phase 3: Advanced (4-8 hours)
7. Consider Edge runtime for API routes
8. Audit and batch related API calls
9. Implement request deduplication

### Phase 4: Infrastructure (ongoing)
10. Verify build caching in CI/CD
11. Monitor bundle size trends
12. Regular performance audits

## 🎯 Expected Impact

| Optimization | Effort | Impact | Priority |
|-------------|--------|--------|----------|
| SWR/React Query | Medium | High | 🔴 High |
| API Caching | Low | Medium | 🔴 High |
| Link Prefetch | Low | Medium | 🔴 High |
| React.memo audit | Medium | Medium | 🟡 Medium |
| Edge Runtime | Low | Low | 🟢 Low |
| Batch Requests | High | Medium | 🟡 Medium |

## 📊 Current Performance Status

Your project already has **excellent** optimization coverage:
- ✅ 70%+ of checklist items implemented
- ✅ Core Web Vitals optimizations in place
- ✅ Advanced caching strategy
- ✅ Image and font optimization
- ✅ Code splitting and lazy loading

The missing items are mostly **nice-to-haves** that would provide incremental improvements rather than dramatic changes.
