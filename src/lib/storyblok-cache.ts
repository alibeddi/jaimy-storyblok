/**
 * Multi-tier caching system for Storyblok API responses
 * Implements memory cache + Next.js cache for optimal performance
 */

import { unstable_cache, revalidateTag } from 'next/cache';
import { getStoryblokApi } from '@storyblok/react/rsc';
import type { ISbStoryData } from '@storyblok/react';

interface CacheEntry<T = unknown> {
  data: T;
  expires: number;
  tags: string[];
}

interface StoryCache {
  story: ISbStoryData;
  metadata: {
    cachedAt: number;
    locale: string;
    version: string;
  };
}

/**
 * Memory cache for hot data (L1 cache)
 * TTL: 5 minutes for published, 1 minute for draft
 */
const memoryCache = new Map<string, CacheEntry>();

/**
 * Cache configuration
 */
const CACHE_CONFIG = {
  memory: {
    published: 5 * 60 * 1000, // 5 minutes
    draft: 1 * 60 * 1000, // 1 minute
  },
  nextjs: {
    published: 3600, // 1 hour
    draft: false, // No caching for draft
  },
};

/**
 * Generate cache key for a story
 */
function getCacheKey(slug: string, locale: string, version: 'draft' | 'published'): string {
  return `story:${slug}:${locale}:${version}`;
}

/**
 * Generate cache tags for invalidation
 */
function getCacheTags(slug: string, locale: string): string[] {
  return [
    `story:${slug}`,
    `locale:${locale}`,
    `story:${slug}:${locale}`,
  ];
}

/**
 * Get story from memory cache (L1)
 */
function getFromMemoryCache<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  
  if (!cached) {
    return null;
  }
  
  // Check if expired
  if (cached.expires < Date.now()) {
    memoryCache.delete(key);
    return null;
  }
  
  return cached.data as T;
}

/**
 * Set story in memory cache (L1)
 */
function setInMemoryCache<T>(
  key: string,
  data: T,
  ttl: number,
  tags: string[]
): void {
  memoryCache.set(key, {
    data,
    expires: Date.now() + ttl,
    tags,
  });
}

/**
 * Clear memory cache entries by tag
 */
function clearMemoryCacheByTag(tag: string): void {
  for (const [key, entry] of memoryCache.entries()) {
    if (entry.tags.includes(tag)) {
      memoryCache.delete(key);
    }
  }
}

/**
 * Get cached story with multi-tier caching
 * @param slug - Story slug
 * @param locale - Language locale
 * @param version - 'draft' or 'published'
 * @returns Story data
 */
export async function getCachedStory(
  slug: string,
  locale: string,
  version: 'draft' | 'published' = 'published'
): Promise<StoryCache> {
  const cacheKey = getCacheKey(slug, locale, version);
  const cacheTags = getCacheTags(slug, locale);
  
  // L1: Check memory cache
  const memoryCached = getFromMemoryCache<StoryCache>(cacheKey);
  if (memoryCached) {
    return memoryCached;
  }
  
  // L2: Use Next.js cache with tags for invalidation
  const fetchStory = unstable_cache(
    async () => {
      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
          version,
          language: locale,
          fallback_lang: 'en',
        });
        
        const storyCache: StoryCache = {
          story: data.story,
          metadata: {
            cachedAt: Date.now(),
            locale,
            version,
          },
        };
        
        return storyCache;
      } catch (error) {
        console.error(`[Cache] Error fetching story ${slug}:`, error);
        throw error;
      }
    },
    [cacheKey],
    {
      revalidate: (version === 'published' ? CACHE_CONFIG.nextjs.published : CACHE_CONFIG.nextjs.draft) as number | false | undefined,
      tags: cacheTags,
    }
  );
  
  const data = await fetchStory();
  
  // Update memory cache
  const memoryTTL = version === 'published' 
    ? CACHE_CONFIG.memory.published 
    : CACHE_CONFIG.memory.draft;
    
  setInMemoryCache(cacheKey, data, memoryTTL, cacheTags);
  
  return data;
}

/**
 * Invalidate cache for a specific story
 * @param slug - Story slug
 * @param locale - Optional locale (invalidates all locales if not provided)
 */
export function invalidateStory(slug: string, locale?: string): void {
  const tag = locale ? `story:${slug}:${locale}` : `story:${slug}`;
  
  // Invalidate Next.js cache
  revalidateTag(tag);
  
  // Clear memory cache
  clearMemoryCacheByTag(tag);
  
  console.log(`[Cache] Invalidated story: ${slug}${locale ? ` (${locale})` : ''}`);
}

/**
 * Invalidate cache for a specific locale
 * @param locale - Language locale
 */
export function invalidateLocale(locale: string): void {
  const tag = `locale:${locale}`;
  
  // Invalidate Next.js cache
  revalidateTag(tag);
  
  // Clear memory cache
  clearMemoryCacheByTag(tag);
  
  console.log(`[Cache] Invalidated locale: ${locale}`);
}

/**
 * Clear all memory cache
 */
export function clearMemoryCache(): void {
  memoryCache.clear();
  console.log('[Cache] Memory cache cleared');
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    memorySize: memoryCache.size,
    entries: Array.from(memoryCache.keys()),
  };
}

/**
 * Preload story into cache
 * @param slug - Story slug
 * @param locale - Language locale
 * @param version - 'draft' or 'published'
 */
export async function preloadStory(
  slug: string,
  locale: string,
  version: 'draft' | 'published' = 'published'
): Promise<void> {
  try {
    await getCachedStory(slug, locale, version);
    console.log(`[Cache] Preloaded story: ${slug} (${locale})`);
  } catch (error) {
    console.error(`[Cache] Error preloading story ${slug}:`, error);
  }
}

/**
 * Batch preload multiple stories
 * @param stories - Array of {slug, locale, version}
 */
export async function preloadStories(
  stories: Array<{ slug: string; locale: string; version?: 'draft' | 'published' }>
): Promise<void> {
  await Promise.all(
    stories.map(({ slug, locale, version = 'published' }) =>
      preloadStory(slug, locale, version)
    )
  );
}
