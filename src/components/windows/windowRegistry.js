import AboutWindow from '../content/AboutWindow.jsx'
import PlaceholderWindow from '../content/PlaceholderWindow.jsx'

export const windowRegistry = {
  about: { title: 'About Me.txt', Component: AboutWindow, x: 130, y: 24, width: 460 },
  projects: { title: 'My Projects', Component: PlaceholderWindow, x: 170, y: 60, width: 420 },
  skills: { title: 'Skills.exe', Component: PlaceholderWindow, x: 210, y: 96, width: 420 },
  contact: { title: 'Contact', Component: PlaceholderWindow, x: 250, y: 132, width: 420 },
}