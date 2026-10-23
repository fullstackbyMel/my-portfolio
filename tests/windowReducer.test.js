import { describe, expect, it } from 'vitest'
import { getActiveId, windowReducer } from '../src/context/windowReducer.js'

const start = { order: ['about'], minimized: [] }
const run = (state, type, id) => windowReducer(state, { type, id })

describe('windowReducer', () => {
  it('opens a new window on top', () => {
    const state = run(start, 'OPEN', 'projects')
    expect(state.order).toEqual(['about', 'projects'])
    expect(getActiveId(state)).toBe('projects')
  })

  it('does not change state when the top window is opened again', () => {
    const state = run(start, 'OPEN', 'about')
    expect(state).toBe(start)
  })

  it('brings an open window to the front instead of duplicating it', () => {
    const state = run(run(start, 'OPEN', 'projects'), 'OPEN', 'about')
    expect(state.order).toEqual(['projects', 'about'])
  })

  it('makes the next visible window active when the top one is minimized', () => {
    const state = run(run(start, 'OPEN', 'projects'), 'MINIMIZE', 'projects')
    expect(getActiveId(state)).toBe('about')
  })

  it('has no active window when everything is minimized', () => {
    expect(getActiveId(run(start, 'MINIMIZE', 'about'))).toBeNull()
  })

  it('ignores focus requests for minimized or unknown windows', () => {
    const minimized = run(start, 'MINIMIZE', 'about')
    expect(run(minimized, 'FOCUS', 'about')).toBe(minimized)
    expect(run(start, 'FOCUS', 'nope')).toBe(start)
  })

  it('restores a minimized window when it is opened again', () => {
    const state = run(run(start, 'MINIMIZE', 'about'), 'OPEN', 'about')
    expect(state.minimized).toEqual([])
    expect(getActiveId(state)).toBe('about')
  })

  it('toggle restores a minimized window', () => {
    const state = run(run(start, 'MINIMIZE', 'about'), 'TOGGLE', 'about')
    expect(state.minimized).toEqual([])
  })

  it('toggle minimizes the active window', () => {
    expect(run(start, 'TOGGLE', 'about').minimized).toEqual(['about'])
  })

  it('toggle raises a window that is open but behind another', () => {
    const state = run(run(start, 'OPEN', 'projects'), 'TOGGLE', 'about')
    expect(getActiveId(state)).toBe('about')
  })

  it('removes a closed window from both lists', () => {
    const state = run(run(start, 'MINIMIZE', 'about'), 'CLOSE', 'about')
    expect(state.order).toEqual([])
    expect(state.minimized).toEqual([])
  })

  it('returns the same state for unknown actions', () => {
    expect(run(start, 'NOPE', 'about')).toBe(start)
  })
})