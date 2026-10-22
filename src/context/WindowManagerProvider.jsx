import { useMemo, useReducer } from 'react'
import { WindowManagerContext } from './windowContext.js'
import { windowReducer } from './windowReducer.js'

function WindowManagerProvider({ children, initialOpen = [] }) {
  const [state, dispatch] = useReducer(windowReducer, initialOpen, (open) => ({
    order: open,
  }))

  const value = useMemo(
    () => ({
      order: state.order,
      activeId: state.order.at(-1) ?? null,
      openWindow: (id) => dispatch({ type: 'OPEN', id }),
      closeWindow: (id) => dispatch({ type: 'CLOSE', id }),
      focusWindow: (id) => dispatch({ type: 'FOCUS', id }),
    }),
    [state.order],
  )

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

export default WindowManagerProvider