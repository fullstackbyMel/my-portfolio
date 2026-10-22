import { useWindowManager } from '../../hooks/useWindowManager.js'
import { windowRegistry } from './windowRegistry.js'
import Window from './Window.jsx'

function WindowLayer() {
  const { order, minimized, activeId } = useWindowManager()

  return (
    <div className="window-layer">
      {Object.entries(windowRegistry).map(([id, definition]) => {
        const stackIndex = order.indexOf(id)
        if (stackIndex === -1) return null

        const { Component, props, title, x, y, width } = definition
        return (
          <Window
            key={id}
            id={id}
            title={title}
            x={x}
            y={y}
            width={width}
            zIndex={stackIndex + 1}
            isActive={id === activeId}
            isMinimized={minimized.includes(id)}
          >
            <Component {...props} />
          </Window>
        )
      })}
    </div>
  )
}

export default WindowLayer