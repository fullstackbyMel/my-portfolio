import { useWindowManager } from '../../hooks/useWindowManager.js'
import { windowRegistry } from '../windows/windowRegistry.js'
import './TaskbarButtons.css'

function TaskbarButtons() {
  const { order, minimized, activeId, toggleWindow } = useWindowManager()

  return (
    <div className="taskbar-buttons">
      {Object.entries(windowRegistry).map(([id, { title }]) => {
        if (!order.includes(id)) return null

        const isActive = id === activeId
        const isMinimized = minimized.includes(id)
        const className = [
          'taskbar-button',
          isActive && 'taskbar-button--active',
          isMinimized && 'taskbar-button--minimized',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={id}
            type="button"
            className={className}
            aria-pressed={isActive}
            onClick={() => toggleWindow(id)}
          >
            {title}
          </button>
        )
      })}
    </div>
  )
}

export default TaskbarButtons