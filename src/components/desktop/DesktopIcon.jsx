import './DesktopIcon.css'

function DesktopIcon({ label, icon, onOpen }) {
  return (
    <button type="button" className="desktop-icon" onClick={onOpen}>
      <span className="desktop-icon__image" aria-hidden="true">
        {icon}
      </span>
      <span className="desktop-icon__label">{label}</span>
    </button>
  )
}

export default DesktopIcon