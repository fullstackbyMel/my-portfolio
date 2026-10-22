export function getActiveId(state) {
  return state.order.findLast((id) => !state.minimized.includes(id)) ?? null
}

function bringToFront(state, id) {
  return {
    order: [...state.order.filter((openId) => openId !== id), id],
    minimized: state.minimized.filter((minimizedId) => minimizedId !== id),
  }
}

export function windowReducer(state, action) {
  const { id } = action

  switch (action.type) {
    case 'OPEN':
      return getActiveId(state) === id ? state : bringToFront(state, id)

    case 'FOCUS': {
      const isOpen = state.order.includes(id)
      const isMinimized = state.minimized.includes(id)
      if (!isOpen || isMinimized || getActiveId(state) === id) return state
      return bringToFront(state, id)
    }

    case 'MINIMIZE': {
      if (!state.order.includes(id) || state.minimized.includes(id)) return state
      return { ...state, minimized: [...state.minimized, id] }
    }

    case 'TOGGLE': {
      if (!state.order.includes(id)) return state
      if (state.minimized.includes(id)) return bringToFront(state, id)
      if (getActiveId(state) === id) {
        return windowReducer(state, { type: 'MINIMIZE', id })
      }
      return bringToFront(state, id)
    }

    case 'CLOSE':
      return {
        order: state.order.filter((openId) => openId !== id),
        minimized: state.minimized.filter((minimizedId) => minimizedId !== id),
      }

    default:
      return state
  }
}