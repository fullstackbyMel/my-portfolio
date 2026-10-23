import { useMemo, useReducer } from 'react'
import { WindowManagerContext } from './windowContext.js'
import { getActiveId, windowReducer } from './windowReducer.js'
import { trackEvent } from '../analytics.js'

function WindowManagerProvider({ children, initialOpen = [] }) {
  const [state, dispatch] = useReducer(windowReducer, initialOpen, (open) => ({
    order: open,
    minimized: [],
  }))

  const value = useMemo(
    () => ({
      order: state.order,
      minimized: state.minimized,
      activeId: getActiveId(state),
      openWindow: (id) => {
        trackEvent('open-window', { window: id })
        dispatch({ type: 'OPEN', id })
      },
      closeWindow: (id) => dispatch({ type: 'CLOSE', id }),
      focusWindow: (id) => dispatch({ type: 'FOCUS', id }),
      minimizeWindow: (id) => dispatch({ type: 'MINIMIZE', id }),
      toggleWindow: (id) => dispatch({ type: 'TOGGLE', id }),
    }),
    [state],
  )

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

export default WindowManagerProvider