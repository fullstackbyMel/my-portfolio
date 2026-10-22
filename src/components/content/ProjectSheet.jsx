import { projects } from '../../data/projects.js'
import ExternalLink from './ExternalLink.jsx'
import TagList from './TagList.jsx'
import './ProjectSheet.css'

function Section({ title, children }) {
  return (
    <section className="sheet__section">
      <h3 className="sheet__heading">{title}</h3>
      {children}
    </section>
  )
}

function BulletList({ items }) {
  return (
    <ul className="sheet__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ProjectSheet({ projectId }) {
  const project = projects.find((item) => item.id === projectId)
  if (!project) return <p>Project not found.</p>

  return (
    <article className="sheet">
      <header className="sheet__header">
        <h2 className="sheet__name">{project.name}</h2>
        <p className="sheet__tagline">{project.tagline}</p>
        <div className="sheet__links">
          <ExternalLink href={project.repoUrl}>GitHub repository</ExternalLink>
          {project.demoUrl && (
            <ExternalLink href={project.demoUrl}>Live demo</ExternalLink>
          )}
        </div>
        <p className="sheet__status">{project.status}</p>
      </header>

      {project.screenshots.length > 0 && (
        <Section title="Screenshots">
          {project.screenshots.map((shot) => (
            <figure key={shot.src} className="sheet__figure">
              <img src={shot.src} alt={shot.alt} loading="lazy" />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </Section>
      )}

      <Section title="The problem">
        <p>{project.problem}</p>
      </Section>
      <Section title="Who it's for">
        <p>{project.users}</p>
      </Section>
      <Section title="What I built">
        <BulletList items={project.features} />
      </Section>
      <Section title="Tech stack">
        <TagList items={project.stack} />
      </Section>
      <Section title="A technical challenge">
        <p>
          <strong>The challenge:</strong> {project.challenge.problem}
        </p>
        <p>
          <strong>My approach:</strong> {project.challenge.approach}
        </p>
      </Section>
      <Section title="What I learned">
        <BulletList items={project.learned} />
      </Section>
      <Section title="What I'd improve next">
        <BulletList items={project.improve} />
      </Section>
    </article>
  )
}

export default ProjectSheet