// Custom Storyblok image loader for Next.js
// This ensures Storyblok images load correctly in production

export default function storyblokImageLoader({ src, width, quality = 75 }) {
  // Return original src if no src provided
  if (!src) {
    return '';
  }

  // If the image is already a full URL
  if (src.startsWith('http')) {
    // For Storyblok images, use Storyblok's image service
    if (src.includes('storyblok.com')) {
      try {
        // Parse the URL
        const url = new URL(src);
        
        // Remove any existing image service parameters to avoid conflicts
        const pathParts = url.pathname.split('/');
        
        // Check if URL already has /m/ (image service)
        const mIndex = pathParts.indexOf('m');
        if (mIndex > -1) {
          // Remove everything after /m/ and rebuild
          url.pathname = pathParts.slice(0, mIndex).join('/');
          url.search = '';
        }
        
        // Build new image service URL
        const filters = [];
        
        // Add dimensions - Storyblok uses format: width x height (0 = auto)
        if (width && width > 0) {
          filters.push(`${width}x0`);
        }
        
        // Add filters
        const filterParams = [];
        
        // Add quality filter
        if (quality && quality < 100) {
          filterParams.push(`quality(${quality})`);
        }
        
        // Add format filter for WebP
        filterParams.push('format(webp)');
        
        // Add fit filter for better image optimization
        filterParams.push('fit(in)');
        
        // Combine filters
        if (filterParams.length > 0) {
          filters.push(`filters:${filterParams.join(':')}`);
        }
        
        // Construct final URL
        if (filters.length > 0) {
          url.pathname = `${url.pathname}/m/${filters.join(':')}`;
        }
        
        return url.toString();
        
      } catch (error) {
        console.warn('Failed to parse Storyblok image URL:', src, error);
        // Return original URL as fallback
        return src;
      }
    }
    
    // For non-Storyblok images, return as-is
    return src;
  }

  // For relative URLs, construct the full Storyblok URL
  try {
    const baseUrl = 'https://a.storyblok.com';
    const filters = [];
    
    if (width && width > 0) {
      filters.push(`${width}x0`);
    }
    
    const filterParams = ['quality(' + quality + ')', 'format(webp)', 'fit(in)'];
    filters.push(`filters:${filterParams.join(':')}`);
    
    const finalPath = filters.length > 0 
      ? `${src}/m/${filters.join(':')}`
      : src;
      
    return `${baseUrl}${finalPath}`;
    
  } catch (error) {
    console.warn('Failed to construct Storyblok image URL:', src, error);
    return src;
  }
}