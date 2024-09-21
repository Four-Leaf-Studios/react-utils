import { useEffect, useMemo, useRef, useState } from 'react';

// Define the cache type with a generic and use unknown to avoid any
const cache: { [key: string]: unknown } = {};

export function useFetch<T>(
  url: string,
  options?: RequestInit,
  retries: number = 0,
  useCache: boolean = true // Optional flag to control cache usage
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Ref to store the AbortController for cleanup
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoize the options object to avoid unnecessary re-fetches
  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    // Create a new AbortController for this fetch call
    const controller = new AbortController();
    abortControllerRef.current = controller; // Save the controller in ref

    const fetchData = async (attempt: number = 0) => {
      const cacheKey = url;

      // Check the cache first if caching is enabled
      if (useCache && cache[cacheKey] !== undefined) {
        setData(cache[cacheKey] as T); // Cast the cached value to type T
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(url, {
          ...memoizedOptions, // Use the memoized options
          signal: controller.signal,
        });

        // Check for HTTP error status
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
        setError(null); // Clear previous errors if any

        // Store the result in cache if caching is enabled
        if (useCache) {
          cache[cacheKey] = result;
        }
      } catch (err) {
        // Handle fetch abort
        if (controller.signal.aborted) return;

        if (attempt < retries) {
          fetchData(attempt + 1); // Retry fetch if allowed
        } else {
          setError(err as Error);
          setData(null); // Clear data on error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort fetch on unmount or when dependencies change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, memoizedOptions, retries, useCache]); // Use memoized options

  return { data, loading, error };
}
