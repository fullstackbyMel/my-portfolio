import { useWindowManager } from './useWindowManager.js'

export function useOpenApp() {
  const { openWindow } = useWindowManager()

  return function openApp(app) {
    if (app.href) {
      window.open(app.href, '_blank', 'noopener,noreferrer')
      return
    }
    openWindow(app.id)
  }
}