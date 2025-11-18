"use client";

import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';

interface SWRProviderProps {
  children: ReactNode;
}

/**
 * SWR Provider with global configuration
 */
export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        // Keep data fresh for 5 minutes
        focusThrottleInterval: 300000,
        // Global error handler
        onError: (error) => {
          console.error('[SWR Error]', error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
