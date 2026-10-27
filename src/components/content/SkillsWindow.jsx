import { skillGroups } from '../../data/skills.js'
import './SkillsWindow.css'

function SkillsWindow({ headingLevel = 2 }) {
  const Heading = `h${headingLevel}`

  return (
    <div className="skills">
      {skillGroups.map((group) => (
        <section key={group.id} className="skills__group">
          <Heading className="skills__title">{group.title}</Heading>
          <ul className="skills__list">
            {group.items.map((item) => (
              <li key={item.name}>
                <span className="skills__name">{item.name}</span>
                {item.note && <span className="skills__note"> {item.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default SkillsWindow