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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing performance metric:', error);
    return NextResponse.json(
      { error: 'Failed to process metric' },
      { status: 500 }
    );
  }
}
