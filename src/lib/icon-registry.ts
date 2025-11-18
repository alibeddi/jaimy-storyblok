/**
 * Icon registry for optimized lucide-react imports
 * Only imports icons that are actually used in the application
 */

import {
  ChevronDown,
  Globe,
  Star,
  Clock,
  // Add more icons as needed
  ArrowRight,
  Check,
  X,
  Menu,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Users,
  Heart,
  Share2,
  ExternalLink,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Circle,
  type LucideIcon,
} from 'lucide-react';

/**
 * Registry of available icons
 * Add icons here as they're needed in the application
 */
export const iconRegistry: Record<string, LucideIcon> = {
  // Navigation
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'arrow-right': ArrowRight,
  'menu': Menu,
  
  // Common
  'globe': Globe,
  'star': Star,
  'clock': Clock,
  'check': Check,
  'x': X,
  'search': Search,
  'plus': Plus,
  'minus': Minus,
  
  // Contact
  'mail': Mail,
  'phone': Phone,
  'map-pin': MapPin,
  
  // User
  'user': User,
  'users': Users,
  'calendar': Calendar,
  
  // Actions
  'heart': Heart,
  'share-2': Share2,
  'external-link': ExternalLink,
  'download': Download,
  'upload': Upload,
  'edit': Edit,
  'trash-2': Trash2,
  
  // Status
  'alert-circle': AlertCircle,
  'info': Info,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'circle': Circle,
  
  // Fallback for "Default" or empty values
  'default': Circle,
  'Default': Circle,
  '': Circle,
  
  // Pascal case aliases (for dynamic loading)
  'ChevronDown': ChevronDown,
  'ChevronUp': ChevronUp,
  'ChevronLeft': ChevronLeft,
  'ChevronRight': ChevronRight,
  'ArrowRight': ArrowRight,
  'Globe': Globe,
  'Star': Star,
  'Clock': Clock,
  'Check': Check,
  'X': X,
  'Menu': Menu,
  'Search': Search,
  'Mail': Mail,
  'Phone': Phone,
  'MapPin': MapPin,
  'Calendar': Calendar,
  'User': User,
  'Users': Users,
  'Heart': Heart,
  'Share2': Share2,
  'ExternalLink': ExternalLink,
  'Download': Download,
  'Upload': Upload,
  'Edit': Edit,
  'Trash2': Trash2,
  'Plus': Plus,
  'Minus': Minus,
  'AlertCircle': AlertCircle,
  'Info': Info,
  'CheckCircle': CheckCircle,
  'XCircle': XCircle,
  'Circle': Circle,
};

/**
 * Get an icon from the registry
 * @param name - Icon name (kebab-case or PascalCase)
 * @returns Icon component or null if not found
 */
export function getIcon(name: string): LucideIcon | null {
  // Handle empty or undefined names
  if (!name || name.trim() === '') {
    return iconRegistry['default'];
  }
  
  // Try direct lookup first
  if (iconRegistry[name]) {
    return iconRegistry[name];
  }
  
  // Try lowercase
  const lowerName = name.toLowerCase();
  if (iconRegistry[lowerName]) {
    return iconRegistry[lowerName];
  }
  
  // Try converting kebab-case to PascalCase
  const pascalCase = name
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  if (iconRegistry[pascalCase]) {
    return iconRegistry[pascalCase];
  }
  
  // Return default icon instead of null to prevent errors
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Icon "${name}" not found in registry. Using default icon. Add it to src/lib/icon-registry.ts`);
  }
  return iconRegistry['default'];
}

/**
 * Check if an icon exists in the registry
 */
export function hasIcon(name: string): boolean {
  return getIcon(name) !== null;
}

/**
 * Get list of all available icons
 */
export function getAvailableIcons(): string[] {
  return Object.keys(iconRegistry);
}
