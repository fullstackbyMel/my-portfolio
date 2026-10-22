function bringToFront(order, id) {
  return [...order.filter((openId) => openId !== id), id]
}

export function windowReducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      if (state.order.at(-1) === action.id) return state
      return { order: bringToFront(state.order, action.id) }
    }
    case 'FOCUS': {
      const isOpen = state.order.includes(action.id)
      const isAlreadyOnTop = state.order.at(-1) === action.id
      if (!isOpen || isAlreadyOnTop) return state
      return { order: bringToFront(state.order, action.id) }
    }
    case 'CLOSE':
      return { order: state.order.filter((openId) => openId !== action.id) }
    default:
      return state
  }
}