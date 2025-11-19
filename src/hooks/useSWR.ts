/**
 * Custom SWR hooks for data fetching with caching
 */

import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

/**
 * Default fetcher function for SWR
 */
const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  
  return res.json();
};

/**
 * Default SWR configuration
 */
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 2000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

/**
 * Hook for fetching data with SWR
 */
export function useData<T = unknown>(
  url: string | null,
  config?: SWRConfiguration
) {
  return useSWR<T>(url, fetcher, { ...defaultConfig, ...config });
}

/**
 * Hook for fetching data with custom fetcher
 */
export function useDataWithFetcher<T = unknown>(
  url: string | null,
  customFetcher: (url: string) => Promise<T>,
  config?: SWRConfiguration
) {
  return useSWR<T>(url, customFetcher, { ...defaultConfig, ...config });
}

/**
 * Hook for fetching multiple resources
 * Note: Returns individual SWR hooks - use at component level
 */
export function useMultipleData<T = unknown>(
  urls: (string | null)[],
  config?: SWRConfiguration
) {
  // Create individual hooks for each URL
  const results = [];
  
  for (let i = 0; i < urls.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const result = useSWR<T>(urls[i], fetcher, { ...defaultConfig, ...config });
    results.push(result);
  }
  
  return {
    data: results.map((r) => r.data),
    error: results.find((r) => r.error)?.error,
    isLoading: results.some((r) => r.isLoading),
    isValidating: results.some((r) => r.isValidating),
  };
}

export { useSWR };
