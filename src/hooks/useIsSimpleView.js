import { useSyncExternalStore } from 'react'

function subscribe(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getSnapshot() {
  return /^#simple(\/|$)/.test(window.location.hash)
}

export function useIsSimpleView() {
  return useSyncExternalStore(subscribe, getSnapshot)
}