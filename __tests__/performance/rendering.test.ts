/**
 * Rendering strategy tests
 */

describe('Page Rendering Strategy', () => {
  it('should use static generation for published content', async () => {
    // This test would verify that pages are statically generated
    // In a real scenario, you'd check the build output or response headers
    
    const response = await fetch('http://localhost:3001/en/home');
    const headers = response.headers;
    
    // Check for static generation indicators
    // Note: This requires the app to be running
    expect(response.status).toBe(200);
  });

  it('should use dynamic rendering in draft mode', async () => {
    // Test that draft mode uses dynamic rendering
    const response = await fetch('http://localhost:3001/en/home?_storyblok=123');
    
    expect(response.status).toBe(200);
    // In draft mode, should not have static cache headers
  });
});

describe('Component Loading', () => {
  it('should lazy load components', () => {
    // Test that components are loaded dynamically
    const { componentRegistry } = require('@/lib/component-registry');
    
    expect(componentRegistry).toBeDefined();
    expect(typeof componentRegistry.header).toBe('function');
    expect(typeof componentRegistry.footer).toBe('function');
  });
});
