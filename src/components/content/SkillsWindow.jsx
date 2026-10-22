import { skillGroups } from '../../data/skills.js'
import './SkillsWindow.css'

function SkillsWindow() {
  return (
    <div className="skills">
      {skillGroups.map((group) => (
        <section key={group.id} className="skills__group">
          <h2 className="skills__title">{group.title}</h2>
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