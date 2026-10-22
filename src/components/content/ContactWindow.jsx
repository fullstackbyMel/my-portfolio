import { profile } from '../../data/profile.js'
import ExternalLink from './ExternalLink.jsx'
import './ContactWindow.css'

function ContactWindow() {
  return (
    <div className="contact">
      <p>Open to remote Software Developer / Engineer roles. Feel free to get in touch.</p>
      <dl className="contact__list">
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <ExternalLink href={profile.linkedinUrl}>melthecoder31</ExternalLink>
        </dd>
        <dt>GitHub</dt>
        <dd>
          <ExternalLink href={profile.githubUrl}>backendbyMel</ExternalLink>
        </dd>
        <dt>Résumé</dt>
        <dd>
          <ExternalLink href={profile.resumeUrl}>Download PDF</ExternalLink>
        </dd>
      </dl>
    </div>
  )
}

export default ContactWindow