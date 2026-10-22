import { useWindowManager } from '../../hooks/useWindowManager.js'
import { projects, projectWindowId } from '../../data/projects.js'
import TagList from './TagList.jsx'
import './ProjectsWindow.css'

function ProjectsWindow() {
  const { openWindow } = useWindowManager()

  return (
    <div className="projects">
      <p className="projects__intro">
        {projects.length} projects. Open one to read the full write-up.
      </p>
      <ul className="projects__list">
        {projects.map((project) => (
          <li key={project.id} className="projects__row">
            <button
              type="button"
              className="projects__item"
              onClick={() => openWindow(projectWindowId(project.id))}
            >
              <span className="projects__icon" aria-hidden="true">
                📁
              </span>
              <span className="projects__text">
                <span className="projects__name">{project.name}</span>
                <span className="projects__tagline">{project.tagline}</span>
              </span>
            </button>
            <TagList items={project.stack} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsWindow