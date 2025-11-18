/**
 * Image optimization utilities for Storyblok images
 * Provides helpers for generating optimized image URLs and extracting dimensions
 */

interface ImageDimensions {
  width: number;
  height: number;
}

interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  fit?: 'in' | 'out' | 'fill';
  smart?: boolean;
}

/**
 * Extract dimensions from Storyblok image URL
 * Storyblok URLs contain dimensions in the format: /WIDTHxHEIGHT/
 */
export function getImageDimensions(src: string): ImageDimensions {
  // Try to extract dimensions from URL
  const dimensionMatch = src.match(/\/(\d+)x(\d+)\//);
  
  if (dimensionMatch) {
    return {
      width: parseInt(dimensionMatch[1], 10),
      height: parseInt(dimensionMatch[2], 10),
    };
  }
  
  // Default dimensions if not found
  return {
    width: 1200,
    height: 800,
  };
}

/**
 * Generate optimized Storyblok image service URL
 * Storyblok Image Service: https://www.storyblok.com/docs/image-service
 * 
 * @param src - Original image URL
 * @param options - Optimization options
 * @returns Optimized image URL
 */
export function getOptimizedUrl(src: string, options: OptimizeOptions = {}): string {
  // Return original if not a Storyblok image
  if (!src || !src.includes('a.storyblok.com')) {
    return src;
  }
  
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'in',
    smart = false,
  } = options;
  
  // Get original dimensions to prevent upscaling
  const originalDimensions = getImageDimensions(src);
  
  // Prevent requesting sizes larger than original to avoid 400 errors
  let requestWidth = width;
  let requestHeight = height;
  
  if (requestWidth && requestWidth > originalDimensions.width) {
    requestWidth = originalDimensions.width;
  }
  
  if (requestHeight && requestHeight > originalDimensions.height) {
    requestHeight = originalDimensions.height;
  }
  
  // Build image service URL
  // Format: https://a.storyblok.com/f/{space_id}/{path}/m/{filters}
  
  // Check if URL already has /m/ (image service)
  const hasImageService = src.includes('/m/');
  
  let baseUrl = src;
  const filters: string[] = [];
  
  if (hasImageService) {
    // Extract base URL and existing filters
    const parts = src.split('/m/');
    baseUrl = parts[0];
    // We'll override with new filters
  }
  
  // Add filters
  if (requestWidth && requestHeight) {
    filters.push(`${requestWidth}x${requestHeight}`);
  } else if (requestWidth) {
    filters.push(`${requestWidth}x0`);
  } else if (requestHeight) {
    filters.push(`0x${requestHeight}`);
  }
  
  // Add fit mode
  if (fit && (requestWidth || requestHeight)) {
    filters.push(`filters:fit(${fit})`);
  }
  
  // Add quality
  if (quality && quality !== 100) {
    filters.push(`filters:quality(${quality})`);
  }
  
  // Add format
  if (format && format !== 'auto') {
    filters.push(`filters:format(${format})`);
  }
  
  // Add smart cropping
  if (smart) {
    filters.push('filters:focal()');
  }
  
  // Construct final URL
  if (filters.length > 0) {
    return `${baseUrl}/m/${filters.join(':')}`;
  }
  
  return src;
}

/**
 * Generate blur placeholder data URL
 * Creates a tiny, low-quality version for blur-up effect
 */
export function getBlurDataUrl(src: string): string {
  return getOptimizedUrl(src, {
    width: 10,
    quality: 10,
    format: 'webp',
  });
}

/**
 * Generate responsive image sizes attribute
 * Based on common breakpoints
 */
export function getResponsiveSizes(maxWidth?: number): string {
  if (maxWidth) {
    return `(max-width: 640px) 100vw, (max-width: 1024px) ${maxWidth}px, ${maxWidth}px`;
  }
  
  return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(src: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  // Get original dimensions to filter out sizes larger than original
  const originalDimensions = getImageDimensions(src);
  
  // Filter widths to only include those smaller than or equal to original
  const validWidths = widths.filter(w => w <= originalDimensions.width);
  
  // If no valid widths, use original width
  if (validWidths.length === 0) {
    validWidths.push(originalDimensions.width);
  }
  
  return validWidths
    .map((width) => {
      const url = getOptimizedUrl(src, { width, format: 'webp', quality: 80 });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Check if image is from Storyblok
 */
export function isStoryblokImage(src: string): boolean {
  return src.includes('a.storyblok.com') || src.includes('img2.storyblok.com') || src.includes('img.storyblok.com');
}

/**
 * Get optimal image format based on browser support
 * Note: This is a server-side helper, actual format negotiation happens via Accept header
 */
export function getOptimalFormat(): 'webp' | 'jpeg' {
  // WebP is supported by 95%+ of browsers
  // For older browsers, Storyblok will automatically fall back to JPEG
  return 'webp';
}

/**
 * Calculate aspect ratio from dimensions
 */
export function getAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Get dimensions for a specific aspect ratio
 */
export function getDimensionsForAspectRatio(
  aspectRatio: number,
  maxWidth: number
): ImageDimensions {
  return {
    width: maxWidth,
    height: Math.round(maxWidth / aspectRatio),
  };
}
