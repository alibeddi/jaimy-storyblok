// Custom Storyblok image loader for Next.js
// This ensures Storyblok images load correctly in production

export default function storyblokImageLoader({ src, width, quality }) {
  // If the image is already a full URL, use it as-is
  if (src.startsWith('http')) {
    // For Storyblok images, add optimization parameters
    if (src.includes('storyblok.com')) {
      const url = new URL(src);
      
      // Add Storyblok image service parameters
      if (width) {
        url.searchParams.set('m', `${width}x0`);
      }
      
      if (quality) {
        url.searchParams.set('quality', quality.toString());
      }
      
      // Add format optimization
      url.searchParams.set('format', 'webp');
      
      return url.toString();
    }
    
    return src;
  }

  // For relative URLs, construct the full Storyblok URL
  const baseUrl = 'https://a.storyblok.com';
  const params = new URLSearchParams();
  
  if (width) {
    params.set('m', `${width}x0`);
  }
  
  if (quality) {
    params.set('quality', quality.toString());
  }
  
  params.set('format', 'webp');
  
  const queryString = params.toString();
  return `${baseUrl}${src}${queryString ? `?${queryString}` : ''}`;
}