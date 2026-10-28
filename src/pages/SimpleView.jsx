import { useEffect } from 'react'
import { profile } from '../data/profile.js'
import { projects } from '../data/projects.js'
import { skillGroups } from '../data/skills.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import ContactWindow from '../components/content/ContactWindow.jsx'
import ExternalLink from '../components/content/ExternalLink.jsx'
import PrivacyNote from '../components/content/PrivacyNote.jsx'
import ProjectSheet from '../components/content/ProjectSheet.jsx'
import SkillsWindow from '../components/content/SkillsWindow.jsx'
import TagList from '../components/content/TagList.jsx'
import './SimpleView.css'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
const SECTION_IDS = SECTIONS.map((section) => section.id)
const CURRENT_YEAR = new Date().getFullYear()
const DECO_TAGS = skillGroups[0].items.map((item) => item.name)

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
        <div className="simple__container simple__bar-inner">
          <a
            className="simple__brand"
            href="#simple"
            data-umami-event="simple-nav"
            data-umami-event-section="top"
          >
            <img
            src={profile.logoUrl}
            alt="My logo"
            width="50"
            height="50"
            />
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
          <div className="simple__container simple__hero-inner">
            <div className="simple__hero-text">
              <p className="simple__status">
                <span className="simple__status-dot" aria-hidden="true" />
                {profile.openTo}
              </p>
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

            {/* Decoration only */}
            <div className="simple__deco" aria-hidden="true">
              <div className="window">
                <div className="title-bar">
                  <div className="title-bar-text">About Me.txt</div>
                  <div className="simple__deco-dots">
                    <span />
                    <span />
                  </div>
                </div>
                <div className="window-body">
                  <p className="simple__deco-hello">Hi, I&apos;m passionate about programming and technologies.</p>
                  <TagList items={DECO_TAGS} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="simple__section" id={sectionElementId('about')}>
          <div className="simple__container">
            <h2 className="simple__heading">About</h2>
            <p>{profile.bio}</p>
            <p>{profile.availability}</p>
          </div>
        </section>

        <section
          className="simple__section simple__section--projects"
          id={sectionElementId('projects')}
        >
          <div className="simple__container">
            <h2 className="simple__heading">Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="simple__project">
                <ProjectSheet projectId={project.id} headingLevel={3} />
              </div>
            ))}
          </div>
        </section>

        <section className="simple__section" id={sectionElementId('skills')}>
          <div className="simple__container">
            <h2 className="simple__heading">Skills</h2>
            <SkillsWindow headingLevel={3} />
          </div>
        </section>

        <section
          className="simple__section simple__section--contact"
          id={sectionElementId('contact')}
        >
          <div className="simple__container">
            <h2 className="simple__heading">Contact</h2>
            <ContactWindow showPrivacyNote={false} />
          </div>
        </section>
      </main>

      <footer className="simple__footer">
        <div className="simple__container">
          <PrivacyNote />
          <p className="simple__copyright">
            &copy; {CURRENT_YEAR} {profile.name} &middot;{' '}
            <a href="#simple">Back to top</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default SimpleView