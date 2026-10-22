import { useEffect, useRef } from 'react'
import { useWindowManager } from '../../hooks/useWindowManager.js'
import './Window.css'

function Window({ id, title, x, y, width, zIndex, isActive, children }) {
  const { closeWindow, focusWindow } = useWindowManager()
  const windowRef = useRef(null)
  const titleId = `window-title-${id}`

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
      style={{ '--x': `${x}px`, '--y': `${y}px`, '--w': `${width}px`, zIndex }}
      onPointerDown={() => focusWindow(id)}
      onFocus={() => focusWindow(id)}
      onKeyDown={handleKeyDown}
    >
      <div className={isActive ? 'title-bar' : 'title-bar title-bar--inactive'}>
        <div className="title-bar-text" id={titleId}>
          {title}
        </div>
        <div className="title-bar-controls">
          <button type="button" aria-label="Close" onClick={() => closeWindow(id)} />
        </div>
      </div>
      <div className="window-body os-window__body">{children}</div>
    </section>
  )
}

export default Window