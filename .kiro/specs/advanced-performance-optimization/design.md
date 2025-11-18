# Advanced Performance Optimization Design Document

## Overview

This design document outlines advanced performance optimization strategies for the Next.js 15 + Storyblok application, building upon the foundational optimizations already implemented. The focus is on achieving production-grade performance with comprehensive bundle optimization, intelligent caching, advanced rendering strategies, and robust monitoring systems.

### Current State Analysis

Based on the existing implementation:
- Component registry with dynamic imports: ✅ Implemented
- Basic ISR configuration: ✅ Implemented  
- Font optimization: ✅ Implemented
- Image optimization utilities: ✅ Implemented
- Cache layer foundation: ✅ Implemented
- Bundle analysis tools: ✅ Implemented

### Performance Goals

- Initial JavaScript bundle: <560KB (30% reduction from 800KB baseline)
- CSS bundle: <112KB (25% reduction from 150KB baseline)
- LCP: <2.5s on 3G connections
- FID: <100ms
- CLS: <0.1
- Build time: <144s (20% reduction from 180s baseline)
- Cache hit rate: >95% for published content
- Lighthouse Performance Score: >90

## Architecture

### System Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                      Client Browser                           │
├──────────────────────────────────────────────────────────────┤
│  • Optimized Bundles (<560KB)                                │
│  • Lazy-loaded Components                                     │
│  • Cached Assets (1 year TTL)                                │
│  • WebP/AVIF Images                                          │
│  • WOFF2 Fonts with swap                                     │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│                   Next.js Edge/Server                         │
├──────────────────────────────────────────────────────────────┤
│  • ISR Pages (1 hour revalidation)                           │
│  • Multi-tier Cache Layer                                    │
│  • Dynamic Component Registry                                │
│  • On-demand Revalidation API                                │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│                    Storyblok CMS API                          │
├──────────────────────────────────────────────────────────────┤
│  • Content Stories                                            │
│  • Image Service                                              │
│  • Webhooks for Invalidation                                 │
└──────────────────────────────────────────────────────────────┘
```


### Rendering Strategy Flow

```
Request → Draft Mode Check → Cache Check → Static/ISR → Response
    │           │                 │            │
    │           ├─ Yes → Dynamic  │            │
    │           │                 │            │
    │           └─ No ────────────┤            │
    │                             │            │
    │                    Hit ─────┴─→ Serve   │
    │                             │            │
    │                    Miss ────┴─→ Generate│
    │                                          │
    └──────────────────────────────────────────┘
```

### Cache Hierarchy

```
L1: Memory Cache (Map)
    ├─ TTL: 5 minutes
    ├─ Scope: Per-process
    └─ Use: Hot data, high-frequency requests

L2: Next.js Cache (unstable_cache)
    ├─ TTL: 1 hour (published), none (draft)
    ├─ Scope: Application-wide
    └─ Use: Story data, metadata

L3: CDN/Browser Cache
    ├─ TTL: 24 hours (content), 1 year (assets)
    ├─ Scope: Global
    └─ Use: Static assets, images, fonts
```

## Components and Interfaces

### 1. Bundle Size Optimization (Requirement 1)

**Current Implementation Status:**
- Component registry: ✅ Exists at `src/lib/component-registry.ts`
- Dynamic imports: ✅ Configured
- StoryblokProvider: ⚠️ Needs optimization (currently imports all components)

**Design Changes Required:**


**A. Remove Duplicate Component Registrations**

Location: `src/app/[locale]/layout.tsx`
- Currently imports all components statically
- Should rely solely on component registry
- Remove all `storyblokInit` component registrations from layout

**B. Optimize StoryblokProvider**

```typescript
// src/components/StoryblokProvider.tsx (optimized)
'use client';

import { storyblokInit } from '@storyblok/react/rsc';
import { Suspense } from 'react';

// Only initialize once, no component imports
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [],
  components: {}, // Empty - use dynamic registry instead
});

export default function StoryblokProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
```

**C. Bundle Analysis Integration**

```typescript
// next.config.ts additions
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... existing config
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `npm.${packageName?.replace('@', '')}`;
            },
            priority: 30,
          },
        },
      };
    }
    return config;
  },
});
```

**D. Performance Budget Enforcement**

```javascript
// scripts/check-bundle-size.js
const fs = require('fs');
const path = require('path');

const BUDGET = {
  maxInitialJS: 560 * 1024, // 560KB
  maxInitialCSS: 112 * 1024, // 112KB
  maxTotalAssets: 2 * 1024 * 1024, // 2MB
};

function checkBundleSize() {
  const buildManifest = require('../.next/build-manifest.json');
  let totalJS = 0;
  
  // Calculate total JS size
  Object.values(buildManifest.pages).forEach(files => {
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join('.next', file);
        const stats = fs.statSync(filePath);
        totalJS += stats.size;
      }
    });
  });
  
  if (totalJS > BUDGET.maxInitialJS) {
    console.error(`❌ Bundle size ${totalJS} exceeds budget ${BUDGET.maxInitialJS}`);
    process.exit(1);
  }
  
  console.log(`✅ Bundle size ${totalJS} within budget`);
}

checkBundleSize();
```


### 2. Rendering Strategy Optimization (Requirement 2)

**Current Implementation:**
- ISR configured: ✅ `revalidate = 3600` in page.tsx
- Force-dynamic removed: ⚠️ Needs verification
- Webhook revalidation: ✅ API route exists

**Design Enhancements:**

**A. Static Generation with ISR**

```typescript
// src/app/[locale]/[...slug]/page.tsx
export const dynamic = 'force-static'; // Ensure static generation
export const revalidate = 3600; // 1 hour ISR

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  
  // Fetch all published stories
  const { data } = await storyblokApi.get('cdn/links', {
    version: 'published',
    per_page: 100,
  });
  
  const paths = Object.values(data.links)
    .filter((link: any) => !link.is_folder && link.is_startpage === false)
    .flatMap((link: any) => {
      const slug = link.slug === 'home' ? [] : link.slug.split('/');
      // Generate for all locales
      return ['en', 'fr', 'nl', 'de'].map(locale => ({
        locale,
        slug,
      }));
    });
  
  return paths;
}

