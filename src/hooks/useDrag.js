import { useRef } from 'react'

const MIN_VISIBLE_WIDTH = 80
const TITLE_BAR_HEIGHT = 32

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function useDrag({ elementRef, position, setPosition }) {
  const dragRef = useRef(null)

  function onPointerDown(event) {
    if (event.button !== 0) return
    if (event.target.closest('button')) return

    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
      windowStartX: position.x,
      windowStartY: position.y,
    }
  }

  function onPointerMove(event) {
    const drag = dragRef.current
    const element = elementRef.current
    if (!drag || !element?.offsetParent) return

    const area = element.offsetParent
    const nextX = drag.windowStartX + (event.clientX - drag.pointerStartX)
    const nextY = drag.windowStartY + (event.clientY - drag.pointerStartY)

    setPosition({
      x: clamp(nextX, MIN_VISIBLE_WIDTH - element.offsetWidth, area.clientWidth - MIN_VISIBLE_WIDTH),
      y: clamp(nextY, 0, area.clientHeight - TITLE_BAR_HEIGHT),
    })
  }

  function endDrag() {
    dragRef.current = null
  }

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  }
}