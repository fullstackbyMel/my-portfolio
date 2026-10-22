import AboutWindow from '../content/AboutWindow.jsx'
import ContactWindow from '../content/ContactWindow.jsx'
import ProjectSheet from '../content/ProjectSheet.jsx'
import ProjectsWindow from '../content/ProjectsWindow.jsx'
import SkillsWindow from '../content/SkillsWindow.jsx'
import { projects, projectWindowId } from '../../data/projects.js'

const projectWindows = Object.fromEntries(
  projects.map((project, index) => [
    projectWindowId(project.id),
    {
      title: project.name,
      Component: ProjectSheet,
      props: { projectId: project.id },
      x: 210 + index * 30,
      y: 40 + index * 30,
      width: 560,
    },
  ]),
)

export const windowRegistry = {
  about: { title: 'About Me.txt', Component: AboutWindow, x: 130, y: 24, width: 460 },
  projects: { title: 'My Projects', Component: ProjectsWindow, x: 170, y: 60, width: 440 },
  skills: { title: 'Skills.exe', Component: SkillsWindow, x: 210, y: 96, width: 440 },
  contact: { title: 'Contact', Component: ContactWindow, x: 250, y: 132, width: 420 },
  ...projectWindows,
}