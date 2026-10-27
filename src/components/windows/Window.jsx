import { useEffect, useRef, useState } from 'react'
import { useWindowManager } from '../../hooks/useWindowManager.js'
import { useDrag } from '../../hooks/useDrag.js'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import './Window.css'

function Window({ id, title, x, y, width, zIndex, isActive, isMinimized, children }) {
  const { closeWindow, focusWindow, minimizeWindow } = useWindowManager()
  const isMobile = useIsMobile()
  const windowRef = useRef(null)
  const titleId = `window-title-${id}`

  const [position, setPosition] = useState({ x, y })
  const dragHandlers = useDrag({ elementRef: windowRef, position, setPosition })

  useEffect(() => {
    const opener = document.activeElement
    return () => {
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [])

  useEffect(() => {
    const element = windowRef.current
    if (isActive && element && !element.contains(document.activeElement)) {
      element.focus()
    }
  }, [isActive])
  
  useEffect(() => {
    const element = windowRef.current
    if (isActive && element && !element.contains(document.activeElement)) {
      element.focus()
    }
  }, [isActive])

  function handleKeyDown(event) {
    if (event.key === 'Escape') closeWindow(id)
  }

  const windowClass = isMobile ? 'window os-window os-window--mobile' : 'window os-window'

  return (
    <section
      ref={windowRef}
      className={windowClass}
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
        {...(isMobile ? {} : dragHandlers)}
      >
        {isMobile && (
          <button
            type="button"
            className="os-window__back"
            onClick={() => closeWindow(id)}
          >
            Back
          </button>
        )}
        <div className="title-bar-text" id={titleId}>
          {title}
        </div>
        {!isMobile && (
          <div className="title-bar-controls">
            <button type="button" aria-label="Minimize" onClick={() => minimizeWindow(id)} />
            <button type="button" aria-label="Close" onClick={() => closeWindow(id)} />
          </div>
        )}
      </div>
      <div className="window-body os-window__body">{children}</div>
    </section>
  )
}

export default Window