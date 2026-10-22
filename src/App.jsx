import Desktop from './components/desktop/Desktop.jsx'
import Taskbar from './components/taskbar/Taskbar.jsx'
import WindowManagerProvider from './context/windowManagerProvider.jsx'
import './App.css'

function App() {
  return (
    <WindowManagerProvider initialOpen={['about']}>
      <div className="shell">
        <Desktop />
        <Taskbar />
      </div>
    </WindowManagerProvider>
  )
}

export default App