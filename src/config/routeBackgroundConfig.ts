import backgroundImage from "../assets/images/background.webp";
import backgroundMobileImage from "../assets/images/background_mobile.png";
import { isMobile } from "../utils/mobileDetection";

/**
 * Centralized route background configuration
 * Single source of truth for all route-to-background mappings
 */

export interface RouteBackgroundConfig {
  type: 'image' | 'none';
  desktop?: string;
  mobile?: string;
}

// Route background mapping - single source of truth
const ROUTE_BACKGROUNDS: Record<string, RouteBackgroundConfig> = {
  '/': { type: 'none' }, // Home page - no background
  '/about': { type: 'none' }, // About page - handled by ThreeBackground or solid black
  '/projects': {
    type: 'image',
    desktop: backgroundImage,
    mobile: backgroundMobileImage
  },
  '/contact': {
    type: 'image',
    desktop: backgroundImage,
    mobile: backgroundMobileImage
  },
  '/showreel': {
    type: 'image',
    desktop: backgroundImage,
    mobile: backgroundMobileImage
  },
  '/legal': {
    type: 'image',
    desktop: backgroundImage,
    mobile: backgroundMobileImage
  },
};

/**
 * Get background configuration for a route
 * @param route - The route path (e.g., '/projects')
 * @returns Background image URL or empty string for no background
 */
export const getBackgroundForRoute = (route: string): string => {
  // Handle dynamic routes (e.g., /projects/some-project)
  const matchedRoute = findMatchingRoute(route);
  const config = ROUTE_BACKGROUNDS[matchedRoute];

  if (!config || config.type === 'none') {
    return '';
  }

  if (config.type === 'image') {
    return isMobile() ? (config.mobile || '') : (config.desktop || '');
  }

  return '';
};

/**
 * Find the best matching route configuration for a given path
 * Handles dynamic routes by finding the most specific match
 */
function findMatchingRoute(route: string): string {
  // Exact match first
  if (ROUTE_BACKGROUNDS[route]) {
    return route;
  }

  // Handle project detail routes: /projects/some-id -> return route as-is to get 'none' type
  // This ensures project detail pages have solid black background instead of image
  if (route.startsWith('/projects/')) {
    return route; // Will not find a match, returns undefined, which results in 'none' type
  }

  // Default fallback
  return route;
}

/**
 * Check if a route should have a background
 * @param route - The route path
 * @returns true if route needs a background
 */
export const shouldRouteHaveBackground = (route: string): boolean => {
  return getBackgroundForRoute(route) !== '';
};

/**
 * Get all routes that use backgrounds (for preloading)
 * @returns Array of routes that have backgrounds
 */
export const getRoutesWithBackgrounds = (): string[] => {
  return Object.entries(ROUTE_BACKGROUNDS)
    .filter(([, config]) => config.type === 'image')
    .map(([route]) => route);
};