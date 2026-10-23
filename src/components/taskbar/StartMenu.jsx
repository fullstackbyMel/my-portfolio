import { useEffect, useRef, useState } from 'react'
import { desktopApps } from '../../data/apps.js'
import { useOpenApp } from '../../hooks/useOpenApp.js'
import './StartMenu.css'

function StartMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const openApp = useOpenApp()

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  function handleKeyDown(event) {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  function handleSelect(app) {
    setIsOpen(false)
    openApp(app)
  }

  return (
    <div className="start" ref={rootRef} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className="start-button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'start-menu' : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        start
      </button>

      {isOpen && (
        <div className="start-menu" id="start-menu">
          <p className="start-menu__header">Mel Liza Limbago</p>
          <ul className="start-menu__list">
            {desktopApps.map((app) => (
              <li key={app.id}>
                <button
                  type="button"
                  className="start-menu__item"
                  onClick={() => handleSelect(app)}
                >
                  <span className="start-menu__icon" aria-hidden="true">
                    {app.icon}
                  </span>
                  {app.label}
                </button>
              </li>
            ))}
              <li className="start-menu__divider">
              <a
                className="start-menu__item"
                href="#simple"
                data-umami-event="switch-view"
                data-umami-event-view="simple"
              >
                <span className="start-menu__icon" aria-hidden="true">
                  📋
                </span>
                Simple view
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default StartMenu