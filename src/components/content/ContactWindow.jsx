import { profile } from '../../data/profile.js'
import ExternalLink from './ExternalLink.jsx'
import './ContactWindow.css'
import PrivacyNote from './PrivacyNote.jsx'

// function ContactWindow() {
function ContactWindow({ showPrivacyNote = true }) {
  return (
    <div className="contact">
      <p className="contact__intro">Open to remote Software Developer / Engineer roles. Feel free to get in touch.</p>
      <dl className="contact__list">
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${profile.email}`} data-umami-event="email-click">{profile.email}</a>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <ExternalLink href={profile.linkedinUrl}>melthecoder31</ExternalLink>
        </dd>
        <dt>GitHub</dt>
        <dd>
          <ExternalLink href={profile.githubUrl}>Full Stack</ExternalLink>
        </dd>
        <dt>Résumé</dt>
        <dd>
          <ExternalLink href={profile.resumeUrl}>Download PDF</ExternalLink>
        </dd>
      </dl>
      {/* <PrivacyNote /> */}
      {showPrivacyNote && <PrivacyNote />}
    </div>
  )
}

export default ContactWindow