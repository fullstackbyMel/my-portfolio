import DesktopIcon from './DesktopIcon.jsx'
import WindowLayer from '../windows/WindowLayer.jsx'
import { desktopApps } from '../../data/apps.js'
import { useOpenApp } from '../../hooks/useOpenApp.js'
import './Desktop.css'

function Desktop() {
  const openApp = useOpenApp()

  return (
    <main className="desktop">
      <ul className="desktop__icons" aria-label="Desktop">
        {desktopApps.map((app) => (
          <li key={app.id}>
            <DesktopIcon
              label={app.label}
              icon={app.icon}
              onOpen={() => openApp(app)}
            />
          </li>
        ))}
      </ul>
      <WindowLayer />
    </main>
  )
}

export default Desktop