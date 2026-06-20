import { useEffect, useState } from 'react'

/** Subscribe to a CSS media query (e.g. "(pointer: fine)"). SSR-safe default. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on devices with a precise pointer (desktop) — gates cursor-only effects. */
export const useFinePointer = () => useMediaQuery('(pointer: fine)')
