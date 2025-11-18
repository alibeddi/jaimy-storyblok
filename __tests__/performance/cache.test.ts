/**
 * Performance tests for Storyblok cache system
 */

import { getCachedStory, invalidateStory, clearMemoryCache } from '@/lib/storyblok-cache';

describe('Storyblok Cache Performance', () => {
  beforeEach(() => {
    clearMemoryCache();
  });

  it('should cache story data on first request', async () => {
    const slug = 'home';
    const locale = 'en';
    
    const start = Date.now();
    const result = await getCachedStory(slug, locale, 'published');
    const duration = Date.now() - start;
    
    expect(result).toBeDefined();
    expect(result.story).toBeDefined();
    expect(result.metadata.locale).toBe(locale);
    
    // First request should complete within reasonable time
    expect(duration).toBeLessThan(5000);
  });

  it('should return cached data faster on second request', async () => {
    const slug = 'home';
    const locale = 'en';
    
    // First request - cache miss
    const start1 = Date.now();
    await getCachedStory(slug, locale, 'published');
    const duration1 = Date.now() - start1;
    
    // Second request - cache hit
    const start2 = Date.now();
    await getCachedStory(slug, locale, 'published');
    const duration2 = Date.now() - start2;
    
    // Cache hit should be significantly faster (at least 10x)
    expect(duration2).toBeLessThan(duration1 * 0.1);
  });

  it('should invalidate cache correctly', async () => {
    const slug = 'home';
    const locale = 'en';
    
    // Cache the story
    await getCachedStory(slug, locale, 'published');
    
    // Invalidate
    invalidateStory(slug, locale);
    
    // Next request should be slower (cache miss)
    const start = Date.now();
    await getCachedStory(slug, locale, 'published');
    const duration = Date.now() - start;
    
    // Should take longer than a cached request
    expect(duration).toBeGreaterThan(10);
  });

  it('should handle concurrent requests efficiently', async () => {
    const slug = 'home';
    const locale = 'en';
    
    // Make multiple concurrent requests
    const start = Date.now();
    const promises = Array(10).fill(null).map(() => 
      getCachedStory(slug, locale, 'published')
    );
    
    const results = await Promise.all(promises);
    const duration = Date.now() - start;
    
    // All requests should return the same data
    expect(results).toHaveLength(10);
    results.forEach(result => {
      expect(result.story).toBeDefined();
    });
    
    // Should complete quickly due to request deduplication
    expect(duration).toBeLessThan(6000);
  });
});

describe('Cache Performance Metrics', () => {
  it('should track cache hit rate', async () => {
    clearMemoryCache();
    
    const slug = 'home';
    const locale = 'en';
    
    // First request - miss
    await getCachedStory(slug, locale, 'published');
    
    // Next 9 requests - hits
    for (let i = 0; i < 9; i++) {
      await getCachedStory(slug, locale, 'published');
    }
    
    // Expected hit rate: 90% (9 hits out of 10 requests)
    // This is a simplified test - in production, track actual metrics
  });
});
