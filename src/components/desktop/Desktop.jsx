import DesktopIcon from './DesktopIcon.jsx'
import { desktopApps } from '../../data/apps.js'
import './Desktop.css'

function Desktop() {
  return (
    <div className="desktop">
      <ul className="desktop__icons">
        {desktopApps.map((app) => (
          <li key={app.id}>
            <DesktopIcon label={app.label} icon={app.icon} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Desktop