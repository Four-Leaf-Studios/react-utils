import { useEffect, useRef, useState } from 'react';

type Breakpoints = {
  [key: string]: string; // key is the name of the breakpoint, value is the media query string
};

type MediaQueryInfo = {
  key: string;
  media: MediaQueryList;
};

export function useBreakpoints(breakpoints: Breakpoints) {
  const [matches, setMatches] = useState<{ [key: string]: boolean }>({});
  const mediaQueries = useRef<MediaQueryInfo[]>([]);

  // Initialize media queries only once using useRef
  useEffect(() => {
    mediaQueries.current = Object.entries(breakpoints).map(([key, query]) => ({
      key,
      media: window.matchMedia(query),
    }));

    const updateMatches = () => {
      const newMatches = mediaQueries.current.reduce(
        (acc, { key, media }) => {
          acc[key] = media.matches;
          return acc;
        },
        {} as { [key: string]: boolean }
      );

      // Only update state if matches actually changed
      setMatches((prevMatches) => {
        const hasChanged = Object.keys(newMatches).some(
          (key) => newMatches[key] !== prevMatches[key]
        );
        if (hasChanged) {
          return newMatches;
        }
        return prevMatches; // No change, return previous state
      });
    };

    // Initial match check
    updateMatches();

    // Create the event listener handler
    const handleChange = () => updateMatches();

    // Add event listeners
    mediaQueries.current.forEach(({ media }) => {
      media.addEventListener('change', handleChange);
    });

    // Cleanup event listeners on unmount
    return () => {
      mediaQueries.current.forEach(({ media }) => {
        media.removeEventListener('change', handleChange);
      });
    };
  }, [breakpoints]);

  return matches;
}
