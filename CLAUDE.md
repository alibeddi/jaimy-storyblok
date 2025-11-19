# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a high-performance, multilingual Next.js 15 application integrated with Storyblok CMS. The project is optimized for performance with dynamic component loading, multi-tier caching, and static generation with ISR.

**Tech Stack:**
- Next.js 15 (App Router)
- Storyblok CMS
- Tailwind CSS v4
- next-intl (i18n)
- pnpm package manager
- TypeScript

**Supported Locales:** en, fr, nl, de (default: fr)

## Development Commands

```bash
# Development
pnpm dev                # Start dev server on port 3000
pnpm dev:https          # Start dev server with HTTPS on port 3001 (required for Storyblok bridge)

# Building
pnpm build              # Production build
pnpm build:analyze      # Build with bundle analysis
pnpm start              # Start production server on port 3001

# Linting & Type Generation
pnpm lint               # Run ESLint
pnpm generate-types     # Generate TypeScript types from Storyblok schemas
pnpm generate-components # Generate component files from Storyblok schemas

# Performance
pnpm perf:baseline      # Capture performance baseline metrics
pnpm perf:audit         # Run comprehensive performance audit
pnpm perf:budget        # Check performance budgets
pnpm perf:check         # Check bundle sizes
pnpm lighthouse         # Run Lighthouse CI

# Testing
# Note: No test framework is currently configured
```

## Critical Architecture Patterns

### 1. Dynamic Component Loading System

**Location:** `src/lib/component-registry.ts`

All Storyblok components are loaded dynamically to reduce initial bundle size. This is a critical performance optimization.

**How it works:**
- `componentRegistry` maps component names to dynamic imports
- `loadComponent(name)` loads components on-demand with retry logic
- Components are cached in `componentCache` to avoid re-imports
- Related components are preloaded based on `preloadHints`

**When adding new Storyblok components:**
1. Create the component in `src/components/blok/`
2. Register it in `componentRegistry` with a dynamic import:
   ```typescript
   'my-component': () => import('@/components/blok/general/MyComponent')
   ```
3. The component will automatically be available in Storyblok

**Important:** Never import blok components directly with static imports - always use the registry system.

### 2. Multi-Tier Caching System

**Location:** `src/lib/storyblok-cache.ts`

Three-tier caching hierarchy for Storyblok API responses:
- **L1: Memory Cache** - 5 min TTL (published), 1 min (draft)
- **L2: Next.js Cache** - 1 hour TTL with tag-based invalidation
- **L3: CDN Cache** - Via Cache-Control headers

**Key functions:**
- `getCachedStory(slug, locale, version)` - Fetch story with multi-tier caching
- `invalidateStory(slug, locale?)` - Invalidate specific story cache
- `invalidateLocale(locale)` - Invalidate all stories for a locale
- `clearMemoryCache()` - Clear L1 cache

**Cache invalidation endpoint:** `src/app/api/revalidate/route.ts`
- POST: Handles Storyblok webhooks
- GET: Manual cache invalidation

### 3. Storyblok Bridge & Preview Mode

**Location:** `src/components/StoryblokProvider.tsx`

Complex client-side bridge for live preview editing in Storyblok Visual Editor.

**Important behaviors:**
- Only activates in development OR with `_storyblok_tk` query param
- Requires HTTPS (use `pnpm dev:https`)
- Listens to `input`, `change`, `published` events from Storyblok
- Validates message origins for security
- Has retry and polling logic for reliability

**When debugging preview issues:**
- Check browser console for origin validation warnings
- Ensure HTTPS is enabled
- Verify `NEXT_PUBLIC_STORYBLOK_API_TOKEN` is set
- Confirm Storyblok preview URL is configured to HTTPS endpoint

### 4. Internationalization (i18n)

**Location:** `src/i18n/`

- `config.ts` - Locale configuration (en, fr, nl, de)
- `request.ts` - next-intl request config
- `messages/` - Translation JSON files

**Locale routing:** `src/app/[locale]/` - All routes are prefixed with locale
**Middleware:** `src/middleware.ts` - Handles locale detection and routing

### 5. Performance Optimization Strategy

**Webpack Configuration:** `next.config.ts`
- Custom bundle splitting for framework, storyblok, lib, vendor, common, and blok components
- CSS optimization enabled
- Package imports optimized for @storyblok/react and lucide-react
- Source maps disabled in production

**Performance Budgets:** (from README)
- JavaScript: < 560 KB
- CSS: < 112 KB
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

**Scripts for monitoring:**
- `scripts/performance-baseline.js` - Capture baseline metrics
- `scripts/check-performance-budget.js` - Validate budgets
- `scripts/performance-audit.sh` - Run comprehensive audit

## Important File Locations

