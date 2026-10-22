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
        <ExternalLink href={profile.resumeUrl}>Résumé (PDF)</ExternalLink>
        <ExternalLink href={profile.githubUrl}>GitHub</ExternalLink>
        <ExternalLink href={profile.linkedinUrl}>LinkedIn</ExternalLink>
      </div>
    </div>
  )
}

export default AboutWindow