import { describe, expect, it, vi } from 'vitest'
import { trackEvent } from '../src/analytics.js'

describe('trackEvent', () => {
  it('logs to the console while developing instead of sending anything', () => {
    const debug = vi.spyOn(console, 'debug').mockImplementation(() => {})
    trackEvent('open-window', { window: 'about' })
    expect(debug).toHaveBeenCalledWith('[analytics]', 'open-window', { window: 'about' })
  })

  it('sends the event to Umami in the deployed site', () => {
    vi.stubEnv('DEV', false)
    window.umami = { track: vi.fn() }
    trackEvent('open-window', { window: 'about' })
    expect(window.umami.track).toHaveBeenCalledWith('open-window', { window: 'about' })
    delete window.umami
    vi.unstubAllEnvs()
  })

  it('does nothing, without crashing, when the tracker is blocked', () => {
    vi.stubEnv('DEV', false)
    delete window.umami
    expect(() => trackEvent('open-window', { window: 'about' })).not.toThrow()
    vi.unstubAllEnvs()
  })

  it('does not crash when the tracker itself throws', () => {
    vi.stubEnv('DEV', false)
    window.umami = {
      track: () => {
        throw new Error('boom')
      },
    }
    expect(() => trackEvent('x')).not.toThrow()
    delete window.umami
    vi.unstubAllEnvs()
  })
})