async function getStoryData(slug: string[], locale: string, draftMode: boolean) {
  const version = draftMode ? 'draft' : 'published';
  const resolvedSlug = slug?.length ? slug.join('/') : 'home';
  
  // Use cache for published content
  if (version === 'published') {
    return getCachedStory(resolvedSlug, locale);
  }
  
  // Direct fetch for draft
  return fetchStoryDirect(resolvedSlug, locale, version);
}
```

**B. On-Demand Revalidation Enhancement**

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }
    
    const body = await request.json();
    const { story_id, slug, full_slug, action, space_id } = body;
    
    // Revalidate by tag (more efficient)
    if (story_id) {
      revalidateTag(`story:${story_id}`);
    }
    
    // Revalidate specific paths
    if (full_slug) {
      const locales = ['en', 'fr', 'nl', 'de'];
      locales.forEach(locale => {
        revalidatePath(`/${locale}/${full_slug}`);
      });
    }
    
    // Clear memory cache
    if (slug) {
      invalidateStoryCache(slug);
    }
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: Date.now(),
      story_id,
      slug: full_slug,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
```

**C. Draft Mode Implementation**

```typescript
// src/app/api/draft/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  
  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }
  
  if (!slug) {
    return new Response('Missing slug', { status: 400 });
  }
  
  // Enable draft mode
  draftMode().enable();
  
  // Redirect to the path
  redirect(slug);
}
```


### 3. Image Optimization (Requirement 3)

**Current Implementation:**
- OptimizedImage component: ✅ Exists
- Image utilities: ✅ Exist at `src/lib/image-utils.ts`
- Next.js Image config: ✅ Configured

**Design Enhancements:**

**A. Enhanced Image Component**

```typescript
// src/components/ui/OptimizedImage/OptimizedImage.tsx
import Image from 'next/image';
import { getImageDimensions, getStoryblokImageUrl } from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  className,
  fill = false,
  quality = 80,
}: OptimizedImageProps) {
  // Handle Storyblok images
  if (src.includes('a.storyblok.com')) {
    const { width, height } = getImageDimensions(src);
    
    // Generate optimized URL with Storyblok image service
    const optimizedSrc = getStoryblokImageUrl(src, {
      width: width || 1920,
      height: height,
      quality,
      format: 'webp',
      fit: 'in',
    });
    
    // Generate blur placeholder
    const blurDataURL = getStoryblokImageUrl(src, {
      width: 10,
      quality: 10,
      format: 'webp',
    });
    
    if (fill) {
      return (
        <Image
          src={optimizedSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
          placeholder="blur"
          blurDataURL={blurDataURL}
          quality={quality}
        />
      );
    }
    
    return (
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width || 1920}
        height={height || 1080}
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={className}
        placeholder="blur"
        blurDataURL={blurDataURL}
        quality={quality}
      />
    );
  }
  
  // Handle local images
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
```

**B. Image Utility Enhancements**

```typescript
// src/lib/image-utils.ts additions
export function getStoryblokImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
    fit?: 'in' | 'cover' | 'contain';
    smart?: boolean;
  }
): string {
  if (!src.includes('a.storyblok.com')) return src;
  
  const url = new URL(src);
  const params = new URLSearchParams();
  
  if (options.width) params.set('width', options.width.toString());
  if (options.height) params.set('height', options.height.toString());
  if (options.quality) params.set('quality', options.quality.toString());
  if (options.format) params.set('format', options.format);
  if (options.fit) params.set('fit', options.fit);
  if (options.smart) params.set('smart', 'true');
  
  // Add /m/ for image service
  const pathParts = url.pathname.split('/');
  if (!pathParts.includes('m')) {
    pathParts.splice(3, 0, 'm');
    url.pathname = pathParts.join('/');
  }
  
  url.search = params.toString();
  return url.toString();
}

export function getImageDimensions(src: string): { width: number; height: number } {
  // Try to extract from URL
  const match = src.match(/\/(\d+)x(\d+)\//);
  if (match) {
    return {
      width: parseInt(match[1]),
      height: parseInt(match[2]),
    };
  }
  
  // Default dimensions
  return { width: 1920, height: 1080 };
}
```

**C. Responsive Image Sizes**

```typescript
// Common size configurations
export const IMAGE_SIZES = {
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
  thumbnail: '(max-width: 768px) 50vw, 200px',
  full: '100vw',
};
```


### 4. Font Loading Optimization (Requirement 4)

**Current Implementation:**
- Font configuration: ✅ Exists at `src/lib/fonts.ts`
- Font display: ✅ Set to 'optional'
- Local fonts: ✅ Using localFont

**Design Enhancements:**

**A. Font Subsetting Script**

```bash
# scripts/convert-fonts-to-woff2.sh
#!/bin/bash

# Install fonttools if not present
# pip install fonttools brotli

INPUT_DIR="public/fonts/belfius"
OUTPUT_DIR="public/fonts/belfius-optimized"

mkdir -p "$OUTPUT_DIR"

# Subset fonts for Latin characters only
for font in "$INPUT_DIR"/*.otf; do
  filename=$(basename "$font" .otf)
  
  # Convert to WOFF2 with Latin subset
  pyftsubset "$font" \
    --output-file="$OUTPUT_DIR/$filename.woff2" \
    --flavor=woff2 \
    --layout-features='*' \
    --unicodes="U+0020-007F,U+00A0-00FF,U+0100-017F" \
    --no-hinting
  
  echo "Converted $filename"
done

echo "Font optimization complete!"
```

**B. Optimized Font Configuration**

```typescript
// src/lib/fonts.ts
import localFont from 'next/font/local';

export const BelfiusMontserrat = localFont({
  src: [
    {
      path: '../public/fonts/belfius-optimized/BelfiusMontserrat-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/belfius-optimized/BelfiusMontserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/belfius-optimized/BelfiusMontserrat-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/belfius-optimized/BelfiusMontserrat-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/belfius-optimized/BelfiusMontserrat-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-belfius',
  display: 'swap', // Changed from 'optional' for better UX
  preload: true,
  fallback: ['system-ui', 'arial'],
});
```

**C. Font Preloading in Layout**

```typescript
// src/app/[locale]/layout.tsx
export default function LocaleLayout({ children, params }) {
  return (
    <html lang={params.locale} className={BelfiusMontserrat.variable}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/belfius-optimized/BelfiusMontserrat-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/belfius-optimized/BelfiusMontserrat-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
```


### 5. CSS Optimization (Requirement 5)

**Current Implementation:**
- Tailwind configured: ✅
- Safelist defined: ⚠️ May be too broad
- CSS imports: ⚠️ Need to check for duplicates

**Design Enhancements:**

