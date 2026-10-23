import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

window.matchMedia = (query) => ({
  matches: Boolean(window.__isMobile),
  media: query,
  addEventListener: () => {},
  removeEventListener: () => {},
})

afterEach(() => {
  cleanup()
  window.__isMobile = false
  window.location.hash = ''
  vi.restoreAllMocks()
})