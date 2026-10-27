import { useEffect, useState } from 'react'

const LINE_FROM_TOP = 120 

export function useActiveSection(sectionIds, elementIdFor) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    function update() {
      let current = null
      for (const id of sectionIds) {
        const element = document.getElementById(elementIdFor(id))
        if (element && element.getBoundingClientRect().top <= LINE_FROM_TOP) current = id
      }

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = sectionIds.at(-1)

      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionIds, elementIdFor])

  return active
}