**A. Optimized Tailwind Configuration**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // Minimize safelist - only truly dynamic classes from CMS
  safelist: [
    // Background colors from CMS
    {
      pattern: /^bg-(red|grey)-(light|dark|gradient)$/,
      variants: ['hover', 'focus'],
    },
    // Text colors from CMS
    {
      pattern: /^text-(red|grey)-(light|dark)$/,
    },
    // Grid columns from CMS (limited range)
    {
      pattern: /^(grid-cols|md:grid-cols|lg:grid-cols)-(1|2|3|4)$/,
    },
    // Gap utilities from CMS
    {
      pattern: /^gap-(2|4|6|8)$/,
    },
  ],
  
  theme: {
    extend: {
      // Only include used custom values
      colors: {
        'red-light': '#FF6B6B',
        'red-dark': '#C92A2A',
        'grey-light': '#F8F9FA',
        'grey-dark': '#343A40',
      },
    },
  },
  
  plugins: [],
  
  // Enable JIT mode optimizations
  mode: 'jit',
};

export default config;
```

**B. Remove Duplicate CSS Imports**

```typescript
// src/app/layout.tsx - Keep only one global CSS import
import './globals.css';

// Remove any duplicate imports from:
// - src/app/[locale]/layout.tsx
// - Component files
```

**C. Critical CSS Extraction**

```typescript
// next.config.ts additions
const nextConfig = {
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['@storyblok/react', 'lucide-react'],
  },
  
  // Minimize CSS in production
  productionBrowserSourceMaps: false,
};
```


### 6. Storyblok Data Caching (Requirement 6)

**Current Implementation:**
- Cache layer: ✅ Exists at `src/lib/storyblok-cache.ts`
- Revalidation API: ✅ Exists

**Design Enhancements:**

**A. Enhanced Multi-Tier Cache**

```typescript
// src/lib/storyblok-cache.ts (enhanced)
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from '@storyblok/react/rsc';

// L1: Memory cache with LRU eviction
class LRUCache<T> {
  private cache = new Map<string, { data: T; expires: number; lastAccess: number }>();
  private maxSize = 100;
  
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    
    if (entry.expires < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }
    
    entry.lastAccess = Date.now();
    return entry.data;
  }
  
  set(key: string, data: T, ttl: number): void {
    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldest = Array.from(this.cache.entries())
        .sort((a, b) => a[1].lastAccess - b[1].lastAccess)[0];
      this.cache.delete(oldest[0]);
    }
    
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
      lastAccess: Date.now(),
    });
  }
  
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  clear(): void {
    this.cache.clear();
  }
}

const memoryCache = new LRUCache<any>();

// Request deduplication
const pendingRequests = new Map<string, Promise<any>>();

export async function getCachedStory(
  slug: string,
  locale: string,
  version: 'draft' | 'published' = 'published'
) {
  const cacheKey = `story:${slug}:${locale}:${version}`;
  
  // L1: Memory cache check
  const cached = memoryCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Request deduplication
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }
  
  // L2: Next.js cache with stale-while-revalidate
  const fetchStory = unstable_cache(
    async () => {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
        version,
        language: locale,
        resolve_links: 'url',
        resolve_relations: [],
        cv: Date.now(), // Cache bust for draft
      });
      return data.story;
    },
    [cacheKey],
    {
      revalidate: version === 'published' ? 3600 : false,
      tags: [`story:${slug}`, `locale:${locale}`, `version:${version}`],
    }
  );
  
  const promise = fetchStory();
  pendingRequests.set(cacheKey, promise);
  
  try {
    const data = await promise;
    
    // Update L1 cache
    const ttl = version === 'published' ? 300000 : 60000; // 5 min / 1 min
    memoryCache.set(cacheKey, data, ttl);
    
    return data;
  } finally {
    pendingRequests.delete(cacheKey);
  }
}

// Batch invalidation
export function invalidateStoryCache(slug: string, locale?: string) {
  const { revalidateTag } = require('next/cache');
  
  // Invalidate by tag
  revalidateTag(`story:${slug}`);
  if (locale) {
    revalidateTag(`locale:${locale}`);
  }
  
  // Clear L1 cache
  memoryCache.clear();
}

// Preload stories for faster navigation
export function preloadStory(slug: string, locale: string) {
  getCachedStory(slug, locale, 'published').catch(() => {
    // Ignore errors in preload
  });
}
```

**B. Cache Warming Strategy**

```typescript
// src/lib/cache-warming.ts
export async function warmCache() {
  const storyblokApi = getStoryblokApi();
  
  // Get all published stories
  const { data } = await storyblokApi.get('cdn/links', {
    version: 'published',
    per_page: 100,
  });
  
  const stories = Object.values(data.links)
    .filter((link: any) => !link.is_folder)
    .slice(0, 20); // Warm top 20 pages
  
  // Preload in parallel
  await Promise.allSettled(
    stories.map((link: any) =>
      getCachedStory(link.slug, 'en', 'published')
    )
  );
}
```


### 7. Component Code Splitting (Requirement 7)

**Current Implementation:**
- Component registry: ✅ Exists with dynamic imports
- React.lazy: ⚠️ Not fully utilized

**Design Enhancements:**

**A. Enhanced Component Registry**

```typescript
// src/lib/component-registry.ts (enhanced)
import { lazy, ComponentType } from 'react';

// Component loading with retry logic
function lazyWithRetry(
  importFn: () => Promise<{ default: ComponentType<any> }>,
  retries = 3
) {
  return lazy(() =>
    importFn().catch((error) => {
      if (retries > 0) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(lazyWithRetry(importFn, retries - 1));
          }, 1000);
        });
      }
      throw error;
    })
  );
}

// Preload hints for common navigation paths
const preloadHints: Record<string, string[]> = {
  'page': ['header', 'footer', 'hero'],
  'blog': ['blog-card', 'author', 'rich-text'],
};

export const componentRegistry = {
  // Service components (high priority)
  page: lazyWithRetry(() => import('@/components/blok/services/Page')),
  header: lazyWithRetry(() => import('@/components/blok/services/Header')),
  footer: lazyWithRetry(() => import('@/components/blok/services/Footer')),
  
  // General components (lazy load)
  hero: lazyWithRetry(() => import('@/components/blok/general/Hero')),
  button: lazyWithRetry(() => import('@/components/blok/general/Button')),
  image: lazyWithRetry(() => import('@/components/blok/general/Image')),
  
  // ... other components
};

