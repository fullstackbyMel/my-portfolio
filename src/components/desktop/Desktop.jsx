import DesktopIcon from './DesktopIcon.jsx'
import WindowLayer from '../windows/WindowLayer.jsx'
import { desktopApps } from '../../data/apps.js'
import { useWindowManager } from '../../hooks/useWindowManager.js'
import './Desktop.css'

function Desktop() {
  const { openWindow } = useWindowManager()

  function handleOpen(app) {
    if (app.href) {
      window.open(app.href, '_blank', 'noopener,noreferrer')
      return
    }
    openWindow(app.id)
  }

  return (
    <div className="desktop">
      <ul className="desktop__icons">
        {desktopApps.map((app) => (
          <li key={app.id}>
            <DesktopIcon
              label={app.label}
              icon={app.icon}
              onOpen={() => handleOpen(app)}
            />
          </li>
        ))}
      </ul>
      <WindowLayer />
    </div>
  )
}

export default Desktop