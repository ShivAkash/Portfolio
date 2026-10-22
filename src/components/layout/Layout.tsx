import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CommandPalette } from '@/components/CommandPalette'
import { ShortcutsDialog } from '@/components/ShortcutsDialog'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'
import { useResume } from '@/components/ResumeViewer'

export function Layout() {
  const [cmdOpen, setCmdOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const { openResume } = useResume()

  const openCommand = useCallback(() => setCmdOpen(true), [])
  const openShortcuts = useCallback(() => setHelpOpen(true), [])

  useKeyboardNav({
    onOpenCommand: openCommand,
    onOpenShortcuts: openShortcuts,
  })

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav onOpenCommand={openCommand} onOpenResume={openResume} />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <ShortcutsDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}
