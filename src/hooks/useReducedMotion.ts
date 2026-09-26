import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function readPreference(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  // Read during render, not in an effect: the first paint must already know
  // whether motion is allowed, otherwise mount animations hide content for a
  // frame before correcting (and Lenis gets created only to be destroyed).
  const [reduced, setReduced] = useState(readPreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);

    const handler = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reduced;
}
