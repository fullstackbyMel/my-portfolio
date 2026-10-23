import { profile } from '../data/profile.js'
import { projects } from '../data/projects.js'
import ContactWindow from '../components/content/ContactWindow.jsx'
import ExternalLink from '../components/content/ExternalLink.jsx'
import ProjectSheet from '../components/content/ProjectSheet.jsx'
import SkillsWindow from '../components/content/SkillsWindow.jsx'
import './SimpleView.css'
import PrivacyNote from '../components/content/PrivacyNote.jsx'

function SimpleView() {
  return (
    <div className="simple">
      <header className="simple__header">
        <p className="simple__switch">
          <a
            href="#desktop"
            data-umami-event="switch-view"
            data-umami-event-view="desktop"
          >
            Switch to desktop view
          </a>
        </p>
        <h1 className="simple__name">{profile.name}</h1>
        <p className="simple__headline">{profile.headline}</p>
        <nav className="simple__links" aria-label="Profile links">
          <ExternalLink href={profile.resumeUrl}>Résumé (PDF)</ExternalLink>
          <ExternalLink href={profile.githubUrl}>GitHub</ExternalLink>
          <ExternalLink href={profile.linkedinUrl}>LinkedIn</ExternalLink>
          <a href={`mailto:${profile.email}`} data-umami-event="email-click">
            Email
          </a>  
        </nav>
      </header>

      <main className="simple__main">
        <section className="simple__section">
          <h2 className="simple__heading">About</h2>
          <p>{profile.bio}</p>
          <p>{profile.availability}</p>
        </section>

        <section className="simple__section">
          <h2 className="simple__heading">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="simple__project">
              <ProjectSheet projectId={project.id} />
            </div>
          ))}
        </section>

        <section className="simple__section">
          <h2 className="simple__heading">Skills</h2>
          <SkillsWindow />
        </section>

        <section className="simple__section">
          <h2 className="simple__heading">Contact</h2>
          <ContactWindow />
        </section>
      </main>

      <footer className="simple__footer">
        <PrivacyNote />
      </footer>
    </div>
  )
}

export default SimpleView