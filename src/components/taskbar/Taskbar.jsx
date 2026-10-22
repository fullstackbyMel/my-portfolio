import Clock from './Clock.jsx'
import StartMenu from './StartMenu.jsx'
import TaskbarButtons from './TaskbarButtons.jsx'
import './Taskbar.css'

function Taskbar() {
  return (
    <footer className="taskbar">
      <StartMenu />
      <TaskbarButtons />
      <div className="taskbar__tray">
        <Clock />
      </div>
    </footer>
  )
}

export default Taskbar