```
src/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── [...slug]/page.tsx # Dynamic story pages
│   │   └── layout.tsx         # Locale-specific layout
│   └── api/
│       ├── revalidate/        # Cache invalidation webhook
│       ├── draft/             # Draft mode endpoint
│       └── storyblok-batch/   # Batch story fetching
├── components/
│   ├── blok/                  # Storyblok components (dynamically loaded)
│   │   ├── services/          # Service-level components (Page, Header, Footer)
│   │   └── general/           # General components (Button, Image, etc.)
│   ├── ui/                    # Reusable UI components
│   └── StoryblokProvider.tsx  # Storyblok bridge and preview logic
├── lib/
│   ├── component-registry.ts  # Dynamic component loading system
│   ├── storyblok-cache.ts     # Multi-tier caching system
│   ├── fonts.ts               # Custom Belfius font configuration
│   ├── image-utils.ts         # Image optimization utilities
│   └── performance.ts         # Performance tracking utilities
├── i18n/
│   ├── config.ts              # i18n configuration
│   ├── request.ts             # next-intl request config
│   └── messages/              # Translation files (en.json, fr.json, nl.json, de.json)
└── types/
    ├── storyblok.ts           # Storyblok type definitions
    └── i18n.ts                # i18n type definitions
```

## Common Development Workflows

### Adding a New Storyblok Component

1. Create component file in `src/components/blok/general/` or `src/components/blok/services/`
2. Register in `src/lib/component-registry.ts`:
   ```typescript
   'component-name': () => import('@/components/blok/general/ComponentName')
   ```
3. Component will be automatically available in Storyblok

### Testing Live Preview

1. Start dev server with HTTPS: `pnpm dev:https`
2. Configure Storyblok preview URL to `https://localhost:3001`
3. Open Visual Editor in Storyblok
4. Changes should appear in real-time

### Cache Invalidation

**Via webhook (automatic):**
- Configure Storyblok webhook: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
- Cache automatically invalidates on publish/unpublish/delete

**Manual invalidation:**
```bash
# Invalidate specific story
curl "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&slug=home&locale=en"

# Invalidate all cache
curl "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&clearAll=true"
```

### Performance Auditing

After making changes that could affect performance:
```bash
pnpm build
pnpm perf:audit       # Run full audit
pnpm perf:budget      # Check if within budgets
pnpm lighthouse       # Run Lighthouse CI
```

### Adding Translations

1. Add keys to all locale files in `src/i18n/messages/`
2. Use in components: `useTranslations()` hook from next-intl
3. Ensure all supported locales (en, fr, nl, de) are updated

## Important Notes

### Environment Variables

Required:
- `NEXT_PUBLIC_STORYBLOK_API_TOKEN` - Storyblok API token
- `REVALIDATION_SECRET` - Secret for cache invalidation webhook

Optional:
- `NEXT_PUBLIC_ANYTRACK_ID` - Analytics tracking ID

### Performance Considerations

- **Always** use dynamic imports for Storyblok components via the registry
- Avoid importing large dependencies in server components
- Use `priority` prop on images above the fold
- Test changes with `pnpm build:analyze` to check bundle impact
- Keep performance budgets in mind when adding dependencies

### Storyblok Integration

- Region is set to "eu" in both server and client configs
- Bridge only activates in dev or with preview token (security)
- Components use kebab-case names (e.g., `button-group`, `category-section`)
- Some components have multiple registry entries for naming variations

### Git Workflow

Current branch: `fix/optimization`
No main branch configured - check with team for PR workflow

### Known Patterns

- Custom Belfius fonts loaded via `src/lib/fonts.ts`
- Analytics via Anytrack (optional)
- Performance monitoring via `PerformanceMonitor` component
- SWR for client-side data fetching (configured via `SWRProvider`)
- Formik for form handling in Storyblok forms

## Troubleshooting

### Storyblok Preview Not Working

1. Verify HTTPS is enabled: `pnpm dev:https`
2. Check browser console for origin validation errors
3. Confirm `NEXT_PUBLIC_STORYBLOK_API_TOKEN` is set
4. Ensure preview URL in Storyblok is `https://localhost:3001`

### Performance Regression

1. Run `pnpm build:analyze` to identify large bundles
2. Check if new dependencies are tree-shakeable
3. Verify dynamic imports are being used for components
4. Run `pnpm perf:budget` to see which budgets are exceeded

### Cache Not Invalidating

1. Verify `REVALIDATION_SECRET` matches webhook secret
2. Check webhook logs in Storyblok settings
3. Inspect server logs for revalidation endpoint
4. Test manual invalidation via GET endpoint

### Build Errors

1. Check TypeScript errors: `pnpm lint`
2. Regenerate types: `pnpm generate-types`
3. Clear `.next` cache and rebuild
4. Verify all environment variables are set
