import Desktop from './components/desktop/Desktop.jsx'
import Taskbar from './components/taskbar/Taskbar.jsx'
import './App.css'

function App() {
  return (
    <div className="shell">
      <Desktop />
      <Taskbar />
    </div>
  )
}

export default App