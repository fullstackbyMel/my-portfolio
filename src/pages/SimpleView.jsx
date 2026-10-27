import { useEffect } from 'react'
import { profile } from '../data/profile.js'
import { projects } from '../data/projects.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import ContactWindow from '../components/content/ContactWindow.jsx'
import ExternalLink from '../components/content/ExternalLink.jsx'
import PrivacyNote from '../components/content/PrivacyNote.jsx'
import ProjectSheet from '../components/content/ProjectSheet.jsx'
import SkillsWindow from '../components/content/SkillsWindow.jsx'
import './SimpleView.css'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
const SECTION_IDS = SECTIONS.map((section) => section.id)
const CURRENT_YEAR = new Date().getFullYear()

const sectionHref = (id) => `#simple/${id}`
const sectionElementId = (id) => `simple/${id}`

function SimpleView() {
  const activeSection = useActiveSection(SECTION_IDS, sectionElementId)

  useEffect(() => {
    const target = window.location.hash.slice(1)
    if (target.startsWith('simple/')) document.getElementById(target)?.scrollIntoView()
  }, [])

  return (
    <div className="simple" id="simple">
      <a className="simple__skip" href="#simple/content">
        Skip to content
      </a>

      <header className="simple__bar">
        <div className="simple__bar-inner">
          <a
            className="simple__brand"
            href="#simple"
            data-umami-event="simple-nav"
            data-umami-event-section="top"
          >
            {profile.name}
          </a>

          <nav className="simple__nav" aria-label="Sections">
            <ul className="simple__nav-list">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    className="simple__nav-link"
                    href={sectionHref(id)}
                    aria-current={activeSection === id ? 'location' : undefined}
                    data-umami-event="simple-nav"
                    data-umami-event-section={id}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            className="simple__button simple__button--small"
            href="#desktop"
            data-umami-event="switch-view"
            data-umami-event-view="desktop"
          >
            Desktop view
          </a>
        </div>
      </header>

      <main className="simple__main" id="simple/content" tabIndex={-1}>
        <div className="simple__hero">
          <h1 className="simple__name">{profile.name}</h1>
          <p className="simple__headline">{profile.headline}</p>
          <div className="simple__actions">
            <a
              className="simple__button simple__button--primary"
              href={sectionHref('projects')}
              data-umami-event="simple-nav"
              data-umami-event-section="projects"
            >
              View projects
            </a>
            <ExternalLink className="simple__button" href={profile.resumeUrl}>
              Résumé (PDF)
            </ExternalLink>
            <ExternalLink className="simple__button" href={profile.githubUrl}>
              GitHub
            </ExternalLink>
            <ExternalLink className="simple__button" href={profile.linkedinUrl}>
              LinkedIn
            </ExternalLink>
          </div>
        </div>

        <section className="simple__section" id={sectionElementId('about')}>
          <h2 className="simple__heading">About</h2>
          <p>{profile.bio}</p>
          <p>{profile.availability}</p>
        </section>

        <section className="simple__section" id={sectionElementId('projects')}>
          <h2 className="simple__heading">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="simple__project">
              <ProjectSheet projectId={project.id} headingLevel={3} />
            </div>
          ))}
        </section>

        <section className="simple__section" id={sectionElementId('skills')}>
          <h2 className="simple__heading">Skills</h2>
          <SkillsWindow headingLevel={3} />
        </section>

        <section className="simple__section" id={sectionElementId('contact')}>
          <h2 className="simple__heading">Contact</h2>
          <ContactWindow showPrivacyNote={false} />
        </section>
      </main>

      <footer className="simple__footer">
        <PrivacyNote />
        <p className="simple__copyright">
          &copy; {CURRENT_YEAR} {profile.name} &middot;{' '}
          <a href="#simple">Back to top</a>
        </p>
      </footer>
    </div>
  )
}

export default SimpleView