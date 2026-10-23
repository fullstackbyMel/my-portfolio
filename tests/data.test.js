import { describe, expect, it } from 'vitest'
import { profile } from '../src/data/profile.js'
import { projects, projectWindowId } from '../src/data/projects.js'
import { skillGroups } from '../src/data/skills.js'
import { windowRegistry } from '../src/components/windows/windowRegistry.js'

const REQUIRED_TEXT_FIELDS = ['id', 'name', 'tagline', 'repoUrl', 'status', 'problem', 'users']
const REQUIRED_LIST_FIELDS = ['features', 'stack', 'learned', 'improve']

describe('profile', () => {
  it('has the contact details every window needs', () => {
    for (const key of ['name', 'headline', 'bio', 'availability', 'email', 'githubUrl', 'linkedinUrl', 'resumeUrl']) {
      expect(profile[key], key).toBeTruthy()
    }
  })
})

describe('projects', () => {
  it('uses unique ids', () => {
    const ids = projects.map((project) => project.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(projects.map((project) => [project.name, project]))('%s is complete', (_name, project) => {
    for (const field of REQUIRED_TEXT_FIELDS) {
      expect(project[field], field).toBeTruthy()
    }
    for (const field of REQUIRED_LIST_FIELDS) {
      expect(project[field].length, field).toBeGreaterThan(0)
    }
    expect(project.challenge.problem).toBeTruthy()
    expect(project.challenge.approach).toBeTruthy()
  })

  it.each(projects.map((project) => [project.name, project]))('%s has honest, valid links', (_name, project) => {
    expect(project.repoUrl).toMatch(/^https:\/\/github\.com\//)
    if (project.demoUrl !== null) expect(project.demoUrl).toMatch(/^https:\/\//)
  })

  it.each(projects.map((project) => [project.name, project]))('%s has a window in the registry', (_name, project) => {
    expect(windowRegistry[projectWindowId(project.id)]).toBeDefined()
  })

  it('describes every screenshot with alt text', () => {
    for (const project of projects) {
      for (const shot of project.screenshots) {
        expect(shot.src).toMatch(/^\/screenshots\//)
        expect(shot.alt.length).toBeGreaterThan(10)
      }
    }
  })
})

describe('skills', () => {
  it('has named groups with named items', () => {
    expect(skillGroups.length).toBeGreaterThan(0)
    for (const group of skillGroups) {
      expect(group.title).toBeTruthy()
      for (const item of group.items) expect(item.name).toBeTruthy()
    }
  })
})