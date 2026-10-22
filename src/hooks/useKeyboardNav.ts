import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const map: Record<string, string> = {
  h: '/',
  w: '/work',
  a: '/about',
  c: '/contact',
}

export function useKeyboardNav({
  onOpenCommand,
  onOpenShortcuts,
}: {
  onOpenCommand: () => void
  onOpenShortcuts: () => void
}) {
  const navigate = useNavigate()
  const awaitingG = useRef(false)
  const timer = useRef(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenCommand()
        return
      }

      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        onOpenShortcuts()
        return
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return

      const key = e.key.toLowerCase()

      if (awaitingG.current) {
        awaitingG.current = false
        window.clearTimeout(timer.current)
        const path = map[key]
        if (path) {
          e.preventDefault()
          navigate(path)
        }
        return
      }

      if (key === 'g') {
        awaitingG.current = true
        timer.current = window.setTimeout(() => {
          awaitingG.current = false
        }, 800)
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(timer.current)
    }
  }, [navigate, onOpenCommand, onOpenShortcuts])
}
