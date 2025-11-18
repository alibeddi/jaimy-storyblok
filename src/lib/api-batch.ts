/**
 * API Request Batching Utility
 * Batches multiple API requests into a single call to reduce network overhead
 */

interface BatchRequest {
  id: string;
  url: string;
  options?: RequestInit;
}

interface BatchResponse {
  id: string;
  data?: unknown;
  error?: string;
  status: number;
}

class APIBatcher {
  private queue: Map<string, BatchRequest> = new Map();
  private timeout: NodeJS.Timeout | null = null;
  private readonly batchDelay = 50; // ms to wait before executing batch
  private readonly maxBatchSize = 10;

  /**
   * Add a request to the batch queue
   */
  add(id: string, url: string, options?: RequestInit): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.queue.set(id, { id, url, options });

      // Store resolve/reject callbacks
      if (!this.callbacks) {
        this.callbacks = new Map();
      }
      this.callbacks.set(id, { resolve, reject });

      // Schedule batch execution
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      // Execute immediately if batch is full
      if (this.queue.size >= this.maxBatchSize) {
        this.executeBatch();
      } else {
        this.timeout = setTimeout(() => this.executeBatch(), this.batchDelay);
      }
    });
  }

  private callbacks?: Map<string, { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }>;

  /**
   * Execute all queued requests
   */
  private async executeBatch() {
    if (this.queue.size === 0) return;

    const requests = Array.from(this.queue.values());
    this.queue.clear();

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    try {
      // Execute all requests in parallel
      const responses = await Promise.allSettled(
        requests.map(async (req) => {
          try {
            const response = await fetch(req.url, req.options);
            const data = await response.json();
            return {
              id: req.id,
              data,
              status: response.status,
            } as BatchResponse;
          } catch (error) {
            return {
              id: req.id,
              error: error instanceof Error ? error.message : 'Unknown error',
              status: 500,
            } as BatchResponse;
          }
        })
      );

      // Resolve/reject individual promises
      responses.forEach((result, index) => {
        const request = requests[index];
        const callback = this.callbacks?.get(request.id);

        if (!callback) return;

        if (result.status === 'fulfilled') {
          const response = result.value;
          if (response.error) {
            callback.reject(new Error(response.error));
          } else {
            callback.resolve(response.data);
          }
        } else {
          callback.reject(result.reason);
        }

        this.callbacks?.delete(request.id);
      });
    } catch (error) {
      // Reject all pending requests on batch failure
      requests.forEach((req) => {
        const callback = this.callbacks?.get(req.id);
        if (callback) {
          callback.reject(error);
          this.callbacks?.delete(req.id);
        }
      });
    }
  }

  /**
   * Clear all pending requests
   */
  clear() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.queue.clear();
    this.callbacks?.clear();
  }
}

// Singleton instance
const batcher = new APIBatcher();

/**
 * Batch an API request
 * Multiple calls within 50ms will be batched together
 */
export function batchRequest(id: string, url: string, options?: RequestInit): Promise<unknown> {
  return batcher.add(id, url, options);
}

/**
 * Clear all pending batched requests
 */
export function clearBatchQueue() {
  batcher.clear();
}

/**
 * Hook for batching Storyblok API requests
 */
export function batchStoryblokRequest(
  slug: string,
  locale: string,
  version: 'draft' | 'published' = 'published'
): Promise<unknown> {
  const id = `storyblok-${slug}-${locale}-${version}`;
  const url = `/api/storyblok?slug=${slug}&locale=${locale}&version=${version}`;
  return batchRequest(id, url);
}
