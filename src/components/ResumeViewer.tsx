import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { Download, ExternalLink, X } from 'lucide-react'
import { profile } from '@/data/content'

type ResumeContextValue = {
  openResume: (opener?: HTMLElement) => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) throw new Error('useResume must be used within ResumeProvider')
  return context
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string>()
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [frameStyle, setFrameStyle] = useState<CSSProperties>(hiddenFrameStyle)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | undefined>(undefined)
  const timeoutRef = useRef<number | undefined>(undefined)

  const shouldSkipPreload = useCallback(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection
    return (
      connection?.saveData ||
      connection?.effectiveType === '2g' ||
      connection?.effectiveType === 'slow-2g'
    )
  }, [])

  const loadFrame = useCallback(() => {
    setSrc((current) => current ?? profile.resume.previewUrl)
  }, [])

  const openResume = useCallback(
    (opener?: HTMLElement) => {
      openerRef.current = opener
      setFailed(false)
      setOpen(true)
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#resume`)
      if (!src || shouldSkipPreload()) loadFrame()
    },
    [loadFrame, shouldSkipPreload, src],
  )

  const closeResume = useCallback(() => {
    setOpen(false)
    setFrameStyle(hiddenFrameStyle)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    window.setTimeout(() => openerRef.current?.focus(), 0)
  }, [])

  const updateFramePosition = useCallback(() => {
    const body = bodyRef.current
    if (!body || !open) return
    const rect = body.getBoundingClientRect()
    setFrameStyle({
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      opacity: 1,
      pointerEvents: 'auto',
      zIndex: 60,
      border: 0,
    })
  }, [open])

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#resume') {
        if (!open) openResume()
        loadFrame()
      }
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [loadFrame, open, openResume])

  useEffect(() => {
    if (src || shouldSkipPreload()) return
    const start = () => {
      const idle = window.requestIdleCallback
      if (idle) idle(loadFrame)
      else window.setTimeout(loadFrame, 1500)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [loadFrame, shouldSkipPreload, src])

  useEffect(() => {
    if (!open) return
    updateFramePosition()
    window.addEventListener('resize', updateFramePosition)
    const timer = window.setTimeout(() => {
      if (!loaded) setFailed(true)
    }, 10000)
    timeoutRef.current = timer
    return () => {
      window.removeEventListener('resize', updateFramePosition)
      window.clearTimeout(timer)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [loaded, open, updateFramePosition])

  useLayoutEffect(() => {
    if (!open) return
    updateFramePosition()
    panelRef.current?.focus()
  }, [open, updateFramePosition])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeResume()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], iframe',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [closeResume, open])

  return (
    <ResumeContext.Provider value={{ openResume }}>
      {children}
      {src && (
        <iframe
          ref={iframeRef}
          src={src}
          title="Resume preview"
          loading="eager"
          aria-hidden={!open}
          tabIndex={open ? 0 : -1}
          onLoad={() => setLoaded(true)}
          style={open ? frameStyle : hiddenFrameStyle}
        />
      )}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm max-[639px]:items-end max-[639px]:p-0">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close resume viewer"
            onClick={closeResume}
          />
          <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-viewer-title"
            className="relative z-10 flex h-[88vh] w-[min(960px,92vw)] flex-col overflow-hidden rounded-[12px] bg-[var(--surface)] hairline outline-none max-[639px]:h-[100dvh] max-[639px]:w-full max-[639px]:rounded-b-none"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3">
              <h2 id="resume-viewer-title" className="text-base font-semibold">
                Resume
              </h2>
              <div className="flex items-center gap-1">
                <a
                  href={profile.resume.downloadUrl}
                  download
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  <Download size={14} strokeWidth={1.5} aria-hidden />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={profile.resume.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  <ExternalLink size={14} strokeWidth={1.5} aria-hidden />
                  <span className="hidden sm:inline">Open in Drive</span>
                </a>
                <button
                  type="button"
                  onClick={closeResume}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  <X size={14} strokeWidth={1.5} aria-hidden />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </header>
            <div ref={bodyRef} className="relative min-h-0 flex-1 bg-[var(--surface)]">
              {!loaded && !failed && (
                <div
                  className="absolute inset-6 animate-pulse rounded-md bg-[var(--bg)]"
                  aria-label="Loading resume preview"
                />
              )}
              {failed && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[var(--surface)] p-6 text-center">
                  <p className="text-sm text-[var(--muted)]">
                    The preview couldn't load.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <a
                      href={profile.resume.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-[var(--accent-solid)] px-3.5 py-2 text-sm font-medium text-[var(--accent-fg)]"
                    >
                      Open in Drive
                    </a>
                    <a
                      href={profile.resume.downloadUrl}
                      download
                      className="rounded-md bg-[var(--surface)] px-3.5 py-2 text-sm font-medium hairline"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ResumeContext.Provider>
  )
}

const hiddenFrameStyle: CSSProperties = {
  position: 'fixed',
  left: '-9999px',
  top: '0',
  width: '1px',
  height: '1px',
  opacity: 0,
  pointerEvents: 'none',
  border: 0,
}
