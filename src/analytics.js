const SCRIPT_URL = 'https://cloud.umami.is/script.js'

export function initAnalytics() {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID
  if (!import.meta.env.PROD || !websiteId) return

  const script = document.createElement('script')
  script.defer = true
  script.src = SCRIPT_URL
  script.dataset.websiteId = websiteId
  script.dataset.doNotTrack = 'true'

  const domains = import.meta.env.VITE_UMAMI_DOMAINS
  if (domains) script.dataset.domains = domains

  document.head.appendChild(script)
}

export function trackEvent(name, data) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, data ?? '')
    return
  }

  try {
    window.umami?.track(name, data)
  } catch {
    // Ignore
  }
}