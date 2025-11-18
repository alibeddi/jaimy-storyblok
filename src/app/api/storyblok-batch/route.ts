import { NextRequest, NextResponse } from 'next/server';
import { getCachedStory } from '@/lib/storyblok-cache';

/**
 * Batch API endpoint for Storyblok requests
 * Accepts multiple story requests and returns them in a single response
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { requests } = body;

    if (!Array.isArray(requests)) {
      return NextResponse.json(
        { error: 'Invalid request format. Expected array of requests.' },
        { status: 400 }
      );
    }

    // Fetch all stories in parallel
    const results = await Promise.allSettled(
      requests.map(async (req: { slug: string; locale: string; version?: 'draft' | 'published' }) => {
        try {
          const { story } = await getCachedStory(
            req.slug,
            req.locale,
            req.version || 'published'
          );
          return {
            slug: req.slug,
            locale: req.locale,
            data: story,
            status: 'success',
          };
        } catch (error) {
          return {
            slug: req.slug,
            locale: req.locale,
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error',
          };
        }
      })
    );

    // Map results
    const responses = results.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return {
        status: 'error',
        error: result.reason?.message || 'Request failed',
      };
    });

    const response = NextResponse.json({ results: responses });
    
    // Cache batch responses for 60 seconds
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30'
    );

    return response;
  } catch (error) {
    console.error('[Batch API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for health check
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: 'storyblok-batch',
    method: 'POST',
  });
}
