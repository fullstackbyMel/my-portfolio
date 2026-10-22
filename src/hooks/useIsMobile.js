import { useSyncExternalStore } from 'react'

export const MOBILE_QUERY = '(max-width: 768px)'

function subscribe(onChange) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot)
}