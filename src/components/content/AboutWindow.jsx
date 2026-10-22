import { useWindowManager } from '../../hooks/useWindowManager.js'
import './AboutWindow.css'

function AboutWindow() {
  const { openWindow } = useWindowManager()

  return (
    <div className="about">
      <h2 className="about__name">Hi, I'm Mel Liza Limbago.</h2>
      <p className="about__headline">
        Computer Engineering graduate and former ICT teacher building web apps
        with Django and React.
      </p>
      <p>
        I'm a DOST scholar and a former public Senior High School teacher
        (ICT and Computer Systems Servicing). After completing my teaching
        service obligation, I'm returning to software development, building
        with Python, Django and REST APIs while growing my React skills.
      </p>
      <p className="about__status">
        Open to remote Software Developer / Engineer roles. I love to create
        whimsical things.
      </p>

      <div className="about__actions">
        <button type="button" onClick={() => openWindow('projects')}>
          View projects
        </button>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Résumé (PDF)
        </a>
        <a
          href="https://github.com/backendbyMel"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/melthecoder31"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}

export default AboutWindow