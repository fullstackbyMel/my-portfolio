import Clock from './Clock.jsx'
import './Taskbar.css'

function Taskbar() {
  return (
    <footer className="taskbar">
      <button type="button" className="start-button">
        start
      </button>
      <div className="taskbar__tray">
        <Clock />
      </div>
    </footer>
  )
}

export default Taskbar