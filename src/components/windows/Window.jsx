import { useEffect, useRef, useState } from 'react'
import { useWindowManager } from '../../hooks/useWindowManager.js'
import { useDrag } from '../../hooks/useDrag.js'
import './Window.css'

function Window({ id, title, x, y, width, zIndex, isActive, isMinimized, children }) {
  const { closeWindow, focusWindow, minimizeWindow } = useWindowManager()
  const windowRef = useRef(null)
  const titleId = `window-title-${id}`

  const [position, setPosition] = useState({ x, y })
  const dragHandlers = useDrag({ elementRef: windowRef, position, setPosition })

  useEffect(() => {
    const element = windowRef.current
    if (isActive && element && !element.contains(document.activeElement)) {
      element.focus()
    }
  }, [isActive])

  function handleKeyDown(event) {
    if (event.key === 'Escape') closeWindow(id)
  }

  return (
    <section
      ref={windowRef}
      className="window os-window"
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      hidden={isMinimized}
      style={{
        '--x': `${position.x}px`,
        '--y': `${position.y}px`,
        '--w': `${width}px`,
        zIndex,
      }}
      onPointerDown={() => focusWindow(id)}
      onFocus={() => focusWindow(id)}
      onKeyDown={handleKeyDown}
    >
      <div
        className={isActive ? 'title-bar' : 'title-bar title-bar--inactive'}
        {...dragHandlers}
      >
        <div className="title-bar-text" id={titleId}>
          {title}
        </div>
        <div className="title-bar-controls">
          <button type="button" aria-label="Minimize" onClick={() => minimizeWindow(id)} />
          <button type="button" aria-label="Close" onClick={() => closeWindow(id)} />
        </div>
      </div>
      <div className="window-body os-window__body">{children}</div>
    </section>
  )
}

export default Window