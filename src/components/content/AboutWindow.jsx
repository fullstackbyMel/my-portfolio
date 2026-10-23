import { useWindowManager } from '../../hooks/useWindowManager.js'
import { profile } from '../../data/profile.js'
import ExternalLink from './ExternalLink.jsx'
import './AboutWindow.css'

function AboutWindow() {
  const { openWindow } = useWindowManager()

  return (
    <div className="about">
      <h2 className="about__name">Hi, I'm {profile.name}.</h2>
      <p className="about__headline">{profile.headline}</p>
      <p>{profile.bio}</p>
      <p className="about__status">{profile.availability}</p>

      <div className="about__actions">
        <button type="button" onClick={() => openWindow('projects')}>
          View projects
        </button>
        <ExternalLink href={profile.resumeUrl}>Résumé (PDF)</ExternalLink>
        <ExternalLink href={profile.githubUrl}>GitHub</ExternalLink>
        <ExternalLink href={profile.linkedinUrl}>LinkedIn</ExternalLink>
        <a
          href="#simple"
          data-umami-event="switch-view"
          data-umami-event-view="simple"
        >
          Simple view
        </a>
      </div>
    </div>
  )
}

export default AboutWindow