// Preload related components
export function preloadComponents(componentName: string) {
  const related = preloadHints[componentName] || [];
  related.forEach((name) => {
    const component = componentRegistry[name];
    if (component) {
      // Trigger preload
      component.preload?.();
    }
  });
}

// Get component with preloading
export function getComponent(name: string) {
  const component = componentRegistry[name];
  if (!component) {
    console.warn(`Component ${name} not found`);
    return null;
  }
  
  // Preload related components
  preloadComponents(name);
  
  return component;
}
```

**B. Route-Based Code Splitting**

```typescript
// src/app/[locale]/[...slug]/page.tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const PerformanceMonitor = dynamic(
  () => import('@/components/PerformanceMonitor'),
  { ssr: false }
);

const StoryblokBridge = dynamic(
  () => import('@/components/StoryblokBridge'),
  { ssr: false }
);
```

**C. Analytics Script Optimization**

```typescript
// src/components/analytics/Anytrack.tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export function Anytrack() {
  return (
    <>
      {/* Load analytics after page interactive */}
      <Script
        id="anytrack"
        src="https://cdn.anytrack.io/anytrack.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Anytrack loaded');
        }}
      />
    </>
  );
}
```


### 8. Third-Party Script Optimization (Requirement 8)

**Current Implementation:**
- Next.js Script component: ⚠️ Needs verification
- Analytics loading: ⚠️ May be blocking

**Design:**

**A. Script Loading Strategy**

```typescript
// src/app/[locale]/layout.tsx
import Script from 'next/script';
import { Anytrack } from '@/components/analytics/Anytrack';

export default function LocaleLayout({ children, params }) {
  const isDraft = params.searchParams?._storyblok;
  
  return (
    <html lang={params.locale}>
      <body>
        {children}
        
        {/* Analytics - afterInteractive */}
        {!isDraft && <Anytrack />}
        
        {/* Storyblok Bridge - only in preview */}
        {isDraft && (
          <Script
            src="https://app.storyblok.com/f/storyblok-v2-latest.js"
            strategy="lazyOnload"
          />
        )}
        
        {/* Performance monitoring - worker */}
        <Script
          id="web-vitals"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    // Send to analytics
                    fetch('/api/performance', {
                      method: 'POST',
                      body: JSON.stringify({
                        name: entry.name,
                        value: entry.value,
                        rating: entry.rating,
                      }),
                    });
                  }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
```

**B. Script Performance Budget**

```typescript
// scripts/check-third-party-impact.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function checkThirdPartyImpact() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
  };
  
  const runnerResult = await lighthouse('http://localhost:3000', options);
  
  // Check third-party impact
  const thirdPartyImpact = runnerResult.lhr.audits['third-party-summary'];
  const totalBlockingTime = thirdPartyImpact.details.items.reduce(
    (sum, item) => sum + item.blockingTime,
    0
  );
  
  if (totalBlockingTime > 500) {
    console.error(`❌ Third-party scripts blocking time: ${totalBlockingTime}ms (max: 500ms)`);
    process.exit(1);
  }
  
  console.log(`✅ Third-party impact within budget: ${totalBlockingTime}ms`);
  
  await chrome.kill();
}

checkThirdPartyImpact();
```


### 9. Performance Monitoring (Requirement 9)

**Current Implementation:**
- Performance API: ✅ Exists at `src/app/api/performance/route.ts`
- Performance lib: ✅ Exists at `src/lib/performance.ts`

**Design Enhancements:**

**A. Core Web Vitals Tracking**

```typescript
// src/lib/performance.ts (enhanced)
export interface WebVitalsMetric {
  id: string;
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

export function reportWebVitals(metric: WebVitalsMetric) {
  // Send to analytics endpoint
  if (typeof window !== 'undefined') {
    const body = JSON.stringify({
      ...metric,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    });
    
    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/performance', body);
    } else {
      fetch('/api/performance', {
        method: 'POST',
        body,
        keepalive: true,
      });
    }
  }
}

// Client-side monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;
  
  // Import web-vitals dynamically
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);
  });
}
```

**B. Performance Dashboard API**

```typescript
// src/app/api/performance/dashboard/route.ts
import { NextResponse } from 'next/server';

// In-memory storage (use database in production)
const metrics: WebVitalsMetric[] = [];

export async function GET() {
  // Calculate aggregates
  const aggregates = {
    lcp: calculatePercentile(metrics.filter(m => m.name === 'LCP'), 75),
    fid: calculatePercentile(metrics.filter(m => m.name === 'FID'), 75),
    cls: calculatePercentile(metrics.filter(m => m.name === 'CLS'), 75),
    fcp: calculatePercentile(metrics.filter(m => m.name === 'FCP'), 75),
    ttfb: calculatePercentile(metrics.filter(m => m.name === 'TTFB'), 75),
  };
  
  return NextResponse.json({
    aggregates,
    totalSamples: metrics.length,
    timestamp: Date.now(),
  });
}

function calculatePercentile(values: WebVitalsMetric[], percentile: number) {
  if (values.length === 0) return 0;
  
  const sorted = values.map(v => v.value).sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[index];
}
```

**C. Build-Time Performance Reports**

```javascript
// scripts/performance-baseline.js (enhanced)
const fs = require('fs');
const path = require('path');

function generatePerformanceReport() {
  const buildManifest = require('../.next/build-manifest.json');
  const stats = {
    timestamp: new Date().toISOString(),
    routes: {},
    totals: {
      js: 0,
      css: 0,
    },
  };
  
  // Analyze each route
  Object.entries(buildManifest.pages).forEach(([route, files]) => {
    const routeStats = { js: 0, css: 0, files: [] };
    
    files.forEach(file => {
      const filePath = path.join('.next', file);
      if (fs.existsSync(filePath)) {
        const size = fs.statSync(filePath).size;
        const ext = path.extname(file).slice(1);
        
        if (ext === 'js') {
          routeStats.js += size;
          stats.totals.js += size;
        } else if (ext === 'css') {
          routeStats.css += size;
          stats.totals.css += size;
        }
        
        routeStats.files.push({ file, size, ext });
      }
    });
    
    stats.routes[route] = routeStats;
  });
  
  // Check against budgets
  const budgets = {
    maxInitialJS: 560 * 1024,
    maxInitialCSS: 112 * 1024,
  };
  
  const violations = [];
  if (stats.totals.js > budgets.maxInitialJS) {
    violations.push(`JS bundle ${(stats.totals.js / 1024).toFixed(0)}KB exceeds ${budgets.maxInitialJS / 1024}KB`);
  }
  if (stats.totals.css > budgets.maxInitialCSS) {
    violations.push(`CSS bundle ${(stats.totals.css / 1024).toFixed(0)}KB exceeds ${budgets.maxInitialCSS / 1024}KB`);
  }
  
  // Write report
  fs.writeFileSync(
    '.performance-results.json',
    JSON.stringify(stats, null, 2)
  );
  
  // Generate markdown report
  const markdown = `# Performance Report

Generated: ${stats.timestamp}

## Bundle Sizes

- **JavaScript**: ${(stats.totals.js / 1024).toFixed(2)} KB
- **CSS**: ${(stats.totals.css / 1024).toFixed(2)} KB

## Budget Status

${violations.length === 0 ? '✅ All budgets met' : '❌ Budget violations:\n' + violations.map(v => `- ${v}`).join('\n')}

## Route Breakdown

${Object.entries(stats.routes)
  .map(([route, data]) => `### ${route}\n- JS: ${(data.js / 1024).toFixed(2)} KB\n- CSS: ${(data.css / 1024).toFixed(2)} KB`)
  .join('\n\n')}
