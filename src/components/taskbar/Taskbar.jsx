import Clock from './Clock.jsx'
import StartMenu from './StartMenu.jsx'
import TaskbarButtons from './TaskbarButtons.jsx'
import './Taskbar.css'

function Taskbar() {
  return (
    <nav className="taskbar" aria-label="Taskbar">
      <StartMenu />
      <TaskbarButtons />
      <div className="taskbar__tray">
        <Clock />
      </div>
    </nav>
  )
}

export default Taskbar