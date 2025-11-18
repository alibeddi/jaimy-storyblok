import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint for collecting performance metrics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log metrics (in production, send to analytics service)
    console.log('[Performance Metric]', {
      name: body.name,
      value: body.value,
      rating: body.rating,
      route: body.route,
      timestamp: body.timestamp,
    });

    // In production, you would send this to your analytics service:
    // await sendToAnalyticsService(body);

    const response = NextResponse.json({ success: true });
    
    // Cache successful responses for 60 seconds with stale-while-revalidate
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30'
    );
    
    return response;
  } catch (error) {
    console.error('Error processing performance metric:', error);
    return NextResponse.json(
      { error: 'Failed to process metric' },
      { status: 500 }
    );
  }
}