`;
  
  fs.writeFileSync('performance-report.md', markdown);
  
  console.log('Performance report generated');
  
  if (violations.length > 0) {
    console.error('❌ Performance budget violations detected');
    process.exit(1);
  }
}

generatePerformanceReport();
```

**D. CI/CD Integration**

```yaml
# .github/workflows/performance.yml
name: Performance Check

on: [pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Check bundle size
        run: node scripts/check-bundle-size.js
      
      - name: Generate performance report
        run: node scripts/performance-baseline.js
      
      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: performance-report
          path: performance-report.md
```


### 10. Build Process Optimization (Requirement 10)

**Current Implementation:**
- Next.js 15: ✅ Using latest
- SWC compiler: ✅ Default in Next.js 15

**Design Enhancements:**

**A. Incremental Build Configuration**

```typescript
// next.config.ts (build optimizations)
const nextConfig = {
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  
  // Optimize build output
  output: 'standalone',
  
  // Enable experimental features
  experimental: {
    // Incremental cache
    incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
    
    // Optimize CSS
    optimizeCss: true,
    
    // Optimize package imports
    optimizePackageImports: [
      '@storyblok/react',
      'lucide-react',
      'date-fns',
    ],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // Production optimizations
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            
            // Framework chunk
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              enforce: true,
            },
            
            // Storyblok chunk
            storyblok: {
              name: 'storyblok',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@storyblok[\\/]/,
              priority: 35,
              enforce: true,
            },
            
            // Common libraries
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                return `npm.${packageName?.replace('@', '')}`;
              },
              priority: 30,
              minChunks: 2,
              reuseExistingChunk: true,
            },
            
            // Shared components
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Compress output
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

**B. Custom Cache Handler**

```javascript
// cache-handler.js
const { CacheHandler } = require('@neshca/cache-handler');
const createLruHandler = require('@neshca/cache-handler/local-lru').default;
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = CacheHandler({
  handlers: [
    createLruHandler({
      maxItemsNumber: 10000,
      maxItemSizeBytes: 1024 * 1024 * 500, // 500MB
    }),
  ],
});
```

**C. Parallel Build Script**

```bash
# scripts/optimize-build.sh (enhanced)
#!/bin/bash

set -e

echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit

echo "🔍 Analyzing dependencies..."
npx depcheck --ignores="@types/*,eslint-*,prettier"

echo "🏗️  Building application..."
ANALYZE=false npm run build

echo "📊 Generating performance baseline..."
node scripts/performance-baseline.js

echo "📈 Checking bundle sizes..."
node scripts/check-bundle-size.js

echo "✅ Build optimization complete!"

