import { useEffect, useState } from 'react';

export function useFetch<T>(
  url: string,
  options?: RequestInit,
  retries: number = 0
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async (attempt: number = 0) => {
      try {
        setLoading(true);
        const response = await fetch(url, { ...options, signal });

        // Check for HTTP error status
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
        setError(null); // Clear previous errors if any
      } catch (err) {
        // Handle fetch abort
        if (signal.aborted) return;

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

    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, [url, options, retries]);

  return { data, loading, error };
}
