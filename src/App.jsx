import Desktop from './components/desktop/Desktop.jsx'
import Taskbar from './components/taskbar/Taskbar.jsx'
import WindowManagerProvider from './context/WindowManagerProvider.jsx'
import { useIsSimpleView } from './hooks/useIsSimpleView.js'
import SimpleView from './pages/SimpleView.jsx'
import './App.css'

function App() {
  const isSimpleView = useIsSimpleView()

  if (isSimpleView) return <SimpleView />

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