import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'

function openDialogs() {
  return screen.queryAllByRole('dialog')
}

function desktopIcon(name) {
  return within(screen.getByRole('list', { name: 'Desktop' })).getByRole('button', { name })
}

describe('desktop', () => {
  it('opens the About window on load', () => {
    render(<App />)
    expect(screen.getByRole('dialog', { name: 'About Me.txt' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Mel Liza Limbago/ })).toBeInTheDocument()
  })

  it('opens a window from its desktop icon and shows a taskbar button', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(desktopIcon(/Skills\.exe/))
    expect(screen.getByRole('dialog', { name: 'Skills.exe' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Skills.exe', pressed: true })).toBeInTheDocument()
  })

  it('does not open a second copy of an open window', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(desktopIcon(/My Projects/))
    await user.click(desktopIcon(/My Projects/))
    expect(openDialogs()).toHaveLength(2)
  })

  it('opens a project write-up from the projects list', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(desktopIcon(/My Projects/))
    await user.click(screen.getByRole('button', { name: /Sari-Sari Store POS/ }))
    const sheet = screen.getByRole('dialog', { name: 'Sari-Sari Store POS' })
    expect(within(sheet).getByText('What I built')).toBeInTheDocument()
  })

  it('closes the top window with the Escape key', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(desktopIcon(/Contact/))
    expect(openDialogs()).toHaveLength(2)
    await user.keyboard('{Escape}')
    expect(openDialogs()).toHaveLength(1)
  })

  it('minimizes a window and restores it from the taskbar', async () => {
    const user = userEvent.setup()
    render(<App />)
    const about = screen.getByRole('dialog', { name: 'About Me.txt' })
    await user.click(within(about).getByRole('button', { name: 'Minimize' }))
    expect(screen.queryByRole('dialog', { name: 'About Me.txt' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'About Me.txt', pressed: false }))
    expect(screen.getByRole('dialog', { name: 'About Me.txt' })).toBeVisible()
  })

  it('gives screen readers named landmarks', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Taskbar' })).toBeInTheDocument()
  })

  it('returns keyboard focus to the icon that opened the last window', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.keyboard('{Escape}')
    const icon = desktopIcon(/Skills\.exe/)
    await user.click(icon)
    await user.keyboard('{Escape}')
    expect(openDialogs()).toHaveLength(0)
    expect(icon).toHaveFocus()
  })

  it('opens the Start menu and closes it with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    const start = screen.getByRole('button', { name: 'start' })
    await user.click(start)
    expect(start).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(start).toHaveAttribute('aria-expanded', 'false')
    expect(start).toHaveFocus()
  })

  it('opens the résumé in a new tab from the desktop icon', async () => {
    const user = userEvent.setup()
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<App />)
    await user.click(desktopIcon(/Resume\.pdf/))
    expect(open).toHaveBeenCalledWith('/resume.pdf', '_blank', 'noopener,noreferrer')
  })
})

describe('phone mode', () => {
  it('shows a Back button instead of minimize and close', () => {
    window.__isMobile = true
    render(<App />)
    const about = screen.getByRole('dialog', { name: 'About Me.txt' })
    expect(within(about).getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(within(about).queryByRole('button', { name: 'Minimize' })).not.toBeInTheDocument()
  })

  it('closes the window with Back', async () => {
    window.__isMobile = true
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(openDialogs()).toHaveLength(0)
  })
})

describe('simple view', () => {
  it('shows all content on one page when the address ends with #simple', () => {
    window.location.hash = '#simple'
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Mel Liza Limbago' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.queryAllByRole('dialog')).toHaveLength(0)
  })

  it('switches between the views when the address changes', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'Simple view' }))
    expect(await screen.findByRole('link', { name: 'Switch to desktop view' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Switch to desktop view' }))
    expect(await screen.findByRole('dialog', { name: 'About Me.txt' })).toBeInTheDocument()
  })

  it('never shows a live demo link for projects without one', () => {
    window.location.hash = '#simple'
    render(<App />)
    expect(screen.queryByRole('link', { name: 'Live demo' })).not.toBeInTheDocument()
  })
  it('keeps a correct heading outline: project names sit under "Projects"', () => {
    window.location.hash = '#simple'
    render(<App />)
    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Sari-Sari Store POS' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 4, name: 'The problem' })).toHaveLength(2)
  })
})

describe('links', () => {
  it('opens every outside link safely in a new tab', () => {
    render(<App />)
    for (const link of screen.getAllByRole('link')) {
      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    }
  })
})