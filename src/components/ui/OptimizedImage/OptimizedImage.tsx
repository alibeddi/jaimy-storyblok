"use client";

import Image from 'next/image';
import { useState } from 'react';
import {
  getImageDimensions,
  getOptimizedUrl,
  getBlurDataUrl,
  getResponsiveSizes,
  isStoryblokImage,
} from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
}

/**
 * Optimized image component with automatic Storyblok image service integration
 * Provides blur placeholder, responsive sizing, and format optimization
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  sizes,
  className,
  fill = false,
  width,
  height,
  quality = 80,
  objectFit = 'cover',
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle empty or invalid src
  if (!src) {
    return (
      <div className={`bg-gray-200 ${className || ''}`}>
        <div className="flex items-center justify-center h-full text-gray-400">
          No image
        </div>
      </div>
    );
  }

  // Get dimensions if not provided
  let imgWidth = width;
  let imgHeight = height;

  if (!fill && (!imgWidth || !imgHeight)) {
    const dimensions = getImageDimensions(src);
    imgWidth = imgWidth || dimensions.width;
    imgHeight = imgHeight || dimensions.height;
  }

  // Optimize Storyblok images
  const optimizedSrc = isStoryblokImage(src)
    ? getOptimizedUrl(src, {
        width: imgWidth,
        height: imgHeight,
        quality,
        format: 'webp',
        fit: 'in',
      })
    : src;

  // Generate blur placeholder for Storyblok images
  const blurDataURL = isStoryblokImage(src) ? getBlurDataUrl(src) : undefined;

  // Generate responsive sizes
  const responsiveSizes = sizes || getResponsiveSizes(imgWidth);

  // Handle error state
  if (hasError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-400 text-sm">Failed to load image</div>
      </div>
    );
  }

  // Common image props
  const imageProps = {
    src: optimizedSrc,
    alt,
    className: `${className || ''} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    onLoad: () => {
      setIsLoading(false);
      onLoad?.();
    },
    onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      console.warn("OptimizedImage failed to load:", src);
      const target = e.target as HTMLImageElement;
      
      // Try fallback for Storyblok images before setting error state
      if (src.includes('storyblok.com') && !target.dataset.fallbackAttempted) {
        target.dataset.fallbackAttempted = 'true';
        
        // Use original URL without optimization
        let fallbackSrc = src;
        if (src.includes('/m/')) {
          const parts = src.split('/m/');
          fallbackSrc = parts[0];
        }
        
        target.src = fallbackSrc;
        return; // Don't set error state yet, let the fallback try to load
      }
      
      setHasError(true);
      setIsLoading(false);
    },
    ...(blurDataURL && {
      placeholder: 'blur' as const,
      blurDataURL,
    }),
  };

  // Fill mode (for containers with defined dimensions)
  if (fill) {
    return (
      <Image
        {...imageProps}
        alt={alt}
        fill
        sizes={responsiveSizes}
        style={{ objectFit }}
      />
    );
  }

  // Fixed dimensions mode
  return (
    <Image
      {...imageProps}
      alt={alt}
      width={imgWidth!}
      height={imgHeight!}
      sizes={responsiveSizes}
      priority={priority}
    />
  );
}
