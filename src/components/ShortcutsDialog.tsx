import { Modal } from '@/components/ui/Modal'

const shortcuts = [
  { keys: '⌘ / Ctrl + K', action: 'Command palette' },
  { keys: 'G then H', action: 'Go home' },
  { keys: 'G then W', action: 'Go to work' },
  { keys: 'G then A', action: 'Go to about' },
  { keys: 'G then C', action: 'Go to contact' },
  { keys: '?', action: 'Show shortcuts' },
]

export function ShortcutsDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <div data-shortcuts-dialog>
      <Modal open={open} onClose={onClose} title="Keyboard shortcuts">
        <ul className="space-y-2">
          {shortcuts.map((s) => (
            <li
              key={s.keys}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-[var(--muted)]">{s.action}</span>
              <kbd className="rounded-md px-2 py-0.5 font-mono text-[0.7rem] text-[var(--text)] hairline">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  )
}