# Display summary
echo ""
echo "=== Build Summary ==="
du -sh .next
echo ""
echo "JavaScript bundles:"
du -sh .next/static/chunks/*.js | sort -h | tail -10
echo ""
echo "CSS bundles:"
du -sh .next/static/css/*.css 2>/dev/null || echo "No CSS files"
```

**D. Build Performance Monitoring**

```javascript
// scripts/measure-build-time.js
const { performance } = require('perf_hooks');
const { spawn } = require('child_process');
const fs = require('fs');

async function measureBuildTime() {
  const startTime = performance.now();
  
  return new Promise((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
    });
    
    build.on('close', (code) => {
      const endTime = performance.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      
      const result = {
        timestamp: new Date().toISOString(),
        duration: parseFloat(duration),
        success: code === 0,
      };
      
      // Save to history
      const historyFile = '.build-history.json';
      let history = [];
      if (fs.existsSync(historyFile)) {
        history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
      }
      history.push(result);
      
      // Keep last 50 builds
      if (history.length > 50) {
        history = history.slice(-50);
      }
      
      fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
      
      console.log(`\n⏱️  Build completed in ${duration}s`);
      
      // Check against budget
      const budget = 144; // seconds
      if (result.duration > budget) {
        console.error(`❌ Build time ${duration}s exceeds budget ${budget}s`);
        process.exit(1);
      }
      
      console.log(`✅ Build time within budget`);
      
      if (code === 0) {
        resolve(result);
      } else {
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
}

measureBuildTime();
```


## Data Models

### Performance Metrics Model

```typescript
// src/types/performance.ts
export interface WebVitalsMetric {
  id: string;
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
  url: string;
  userAgent: string;
  timestamp: number;
}

export interface BundleMetrics {
  timestamp: string;
  routes: Record<string, RouteMetrics>;
  totals: {
    js: number;
    css: number;
  };
}

export interface RouteMetrics {
  js: number;
  css: number;
  files: Array<{
    file: string;
    size: number;
    ext: string;
  }>;
}

export interface BuildMetrics {
  timestamp: string;
  duration: number;
  success: boolean;
  bundleSize: number;
  pageCount: number;
}
```

### Cache Entry Model

```typescript
// src/types/cache.ts
export interface CacheEntry<T> {
  key: string;
  data: T;
  expires: number;
  lastAccess: number;
  tags: string[];
  version: 'draft' | 'published';
}

export interface StoryCache {
  story: ISbStoryData;
  metadata: {
    cachedAt: number;
    locale: string;
    version: string;
    slug: string;
  };
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  size: number;
  evictions: number;
}
```

## Error Handling

### Cache Fallback Strategy

```typescript
// src/lib/storyblok-cache.ts
export async function getCachedStoryWithFallback(
  slug: string,
  locale: string,
  version: 'draft' | 'published' = 'published'
) {
  try {
    // Try cache first
    return await getCachedStory(slug, locale, version);
  } catch (cacheError) {
    console.error('Cache error:', cacheError);
    
    // Fallback to direct API call
    try {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
        version,
        language: locale,
        fallback_lang: 'en',
      });
      return data.story;
    } catch (apiError) {
      console.error('API error:', apiError);
      
      // Last resort: return cached stale data if available
      const staleData = memoryCache.get(`story:${slug}:${locale}:${version}`);
      if (staleData) {
        console.warn('Serving stale cache data');
        return staleData;
      }
      
      throw new Error(`Failed to fetch story: ${slug}`);
    }
  }
}
```

### Component Loading Error Boundary

```typescript
// src/components/ui/ErrorBoundary/ComponentErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Component error:', {
      component: this.props.componentName,
      error,
      errorInfo,
    });
    
    // Send to monitoring service
    if (typeof window !== 'undefined') {
      fetch('/api/errors', {
        method: 'POST',
        body: JSON.stringify({
          component: this.props.componentName,
          error: error.message,
          stack: error.stack,
          timestamp: Date.now(),
        }),
      }).catch(() => {
        // Ignore errors in error reporting
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800">
              Component failed to load: {this.props.componentName}
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### Build Error Handling

```javascript
// scripts/safe-build.js
const { spawn } = require('child_process');

async function safeBuild() {
  let retries = 3;
  
  while (retries > 0) {
    try {
      await runBuild();
      console.log('✅ Build successful');
      return;
    } catch (error) {
      retries--;
      console.error(`❌ Build failed: ${error.message}`);
      
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts remaining)`);
        // Clean and retry
        await cleanBuild();
      } else {
        console.error('❌ Build failed after all retries');
        process.exit(1);
      }
    }
  }
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
    build.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build exited with code ${code}`));
    });
  });
}

function cleanBuild() {
  return new Promise((resolve) => {
    const clean = spawn('rm', ['-rf', '.next'], { stdio: 'inherit' });
    clean.on('close', () => resolve());
  });
}

safeBuild();
```


## Testing Strategy

### 1. Performance Testing

**A. Lighthouse CI Integration**

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/about',
        'http://localhost:3000/en/blog',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-input-delay': ['error', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // Bundle sizes
        'total-byte-weight': ['warn', { maxNumericValue: 1024000 }], // 1MB
        'mainthread-work-breakdown': ['warn', { maxNumericValue: 4000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

**B. Bundle Size Tests**

```typescript
// __tests__/performance/bundle-size.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Bundle Size', () => {
  it('should not exceed JavaScript budget', () => {
    const buildManifest = JSON.parse(
      fs.readFileSync('.next/build-manifest.json', 'utf8')
    );
    
    let totalJS = 0;
    Object.values(buildManifest.pages).forEach((files: any) => {
      files.forEach((file: string) => {
        if (file.endsWith('.js')) {
          const filePath = path.join('.next', file);
          if (fs.existsSync(filePath)) {
            totalJS += fs.statSync(filePath).size;
          }
        }
      });
    });
    
    const budgetKB = 560;
    const actualKB = totalJS / 1024;
    
    expect(actualKB).toBeLessThan(budgetKB);
  });
  
  it('should not exceed CSS budget', () => {
    const cssDir = '.next/static/css';
    if (!fs.existsSync(cssDir)) return;
    
    let totalCSS = 0;
    fs.readdirSync(cssDir).forEach(file => {
      if (file.endsWith('.css')) {
        totalCSS += fs.statSync(path.join(cssDir, file)).size;
      }
    });
    
    const budgetKB = 112;
    const actualKB = totalCSS / 1024;
    
    expect(actualKB).toBeLessThan(budgetKB);
  });
});
```

**C. Cache Performance Tests**

```typescript
// __tests__/performance/cache.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { getCachedStory, invalidateStoryCache } from '@/lib/storyblok-cache';

describe('Storyblok Cache', () => {
  beforeEach(() => {
    // Clear cache before each test
    invalidateStoryCache('test-page');
  });
  
  it('should cache story data', async () => {
    const slug = 'test-page';
    const locale = 'en';
    
    // First request - cache miss
    const start1 = performance.now();
    const story1 = await getCachedStory(slug, locale, 'published');
    const duration1 = performance.now() - start1;
    
    // Second request - cache hit
    const start2 = performance.now();
    const story2 = await getCachedStory(slug, locale, 'published');
    const duration2 = performance.now() - start2;
    
    // Verify same data
    expect(story1).toEqual(story2);
    
    // Cache hit should be significantly faster (at least 50% faster)
    expect(duration2).toBeLessThan(duration1 * 0.5);
  });
  
  it('should invalidate cache on demand', async () => {
    const slug = 'test-page';
    const locale = 'en';
    
    // Cache the story
    await getCachedStory(slug, locale, 'published');
    
    // Invalidate
    invalidateStoryCache(slug);
    
    // Next request should be slower (cache miss)
    const start = performance.now();
    await getCachedStory(slug, locale, 'published');
    const duration = performance.now() - start;
    
    // Should take longer than cached request
    expect(duration).toBeGreaterThan(10);
  });
  
  it('should achieve >95% cache hit rate', async () => {
    const slug = 'test-page';
    const locale = 'en';
    const iterations = 100;
    
    // Warm cache
    await getCachedStory(slug, locale, 'published');
    
    // Measure cache hits
    let cacheHits = 0;
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await getCachedStory(slug, locale, 'published');
      const duration = performance.now() - start;
      
      // If request is fast, it's a cache hit
      if (duration < 10) cacheHits++;
    }
    
    const hitRate = (cacheHits / iterations) * 100;
    expect(hitRate).toBeGreaterThan(95);
  });
});
```

**D. Rendering Strategy Tests**

```typescript
// __tests__/performance/rendering.test.ts
import { describe, it, expect } from 'vitest';

describe('Page Rendering', () => {
  it('should serve static pages for published content', async () => {
    const response = await fetch('http://localhost:3000/en/test-page');
    const headers = response.headers;
    
    // Verify static generation
    expect(headers.get('x-nextjs-cache')).toBe('HIT');
  });
  
  it('should use ISR for published pages', async () => {
    const response = await fetch('http://localhost:3000/en/test-page');
    
    // Check for ISR headers
    const cacheControl = response.headers.get('cache-control');
    expect(cacheControl).toContain('s-maxage=3600');
    expect(cacheControl).toContain('stale-while-revalidate');
  });
  
  it('should use dynamic rendering in draft mode', async () => {
    const response = await fetch('http://localhost:3000/en/test-page?_storyblok=123');
    const headers = response.headers;
    
    // Verify dynamic rendering
    expect(headers.get('x-nextjs-cache')).toBeNull();
  });
});
```

### 2. Integration Testing

```typescript
// __tests__/integration/optimization.test.ts
import { describe, it, expect } from 'vitest';
import { chromium } from 'playwright';

describe('Performance Integration', () => {
  it('should load page within performance budget', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Navigate and measure
    const start = Date.now();
    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    
    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    await browser.close();
  });
  
  it('should have acceptable CLS', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.goto('http://localhost:3000/en');
    
    // Measure CLS
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 5000);
      });
    });
    
    expect(cls).toBeLessThan(0.1);
    
    await browser.close();
  });
});
```


## Implementation Phases

### Phase 1: Foundation & Analysis (Days 1-2)

**Goals:**
- Establish baseline metrics
- Set up monitoring infrastructure
- Configure build analysis tools

**Tasks:**
- Install and configure bundle analyzer
- Set up Lighthouse CI
- Create performance baseline script
- Document current metrics
- Set up CI/CD performance checks

**Deliverables:**
- Baseline performance report
- Bundle analysis reports
- Performance monitoring dashboard
- CI/CD pipeline with performance gates

### Phase 2: Bundle Optimization (Days 3-5)

**Goals:**
- Reduce JavaScript bundle by 30%
- Implement dynamic component loading
- Remove duplicate imports

**Tasks:**
- Optimize StoryblokProvider (remove static imports)
- Enhance component registry with preloading
- Configure webpack code splitting
- Implement performance budgets
- Add bundle size tests

**Deliverables:**
- Optimized component loading
- Reduced bundle sizes
- Bundle size enforcement in CI
- Performance budget configuration

### Phase 3: Rendering Strategy (Days 6-8)

**Goals:**
- Implement ISR for all pages
- Set up on-demand revalidation
- Optimize draft mode

**Tasks:**
- Configure static generation with ISR
- Implement generateStaticParams for all routes
- Enhance revalidation API
- Set up Storyblok webhooks
- Add draft mode optimization

**Deliverables:**
- ISR-enabled pages
- Webhook-based revalidation
- Optimized draft preview
- Rendering strategy tests

### Phase 4: Asset Optimization (Days 9-11)

**Goals:**
- Optimize images with proper sizing
- Reduce font loading time
- Minimize CSS bundle

**Tasks:**
- Enhance OptimizedImage component
- Implement font subsetting
- Optimize Tailwind configuration
- Add responsive image sizes
- Preload critical fonts

**Deliverables:**
- Optimized image loading
- Reduced font files (WOFF2 only)
- Minimized CSS bundle
- Asset optimization tests

### Phase 5: Caching Layer (Days 12-14)

**Goals:**
- Implement multi-tier caching
- Achieve >95% cache hit rate
- Add cache warming

**Tasks:**
- Enhance cache layer with LRU eviction
- Implement request deduplication
- Add cache warming on build
- Optimize cache invalidation
- Add cache performance monitoring

**Deliverables:**
- Multi-tier cache system
- Cache warming strategy
- Cache performance metrics
- Cache tests

### Phase 6: Code Splitting (Days 15-16)

**Goals:**
- Implement route-based splitting
- Optimize third-party scripts
- Add component preloading

**Tasks:**
- Add retry logic to component loading
- Implement component preloading hints
- Optimize analytics script loading
- Add loading error boundaries
- Configure script loading strategies

**Deliverables:**
- Enhanced code splitting
- Optimized script loading
- Component preloading
- Error boundaries

### Phase 7: Monitoring & Testing (Days 17-19)

**Goals:**
- Set up comprehensive monitoring
- Add performance tests
- Create performance dashboard

**Tasks:**
- Implement Core Web Vitals tracking
- Add performance API endpoints
- Create performance dashboard
- Write performance tests
- Set up alerting

**Deliverables:**
- Web Vitals monitoring
- Performance dashboard
- Comprehensive test suite
- Alerting system

### Phase 8: Build Optimization (Days 20-21)

**Goals:**
- Reduce build time by 20%
- Implement incremental builds
- Add build caching

**Tasks:**
- Configure incremental cache handler
- Optimize webpack configuration
- Add parallel build tasks
- Implement build time monitoring
- Create build optimization scripts

**Deliverables:**
- Faster build times
- Build time monitoring
- Optimized build scripts
- Build performance tests

### Phase 9: Documentation & Handoff (Days 22-23)

**Goals:**
- Document all optimizations
- Create maintenance guide
- Train team

**Tasks:**
- Write optimization documentation
- Create troubleshooting guide
- Document monitoring procedures
- Create performance checklist
- Conduct team training

**Deliverables:**
- Complete documentation
- Maintenance guide
- Performance checklist
- Team training materials

## Performance Targets

### Baseline (Before Optimization)

```
JavaScript Bundle:    800 KB
CSS Bundle:          150 KB
LCP (3G):            4.5s
FID:                 250ms
CLS:                 0.25
Build Time:          180s
Cache Hit Rate:      N/A
Lighthouse Score:    68%
```

### Target (After Optimization)

```
JavaScript Bundle:    <560 KB  (30% reduction)
CSS Bundle:          <112 KB  (25% reduction)
LCP (3G):            <2.5s    (44% improvement)
FID:                 <100ms   (60% improvement)
CLS:                 <0.1     (60% improvement)
Build Time:          <144s    (20% reduction)
Cache Hit Rate:      >95%
Lighthouse Score:    >90%
```

### Success Criteria

- ✅ All performance budgets met
- ✅ Core Web Vitals in "Good" range
- ✅ Lighthouse Performance score >90
- ✅ Build time <144 seconds
- ✅ Cache hit rate >95%
- ✅ No performance regressions in CI
- ✅ All tests passing


## Monitoring and Maintenance

### Continuous Monitoring

**1. Real-Time Metrics**

```typescript
// Dashboard metrics to track
const metrics = {
  // Core Web Vitals (75th percentile)
  lcp: { target: 2500, warning: 3000, critical: 4000 },
  fid: { target: 100, warning: 200, critical: 300 },
  cls: { target: 0.1, warning: 0.15, critical: 0.25 },
  
  // Bundle Sizes
  jsBundle: { target: 560, warning: 600, critical: 700 }, // KB
  cssBundle: { target: 112, warning: 125, critical: 150 }, // KB
  
  // Cache Performance
  cacheHitRate: { target: 95, warning: 90, critical: 85 }, // %
  
  // Build Performance
  buildTime: { target: 144, warning: 160, critical: 180 }, // seconds
};
```

**2. Alerting Rules**

```yaml
# alerts.yml
alerts:
  - name: LCP Degradation
    condition: lcp_p75 > 3000
    severity: warning
    message: "LCP exceeds 3s threshold"
    
  - name: Bundle Size Exceeded
    condition: js_bundle_size > 600000
    severity: critical
    message: "JavaScript bundle exceeds 600KB"
    
  - name: Cache Hit Rate Low
    condition: cache_hit_rate < 90
    severity: warning
    message: "Cache hit rate below 90%"
    
  - name: Build Time Exceeded
    condition: build_duration > 160
    severity: warning
    message: "Build time exceeds 160 seconds"
```

**3. Performance Dashboard**

```typescript
// src/app/admin/performance/page.tsx
export default async function PerformanceDashboard() {
  const metrics = await getPerformanceMetrics();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Performance Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Core Web Vitals */}
        <MetricCard
          title="LCP"
          value={metrics.lcp}
          target={2500}
          unit="ms"
          trend={metrics.lcpTrend}
        />
        <MetricCard
          title="FID"
          value={metrics.fid}
          target={100}
          unit="ms"
          trend={metrics.fidTrend}
        />
        <MetricCard
          title="CLS"
          value={metrics.cls}
          target={0.1}
          unit=""
          trend={metrics.clsTrend}
        />
        
        {/* Bundle Sizes */}
        <MetricCard
          title="JS Bundle"
          value={metrics.jsBundle}
          target={560}
          unit="KB"
          trend={metrics.jsBundleTrend}
        />
        <MetricCard
          title="CSS Bundle"
          value={metrics.cssBundle}
          target={112}
          unit="KB"
          trend={metrics.cssBundleTrend}
        />
        
        {/* Cache Performance */}
        <MetricCard
          title="Cache Hit Rate"
          value={metrics.cacheHitRate}
          target={95}
          unit="%"
          trend={metrics.cacheHitRateTrend}
        />
      </div>
      
      {/* Historical Charts */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Historical Trends</h2>
        <PerformanceChart data={metrics.historical} />
      </div>
    </div>
  );
}
```

### Maintenance Procedures

**1. Weekly Performance Review**

- Review Core Web Vitals trends
- Check bundle size changes
- Analyze cache hit rates
- Review build times
- Identify performance regressions

**2. Monthly Optimization Audit**

- Run full Lighthouse audit
- Review bundle composition
- Analyze unused code
- Check for dependency updates
- Review caching strategies

**3. Quarterly Deep Dive**

- Comprehensive performance analysis
- Review and update performance budgets
- Evaluate new optimization techniques
- Update monitoring dashboards
- Team performance training

### Troubleshooting Guide

**Issue: Bundle Size Increased**

```bash
# 1. Analyze bundle
npm run build:analyze

