import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { invalidateStory, invalidateLocale, clearMemoryCache } from '@/lib/storyblok-cache';

/**
 * API endpoint for cache revalidation triggered by Storyblok webhooks
 * 
 * Webhook URL: https://yourdomain.com/api/revalidate?secret=YOUR_SECRET
 * 
 * Storyblok webhook payload:
 * {
 *   "text": "Story published",
 *   "action": "published",
 *   "space_id": 12345,
 *   "story_id": 67890,
 *   "full_slug": "home",
 *   "lang": "default"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Validate webhook secret
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (!secret || secret !== process.env.REVALIDATION_SECRET) {
      console.error('[Revalidate] Invalid or missing secret');
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const body = await request.json();
    const { action, full_slug, story_id, lang } = body;

    console.log('[Revalidate] Webhook received:', {
      action,
      full_slug,
      story_id,
      lang,
    });

    // Handle different actions
    switch (action) {
      case 'published':
      case 'unpublished':
        if (full_slug) {
          // Invalidate specific story
          invalidateStory(full_slug, lang);
          
          // Revalidate the path
          const paths = [
            `/${lang || 'en'}/${full_slug}`,
            `/${lang || 'en'}`,
          ];
          
          for (const path of paths) {
            try {
              revalidatePath(path);
              console.log(`[Revalidate] Path revalidated: ${path}`);
            } catch (error) {
              console.error(`[Revalidate] Error revalidating path ${path}:`, error);
            }
          }
        }
        break;

      case 'deleted':
        if (full_slug) {
          // Invalidate deleted story
          invalidateStory(full_slug, lang);
        }
        break;

      case 'moved':
        // Clear all cache on move to be safe
        clearMemoryCache();
        revalidateTag('story');
        console.log('[Revalidate] Cache cleared due to story move');
        break;

      default:
        console.log(`[Revalidate] Unhandled action: ${action}`);
    }

    return NextResponse.json({
      revalidated: true,
      action,
      slug: full_slug,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('[Revalidate] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for manual cache invalidation
 * Usage: /api/revalidate?secret=YOUR_SECRET&slug=home&locale=en
 */
export async function GET(request: NextRequest) {
  try {
    // Validate secret
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (!secret || secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    const slug = request.nextUrl.searchParams.get('slug');
    const locale = request.nextUrl.searchParams.get('locale');
    const clearAll = request.nextUrl.searchParams.get('clearAll') === 'true';

    if (clearAll) {
      // Clear all cache
      clearMemoryCache();
      revalidateTag('story');
      console.log('[Revalidate] All cache cleared');
      
      return NextResponse.json({
        revalidated: true,
        action: 'clearAll',
        timestamp: Date.now(),
      });
    }

    if (slug) {
      // Invalidate specific story
      invalidateStory(slug, locale || undefined);
      
      // Revalidate path
      const path = `/${locale || 'en'}/${slug}`;
      revalidatePath(path);
      
      console.log(`[Revalidate] Manual revalidation: ${path}`);
      
      return NextResponse.json({
        revalidated: true,
        slug,
        locale,
        path,
        timestamp: Date.now(),
      });
    }

    if (locale) {
      // Invalidate locale
      invalidateLocale(locale);
      revalidatePath(`/${locale}`);
      
      console.log(`[Revalidate] Locale revalidated: ${locale}`);
      
      return NextResponse.json({
        revalidated: true,
        locale,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(
      { error: 'Missing slug or locale parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Revalidate] Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
