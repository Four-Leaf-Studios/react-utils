import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const handleChange = () => {
      setMatches(media.matches);
    };

    // Set the initial value
    handleChange();

    // Listen for changes in the media query
    media.addEventListener('change', handleChange);

    // Cleanup the event listener on unmount
    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
