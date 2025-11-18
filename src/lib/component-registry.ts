/**
 * Dynamic component registry for lazy loading Storyblok components
 * This reduces the initial bundle size by loading components on demand
 */

import { lazy, ComponentType } from 'react';

// Type for component loader function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentLoader = () => Promise<{ default: ComponentType<any> }>;

/**
 * Component registry with dynamic imports
 * Each component is loaded only when needed
 */
export const componentRegistry: Record<string, ComponentLoader> = {
  // Service components
  page: () => import('@/components/blok/services/Page'),
  header: () => import('@/components/blok/services/Header'),
  footer: () => import('@/components/blok/services/Footer'),
  blogs: () => import('@/components/blok/services/Blogs'),
  reviews: () => import('@/components/blok/services/Reviews'),
  social_proof: () => import('@/components/blok/services/SocialProof'),
  faq: () => import('@/components/blok/services/FAQ'),
  features: () => import('@/components/blok/services/Features'),
  slider: () => import('@/components/blok/services/Slider'),
  body: () => import('@/components/blok/services/Slider'),

  // General components
  banner: () => import('@/components/blok/general/Banner'),
  blog: () => import('@/components/blok/general/Blog'),
  button: () => import('@/components/blok/general/Button'),
  button_group: () => import('@/components/blok/general/ButtonGroup'),
  'category-section': () => import('@/components/blok/general/CategorySection'),
  category_section: () => import('@/components/blok/general/CategorySection'),
  column: () => import('@/components/blok/general/Column'),
  columns: () => import('@/components/blok/general/Columns'),
  container: () => import('@/components/blok/general/Container'),
  divider: () => import('@/components/blok/general/Divider'),
  heading: () => import('@/components/blok/general/Heading'),
  iframe: () => import('@/components/blok/general/Iframe'),
  iframe_component: () => import('@/components/blok/general/Iframe'),
  image: () => import('@/components/blok/general/Image'),
  review: () => import('@/components/blok/general/Review'),
  rich_text: () => import('@/components/blok/general/RichText'),
  row: () => import('@/components/blok/general/Row'),
  stars: () => import('@/components/blok/general/Stars'),
  step: () => import('@/components/blok/general/Step'),
  steps: () => import('@/components/blok/general/Steps'),
  teaser: () => import('@/components/blok/general/Teaser'),
  trust_badge: () => import('@/components/blok/general/TrustBadge'),
  trust_badges: () => import('@/components/blok/general/TrustBadge'),
  who_we_are_section: () => import('@/components/blok/general/WhoWeAreSection'),

  // Form components
  form: () => import('@/components/blok/general/form'),
  form_step: () => import('@/components/blok/general/form-step'),
  form_fieldset: () => import('@/components/blok/general/form-fieldset'),
  form_group: () => import('@/components/blok/general/form-group'),
  input_field: () => import('@/components/blok/general/input-field'),

  // Additional components
  accordion: () => import('@/components/blok/general/Accordion'),
  accordion_item: () => import('@/components/blok/general/AccordionItem'),
  author: () => import('@/components/blok/general/Author'),
  blog_overview: () => import('@/components/blok/general/BlogOverview'),
  grid: () => import('@/components/blok/general/Grid'),
  hr: () => import('@/components/blok/general/Hr'),
  list: () => import('@/components/blok/general/List'),
  list_item: () => import('@/components/blok/general/ListItem'),
  review_stars: () => import('@/components/blok/general/ReviewStars'),
  table: () => import('@/components/blok/general/Table'),
  table_column: () => import('@/components/blok/general/TableColumn'),
  table_header: () => import('@/components/blok/general/TableHeader'),
  table_row: () => import('@/components/blok/general/TableRow'),
};

/**
 * Cache for loaded components to avoid re-importing
 */
const componentCache = new Map<string, ComponentType<unknown>>();

/**
 * Load a component dynamically with error handling and caching
 * @param componentName - The name of the component to load
 * @returns Lazy-loaded React component or null if not found
 */
export function loadComponent(componentName: string): ComponentType<unknown> | null {
  // Check cache first
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName)!;
  }

  const loader = componentRegistry[componentName];
  
  if (!loader) {
    console.warn(`[Component Registry] Component "${componentName}" not found in registry`);
    return null;
  }

  // Create lazy component with error boundary
  const LazyComponent = lazy(async () => {
    try {
      const loadedModule = await loader();
      return loadedModule;
    } catch (error) {
      console.error(`[Component Registry] Error loading component "${componentName}":`, error);
      // Return a fallback component
      return {
        default: () => null,
      };
    }
  });

  // Cache the lazy component
  componentCache.set(componentName, LazyComponent);

  return LazyComponent;
}

/**
 * Preload a component to improve perceived performance
 * @param componentName - The name of the component to preload
 */
export function preloadComponent(componentName: string): void {
  const loader = componentRegistry[componentName];
  
  if (loader) {
    // Trigger the import without waiting for it
    loader().catch((error) => {
      console.error(`[Component Registry] Error preloading component "${componentName}":`, error);
    });
  }
}

/**
 * Preload multiple components
 * @param componentNames - Array of component names to preload
 */
export function preloadComponents(componentNames: string[]): void {
  componentNames.forEach(preloadComponent);
}

/**
 * Get list of all registered component names
 */
export function getRegisteredComponents(): string[] {
  return Object.keys(componentRegistry);
}

/**
 * Check if a component is registered
 */
export function isComponentRegistered(componentName: string): boolean {
  return componentName in componentRegistry;
}