# 2. Check for new dependencies
npm ls --depth=0

# 3. Find large modules
npx webpack-bundle-analyzer .next/analyze/client.json

# 4. Review recent changes
git diff HEAD~10 package.json
```

**Issue: Cache Hit Rate Dropped**

```bash
# 1. Check cache configuration
cat src/lib/storyblok-cache.ts

# 2. Review invalidation logs
grep "invalidate" logs/app.log

# 3. Check memory usage
node --expose-gc scripts/check-memory.js

# 4. Verify cache warming
npm run cache:warm
```

**Issue: LCP Increased**

```bash
# 1. Run Lighthouse
npm run lighthouse

# 2. Check image optimization
npm run check:images

# 3. Verify font loading
npm run check:fonts

# 4. Review critical CSS
npm run check:critical-css
```

**Issue: Build Time Increased**

```bash
# 1. Measure build time
npm run build:measure

# 2. Check cache status
ls -la .next/cache

# 3. Clear and rebuild
npm run build:clean

# 4. Review build logs
cat .next/build.log
```

### Performance Checklist

**Before Each Release:**

- [ ] Run bundle analysis
- [ ] Check performance budgets
- [ ] Run Lighthouse audit
- [ ] Verify cache hit rate >95%
- [ ] Test Core Web Vitals
- [ ] Review build time
- [ ] Check for console errors
- [ ] Verify image optimization
- [ ] Test on 3G connection
- [ ] Validate ISR configuration

**After Each Release:**

- [ ] Monitor Core Web Vitals for 24h
- [ ] Check error rates
- [ ] Verify cache invalidation
- [ ] Review performance metrics
- [ ] Check bundle sizes in production
- [ ] Validate CDN caching
- [ ] Test draft mode
- [ ] Verify webhook revalidation

## Dependencies

### Required Packages

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "@storyblok/react": "^3.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^15.0.0",
    "lighthouse": "^11.0.0",
    "chrome-launcher": "^1.0.0",
    "web-vitals": "^3.5.0",
    "playwright": "^1.40.0",
    "vitest": "^1.0.0"
  }
}
```

### Installation

```bash
# Install performance tools
npm install --save-dev @next/bundle-analyzer lighthouse chrome-launcher web-vitals playwright vitest

# Install cache handler (optional)
npm install --save-dev @neshca/cache-handler

# Install font tools (for subsetting)
pip install fonttools brotli
```

## Conclusion

This design document provides a comprehensive approach to optimizing the Next.js 15 + Storyblok application for production-grade performance. The implementation follows a phased approach over 23 days, with clear goals, deliverables, and success criteria for each phase.

Key optimization areas:
1. **Bundle Optimization**: 30% reduction through dynamic imports and code splitting
2. **Rendering Strategy**: ISR with on-demand revalidation for optimal performance
3. **Asset Optimization**: Optimized images, fonts, and CSS for faster loading
4. **Caching Layer**: Multi-tier caching with >95% hit rate
5. **Code Splitting**: Route-based and component-based splitting
6. **Monitoring**: Comprehensive tracking of Core Web Vitals and bundle sizes
7. **Build Optimization**: 20% faster builds through incremental caching

The design maintains full compatibility with Storyblok CMS while significantly improving user experience through faster load times, better Core Web Vitals, and reduced bundle sizes.

